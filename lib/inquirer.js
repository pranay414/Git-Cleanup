const inquirer = require('inquirer');

module.exports = {
    askGithubCredentials: () => {
        const questions = [
            {
                name: 'username',
                type: 'input',
                message: 'Enter your Github username or e-mail address:-',
                validate: (value) => {
                    if (value.length) {
                        return true;
                    }
                    else {
                        return 'Please enter a valid username or e-mail address';
                    }
                }
            },
            {
                name: 'password',
                type: 'password',
                message: 'Please enter your password:-',
                validate: (value) => {
                    if(value.length) {
                        return true;
                    }
                    else {
                        return 'Please enter a valid password';
                    }
                }
            }
        ]

        return inquirer.prompt(questions);
    },

    askUserActions: () => {
        const questions = [
            {
                name: 'option',
                type: 'rawlist',
                message: 'What do you want to do?',
                choices: ['Clone all the private repos', 'Delete all the private repos without cloning', 'Make all private repos public', 'Quit']
            }
        ]

        return inquirer.prompt(questions);
    }
}