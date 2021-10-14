import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/images/Logo-1.png'
import Style from './SearchBar.module.css'
import SearchBarReduxForm from './SearchBarForm'

const SearchBar = (props) => {

  return(
    <div className={Style.searhBar}>
      <div className={Style.contentWraper}>
        <div className={Style.logo}>
          <NavLink to={'/'}>
            <span><img src={Logo}/></span>
            <span><h2>Work Table</h2></span>
          </NavLink>
        </div>
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