import React, { useState } from 'react' 
import Class from './Post.module.css'


const Post = ({post}) => {
    return(
        <div className={Class.item}> 
            <div>
                <h2>{post.title}</h2>
            </div>
            <div>
                <span>Type: {post.type}</span>
            </div>
            <div>
                <span>{post.discription}</span>
            </div>
        </div>
    )
}

export default Post