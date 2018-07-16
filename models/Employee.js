const mongoose = require('mongoose');

let EmployeeSchema = new mongoose.Schema(
    {
        firstName : String,
        lastName : String,
        position : String,
        account : { userName : String , password : String }
    });
module.exports = mongoose.model('employee', EmployeeSchema);