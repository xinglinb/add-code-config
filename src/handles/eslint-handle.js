const fs = require('fs');
const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const { exec } = require('child_process');

module.exports = () => {
  const templatePath = path.resolve(__dirname, '../template/eslint');
  const projectPath = process.cwd();
  const spinner = ora('adding eslint...').start();

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
        'npm i --save-dev eslint-config-ali eslint babel-eslint eslint-plugin-babel',
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
