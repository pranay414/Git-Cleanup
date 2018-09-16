const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');
const CLI = require('clui');
const Spinner = CLI.Spinner;

const inquirer = require('./lib/inquirer');
const github = require('./lib/github');
const repo = require('./lib/repo');

const status = new Spinner('Loading repos, please wait..');

// Clear the screen and
// display banner text 'Git CleanUp'
clear();
console.log(
    chalk.yellow(
        figlet.textSync('Git Cleanup', { horizontalLayout: 'full', kerning: 'full' })
    ));

// Ask for user's Github credentials
const run = async () => {
    let token = github.getStoredGithubToken()
    let owner_name = github.getStoredUserName()
    
    if (!token) {
        await github.setGithubCredentials()
        token = await github.regsiterNewToken()
        owner_name = github.getStoredUserName()
    }

    status.start();
    let repos = await repo.getPrivateRepos(token)

    if (repos === null) {
        console.log(chalk.red(`No private repos found!`))
    }
    else {
        status.stop();
        let action = await inquirer.askUserActions();
        if (action.option === 'Clone and delete all the private repos') {
            repo.cloneAndDelete(repos, token);
        }
        // Extremely dangerous, use with caution!
        else if(action.option === 'Delete all the private repos without cloning') {
            repo.delete(owner_name, repos, token);
        }
        else if(action.option === 'Make all private repos public') {
            repo.public(owner_name, repos, token);
        }
        else if(action.option === 'Make selected private repos public') {
            console.log('making selected public')
        }
    }
}

// Run the script
run();
