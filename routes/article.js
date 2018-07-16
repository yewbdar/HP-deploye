const articlecontroller = require('./../controllers/article.ctrl');


module.exports = (router) => {

    /**
     * get all articles
     */
    router
        .route('/articles')
        .get(articlecontroller.getAll);

}