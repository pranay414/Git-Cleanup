const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');
const CLI = require('clui');
const Spinner = CLI.Spinner;

const inquirer = require('./lib/inquirer');
const github = require('./lib/github');
const repo = require('./lib/repo');

const status = new Spinner('Loading repos, please wait..')

// Clear the screen and
// display banner text 'Git CleanUp'
clear();
console.log(
    chalk.yellow(
        figlet.textSync('Git Cleanup', { horizontalLayout: 'full', kerning: 'full' })
    ));

// Ask for user's Github credentials
const run = async () => {
    let token = github.getStoredGithubToken();

    if (!token) {
        await github.setGithubCredentials();
        token = await github.regsiterNewToken();
    }

    status.start();
    let userResponse = await repo.getPrivateRepos(token);

    if (userResponse === null) {
        console.log(chalk.red(`No private repos found!`))
    }
    else {
        status.stop();
        let action = await inquirer.askUserActions();
        if (action.option === 'Clone and delete all the private repos') {
            console.log(userResponse)
        }
    }
}

// Run the script
run();
