
const Employee = require("./Employee");
// Engineer class extends the class of Employee gets name id and email from super Employee
class Engineer extends Employee {
    constructor(name,id,email,github) {
        super(name,id,email);
        this.github = github;
    }

    getGithub() {
        return this.github;
    };

    getRole() {
        return "Engineer";
    };
  
}

module.exports = Engineer;
