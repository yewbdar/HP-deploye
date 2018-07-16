const loginController = require('./../controllers/login.ctrl');


module.exports = (router) => {

    /**
     * upload File
     */
    router
        .route('/login')
        .post(loginController.login);
    router
        .route('/validateLogin')
        .get(loginController.validateLogin);
    router
        .route('/currentUser')
        .get(loginController.currentUser);
    router
        .route('/logout')
        .get(loginController.logout);


};