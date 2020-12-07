import React from 'react'
import { connect } from 'react-redux';
import Content from './Content'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { requestPosts } from '../../redux/content-reducer'



class ContentContaner extends React.Component {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.requestPosts(currentPage, pageSize);
        /*UsersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
            });*/
    };

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.requestPosts(pageNumber, pageSize);
    
    };

    render() {
        if(this.props.message) {
            return <div>
                <h1>{this.props.message}</h1>
            </div>
        }
        return <Content totalPostsCount={this.props.totalPostsCount}
                        pageSize = {this.props.pageSize}
                        currentPage = {this.props.currentPage}
                        posts = {this.props.posts}
                        onPageChanged = {this.onPageChanged}/>
    }
}
let mapStateToProps = (state) => ({
    posts: state.contentPage.posts,
    pageSize: state.contentPage.pageSize,
    totalPostsCount: state.contentPage.totalPostsCount,
    currentPage: state.contentPage.currentPage,
    isFetching: state.contentPage.faisFetchinglse,
    message: state.contentPage.message
})

export default compose(connect(mapStateToProps, {requestPosts}), withRouter)(ContentContaner)