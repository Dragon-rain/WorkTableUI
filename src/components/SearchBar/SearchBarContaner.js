import React from 'react'
import { connect } from 'react-redux'
import SearchBar from './SearchBar'
import { requestPosts, setKeyword, setType, setCityId, setDistrictId } from '../../redux/content-reducer'

const SearchBarContaner = (props) => {

    const getDistrictsListByCityId = (cityId) => {
      let districtsListByCityId = props.districtlist.filter(district => {if(district.city_id == cityId) return district})
      return districtsListByCityId;
    }

    return <SearchBar getDistrictsListByCityId={getDistrictsListByCityId}
                      citylist={props.citylist}
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
                      currentPage={props.currentPage}/>
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


export default connect(mapStateToProps, {requestPosts, setKeyword, setType, setCityId, setDistrictId})(SearchBarContaner);