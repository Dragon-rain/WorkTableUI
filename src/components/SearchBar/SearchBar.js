import React from 'react'
import Logo from '../../assets/images/Logo-1.png'
import Style from './SearchBar.module.css'
import SearchBarReduxForm from './SearchBarForm'

const SearchBar = (props) => {

  return(
    <div className={Style.searhBar}>
      <div className={Style.contentWraper}>
        <div className={Style.logo}>
          <img src={Logo}/>
          <h2>Work Table</h2>
        </div>
        <div>
          <SearchBarReduxForm requestPosts={props.requestPosts} 
                              getDistrictsListByCityId={props.getDistrictsListByCityId} 
                              citylist={props.citylist} 
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
        </div>
      </div>
    </div>
  )
}

export default SearchBar