import React from 'react' 
import { MainAPI } from '../../../api/api';
import Class from './Post.module.css'


class Post extends React.Component {

    state = {
        pictures: []
    }

    componentDidMount() {
        MainAPI.getPictures(this.props.post.name).then(
            response => {
                this.setState({pictures: response.data.pictures});
            }
        )
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
                    {this.state.pictures.map(p => (
                        <div key={p.path}><img key={p.path} src={p.path} alt=''/></div>
                    ))}
                </div>
            </div>
        )
    }
    
}

export default Post