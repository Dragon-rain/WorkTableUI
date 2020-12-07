import React from 'react'
import Style from './Profile.module.css'
import Preloader from '../common/Preloader/Preloader'
import Login from '../Login/Login'

const Profile = (props) => {
    return (
        <div className={Style.profile}>
            <div className={Style.loginBlock}>
                {props.isFetching ? <Preloader/> : null}
                {props.isAuth 
                 ? <div> {props.username} - <button onClick={props.Logout}>Log out</button></div>
                : <Login/>}
            </div>
            
        </div>
    )
}

export default Profile