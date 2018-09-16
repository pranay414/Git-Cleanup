const axios = require('axios');
const git = require('simple-git')();
const chalk = require('chalk');
const fs = require('fs');
const GITHUB_API_BASE_URL = 'https://api.github.com/';

module.exports = {
    // Get the list of all user private repository
    getPrivateRepos: async (token) => {
        const repo_url = 'user/repos?type=private&access_token='
        let res = await axios.get(`${GITHUB_API_BASE_URL}` + repo_url + `${token}`)
        // Extract repo name and id from response
        res = res.data.map((repo) => {
            return {
                id: repo.id,
                name: repo.name,
                repo_url: repo.html_url
            }
        })
        return await res;
    },

    // Clone and delete the repository
    cloneAndDelete: async (repo_details) => {
        // Check if directory `cloned` exists or not
        if (!fs.existsSync('cloned')) {
            console.log(chalk.blue('Creating directory ./cloned'))
            fs.mkdirSync('cloned')
        }
        let cloned_dir = process.cwd() + '/cloned/'

        // Clone and delete every private repository on Github
        for (repo of repo_details) {
            console.log(chalk.cyan(`Cloning repository: ${repo.name}`))

            if (fs.existsSync(cloned_dir + repo.name)) {
                console.log(chalk.red('Cloned repository already exists!'))
                console.log(chalk.red('Skipping...'))
            }
            else {
                await git.silent(true).clone(repo.repo_url, cloned_dir + repo.name)
                console.log(chalk.green(`Repository ${repo.name} cloned successfully!`))
            }
        }
    },

    // Delete the repository without cloning
    delete: async (owner_name, repo_details, token) => {
        const repo_url = `repos/${owner_name}/`
        for (repo of repo_details) {
            console.log(chalk.cyan(`Deleting repository ${repo.name}..`))
            await axios.delete(`${GITHUB_API_BASE_URL}` + repo_url + repo.name + `?access_token=${token}`)
            console.log(chalk.green(`Repository ${repo.name} successfully deleted!`))
        }
    },

    // Make all the repository public
    public: async (owner_name, repo_details, token) => {
        const repo_url = `repos/${owner_name}/`
        for (repo of repo_details) {
            console.log(chalk.cyan(`Making repository ${repo.name} public..`))
            await axios.patch(`${GITHUB_API_BASE_URL}` + repo_url + repo.name + `?access_token=${token}`, { name: repo.name, private: "false" })
            console.log(chalk.green(`Repository: ${repo.name} made public!`))
        }
    },

    // Make selected repositores public
    /* selectedPublic: () => {

    } */
}