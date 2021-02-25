#!/usr/bin/env node

// 使用node开发命令行工具所执行的 js 脚本必须在头部添加#!/usr/bin/env node

console.log("参考vuecli-搭建自己的脚手架工具");

//获取用户的输入：根据不同的输入执行不同的功能操作
// console.log(process.argv) //原生获取命令行工具的方式
const { Command } = require("commander");
const program = new Command();
const download = require("download-git-repo");

const templetes = {
  "tpl-a": {
    url: "https://github.com/ChongQianQian/tpl-a.git",
    downurl:"github:ChongQianQian/tpl-a#main",
    describe: "初始化a模板",
  },
  "tpl-b": {
    url: "https://github.com/ChongQianQian/tpl-b.git",
    downurl:"github:ChongQianQian/tpl-b#main",
    describe: "初始化b模板",
  },
  "tpl-c": {
    url: "https://github.com/ChongQianQian/tpl-c.git",
    downurl:"github:ChongQianQian/tpl-c#main",
    describe: "初始化c模板",
  },
};

program.version("0.1.0");

program
  .command("init <templateName> <projectName>")
  .description("初始化项目模板")
  .action((templateName, projectName) => {
    //根据templateName下载对应的模板到本地并起名为 projectName
    // console.log(templetes[templateName]); //env：输入的模板名称
    download(
      `${templetes[templateName].downurl}`,
      `${projectName}`,
      { clone: true },
      function (err) {
        console.log(err ? "下载失败" : "下载成功");
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

program.parse(process.argv);
