#!/usr/bin/env node

// 使用node开发命令行工具所执行的 js 脚本必须在头部添加#!/usr/bin/env node

console.log("参考vuecli-搭建自己的脚手架工具");

//获取用户的输入：根据不同的输入执行不同的功能操作
// console.log(process.argv) //原生获取命令行工具的方式
const { Command } = require("commander");
const program = new Command();
const download = require("download-git-repo");
const inquirer = require("inquirer");
const fs = require("fs");
const handlebars = require("handlebars");

const templetes = {
  "tpl-a": {
    url: "https://github.com/ChongQianQian/tpl-a.git",
    downurl: "github:ChongQianQian/tpl-a#main",
    describe: "初始化a模板",
  },
  "tpl-b": {
    url: "https://github.com/ChongQianQian/tpl-b.git",
    downurl: "github:ChongQianQian/tpl-b#main",
    describe: "初始化b模板",
  },
  "tpl-c": {
    url: "https://github.com/ChongQianQian/tpl-c.git",
    downurl: "github:ChongQianQian/tpl-c#main",
    describe: "初始化c模板",
  },
};

program.version("0.1.0");

program
  .command("init <templateName> <projectName>")
  .description("初始化项目模板")
  .action((templateName, projectName) => {
    //根据templateName下载对应的模板到本地并起名为 projectName

    //优化：判断项目名是否存在 如果存在的话 把之前的删除 否则新建
    fs.exists(`./${projectName}`, (exists) => {
      if (exists) {
        let path = `./${projectName}`
        deleteall(path)
      }
    });

    //下载对应模板
    download(
      `${templetes[templateName].downurl}`,
      `${projectName}`,
      { clone: true },
      function (err) {
        if (err) {
          return "下载失败";
        } else {
          //使用inquirer对用户的输入进行向导
          inquirer
            .prompt([
              {
                type: "input",
                message: "请输入项目名:",
                name: "name",
                default: `${projectName}`, // 默认值
              },
              {
                type: "input",
                message: "请输入项目描述:",
                name: "description",
                default: "", // 默认值
              },
              {
                type: "input",
                message: "请输入项目作者:",
                name: "author",
                default: "", // 默认值
              },
            ])
            .then((answers) => {
              //{ name: 'proname4', description: '描述信息', author: '' }
              //1.获取用户控制台输入结果
              //2.读取package.json文件
              //3.动态修改package.json文件对应的内容
              //4.重新写入到package.json文件中

              const packageContent = fs.readFileSync(
                `${projectName}/package.json`,
                "utf8"
              );
              const packageNewContent = handlebars.compile(packageContent)(
                answers
              );
              console.log("packageNewContent: ", packageNewContent);

              fs.writeFileSync(
                `${projectName}/package.json`,
                packageNewContent
              );
              console.log(`初始化模板${templateName}成功`);
            })
            .catch((error) => {
              if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
              } else {
                // Something else went wrong
              }
            });
        }
      }
    );
  });

program
  .command("list")
  .description("列出所有可以选择的项目模板")
  .action(() => {
    //命令要执行的动作
    for (const key in templetes) {
      console.log(`
        ${key}  ${templetes[key].describe}
        `);
    }
  });

//删除文件夹及文件
function deleteall(path) {
  var files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function (file, index) {
      var curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        deleteall(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

program.parse(process.argv);
