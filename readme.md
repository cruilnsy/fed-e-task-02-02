# 崔锐 | Part 2 | 模块二

# 简答题

1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

解答：

**通俗版本**：

安装 webpack 和 webpack-cli，然后构建 webpack.config.js 文件（也可分别设置common, dev, prod）。

根据项目的架构，在 webpack.config.js 文件中设置 entry 和 output。同时，可以设置好mode（e.g. none, production, development）

配置所需要的 loader 和 plugin。

运行 webpack 到打包文件中。

**简单构件流程** ：

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

- `初始化参数`：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
- `开始编译`：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
- `确定入口`：根据配置中的 entry 找出所有的入口文件
- `编译模块`：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
- `完成模块编译`：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
- `输出资源`：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
- `输出完成`：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

在以上过程中，`Webpack` 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

解答：

loader 专注实现资源模块加载，从而实现整体项目打包。常用 的loader有三种类型，编译转换类（e.g. css-loader），文件操作类（e.g. file-loader），代码检查类（e.g. eslint）。loader 实际是一个函数，由于webpack只识别JavaScript，所以loader就相当于翻译官，对其他类型的资源进行转译处理。loader 在 module.rules 中配置，类型为数组，每项为一个对象，内部包含 test，loader，options 等属性。

plugin 增强webpack自动化能力，解决除了资源加载以外其他自动化工作。比如，清除dist目录（clean-webpack-plugin），拷贝静态文件至输出目录（copy-webpack-plugin），压缩输出代码等。几乎实现了大多数前端工程化工作。plugin 扩展webpack 功能。plugin 在 plugins 中配置，类型为数组，每项为plugin实例，参数都通过构造函数传入。

# 编程题

1、使用 Webpack 实现 Vue 项目打包任务

视频请见 code/task-02-02-video.mp4

code 请见 code/vue-webpack

注：Notes 手写的，还在整理中。