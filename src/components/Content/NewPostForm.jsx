import React from 'react'
import { reduxForm } from 'redux-form'
import { CreateField, Input, TextArea } from '../common/FormsControl/Forms-control'
import Class from './Content.module.css';
import style from '../common/FormsControl/Forms-control.module.css'



const NewPostForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <button>Save</button>
            {error && <div className = {style.form_summary_error}>
                {error}
            </div>}
            <div>
                <b>Full name: </b> {CreateField("text", "fullName", "Full name", Input, [], )}
            </div>
            <div>
                <b>Looking for a job: </b>
                {CreateField("checkbox", "lookingForAJob", "", Input, [], )}
            </div>
           <div>
                My professional skils: 
                {CreateField("text", "lookingForAJobDescription", "My professional skils", TextArea, [], )}
            </div>
            <div>
                <b>About Me: </b> 
                {CreateField("text", "aboutMe", "About Me", TextArea, [], )}
            </div>
            <div>
                <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className={Class.contact}>
                            <b>{key}: {CreateField("text", "contacts." + key, key, Input, [], )}</b>
                        </div>
                })}
            </div>
                
        </form>
    )
}

const NewPostReduxForm = reduxForm({form: 'edit-profile'})(NewPostForm)

export default ProfileReduxDataForm