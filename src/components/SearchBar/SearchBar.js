import React from 'react'
import Logo from '../../assets/images/Logo-1.png'
import Style from './SearchBar.module.css'

const SearchBar = (props) => {
    return(
        <div className={Style.searhBar}>
          <div className={Style.contentWraper}>
            <div className={Style.logo}>
              <img src={Logo} />
              <h2>Work Table</h2>
            </div>
            seach bar
          </div>
        </div>
    )
}

export default SearchBar