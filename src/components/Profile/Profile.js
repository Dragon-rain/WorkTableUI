import React from 'react'
import Style from './Profile.module.css'
import Preloader from '../common/Preloader/Preloader'
import Login from '../Login/Login'
import UserPhoto from '../../assets/images/user_generic2_black.png'



const Profile = ({user, changeProfilePicture, Logout, ...props}) => {

    const onMainPhotoSelected = (e) => {
        if(e.target.files[0]){
            changeProfilePicture(e.target.files[0])
        };
    }

    return (
        <div className={Style.profile}>
            <div className={Style.loginBlock}>
                {props.isFetching ? <Preloader/> : null}
                {props.isAuth 
                 ? <div>
                        <img className={Style.profilePhoto} alt="" src={user.profilePhoto || UserPhoto}/>
                        <div><input type={"file"} onChange={onMainPhotoSelected}/></div>
                        <div>{user.username} - <button onClick={Logout}>Log out</button></div>
                        <div>{user.firstName}</div>
                        <div>{user.lastName}</div>
                        <div>{user.gender}</div>
                        <div>{user.currentCity}</div>
                        <div>{user.age}</div>
                   </div>
                : <Login/>}
            </div>
        </div>
    )
}

export default Profile