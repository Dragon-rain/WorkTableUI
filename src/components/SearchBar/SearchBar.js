import React from 'react'
import { NavLink } from 'react-router-dom'
import Style from './SearchBar.module.css'
import SearchBarReduxForm from './SearchBarForm'

const SearchBar = (props) => {

  return(
    <div className={Style.searhBar}>
      <div className={Style.contentWraper}>
        <div className={Style.form}>
          <SearchBarReduxForm requestPosts={props.requestPosts} 
                              getDistrictsListByCityId={props.getDistrictsListByCityId} 
                              citylist={props.citylist} 
                              pageSize={props.pageSize}
                              searchComplete={props.searchComplete}
                              setKeyword={props.setKeyword}
                              setType={props.setType}
                              setCityId={props.setCityId}
                              setDistrictId={props.setDistrictId}
                              keyword={props.keyword}
                              type={props.type}
                              cityId={props.cityId}
                              districtId={props.districtId}
                              currentPage={props.currentPage}
                              userId={props.userId}/>
        </div>
      </div>
    </div>
  )
}

export default SearchBar