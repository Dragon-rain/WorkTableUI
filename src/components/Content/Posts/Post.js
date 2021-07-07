import React from 'react' 
import { MainAPI } from '../../../api/api';
import { time_ago } from '../../../utils/utils';
import Class from './Post.module.css'

class Post extends React.Component {

    state = {
        pictures: []
    }

    findPictures() {
        MainAPI.getPictures(this.props.post.name).then(
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
            <div className={Class.item}> 
                <div>
                    <h2>{this.props.post.title}</h2>
                </div>
                <div>
                    <span>Type: {this.props.post.type}</span>
                </div>
                <div>
                    <span>{this.props.post.description}</span>
                </div>
                <div>
                    <span>{this.props.post.cityname}</span>
                </div>
                <div>
                    <span>{this.props.post.district? this.props.post.district.districtName: ""}</span>
                </div>
                <div>
                    {this.state.pictures.map(p => (
                        <div key={p.path}><img key={p.path} src={p.path} alt=''/></div>
                    ))}
                </div>
                <div>
                    <span>{time_ago(this.props.post.created)}</span>
                </div>
            </div>
        )
    }
    
}

export default Post