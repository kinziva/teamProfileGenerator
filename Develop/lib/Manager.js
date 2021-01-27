const Employee = require("./Employee")
// Manager class extends the class of Employee gets name id and email from super Employee

class Manager extends Employee {
    constructor(name,id,email,officeNumber) {
        super(name,id,email)
        this.officeNumber = officeNumber;
    }

    getRole() {
        return "Manager";
    };

    getOfficeNumber() {
        return this.officeNumber;
    };
  
}

module.exports = Manager;