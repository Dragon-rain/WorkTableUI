import React, { useState } from 'react'
import Style from './SearchBar.module.css'

const SearchBarForm = (props) => {

    const [districtlist, setDistrictlist] = useState([])

    const {userId, pageSize, keyword, type, cityId, districtId} = props;

    const changeType = (e) => {
        props.setType(e.target.value);
    }

    const onCityChange = (e) => {
        let id = e.target.value
        props.setCityId(id)
        setDistrictlist(props.getDistrictsListByCityId(id))
        if(id==="0") {
            props.setDistrictId(0)
        }
        console.log(e.target.value)
    }

    const changeKeyword = (e) => {
        props.setKeyword(e.target.value);
    }

    const changeDistrict = (e) => {
        props.setDistrictId(e.target.value);
        
    }

    const sendData = async () => {
        if(keyword==="") {
            props.setKeyword("null")
        }
        if(userId) {
            await props.requestPosts(1, pageSize, keyword, type, cityId, districtId, userId)
        } else {
            await props.requestPosts(1, pageSize, keyword, type, cityId, districtId)
        }

    }

    return (
        <div className={Style.searchForm}>
            <div>
                <label>Search</label>
                <input name='keyword' type='text' placeholder='keyword' onChange={changeKeyword}/>
            </div>
            <div>
                <label>Type: </label>
                <select name='type' defaultValue={type} onChange={changeType}>
                    <option key="1" value="null">Choose type</option>
                    <option key="2" value="work">Work</option>
                    <option key="3" value="trade">Trade</option>
                    <option key="4" value="service">Service</option>
                    <option key="5" value="rent">Rent</option>
                    <option key="6" value="other">Other</option>
                </select>
            </div>
            <div>
                <label>City: </label> 
                <select name='city' onChange={onCityChange}>
                    <option value={0}>Choose city</option>
                    {props.citylist.map(city => (
                        <option value={city.id} key={city.id}>{city.cityName}</option>
                     ))}
                </select>
            </div>
            <div>
                <label>District: </label> 
                <select name='district' onChange={changeDistrict}>
                    {cityId === 0 || cityId === null? <option value={0}>Choose city first</option>: <option value={0}>Choose district</option>}
                    {cityId !== 0 && cityId !== null? districtlist.map(district => (
                        <option value={district.id} key={district.id}>{district.districtName}</option>
                    )): <option value={0}>Choose city first</option>}
                </select>
            </div>
            <button onClick={sendData}>Search</button>
        </div>
    )
}

export default SearchBarForm