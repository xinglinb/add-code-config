const chalk = require('chalk');
const fs = require('fs');

const eslintHandle = require('./handles/eslint-handle');
const csscombHandle = require('./handles/csscomb-handle');

module.exports = (program) => {
  const addCodeList = program.args;
  const projectPath = process.cwd();

  // 判断当前工作目录是否是项目目录
  const files = fs.readdirSync(projectPath);
  if (!files.some(item => item === 'package.json')) {
    console.log(chalk.red('找不到 package.json 文件'));
    return;
  }

  addCodeList.forEach((item) => {
    switch (item) {
      case 'eslint':
        eslintHandle();
        break;
      case 'csscomb':
        csscombHandle();
        break;
      default:
        break;
    }
  });
};
