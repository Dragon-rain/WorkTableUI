import React, { useState } from 'react'
import style from './AddPostFormModal.module.css'


const AddPostForm = ({addPost, togleIsClose, userId, addPicture}) => {

    const [title, setTitle] = useState('')
    const [decsription, setDecsription] = useState('')
    const [type, setType] = useState("other")
    const [files, setFiles] = useState([])

    const changeTitle = (e) => {
        setTitle(e.target.value);
    }
    const changeDescription = (e) => {
        setDecsription(e.target.value);
    }
    const changeType = (e) => {
        setType(e.target.value);
    }
    const changePictures = (e) => {
        setFiles(e.target.files);
    }
    const sendData = async () => {
        await addPost(type, title, decsription, userId);
        await addPicture(files);
        togleIsClose();
    }

    return (
            <div >
                <input type='text' name='title' value={title} onChange={changeTitle}/><br/>
                <textarea name='decsription' value={decsription} onChange={changeDescription}/><br/>
                <select name='type' defaultValue={type} onChange={changeType}>
                    <option value="other">Choose type</option>
                    <option value="work">Work</option>
                    <option value="trade">Trade</option>
                    <option value="service">Service</option>
                    <option value="rent">Rent</option>
                    <option value="other">Other</option>
                </select><br/>
                <input type='file' name='files' onChange={changePictures} multiple/><br/>
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
                    <h1>Post</h1>
                    <AddPostForm userId={props.userId} addPost={props.addPost} togleIsClose={togleIsClose}/>
                </div>
            </div>)}
        </div>
    )
    
}

export default AddPostFormModal;