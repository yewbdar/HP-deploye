const sampleController = require('./../controllers/sample.ctrl');


module.exports = (router) => {

    /**
     * get all articles
     */
    router
        .route('/samples')
        .get(sampleController.getAll);

}