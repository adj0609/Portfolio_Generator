const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template');
//
//const pagedHTML = generatePage('name', 'github');
//
//fs.writeFile('./index.html', pageHTML,  err => {
//    if (err) throw err;
//
//    console.log('Portfolio Complete! Check out index.html to see the output!');
//  });

const promptUser = () => {
    return inquirer.prompt([
        {
        Type: 'input',
        name: 'name',
        message: 'What is your name? (required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
                } else {
                    console.log('Please enter a valid name');
                    return false;
            }
        }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub username (Required)',
            validate: githubInput => {
                if (gitHubInput) {
                    return true;
                    } else {
                        console.log('Please enter your GitHub username');
                        return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmabout',
            message: 'Would you like to enter some information about yourself for and "about" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => confirmAbout
        }
    ]);  
};

const promptProject = portfolioData => {
    console.log(`
    ==============
    Add a New Project
    ==============
    `);

    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                    } else {
                        console.log('You need to enter a project name!');
                        return false;
                    }
                }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                    } else {
                        console.log('YOu need to enter a project descrioption!');
                        return false;
                    }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What landguage did you use for this project? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
            },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the Github link to your project. (Required)',
            validate: LinkInput => {
                if (LinkInput) {
                    return true;
                    } else {
                        console.log('You need to enter a project GitHub Link!');
                        return false
                    }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to add another project?',
            default: false
        }
    ])
.then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
        } else {
            return portfolioData;
    }
    });
};

promptuser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });
