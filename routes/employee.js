const EmployeeController = require('./../controllers/employee.ctrl');
module.exports = (router) => {

    router.get('/employees',(req,res)=>{
        EmployeeController.getAll(req,res);
    });

    router.get('/employee/:id',(req,res)=>{
        console.log("api getById");
        EmployeeController.getById(req,res);
    });

    router.post("/employee", (req, res) => {
        console.log("api creating employee");
        console.log(req.body);
        EmployeeController.create(req, res);
        //created Employee
        //res.status(201).json();
    });

    router.delete('/employee/:id',(req,res)=>{
        console.log("api delete");
        EmployeeController.delete(req,res);
    });

    router.put('/employee/:id',(req,res)=>{
        console.log("api update");
        EmployeeController.update(req,res);
    });


}