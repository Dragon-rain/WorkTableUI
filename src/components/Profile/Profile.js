import React from 'react'
import Style from './Profile.module.css'
import Preloader from '../common/Preloader/Preloader'
import Login from '../Login/Login'
import UserPhoto from '../../assets/images/user_generic2_black.png'



const Profile = ({user, changeProfilePicture, Logout, ...props}) => {

    const onMainPhotoSelected = (e) => {
        if(e.target.files[0]){
            changeProfilePicture(user.userId, e.target.files[0])
        };
    }

    const onLogout = () => {
        props.history.push('/')
        Logout()
    }

    return (
        <div className={Style.profile}>
            <div className={Style.loginBlock}>
                {props.isFetching ? <Preloader/> : null}
                {props.isAuth 
                 ? <div className={Style.profileInfo}>
                        <div>Welcome {user.firstName} {user.lastName}</div>
                        <div className={Style.profilePhoto}>
                            <img  alt="" src={user.profilePhoto || UserPhoto}/>
                            <div className={Style.uploadField}>
                                <label>Change picture:</label>
                                <input type={"file"} accept={"image/*"} onChange={onMainPhotoSelected}/>
                            </div>
                        </div>
                        <div>
                            <button onClick={onLogout}>Log out</button>
                        </div>
                   </div>
                : <Login/>}
            </div>
        </div>
    )
}

export default Profile