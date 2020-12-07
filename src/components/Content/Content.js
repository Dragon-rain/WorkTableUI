import React, { useState } from 'react';
import Paginator from '../common/Paginator/Paginator';
import Class from './Content.module.css';
import Post from './Posts/Post';

const Content = ({totalPostsCount, pageSize, currentPage, onPageChanged, posts, ...props}) => {

    return (
        <div className={Class.content}>
          <Paginator totalItemsCount={totalPostsCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged}/>
            {posts.map(p => (
                <Post key={p.id} post={p}/>
            ))}
        </div>
    )
}

export default Content