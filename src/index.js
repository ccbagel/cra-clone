#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { ncp } = require("ncp");
const { version } = require("../package.json");

if(process.argv.length > 3) {
    return printHelp();
}
if(process.argv[2] === '-h' || process.argv[2] === '--help') {
    return printHelp();
}

// let folderName = process.argv[2];
copyTemplate(process.argv[2])


function copyTemplate(folderName) {
    console.log(`*** Creating a new React App in ./${folderName} `);
    console.log("Step 1 of 2: Copying template ...");

    ncp(path.resolve(__dirname, "../template/"), `./${folderName}`, err => {
        if(err) {
            return console.error("!!! Error copying templates :", err);
        }

        console.log("Step 1 of 2: DONE!");
        installDependencies(folderName);
    })
}

function installDependencies(folderName) {
    console.log("Step 2 of 2: Installing dependencies");

    exec(`cd ./${folderName} && npm install`, err => {
        if(err) {
            return console.error("Error installing dependencies :", err);
        }
        
        console.log("Step 2 of 2: DONE!");
        console.log(`cd ${folderName}`);
        console.log("Run npm start");
    });

}

function printHelp() {
    console.log(`/------------Hasan Ahmed/ccbagel-react-app version ${version}------------/`);
    console.log("\n");
    console.log(" ---> ccbagel-react-app my-app");
    console.log("\n");
    console.log(" ------> copy & install dependencies in *my-app* folder");
    console.log("\n");
    console.log(" ---> ccbagel-react-app -h | --help");
    console.log("\n");
    console.log("---> print helper instructions");
}