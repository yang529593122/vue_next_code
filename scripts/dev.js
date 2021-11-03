// vue3使用 monerepo 进行打包

const execa = require('execa')  // 开启多进程

async  function build(target){
    await execa("rollup",['-cw',"--environment",`TARGET:${target}`],{ stdio: 'inherit' })
}


build('reactivity')