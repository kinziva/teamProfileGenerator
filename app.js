
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamMembers = [];

let manager;
// This info is for the HTML.
let teamName;

//Regex variables for input validation
// const emailCk = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
// const idNumCk = /^[0-9]*$/;

//Initializing function that creates the team manager
function managerQuestion() {
    console.log("Please answer Manager questions?")

    inquirer.prompt([
        {   //get teamName input.
            type: "input",
            message: "What is the name of the team?",
            name: "teamName"
        },
        {
        
            type: "input",
            message: "What is the name of the manager?",
            // name: "name",
            name: "managerName",

            validate: (name) => {
                if (!name  || name.length === 0) {
                    console.log("\nPlease type the whole name");
                } else {
                    return true;
                };
            }
        },
        {
            type: "input",
            message: "What is your ID?",
            name: "id",
            validate: (id) => {
                if (!id || id.length === 0 ) {
                    console.log("\nPlease enter whole ID");
                } else {
                    return true;
                };
            }
        },
        {
            type: "input",
            message: "What is the your email?",
            name: "email",
            validate: (email) => {
                if (!email || email.length === 0 ) {
                    console.log("\nPlease enter complete email");
                } else {
                  
                    return true;
                };
            }
        },
        {
            type: "input",
            message:"What is the manager's office number?",
            name: "officeNumber",
            validate: (officeNumber) => {
                if (!officeNumber || officeNumber.length === 0) {
                    console.log("\nEnter the complete office Number.");
                  
                } else {
                    return true;
                };
            }
        }
    ]).then(function(managerAnswers) {
        manager = new Manager(managerAnswers.managerName, managerAnswers.id, managerAnswers.email, managerAnswers.officeNumber);
        teamMembers.push(manager);
        teamName = managerAnswers.teamName;
        console.log("Please answer employee questions?")
        addTeamMembers();
    });
};
//question to ask to add a team member or quit
function addTeamMembers() {
    inquirer.prompt([{
        type: "list",
        message: "Would you like to add a team member?If Yes: Select which role, if No: Select Quit",
        choices: ["Engineer", "Intern", "Quit."],
        name: "team"
    }

]).then(function(answers) {
        switch (answers.team) {
            case "Engineer":
                createEmployee("Engineer")
                break;
            case "Intern":
                createEmployee("Intern")
                break;
            default:
                renderTeam();
        }
    });
};

function createEmployee(role) {
    console.log("Please enter information about this employee");
    inquirer.prompt([{
            type: "input",
            message:  "What is the employee's name?",
            name: "name",
            validate: (name) => {
                if (!name || name.length === 0 ) {
                    console.log("\nPlease enter the name of the employee:");
                } else {
                    return true;
                };
            }
        },
        {
            type: "input",
            message:  "What is the employee's id?",
            name: "id",
            validate: (id) => {
                if (!id || id.length === 0 ) {
                    console.log("\nPlease enter whole ID");
                } else {
                    return true;
                };
            }
        },
        {
            type: "input",
            message:  "What is the employee's email?",
            name: "email",
            validate: (email) => {
                if (!email || email.length === 0 ) {
                    console.log("\nPlease enter complete email");
                } else {
                  
                    return true;
                };
            }
        },
        {
            type: "input",
            message: "What is the Engineer's Github?",
            name: "github",
            when: role === "Engineer"
        },
        {
            type: "input",
            message: "What's the Intern's school?",
            name: "school",
            when:  role === "Intern"
        }
    ]).then(function(answers) {

        if (role=== "Intern") {
            // const employee = new Intern(answers.name, answers.id, answers.email, answers.school);
            // teamMembers.push(employee);
            teamMembers.push(new Intern(answers.name, answers.id, answers.email, answers.school));

        } else if (role=== "Engineer") {
            // A different way of pushing the info into allTeam array.
            teamMembers.push(new Engineer(answers.name, answers.id, answers.email, answers.github));
        }
        addTeamMembers();
    });
};




//Renders the team roster.
function renderTeam() {
    //Checks if an output folder exists and if not, creates one.
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    //Calls the render function with teamMembers passed to write to an html file.
    fs.writeFile(outputPath, render(teamMembers), function(err) {
        if (err) throw err;
        console.log("Your employee list has been generated!");
    });
};

//Initializes the managerQuestion function in the terminal to being process of inputting info for  the team roster.
managerQuestion();

