import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArticles } from './../redux/actions/actions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Grid from './common/Grid';


class ArticleView extends Component {
    componentDidMount() {
        //after component loads bring data
        this.props.getArticles();
     }
     handleOpen=(articleId)=>{
        console.log(articleId);
     };
    handleGiveReview=(event)=>{

    };
    handleAction=(event) =>{
        let clicked = event.target.getAttribute("name");
        let articleId = event.target.getAttribute("data-article-id");
        switch (clicked) {
            case "Open" :
                this.handleOpen(articleId);
                break;
            default :
                break;
        };

    }

    render() {
        return (
                <div>
                    {/* this is for displaying data in Pretty format of json , WE CANT show Object in one JSX Node*/}
                    {/*<pre>{JSON.stringify(this.props.articles.articles, null, 2) }</pre>*/}
                    <Grid
                        dataset={this.props.articles.articles}
                        header={["ID#","Title","Text","Action"]}
                        headerMapping={["id","title","text"]}
                        actionNames={["Open", "Give Review"]}
                        handleAction = {this.handleAction}

                    />
                </div>
        );
    }
}

ArticleView.propTypes = {
    articles: PropTypes.object
};
function mapStateToProps(state) {
    return { articles : state.articles }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getArticles }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleView)
