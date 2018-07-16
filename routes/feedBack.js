const feedBackController = require('./../controllers/feedBack.ctrl');


module.exports = (router) => {

    router.get('/feedback',(req,res)=>{
        feedBackController.getAll(req,res);
    });

    router.get('/feedback/:id',(req,res)=>{
        console.log("api getById");
        feedBackController.getById(req,res);
    });

    router.post("/feedback-save", (req, res) => {
        console.log("api save");
        console.log(req.body);
        //res.status(200).json();
        feedBackController.save(req, res);
    });

    router.delete('/feedback/:id',(req,res)=>{
        console.log("api remove");
        feedBackController.remove(req,res);
    });

    router.put('/feedback',(req,res)=>{
        console.log("api update");
        feedBackController.update(req,res);
    });

}


