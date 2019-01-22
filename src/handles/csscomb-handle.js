const fs = require('fs');
const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const { exec } = require('child_process');

module.exports = () => {
  const templatePath = path.resolve(__dirname, '../template/csscomb');
  const projectPath = process.cwd();
  const spinner = ora('adding csscomb...').start();

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
