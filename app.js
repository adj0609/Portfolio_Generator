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
        }
    ]);
};

promptUser().then(answers => console.log(answers));
