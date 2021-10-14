import React from 'react' 
import { NavLink } from 'react-router-dom';
import { MainAPI } from '../../../api/api';
import { time_ago } from '../../../utils/utils';
import Class from './Post.module.css'

class Post extends React.Component {

    state = {
        pictures: []
    }

    findPictures() {
        MainAPI.getPictures(this.props.post.id).then(
            response => {
                this.setState({pictures: response.data.pictures});
            }
        )
    }

    componentDidMount() {
        this.findPictures()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.pictures.length !== prevState.pictures.length) {
            this.findPictures()
        }
        
    }
    
    
    render() {
        return(
            <div className={Class.postContaner}> 
                <div className={Class.title}>
                    <NavLink to={'/post-details/'+this.props.post.id}><h2>{this.props.post.title}</h2></NavLink>
                </div>
                <div className={Class.info}>
                    <span>{time_ago(this.props.post.created)}</span>
                    <span>Type: {this.props.post.type}</span>
                    <span>{this.props.post.cityname}</span>
                    <span>{this.props.post.district? this.props.post.district.districtName: ""}</span>
                </div>
                <div className={Class.description}>
                    <span>{this.props.post.description}</span>
                </div>
                {this.state.pictures.length !== 0 ?
                <div className={Class.pictures}>
                    {this.state.pictures.map(p => (
                        <span key={p.path}><img key={p.path} src={p.path} alt=''/></span>
                    ))}
                </div>: <div></div>}
                <div className={Class.readMore}>
                    <NavLink to={'/post-details/'+this.props.post.id}>Read more</NavLink>
                </div>
            </div>
        )
    }
    
}

export default Post