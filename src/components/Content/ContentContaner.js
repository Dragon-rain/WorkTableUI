import React from 'react'
import { connect } from 'react-redux';
import Content from './Content'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { requestPosts, addPost, getCityList, getDistrictsList } from '../../redux/content-reducer'



class ContentContaner extends React.Component {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.requestPosts(currentPage, pageSize);
        
    };

    onPageChanged = (pageNumber) => {
        const {pageSize, keyword, type, cityId, districtId} = this.props;
        this.props.requestPosts(pageNumber, pageSize, keyword, type, cityId, districtId);
    };

    getDistrictsListByCityId = (cityId) => {
        let districtsListByCityId = this.props.districtsList.filter(district => {if(district.city_id == cityId) return district})
        return districtsListByCityId;
    }

    getCityById = (cityId) => {
        const city = this.props.cityList.find(citys => {if(citys.id === cityId) return citys})
        console.log(city)
        return city;
    }

    render() {
        return (
            <div>
                <Content totalPostsCount={this.props.totalPostsCount}
                    pageSize = {this.props.pageSize}
                    currentPage = {this.props.currentPage}
                    posts = {this.props.posts}
                    onPageChanged = {this.onPageChanged}
                    getDistrictsListByCityId = {this.getDistrictsListByCityId}
                    getCityById = {this.getCityById}
                    addPost = {this.props.addPost}
                    isAuth = {this.props.isAuth}
                    cityList = {this.props.cityList}
                    districtsList = {this.props.districtsList}
                    userId = {this.props.userId}
                    message = {this.props.message}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    posts: state.contentPage.posts,
    totalPostsCount: state.contentPage.totalPostsNumber,
    pageSize: state.contentPage.pageSize,
    currentPage: state.contentPage.currentPage,
    isFetching: state.contentPage.faisFetchinglse,
    message: state.message.message,
    userId: state.profile.userId,
    isAuth: state.profile.isAuth,
    cityList: state.contentPage.cityList,
    districtsList: state.contentPage.districtsList,
    keyword: state.contentPage.keyword,
    type: state.contentPage.type,
    cityId: state.contentPage.cityId,
    districtId: state.contentPage.districtId
})

export default compose(connect(mapStateToProps, {requestPosts, addPost, getCityList, getDistrictsList}), withRouter)(ContentContaner)