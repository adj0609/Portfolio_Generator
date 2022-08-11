const fs = require('fs');
const generatePage = require('./src/page-template.js');

const profileDataArgs = process.argv.slice(2);
const name = profileDataArgs[0];
const github = profileDataArgs[1];

  fs.writeFile('./index.html', generatePage('name', 'github'), err => {
    if (err) throw Error(err);

    console.log('Portfolio Complete! Check out index.html to see the output!');
  });
