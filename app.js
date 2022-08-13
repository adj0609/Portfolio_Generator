const inquirer = require('inquirer');
//const fs = require('fs');
//const generatePage = require('./src/page-template');
//
//const pageHTML = generatePage('name', 'github');
//
//fs.writeFile('./index.html', pageHTML,  err => {
//    if (err) throw err;
//
//    console.log('Portfolio Complete! Check out index.html to see the output!');
//  });

const promptUser =() => {
    return inquirer.prompt([
        {
        Type: 'input',
        name: 'name',
        message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your GitHub username?'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about you'
        }
    ]);  
};

const promptProject = portfolioData => {
    if (!portfolioData.projects) {
        portfolioData.projects =[];
    }
    console.log(`
    ==============
    Add a New Project
    ==============
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the Github link to your project. (Required)'
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
    ]);
};

promptUser()
.then(promptProject)
.then(portfolioData => {
    console.log(portfolioData);
})
.then(promptProject)
.then(projectAnswers => console.log(projectAnswers))
.then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
        } else {
            return portfolioData;
    }
});