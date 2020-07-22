#!/usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const template = require("./utils/template");
const chalk = require("chalk");
const yargs = require("yargs");

console.log(`===> ${__dirname}/templates`);
const CHOICES = fs.readdirSync(path.join(__dirname, "templates"));

const QUESTIONS = [
  {
    name: "template",
    type: "list",
    message: "What project template would you like to generate?",
    choices: CHOICES,
    when: () => !yargs.argv["template"],
  },
  {
    name: "name",
    type: "input",
    message: "Project name:",
    when: () => !yargs.argv["name"],
    validate: (input) => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    },
  },
  {
    name: "description",
    type: "input",
    message: "What is the project about?",
    when: () => !yargs.argv["description"],
  },
];

const CURR_DIR = process.cwd();

inquirer.prompt(QUESTIONS).then((answers) => {
  answers = Object.assign({}, answers, yargs.argv);

  const projectChoice = answers["template"];
  const projectName = answers["name"];
  const projectDescription = answers["description"];
  const templatePath = path.join(__dirname, "templates", projectChoice);
  const tartgetPath = path.join(CURR_DIR, projectName);
  const templateConfig = getTemplateConfig(templatePath);

  const options = {
    projectName,
    projectDescription,
    templateName: projectChoice,
    templatePath,
    tartgetPath,
    config: templateConfig,
  };

  if (!createProject(tartgetPath)) {
    return;
  }

  createDirectoryContents(templatePath, projectName, templateConfig, answers);

  if (!postProcess(options)) {
    return;
  }

  showMessage(options);
});

function showMessage(options) {
  console.log("");
  console.log(chalk.green("Done."));
  console.log(chalk.green(`Go into the project: cd ${options.projectName}`));

  const message = options.config.postMessage;

  if (message) {
    console.log("");
    console.log(chalk.yellow(message));
    console.log("");
  }
}

function getTemplateConfig(templatePath) {
  const configPath = path.join(templatePath, ".template.json");

  if (!fs.existsSync(configPath)) return {};

  const templateConfigContent = fs.readFileSync(configPath);

  if (templateConfigContent) {
    return JSON.parse(templateConfigContent.toString());
  }

  return {};
}

function createProject(projectPath) {
  if (fs.existsSync(projectPath)) {
    console.log(
      chalk.red(`Folder ${projectPath} exists. Delete or use another name.`)
    );
    return false;
  }

  fs.mkdirSync(projectPath);
  return true;
}

function postProcess(options) {
  if (isNode(options)) {
    return postProcessNode(options);
  }
  return true;
}

function isNode(options) {
  return fs.existsSync(path.join(options.templatePath, "package.json"));
}

function postProcessNode(options) {
  shell.cd(options.tartgetPath);

  let cmd = "";

  if (shell.which("yarn")) {
    cmd = "yarn";
  } else if (shell.which("npm")) {
    cmd = "npm install";
  }

  if (cmd) {
    const result = shell.exec(cmd);

    if (result.code !== 0) {
      return false;
    }
  } else {
    console.log(chalk.red("No yarn or npm found. Cannot run installation."));
  }

  return true;
}

const SKIP_FILES = ["node_modules", ".template.json"];

function createDirectoryContents(templatePath, projectPath, config, answers) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = path.join(templatePath, file);

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (SKIP_FILES.indexOf(file) > -1) return;

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, "utf8");
      const { name: projectName, description: projectDescription } = answers;
      contents = template(contents, { projectName, projectDescription });

      const writePath = path.join(CURR_DIR, projectPath, file);
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.join(CURR_DIR, projectPath, file));

      // recursive call
      createDirectoryContents(
        path.join(templatePath, file),
        path.join(projectPath, file),
        config,
        answers
      );
    }
  });
}
