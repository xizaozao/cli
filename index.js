#!/usr/bin/env node
// 获取用户输入
// console.log(process.argv)

const { program } = require('commander');
// 下载包
const download = require('download-git-repo');
// 模板引擎
const handlebars = require('handlebars'); 
// 命令行交互
const inquirer = require('inquirer'); 
// 下载动画
const ora = require('ora')
// 字体颜色
const chalk = require('chalk')
// 成功图标
const logSymbols = require('log-symbols')

const fs = require('fs')
program.version('0.1.1');

program
 .option('-d, --debug', 'output extra debugging')
 .option('-s, --small', 'small pizza size')
 .option('-p, --pizza-type <type>', 'flavour of pizza');
// loadUrl 下载地址   #master const 
// loadUrl = http://git.xiaojukeji.com/star-cms/pc/tree/master
program
  .command('init <template> <projectName>')
  .description('clone a repository into a newly created directory')
  .action((template, projectName) => {
      const spinner = ora('Loading 下载模板').start();
    //   setTimeout(() => {
    //     spinner.color = 'yellow';
    //     spinner.text = 'Loading rainbows';
    //   }, 1000)
      download(loadUrl, projectName, {clone: true}, err => {
          if(err){
              return console.log('下载失败', err)
              spinner.fail(logSymbols,error,'失败')
          }
          // 成功
        inquirer.prompt([
            /* Pass your questions in here */
            {
                type: "input",
                name: 'version',
                message: '输入版本',
                defeault: '0.0.1'
            },
            {
                type: "input",
                name: 'author',
                message: '输入作者',
                defeault: 'sanming'
            }         
        ])
        .then(answers => {
            // Use user feedback for... whatever!!
            const info = fs.readFileSync(`${projectName}/package.json`, 'utf-8')
            const newInfo = handlebars.compile(info)(answers)
            fs.writeFileSync(`${projectName}/package.json`,newInfo) // todo 路径
            spinner.succeed(logSymbols.sucess,'成功')

        })
        .catch(error => {
            if(error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            } else {
            // Something else when wrong
            }
        });
      })
    console.log(a, projectName,'clone command called');
  });

program.parse(process.argv);
