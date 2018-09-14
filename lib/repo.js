const axios = require('axios');
const simpleGit = require('simple-git');
const chalk = require('chalk');
const GITHUB_API_BASE_URL = 'https://api.github.com/';

module.exports = {
    // Get the list of all user private repository
    getPrivateRepos: async (token) => {
        const repo_url = 'user/repos?type=private&access_token='
        const res = await axios.get(`${GITHUB_API_BASE_URL}` + repo_url + `${token}`)
        return await res;
    },
    // Clone and delete tehe repository
    cloneAndDelete: (repo_path) => {
        simpleGit.clone(repo_path)
            .then(() => console.log(chalk.green('Cloned')))
            .catch(err => console.log(chalk.red('Error in cloning the repository :(')))
    },
    // Delete the repository without cloning
    delete: () => {

    },
    // Make all the repository public
    public: () => {

    },
    // Make selected repositores public
    selectedPublic: () => {

    }
}