import React, { useEffect, useState } from 'react'
import style from './AddPostFormModal.module.css'


const AddPostForm = ({addPost, togleIsClose, userId, cityList, districtsList, ...props}) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState("other")
    const [files, setFiles] = useState([])
    const [citys, setCitys] = useState([cityList])
    const [districts, setDistricts] = useState([districtsList])
    const[cityId, setCityId] = useState('')
    const[districtId, setDistrictId] = useState('')

    const changeTitle = (e) => {
        setTitle(e.target.value);
    }
    const changeDescription = (e) => {
        setDescription(e.target.value);
    }
    const changeType = (e) => {
        setType(e.target.value);

    }

    const changeCity = (e) => {
        const getDistrictsListByCityId = props.getDistrictsListByCityId(e.target.value)
        setDistricts(getDistrictsListByCityId)
        setCityId(e.target.value);
    }

    const changeDistrict = (e) => {
        setDistrictId(e.target.value);
    }

    const changePictures = (e) => {
        console.log()
        setFiles(e.target.files);
    }
    const sendData = () => {
        addPost(type, title, description, userId, cityId, districtId, files);
        togleIsClose();
    }

    useEffect(()=> {
        setCitys(cityList)
    }, [cityList])

    useEffect(()=> {
        setDistricts(districtsList)
    }, [districtsList])

    return (
            <div className={style.modal_form}>
                <h1>Post</h1>
                <div>
                    <label>Title:</label><br/>
                    <input type='text' name='title' value={title} onChange={changeTitle}/>
                </div>
                <div>
                    <label>Description:</label><br/>
                    <textarea  name='description' value={description} onChange={changeDescription}/>
                </div>
                <div>
                    <label>Type: </label> 
                    <select name='type' defaultValue={type} onChange={changeType}>
                        <option key="1" value="other">Choose type</option>
                        <option key="2" value="work">Work</option>
                        <option key="3" value="trade">Trade</option>
                        <option key="4" value="service">Service</option>
                        <option key="5" value="rent">Rent</option>
                        <option key="6" value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label>City: </label> 
                    <select name='city' defaultValue="null" onChange={changeCity}>
                        <option key="1" value="null">Choose city</option>
                        {citys.map(city => (
                            <option value={city.id} key={city.id}>{city.cityName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>District: </label> 
                    <select key="1" name='district' defaultValue="null" onChange={changeDistrict}>
                        {cityId!=='null' && cityId? <option value="null">Choose district</option>: <option value="null">Choose city first</option>}
                        {cityId!=='null' && cityId? districts.map(district => (
                            <option value={district.id} key={district.id}>{district.districtName}</option>
                        )): <option value="null">Choose city first</option>}
                    </select>
                </div>
                <div>
                    <input type='file' name='files' onChange={changePictures} multiple/>
                </div>
                <div>
                    <button onClick={sendData}>Add</button> 
                    <button onClick={togleIsClose}>Close</button>
                </div>
            </div>
    )
}


const AddPostFormModal = (props) => {

    const [isOpen, setIsOpen] = useState(false)

    const togleIsOpen = () => {
        setIsOpen(true);
    }

    const togleIsClose = () => {
        setIsOpen(false);
    }

    return (
        <div>
            <button onClick={togleIsOpen}>Add Post</button>         
            {isOpen && (<div className={style.modal}>
                <div className={style.modal_body}>
                    <AddPostForm className={style.form_body} getDistrictsListByCityId = {props.getDistrictsListByCityId}
                                                             getCityById={props.getCityById} 
                                                             districtsList={props.districtsList} 
                                                             cityList={props.cityList} 
                                                             userId={props.userId} 
                                                             addPost={props.addPost} 
                                                             togleIsClose={togleIsClose}/>
                </div>
            </div>)}
        </div>
    )
    
}

export default AddPostFormModal;