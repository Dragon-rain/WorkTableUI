import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import AddPostFormModal from './AddPostFormModal/AddPostFormModal';
import style from './Content.module.css';
import Post from './Posts/Post';

const Content = ({totalPostsCount, pageSize, currentPage, onPageChanged, posts, addPost, message, addPicture, ...props}) => {

    return (
        <div className={style.contener}>
            <div>
                {props.isAuth && <div className={style.addPostButtom}><AddPostFormModal addPicture={addPicture} addPost={addPost} userId={props.userId}/></div>}
            </div>
            {message 
            ? <h1>{message}</h1> 
            : <div>
                <div className={style.paginator}>
                    <Paginator totalItemsCount={totalPostsCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged}/>
                </div>
                <div>
                    {posts.map(p => (
                        <Post key={p.id} post={p}/>
                    ))}
                </div>
            </div>}
        </div>
    )
    
}

export default Content