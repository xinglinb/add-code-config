#!/usr/bin/env node

const program = require('commander');
const init = require('./main');

program
  .version(require('../package').version) // 设置版本
  .option('-i, --init [init]', 'init config !') // 自定义形参[port]
  .parse(process.argv); // 参数数组

program.init && init(program);
