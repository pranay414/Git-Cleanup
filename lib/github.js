const octokit = require('@octokit/rest')();
const Configstore = require('configstore');
const _ = require('lodash');
const CLI = require('clui');
const Spinner = CLI.Spinner;

const pkg = require('../package.json');
const inquirer = require('./inquirer');

const conf = new Configstore(pkg.name);

module.exports = {
    // Get octokit instance from Github API
    getInstance: () => {
        return octokit
    },

    // Access stored Github token
    getStoredGithubToken: () => {
        return conf.get('github.token');
    },

    // Access store owner_name
    getStoredUserName: () => {
        return conf.get('github.owner_name');
    },

    // Authenticate with Github
    setGithubCredentials: async () => {
        const credentials = await inquirer.askGithubCredentials();
        conf.set('github.owner_name', credentials.username)
        octokit.authenticate(
            _.extend({
                type: 'basic',
            }, credentials)
        );
    },

    // Register new token
    regsiterNewToken: async () => {
        const status = new Spinner('Authenticating you, please wait..');
        status.start();

        try {
            const response = await octokit.authorization.create({
                scopes: ['user', 'repo', 'delete_repo'],
                note: 'gitcleanup, the command-line tool for cleaning private Git repos'
            });

            const token = response.data.token;

            if(token) {
                conf.set('github.token', token)
                return token;
            }
            else {
                throw new Error('Missing Token', 'GitHub token was not found in the response');
            }
        }

        catch(err) {
            throw(err);
        }

        finally {
            status.stop();
        }
    }
}