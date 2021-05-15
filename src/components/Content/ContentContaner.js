import React from 'react'
import { connect } from 'react-redux';
import Content from './Content'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { requestPosts, addPost, addPicture } from '../../redux/content-reducer'



class ContentContaner extends React.Component {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.requestPosts(currentPage, pageSize);
    };

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.requestPosts(pageNumber, pageSize);
    };

    render() {
        return (
            <div>
                <Content totalPostsCount={this.props.totalPostsCount}
                    pageSize = {this.props.pageSize}
                    currentPage = {this.props.currentPage}
                    posts = {this.props.posts}
                    onPageChanged = {this.onPageChanged}
                    addPost = {this.props.addPost}
                    isAuth = {this.props.isAuth}
                    userId = {this.props.userId}
                    message = {this.props.message}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    posts: state.contentPage.posts,
    pageSize: state.contentPage.pageSize,
    totalPostsCount: state.contentPage.totalPostsNumber,
    currentPage: state.contentPage.currentPage,
    isFetching: state.contentPage.faisFetchinglse,
    message: state.message.message,
    userId: state.profile.userId,
    isAuth: state.profile.isAuth
})

export default compose(connect(mapStateToProps, {requestPosts, addPost, addPicture}), withRouter)(ContentContaner)