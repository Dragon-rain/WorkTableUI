import React from 'react'
import { connect } from 'react-redux'
import SearchBar from './SearchBar'
import { requestPosts, setKeyword, setType, setCityId, setDistrictId } from '../../redux/content-reducer'
import { compose } from 'redux'
import { withRouter } from 'react-router'

const SearchBarContaner = (props) => {

    const getDistrictsListByCityId = (cityId) => {
      let districtsListByCityId = props.districtlist.filter(district => {if(district.city_id == cityId) return district})
      return districtsListByCityId;
    }

    const searchComplete = () => {
      props.history.push('/')
    } 

    return <SearchBar getDistrictsListByCityId={getDistrictsListByCityId}
                      citylist={props.citylist}
                      searchComplete={searchComplete}
                      requestPosts={props.requestPosts}
                      pageSize={props.pageSize}
                      setKeyword={props.setKeyword}
                      setType={props.setType}
                      setCityId={props.setCityId}
                      setDistrictId={props.setDistrictId}
                      keyword={props.keyword}
                      type={props.type}
                      cityId={props.cityId}
                      districtId={props.districtId}
                      currentPage={props.currentPage}
                      userId={props.match.params.userId}/>
}

let mapStateToProps = (state) => ({
  citylist: state.contentPage.cityList,
  districtlist: state.contentPage.districtsList,
  pageSize: state.contentPage.pageSize,
  currentPage: state.contentPage.currentPage,
  keyword: state.contentPage.keyword,
  type: state.contentPage.type,
  cityId: state.contentPage.cityId,
  districtId: state.contentPage.districtId
})


export default compose(connect(mapStateToProps, {requestPosts, setKeyword, setType, setCityId, setDistrictId}), withRouter)(SearchBarContaner);