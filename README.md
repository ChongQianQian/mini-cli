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

#### 使用 commander 解析命令行工具

[官方 npm 链接](https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md#%e4%be%8b%e5%ad%90)

#### 模板代码下载方式

> 安装 download-git-repo 可以下载指定 git 地址的代码

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
