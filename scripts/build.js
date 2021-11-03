// vue3使用 monerepo 进行打包

const fs = require('fs')  // fs 文件模块
const execa = require('execa')  // 开启多进程
// 读取packages的文件目录信息
// 1 获取打包文件

const dirs = fs.readdirSync("packages").filter(item => {
    // 过滤 文件目录
    if(!fs.statSync(`packages/${item}`).isDirectory()){
        return false
    }else{
        return true
    }
})
// 2 进行打包  并行打包

// build
async  function build(target){
    await execa("rollup",['-c',"--environment",`TARGET:${target}`],{ stdio: 'inherit' })
}
// 打包函数
async function run(dirs,build){
    let result = []
    //  遍历
    for(let i=0;i<dirs.length;i++){
        result.push(build(dirs[i]))
    }
    return Promise.all(result)
}


run(dirs,build).then(res=>{
    console.log('完成打包')
})
console.log(dirs)