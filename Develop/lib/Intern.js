const Employee = require("./Employee");
// Intern class extends the class of Employee gets name id and email from super Employee

class Intern extends Employee {
    constructor(name,id,email,school,) {
        super(name,id,email);
        this.school = school;
    }

    getSchool() {
        return this.school;
    };

    getRole() {
        return "Intern";
    };
  
}

module.exports = Intern;