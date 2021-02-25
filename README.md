### 把脚本映射为命令

#### 初始化 package.json

```bash
npm init -y
```

在 package.json 文件中添加命令行工具

```json
"bin": {
    "abc": "index.js"
}
```

```bash
npm link
abc
```

在终端输入：`npm link` 这样就可以全局使用脚本了
(提示：如果没有控制太可能会提示没有权限，可以使用`sudo npm link`)

在终端中输入 `abc` 发现 index.js 文件执行了

### 命令行工具参数设计

```bash
mini -h|--help 查看使用帮助
mini -V|--version 查看工具的版本号

mini init <template-name> <project-name> 基于指定的模板进行项目创建
mini list 列出所有可用模板
```

#### 1.commander包解析命令行工具
> 完整的 node.js 命令行解决方案。
[官方 npm 链接](https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md#%e4%be%8b%e5%ad%90)

#### 2.download-git-repo下载代码
> 安装 download-git-repo 可以下载指定 git 地址的代码
[官方 npm 地址](https://www.npmjs.com/package/download-git-repo)

```bash
npm install download-git-repo
```

```js
// 快速使用
download(
  "https://github.com/ChongQianQian/tpl-a.git",
  "filename",
  { clone: true },
  function (err) {
    console.log(err ? "下载成功" : "下载失败");
  }
);
//这样在控制台中输入 mini init tpl-a proname 会在当前路径下创建文件名为filename的文件夹
```

#### 3.使用inquirer来交互输入
```bash
npm install inquirer
```
```js
var inquirer = require('inquirer');
inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });
```

#### 4.handlebars处理用户输入
> [官方地址](https://handlebarsjs.com/zh/installation/#npm-%E6%88%96-yarn-%EF%BC%88%E6%8E%A8%E8%8D%90%EF%BC%89)
```bash
npm install handlebars
```
```js
const handlebars = require("handlebars");

const packageNewContent = handlebars.compile(packageContent)(answers);
// packageContent中对应的向导关键字 需要用{{name}}
// 然后在控制台中输入：min tpl-a proname
```

#### 优化：ora
> 优秀的终端加载提示
[官方地址](https://github.com/sindresorhus/ora)

```bash
npm install ora
```

```js
const ora = require('ora');

const spinner = ora('Loading unicorns').start();

setTimeout(() => {
	spinner.color = 'yellow';
	spinner.text = 'Loading rainbows';
}, 1000);
```

#### 优化chalk：添加颜色
```bash
npm install chalk  
```

```js
const chalk = require('chalk');
//chalk[样式关键字_1][样式关键字_2](输出内容)

chalk.green(' √ ' )
chalk.yellow(' ∆ ' )
chalk.chalk.bold.red(' X ' )
chalk.cyan(' [test] ')
```
#### 优化：图标提示log-symbols
[npm地址](https://www.npmjs.com/package/log-symbols)
```bash
npm install log-symbols
```
```js
const logSymbols = require('log-symbols');
 
console.log(logSymbols.success, 'Finished successfully!');
```


### npm发包
1.注册npm账号
2.检索npm包是否重复
3.将package.json中的name为发布的包名:mini
4.控制台：npm login 登陆npm
5.执行 npm publish
6.使用包 npm install --global mini
7.npm unlink mini //开始使用
8.mini -h