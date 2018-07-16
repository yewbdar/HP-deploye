const fileUploadController = require('./../controllers/fileUpload.ctrl');


module.exports = (router) => {

    /**
     * upload File
     */
    router
        .route('/upload')
        .post(fileUploadController.uploadFile);

}