import path from 'path'  // 路径模块
import ts from 'rollup-plugin-typescript2' // rollup 解析ts
import resolvePlugin from '@rollup/plugin-node-resolve' // 解析第三方插件
import json from '@rollup/plugin-json'  // 解析json



// 获取文件路径
// 获取每个包的路径
const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
// 获取每一个包的配置
const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`)) // 获取每一个package.json
const packageOptions = pkg.buildOptions || {}  // 配置项
const name =  path.basename(packageDir)

const outputConfigs = {
    'esm-bundler': {
        file: resolve(`dist/${name}.esm-bundler.js`),
        format: `es`
    },
    cjs: {
        file: resolve(`dist/${name}.cjs.js`),
        format: `cjs`
    },
    global: {
        file: resolve(`dist/${name}.global.js`),
        format: `iife`
    },
}


const  options = pkg.buildOptions

// 自己的配置和 映射表中进行对比
function  createConfig (format,output) {
    output.name = options.name  // 打包后的名称
    output.sourcemap = true  // 调试代码
    // 生成rollup 配置
    return {
        input: resolve('src/index.ts'),
        output,
        plugin:[
            json(),
            ts({
                tsconfig: path.resolve(__dirname, 'tsconfig.json'),
            }),
            resolvePlugin()
        ]
    }
}
 // rollup 导出一个配置
 export default  options.formats.map(format => createConfig(format, outputConfigs[format]))
