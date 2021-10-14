import style from './postDetails.module.css'
import cross from '../../../assets/images/cancel.png'


const Picture = ({p, ...props}) => {

    const add = () => {
        props.addToDelete(p.id)
    }

    return <span className={style.picturesItem} key={p.path+p.id}>
                <span className={style.picture} key={p.path}><img key={p.path} src={p.path} alt=''/></span>
                <span className={style.cross} key={p.id}><img onClick={add} src={cross} alt="" /></span>
            </span>
}

const EditePicture = (props) => {

    return (
        <div className={style.editePictures}>
                    {props.pictures.map(p => <Picture addToDelete={props.addToDelete} key={p.id} p={p}/>)}
        </div>
        
    )
}

export default EditePicture