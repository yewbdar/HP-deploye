const user = require('./user')
const article = require('./article');
const position=require('./position');
const sample=require('./sample');
const feedBack=require('./feedBack');
const candidate=require('./candidate');
const employee = require('./employee');
const fileUploadSample = require('./fileUploadSample');
const login = require('./login');
const qualification = require("./qualification");


module.exports = (router) => {
    user(router);
    article(router);
    position(router);
    sample(router);
    feedBack(router);
    candidate(router);
    qualification(router);
    employee(router);
    fileUploadSample(router);
    login(router);



};
