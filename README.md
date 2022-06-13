### react 项目初始化配置 Eslint, Prettier 和 Husky

## 准备开始

我们将从一个基本的 React 应用程序开始，我们将使用 [create-react-app](https://create-react-app.dev/) -

```
npx create-react-app your-app-name
```

这将是一个 react 应用程序，我们不会更改任何内容，因为本教程与 reactjs 无关。我们将直接进行下一步！本教程中更直接的步骤更漂亮。因此，让我们深入了解它！

## 格式化代码

我们使用 prettier 来自动格式化我们的代码。这为我节省了很多时间。我还安装了一个 vscode 扩展，这对我有很大帮助。所以让我们安装它。

```
npm i prettier -D
```

我们使用 -D 仅将其安装为开发依赖项。我们不需要将它发送到我们的构建中。安装完成后，让我们尝试使用 prettier 格式化我们的代码。但要做到这一点，我们需要创建一个更漂亮的配置文件。因为 prettier 不知道如何格式化我们的代码，所以让我们创建那个文件。它将在我们的根文件夹中，文件名为 `.prettierrc`.

```
{
  "trailingComma": "es5",
  "semi": true,
  "singleQuote": true,
  "jsxSingleQuote": false,
  "useTabs": false,
  "tabWidth": 2
}
```

你可以用它配置很多东西。 [单击此处](https://prettier.io/docs/en/configuration.html) 了解更多信息。但我们将使用简单的配置。我喜欢 tabWidth 两个空格，不太喜欢分号。现在将使用 prettier 处理所有内容。这不是很棒吗？？？

## ESlint

Eslint 帮助我们强制执行编码风格。您可以定义自己的编码风格。我主要使用 [airbnb 风格](https://github.com/airbnb/javascript/tree/master/react)。所以让我们安装它。但如果你有时间，请阅读 [eslint 网站上](https://eslint.org/docs/rules/)的规则 ——

```
npm i eslint -D
```

您需要为 eslint 创建一个配置文件。有两种方法可以做到这一点；你可以这样做

```
./node_modules/.bin/eslint --init
```

然后会弹出

```
? How would you like to use ESLint? ...
  To check syntax only
  To check syntax and find problems
> To check syntax, find problems, and enforce code style
```

我会选择 `To check syntax, find problems, and enforce code style` ，因为我想检查语法、发现问题并强制执行代码风格！然后它会显示——

```
? What type of modules does your project use? ...
> JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these
```

我会选择 `Javascript modules (import/export)` ，因为我想使用 import/export，而不是旧的 require/exports。选择然后 -

```
? Which framework does your project use? ...
> React
  Vue.js
  None of these
```

选择你正在使用的框架

```
? Does your project use TypeScript? » No / Yes
```

我们没有使用 Typescript，所以让我们点击不！然后它会显示——

```
? Where does your code run? ...  (Press <space> to select, <a> to toggle all, <i> to invert selection)
√ Browser
√ Node
```

我们将使用浏览器检查结果，因此选择并 -

```
? How would you like to define a style for your project? ...
> Use a popular style guide
  Answer questions about your style
```

我会选择 `Use a popular style guide` 一个。因为这很容易安装，而且许多开发人员已经知道它。但是，如果您想要手动样式，只需选择该 `Answer questions about your style` 选项即可。让我们选择它 -

```
? Which style guide do you want to follow? ...
> Airbnb: https://github.com/airbnb/javascript
  Standard: https://github.com/standard/standard
  Google: https://github.com/google/eslint-config-google
  XO: https://github.com/xojs/eslint-config-xo
```

已经有一些风格指南。`airbnb` 大多数时候我都会选择 。和你喜欢的人一起去吧！

```
What format do you want your config file to be in? ...
> JavaScript
  YAML
  JSON
```

我通常只是选择 `JSON` ，因为它最容易阅读。但你也可以选择任何你喜欢的！

```
Checking peerDependencies of eslint-config-airbnb@latest
Local ESLint installation not found.
The config that you've selected requires the following dependencies:

eslint-plugin-react@^7.28.0 eslint-config-airbnb@latest eslint@^7.32.0 || ^8.2.0 eslint-plugin-import@^2.25.3 eslint-plugin-jsx-a11y@^6.5.1 eslint-plugin-react-hooks@^4.3.0
? Would you like to install them now with npm? » No / Yes
```

让我们现在安装软件包！这需要一点时间。最后，我们将看到 `.eslintrc.json` 文件！先来看看吧。

我们的 eslint 设置已经完成，但它不能很好地与 prettier 一起使用。我们需要做一些更多的配置以使两者能够协同工作！

# 一起配置 eslint & prettier

本节还从安装一个名为 的 npm 包开始 `eslint-plugin-prettier`，它将帮助我们一起配置 eslint 和 prettier。我们将安装它 -

```
npm i eslint-plugin-prettier -D
```

我们需要在 `.eslintrc.json` 文件中添加这个插件——

```
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react", "prettier"
    ],
     "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  "rules": {
    "comma-dangle": 0,
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [
      1,
      { "extensions": [".js", ".jsx", "ts", "tsx"] }
    ],
    "import/extensions": [
      2,
      "always",
      { "tsx": "never", "ts": "never", "js": "never", "jsx": "never" }
    ],
    "object-curly-newline": ["error", { "consistent": true }],
      "no-console": 0, //不禁用console
    "no-debugger": 2, //禁用debugger
    "no-var": 1, //对var警告
    "semi": 0, //不强制使用分号
    "no-irregular-whitespace": 0, //不规则的空白不允许
    "no-trailing-spaces": 1, //一行结束后面有空格就发出警告
    "eol-last": 0, //文件以单一的换行符结束
    "no-unused-vars": [2, { "vars": "all", "args": "after-used" }], //不能有声明后未被使用的变量或参数
    "no-underscore-dangle": 0, //标识符不能以_开头或结尾
    "no-alert": 2, //禁止使用alert confirm prompt
    "no-lone-blocks": 0, //禁止不必要的嵌套块
    "no-class-assign": 2, //禁止给类赋值
    "no-cond-assign": 2, //禁止在条件表达式中使用赋值语句
    "no-const-assign": 2, //禁止修改const声明的变量
    "no-delete-var": 2, //不能对var声明的变量使用delete操作符
    "no-dupe-keys": 2, //在创建对象字面量时不允许键重复
    "no-duplicate-case": 2, //switch中的case标签不能重复
    "no-dupe-args": 2, //函数参数不能重复
    "no-empty": 2, //块语句中的内容不能为空
    "no-func-assign": 2, //禁止重复的函数声明
    "no-invalid-this": 0, //禁止无效的this，只能用在构造器，类，对象字面量
    "no-redeclare": 2, //禁止重复声明变量
    "no-spaced-func": 2, //函数调用时 函数名与()之间不能有空格
    "no-this-before-super": 0, //在调用super()之前不能使用this或super
    "no-undef": 2, //不能有未定义的变量
    "no-use-before-define": 2, //未定义前不能使用
    "no-extra-boolean-cast": 0, //禁止不必要的bool转换
    "no-unreachable": 1, //不能有无法执行的代码
    "no-mixed-spaces-and-tabs": 1, //禁止混用tab和空格
    "prefer-arrow-callback": 1, //比较喜欢箭头回调
    "arrow-parens": 1, //箭头函数用小括号括起来
    "arrow-spacing": 1, //=>的前/后括号
    "camelcase": 0, //强制驼峰法命名
    "jsx-quotes": [2, "prefer-double"], //强制在JSX属性（jsx-quotes）中一致使用双引号
    "react/display-name": 0, //防止在React组件定义中丢失displayName
    "react/forbid-prop-types": [2, { "forbid": ["any"] }], //禁止某些propTypes
    "react/jsx-boolean-value": 2, //在JSX中强制布尔属性符号
    "react/jsx-closing-bracket-location": 1, //在JSX中验证右括号位置
    "react/jsx-curly-spacing": [2, { "when": "never", "children": true }], //在JSX属性和表达式中加强或禁止大括号内的空格。
    "react/jsx-indent-props": 0, //验证JSX中的props缩进
    "react/jsx-key": 2, //在数组或迭代器中验证JSX具有key属性
    "react/jsx-max-props-per-line": 1, // 限制JSX中单行上的props的最大数量
    "react/jsx-no-bind": 0, //JSX中不允许使用箭头函数和bind
    "react/jsx-no-duplicate-props": 2, //防止在JSX中重复的props
    "react/jsx-no-literals": 0, //防止使用未包装的JSX字符串
    "react/jsx-no-undef": 1, //在JSX中禁止未声明的变量
    "react/jsx-pascal-case": 0, //为用户定义的JSX组件强制使用PascalCase
    "react/jsx-sort-props": 0, //强化props按字母排序
    "react/jsx-uses-react": 1, //防止反应被错误地标记为未使用
    "react/jsx-uses-vars": 2, //防止在JSX中使用的变量被错误地标记为未使用
    "react/no-danger": 0, //防止使用危险的JSX属性
    "react/no-did-mount-set-state": 1, //防止在componentDidMount中使用setState
    "react/no-did-update-set-state": 1, //防止在componentDidUpdate中使用setState
    "react/no-direct-mutation-state": 2, //防止this.state的直接变异
    "react/no-multi-comp": 2, //防止每个文件有多个组件定义
    "react/no-set-state": 0, //防止使用setState
    "react/no-unknown-property": 2, //防止使用未知的DOM属性
    "react/prefer-es6-class": 2, //为React组件强制执行ES5或ES6类
    "react/prop-types": 1, //防止在React组件定义中丢失props验证
    "react/react-in-jsx-scope": 2, //使用JSX时防止丢失React
    "react/self-closing-comp": 0, //防止没有children的组件的额外结束标签
    "react/sort-comp": 2, //强制组件方法顺序
    "react/no-array-index-key": 1, //防止在数组中遍历中使用数组key做索引
    "react/no-deprecated": 1, //不使用弃用的方法
    "react/jsx-equals-spacing": 2, //在JSX属性中强制或禁止等号周围的空格
    "react/jsx-one-expression-per-line": 2//每一行都限制为一个表达式
  }
}
```

我更新了最后两部分 - `plugins` 和 `rules`. 这将有助于我们一起工作更漂亮和更准确。不用担心; eslint 和 prettier 不需要更多的配置。

另外，让我们在 `package.json` 文件中添加两个脚本。这将帮助我们通过以下方式对文件进行 lint `npm run lint` 和格式化我们的代码 `npm run pretty` -

```
 "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint --fix",
    "pretty": "prettier --write ."
  }
```

一个快速说明：在您的项目中，可能有一些您不想 lint 或格式化的文件。所以你可以将它们添加到 `.eslintignore` 文件中——

```
node_modules
public
build
```

对于忽略格式，您可以使用 `.prettierignore`

```
# Ignore artifacts:
build
coverage

# Ignore all HTML files:
*.html
```

但是仍然存在一个问题。如果您使用带有 eslint & prettier 等扩展的 IDE，这一切都将起作用。没有它不会自动格式化。我们可以通过 `script` 在 `package.json` 文件中使用来强制它。但是让我们找到一个更好的解决方案！

## Husky

为了强制我们的编码风格和格式，我们将使用 git hook。因此，如果有人提交任何代码，它会运行一些 linting 并检查它是否有任何问题。 为此，我们将使用 `husky` - `lint-staged`

```
npm i husky lint-staged -D
```

这将只安装软件包。但是为了使用 `lint-staged` 我们需要编辑我们的 `package.json` 文件。让我们添加一些行 -

```
 "lint-staged": {
    "src/**/*.{css,scss,less,json,md}": [
      "prettier --write"
    ],
    "src/**/*.{js,jsx,ts,tsx}": [
      "npm run lint"
    ]
  }
```

使用这四行代码，我们只是对代码进行 linting 和格式化。但现在没有从任何地方调用它。所以我们需要从某个地方调用它。但在此之前，我们需要正确安装 husky 才能运行它——

```
npx husky-init && npm install
```

这将创建一个名为的文件夹 `.husky` ，并在其中创建一个名为的文件，该文件 `pre-commit` 将 `npm test` 在提交之前运行。但是对于当前的项目，我们不想运行 `npm test`，所以我们要改成——

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# npm test
npx lint-staged
```

现在我们可以尝试在 git 中提交，它会告诉我们是否有错误！现在我们终于准备好测试我们的项目了！

## 结果和测试

我们今天不会在本教程中探索 git。因为 git 是一个很大的话题，需要另一个博客。您可以快速上 git 的速成课程。然后回到这里，看看我在做什么。首先，我将对文件稍作改动 `app.js` ；将添加一个我们不需要的额外行（只是为了展示我们到目前为止所做的事情）

```
import React from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const tempVar = 5

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          <code>src/App.js</code>
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
```

我刚刚添加了 `const tempVar = 5` after 函数，让我们尝试将它提交到 github repo 中。我在用着

```
git add .
git commit -m "Initial Commit"
```

现在我遇到了一个错误。

```
[STARTED] Preparing lint-staged...
[SUCCESS] Preparing lint-staged...
[STARTED] Running tasks for staged files...
[STARTED] package.json — 10 files
[STARTED] **/*.{js,jsx} — 2 files
[STARTED] npm run lint
[FAILED] npm run lint [FAILED]
[FAILED] npm run lint [FAILED]
[SUCCESS] Running tasks for staged files...
[STARTED] Applying modifications from tasks...
[SKIPPED] Skipped because of errors from tasks.
[STARTED] Reverting to original state because of errors...
[SUCCESS] Reverting to original state because of errors...
[STARTED] Cleaning up temporary files...
[SUCCESS] Cleaning up temporary files...

✖ npm run lint:
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! react-eslint-prettier@0.1.0 lint: `eslint --fix "C:/Users/demo/Desktop/nerdworks/Blogs Examples/react-eslint-prettier/src/App.js" "C:/Users/demo/Desktop/nerdworks/Blogs Examples/react-eslint-prettier/src/index.js"`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the react-eslint-prettier@0.1.0 lint script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\demo\AppData\Roaming\npm-cache\_logs\2022-02-18T18_07_55_543Z-debug.log

> react-eslint-prettier@0.1.0 lint C:\Users\demo\Desktop\nerdworks\Blogs Examples\react-eslint-prettier
> eslint --fix "C:/Users/demo/Desktop/nerdworks/Blogs Examples/react-eslint-prettier/src/App.js" "C:/Users/demo/Desktop/nerdworks/Blogs Examples/react-eslint-prettier/src/index.js"


C:\Users\demo\Desktop\nerdworks\Blogs Examples\react-eslint-prettier\src\App.js
  6:9  error  'tempVar' is assigned a value but never used  no-unused-vars

✖ 1 problem (1 error, 0 warnings)

husky - pre-commit hook exited with code 1 (error)
```

也许一开始它会看起来势不可挡。但是如果你从最后开始阅读，你就会明白我们在这里做什么。这里问题正在显现。

```
6:9  error  'tempVar' is assigned a value but never used  no-unused-vars
```

所以我们创建的 tempVar 正在制造一个问题。为什么？因为我们没有使用这个变量。所以只需删除它并尝试再次提交。这一次它会工作得很好——

```
STARTED] Preparing lint-staged...
[SUCCESS] Preparing lint-staged...
[STARTED] Running tasks for staged files...
[STARTED] package.json — 10 files
[STARTED] **/*.{js,jsx} — 2 files
[STARTED] npm run lint
[SUCCESS] npm run lint
[STARTED] prettier --write
[SUCCESS] prettier --write
[SUCCESS] **/*.{js,jsx} — 2 files
[SUCCESS] package.json — 10 files
[SUCCESS] Running tasks for staged files...
[STARTED] Applying modifications from tasks...
[SUCCESS] Applying modifications from tasks...
[STARTED] Cleaning up temporary files...
[SUCCESS] Cleaning up temporary files...
[master 205b14e] Initial Commit
13 files changed, 449 insertions(+), 119 deletions(-)
 create mode 100644 .eslintignore
 create mode 100644 .eslintrc.json
 create mode 100644 .husky/pre-commit
 create mode 100644 .prettierignore
 create mode 100644 .prettierrc
 rewrite README.md (99%)
 delete mode 100644 src/App.test.js
 rewrite src/index.js (78%)
 delete mode 100644 src/reportWebVitals.js
 delete mode 100644 src/setupTests.js
```

这样，所有文件都将在进入我们的 GitHub 存储库之前使用 eslint & prettier！

### 注意，如果显示 No staged files match any configured task.请先尝试修改文件再提交
