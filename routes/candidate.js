const CandidateController = require('./../controllers/candidate.ctrl');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000,
        files: 1
    }
})
module.exports = (router) => {

    router.get('/candidates',(req,res)=>{
        CandidateController.getAll(req,res);
    });
    router.get('/candidates-position',(req,res)=>{
        console.log("api getAllByPosition");
        CandidateController.getAllByPosition(req,res);
    });

    router.get('/candidate',(req,res)=>{
        CandidateController.getById(req,res);
    });
    router.get('/candidate-feedback',(req,res)=>{
        CandidateController.getByIdFeedback(req,res);
    });

    router.get('/candidate-passed',(req,res)=>{
        CandidateController.getAllPassedByPosition(req,res);
    });
    router.get("/candidateResumeById", (req, res) => {
        CandidateController.getResumeById(req, res);
    });
    router.post("/candidate",upload.single('file'), (req, res) => {
        CandidateController.create(req, res);
    });
    router.delete('/candidate/:id',(req,res)=>{
        console.log("api remove");
        CandidateController.remove(req,res);
    });

    router.put('/candidate' ,(req,res)=>{
        console.log("api update");
        CandidateController.update(req,res);
    });


    router.put('/addfeedback' ,(req,res)=>{
        console.log("api update");
        CandidateController.addFeedbackForPosition(req,res);
    });
    router.put('/apply' ,(req,res)=>{
        console.log("api update");
        CandidateController.applyForPosition(req,res);
    });


    router.post('/candidate/register',(req,res)=>{
        console.log(req.file);
        CandidateController.registerAccount(req,res);
    });
    router.route('/candidate/:candidateId/appliedPositions')
        .get(CandidateController.getAppliedPositions)
        .post(CandidateController.newCandidateApplication)

}