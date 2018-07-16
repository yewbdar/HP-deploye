 const positioncontroller = require('./../controllers/position.ctrl');


module.exports = (router) => {

    router.get('/position',(req,res)=>{
        positioncontroller.getAll(req,res);

    });
    router.get('/getActiveInActivePositions',(req,res)=>{
        positioncontroller.getActiveInActivePositions(req,res);
    });
    router.post("/position", (req, res) => {
        positioncontroller.create(req, res);
    });
    router.get('/position/:id',(req,res)=>{
        positioncontroller.getById(req,res);
    });
    router.delete('/position/:id',(req,res)=>{
        positioncontroller.remove(req,res);
    });

    router.put('/position',(req,res)=>{
        console.log("api update");
        positioncontroller.update(req,res);
    });
}