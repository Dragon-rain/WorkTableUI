import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { time_ago } from '../../../utils/utils';
import  style  from './postDetails.module.css'
import deleteIcon from '../../../assets/images/trash.png'
import edit from '../../../assets/images/edit.png'
import back from '../../../assets/images/left-arrow.png'
import EditePicture from './Picture-part';

const PostDetails = ({post, ...props}) => {

    const [editMode, setEditMode] = useState(false)
    const [districts, setDistricts] = useState([])
    const [files, setFiles] = useState([])
    const [deletePictureList, setdeletePictureList] = useState([])

    const [id, setId] = useState(post.id)
    const [title, setTitle] = useState(post.title)
    const [description, setDescription] = useState(post.description)
    const [type, setType] = useState(post.type)
    const [cityId, setCityId] = useState(post.cityId)
    const [districtId, setDistrictId] = useState(0)
    const [pictures, setPictures] = useState(props.pictures)

    useEffect(() => {
        setTitle(post.title)
        setDescription(post.description)
        setType(post.type)
        setPictures(props.pictures)
        setId(post.id)
        if(post.cityId) {
            setCityId(post.cityId)
            setDistricts(props.getDistrictsListByCityId(post.cityId))
        }
        if(post.district) {
            setDistrictId(post.district.id)
        }
        console.log("setPictures")
        
    }, [post, props.pictures])

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
        let id = e.target.value
        setCityId(id)
        setDistricts(props.getDistrictsListByCityId(id))
        if(id==="0") {
            setDistrictId(0)
            console.log("district id changed ", districtId)
        }
    }

    const changeDistrict = (e) => {
        setDistrictId(e.target.value);
    }

    const allPosts = () => {
        props.requestPosts(1, 10, "null", "null", "null", "null")
    }

    const userPosts = () => {
        if(props.isAuth) {
            props.requestPosts(1, 10, "null", "null", "null", "null", props.userId)
        }
    }

    const editModeTogle = () => {
        setId(post.id)
        setEditMode(true)
    }

    const editModeClose = () => {
        setEditMode(false)
        setdeletePictureList([])
        props.returnPictures()
    }

    const changePictures = (e) => {
        console.log()
        setFiles(e.target.files);
    }

    const sendData = () => {
        let now = new Date().toLocaleString()
        let post = {id, title, description, type, cityId, districtId, updated: now}
        props.saveEdited(post, files)
        editModeClose()
    }

    const addToDelete = (pictureId) => {
        deletePictureList.push(pictureId)
        props.deletePictures(deletePictureList)
    }

    const deletePost = () => {
        if(window.confirm("Delete Post?")) {
            props.deletePost(id)
        }
    }

    return (
        <div className={style.postContaner}>
            <div className={style.pannel}>
                <span onClick={props.returnPage}><img src={back} alt="" /></span>
                {props.isMyPost && <span>
                    {!editMode&& <span onClick={editModeTogle}>
                        <img src={edit} alt="" />
                    </span>}
                    <span onClick={deletePost}>
                        <img src={deleteIcon} alt="" />
                    </span>
                </span>}
                <span onClick={allPosts}>
                    <NavLink to={'/'}>All posts</NavLink>
                </span>
                {props.isAuth &&<span>
                                    <span onClick={userPosts}>
                                        <NavLink to={'/'+props.userId}>Your posts: {props.userPostsCount}</NavLink>
                                    </span>
                                </span>}
            </div>
                                
            {!editMode

            ?<div className={style.post}>
                <div className={style.title}>
                    <h2>{title}</h2>
                </div>
                <div className={style.info}>
                    <span>{time_ago(post.created)}</span>
                    <span>Type: {type}</span>
                    <span>{post.cityname}</span>
                    <span>{post.district? post.district.districtName: ""}</span>
                </div>
                <div className={style.description}>
                    <span>{description}</span>
                </div>
                <div className={style.pictures}>
                    {props.pictures.map(p => (
                        <span key={p.path}><img key={p.path} src={p.path} alt=''/></span>
                    ))}
                </div>
            </div>

            :<div className={style.post}>
                <div>
                    <label>Title:</label><br/>
                    <input type='text' name='title' maxLength={60} value={title} onChange={changeTitle}/>
                </div>
                <div>
                    <label>Description:</label><br/>
                    <textarea  name='description' maxLength={2000} value={description} onChange={changeDescription}/>
                </div>
                <div>
                    <label>Type: </label> 
                    <select name='type' defaultValue={type} onChange={changeType}>
                        <option key={1} value="other">Choose type</option>
                        <option key={2} value="work">Work</option>
                        <option key={3} value="trade">Trade</option>
                        <option key={4} value="service">Service</option>
                        <option key={5} value="rent">Rent</option>
                        <option key={6} value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label>City: </label> 
                    <select name='city' defaultValue={cityId} onChange={changeCity}>
                        <option key="10000" value={0} >Choose city</option>
                        {props.cityList.map(city => (
                            <option value={city.id} key={city.id}>{city.cityName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>District: </label> 
                    <select name='district' defaultValue={districtId} onChange={changeDistrict}>
                        {cityId!=='' && cityId? <option value={0} key={0}>Choose district</option>: <option value={0} key={0} >Choose city first</option>}
                        {cityId!=='' && cityId? districts.map(district => (
                            <option value={district.id} key={district.id}>{district.districtName}</option>
                        )): <option value={0} key={districts.length+1}>Choose city first</option>}
                    </select>
                </div>
                <EditePicture addToDelete={addToDelete} pictures={pictures}/>
                <div>
                    <input type='file' name='files' onChange={changePictures} multiple/>
                </div>
                <div>
                    <span>
                        <button onClick={sendData}>Save</button>
                    </span>
                    <span>
                        <button onClick={editModeClose}>Close</button>
                    </span>
                </div>
            </div>}
        </div>
    )
}

export default PostDetails