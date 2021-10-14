import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import AddPostFormModal from './AddPostFormModal/AddPostFormModal';
import style from './Content.module.css';
import Post from './Posts/Post';
import { NavLink } from 'react-router-dom';
import back from '../../assets/images/left-arrow.png'

const Content = ({totalPostsCount, pageSize, currentPage, onPageChanged, posts, addPost, message, getCityList, ...props}) => {

    const userPosts = () => {
        if(props.isAuth) {
            props.requestPosts(1, 10, "null", "null", "null", "null", props.userId)
        }
    }

    const allPosts = () => {
        props.requestPosts(1, 10, "null", "null", "null", "null")
    }

    return (
        <div className={style.contener}>
            <div className={style.contenerHead}>
                {message? <span> </span> : <span className={style.paginator}>
                                <Paginator totalItemsCount={totalPostsCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged}/>
                            </span>}

                

                {props.isAuth &&<span className={style.addPostPannel}>
                                    <span>
                                        <AddPostFormModal 
                                                      cityList={props.cityList} 
                                                      addPost={addPost} 
                                                      getDistrictsListByCityId = {props.getDistrictsListByCityId}
                                                      userId={props.userId}/>
                                    </span>
                                    <span onClick={userPosts}>
                                        <NavLink to={'/'+props.userId}>Your posts: {props.userPostsCount}</NavLink>
                                    </span>
                                    <span onClick={allPosts}>
                                        <NavLink to={'/'}>All posts</NavLink>
                                    </span>
                                </span>}
            </div>
            <div>
                {message 
                ? <h1>{message}</h1> 
                : <div>
                    <div>
                        {posts.map(p => (
                            <Post key={p.id} post={p}/>
                        ))}
                    </div>
                </div>}
            </div>
        </div>
    )
    
}

export default Content