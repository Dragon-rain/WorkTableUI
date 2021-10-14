import React from 'react';
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { compose } from "redux"
import { MainAPI, UserApi } from "../../../api/api"
import { getPostById, requestPosts, saveEditedPost, deletePost } from '../../../redux/content-reducer'
import PostDetails from "./postDetails"

class PostDetailsContaner extends React.Component {

    state = {
        isMyPost: false,
        pictures: [],
        deletePicturesList: []
    }

    async getPost () {
        await this.props.getPostById(this.props.match.params.id)
        if(this.props.userId === this.props.post.userId) {
            this.setState({isMyPost: true});
        }
        this.requestPictures(this.props.post.id)
    }

    componentDidMount() {
        this.getPost()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.post.updated !== this.props.post.updated&&prevProps.post.updated!==undefined) {
            this.getPost()
        }
    }

    requestPictures (id) {
        MainAPI.getPictures(id).then(
            response => {
                this.setState({pictures: response.data.pictures});
            }
        )
    }

    deletePictures = (deletePictureList) => {
        let pictures = this.state.pictures;
        deletePictureList.map(dp => {
            for(let i = 0; i < pictures.length; i++){ 
                if ( pictures[i].id === dp) { 
                    pictures.splice(i, 1); 
                    i--; 
                }
                
            }
        })
        this.setState({deletePicturesList: deletePictureList})
    }

    getDistrictsListByCityId = (cityId) => {
        let districtsListByCityId = this.props.districtsList.filter(district => {if(district.city_id == cityId) return district})
        return districtsListByCityId;
    }

    returnPage = () => {
        this.props.history.go(-1)
    }

    saveEdited = (post, files) => {
        this.props.saveEditedPost(post, files)
        if(this.state.deletePicturesList.length !==0 ) {
            UserApi.deletePictures(this.state.deletePicturesList)
        }
    }

    deletePost = (postId) => {
        this.props.deletePost(postId)
        this.returnPage()
    }

    returnPictures = () => {
        this.getPost()
    }

    render () {
        console.log('rerender in PostDetailsContaner')
        return (
                <PostDetails post={this.props.post}
                             isMyPost={this.state.isMyPost}
                             pictures={this.state.pictures}
                             getDistrictsListByCityId={this.getDistrictsListByCityId}
                             cityList = {this.props.cityList}
                             requestPosts = {this.props.requestPosts}
                             isAuth={this.props.isAuth}
                             userId={this.props.userId}
                             saveEdited={this.saveEdited}
                             returnPage={this.returnPage}
                             deletePictures={this.deletePictures}
                             deletePost={this.deletePost}
                             returnPictures={this.returnPictures}
                             userPostsCount={this.props.userPostsCount}/>
        )
    }
}

const mapStateToProps = (state) => ({
    post: state.contentPage.post,
    userId: state.profile.userId,
    isAuth: state.profile.isAuth,
    cityList: state.contentPage.cityList,
    userId: state.profile.userId,
    userPostsCount: state.profile.userPostsCount,
    districtsList: state.contentPage.districtsList
})

export default compose(connect(mapStateToProps, {getPostById, requestPosts, saveEditedPost, deletePost}), withRouter)(PostDetailsContaner)