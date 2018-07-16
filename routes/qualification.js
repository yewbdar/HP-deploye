const QualificationController = require('./../controllers/qualification.ctrl');
module.exports = (router) => {
    router.get('/qualification',(req,res)=>{
        QualificationController.getAll(req,res);
    });
    router.get('/qualification/:id',(req,res)=>{
        QualificationController.getById(req,res);
    });
    router.post("/qualification", (req, res) => {
        console.log(req.body);
        QualificationController.create(req, res);
    });

};