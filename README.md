[![GitHub stars](https://img.shields.io/github/stars/1015355299/yield-cli.git)](https://github.com/1015355299/yield-cli.git/stargazers) [![GitHub issues](https://img.shields.io/github/issues/1015355299/yield-cli.git)](https://github.com/1015355299/yield-cli.git/issues) [![GitHub license](https://img.shields.io/github/license/1015355299/yield-cli.git)](https://github.com/1015355299/yield-cli.git)

# yield-cli

全局命令行工具，用于转换多种文件，转换表如下

|转换前文件类型|转换后文件类型|
|-------------|-------------|
|js:es6+|js:es5|
|scss|css|
|sass|css|
|xx|xx|

## 安装

全局安装 `npm i yield-cli -g`

## 指令

1. 设置输入文件 `yield [input]` 自动识别index文件名

```js
// 默认在指令目录下生成dist文件夹，将转换后的同名文件存入其中

// 自动寻找index文件，优先匹配以js、css、scss、sass结尾的文件进行转换 
yield

// 匹配以js、css、scss、sass结尾的文件进行转换 
yield index

// 转换当前目录下的 index.sass 文件
yield index.sass
```
  
2. 设置输出文件 `yield [input] -o [target file name]` 默认与输入文件名相同名称

```js
// 设置输出文件名，不包含后缀

// index.sass 输出到 dist/main.css
yield index.sass -o main

// index.sass 输出到 dist/main.css，忽略输出后缀
yield index.sass -o main.scss
```

3. 设置输出目录 `yield [input] -d [target dir]` 默认dist目录

```js
// 设置输出文件目录，默认dist

// 输出到指令目录下的lib文件夹中
yield index.js -d lib
```

4. 设置输出文件类型 `yield [input] -t [target type]` 默认会识别输入文件类型并进行转换输出

```js
// 设置输出文件后缀类型，默认js

// index.sass 输出为 index.css
yield index.sass -t css
// 等同于
yield index.sass
```

5. 设置输出文件压缩 `yield [input] -m` 默认不启用压缩

```js
// 设置输出文件压缩，sass、scss同使用compressed效果

// 压缩文件
yield index.js -m

// 压缩css
yield index.scss -m
// 等同于
yield index.scss -s compressed
```

6. 设置每次自动删除输出文件夹 `yield [input] -n` 默认不自动删除

```js
// 设置自动删除整个输出目录

// 自动删除，并重新生成
yield index.js -n
```

7. 设置sass、scss输出样式 `yield [input] -s <outputType>` 默认使用nested，可选expanded、compact、compressed

```js
// 设置输出css样式格式

// 默认，嵌套样式
yield index.scss -s nested

// 类似手写样式
yield index.scss -s expanded

// 每条 CSS 规则只占一行
yield index.scss -s compact

// 压缩样式
yield index.scss -s compressed
```

## 其他指令

- 帮助指令 `yield -h` 或 `yield --help` 查看指令列表
- 查看 yield-cli 版本 `yield -V` 或 `yield --version`

更多指令支持中。。。
