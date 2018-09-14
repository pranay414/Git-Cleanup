const axios = require('axios');
const GITHUB_API_BASE_URL = 'https://api.github.com/';

module.exports = {
    // Get the list of all user private repos
    getPrivateRepos: async (token) => {
        const repo_url = 'user/repos?type=private&access_token='
        const res = await axios.get(`${GITHUB_API_BASE_URL}` + repo_url + `${token}`)
        return await res;
    },
    cloneAndDelete: () => {

    },
    delete: () => {

    },
    public: () => {

    },
    selectedPublic: () => {

    }
}