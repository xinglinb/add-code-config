const chalk = require('chalk');
const { exec } = require('child_process');
const fs = require('fs');
const ora = require('ora');
const path = require('path');

const eslintHandle = () => {
  const templatePath = path.resolve(__dirname, './template/eslint');
  const projectPath = process.cwd();
  const spinner = ora('add eslint Loading').start();

  // 0.进入到工作目录
  exec(projectPath, () => {
    const eslints = fs.readdirSync(templatePath);

    Promise.all(eslints.map(item => new Promise((res) => {
      // 1.读写添加 template 的文件
      const data = fs.readFileSync(path.resolve(templatePath, item));
      data && fs.writeFileSync(path.resolve(projectPath, item), data);
      res();
    }))).then(() => {
      // 2.下载 template 需要的依赖
      exec(
        'npm i --save-dev eslint-config-ali eslint eslint-plugin-import eslint-plugin-react',
        (error) => {
          if (error) {
            throw error;
          }
          spinner.succeed(['add eslint success']);
        }
      );
    })
      .catch((e) => {
        spinner.fail(['add eslint failed']);
        console.log(chalk.red(e));
      });
  });
};

const csscombHandle = () => {
  const templatePath = path.resolve(__dirname, './template/csscomb');
  const projectPath = process.cwd();
  const spinner = ora('add csscomb').start();

  // 1.进入到工作目录
  exec(projectPath, () => {
    const csscombs = fs.readdirSync(templatePath);

    Promise.all(csscombs.map(item => new Promise(() => {
      // 2.读写添加 template 的文件
      const data = fs.readFileSync(path.resolve(templatePath, item));
      data && fs.writeFileSync(path.resolve(projectPath, item), data);
      spinner.succeed(['add csscomb success']);
    })))
      .catch((e) => {
        spinner.fail(['add csscomb failed']);
        console.log(chalk.red(e));
      });
  });
};

module.exports = (program) => {
  const addList = program.init.split(',');
  const projectPath = process.cwd();

  // 判断当前工作目录是否是项目目录
  const files = fs.readdirSync(projectPath);
  if (!files.some(item => item === 'package.json')) {
    console.log(chalk.red('找不到 package.json 文件'));
    return;
  }

  addList.forEach((item) => {
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
