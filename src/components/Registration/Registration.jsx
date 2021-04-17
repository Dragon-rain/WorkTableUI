import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { CreateField, Input, CreateCheckBox } from '../common/FormsControl/Forms-control'
import { Redirect } from 'react-router-dom'
import Style from '../common/FormsControl/Forms-control.module.css'
import { registration } from '../../redux/profile-reducer'

const RegistrationForm = ({handleSubmit, error, captchaUrl}) => {
    return (
            <form onSubmit={handleSubmit}>
                {CreateField("email", "username", 'Email', Input, [required, maxLengthCreator(50)])}
                {CreateField("password", "password", 'Password', Input, [required])}
                {CreateField("password", "null", 'Repeat Password', Input, [required])}
                {CreateField("text", "firstName", 'Your first name', Input, [required])}
                {CreateField("text", "lastName", 'Your last name', Input, [required])}
                {CreateField("number", "age", 'Your age', Input, [required])}
                {CreateField("radio", "gender", null, Input, null, {value: 'man'}, "Man")}
                {CreateField("radio", "gender", null, Input, null, {value: 'woman'}, "Woman")}
                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl && CreateField("text", "captcha", 'Symbols from image', Input, [required])}
                {error && <div className={Style.form_summary_error}> {error} </div>}
                <div>
                    <button type='submit'>Registration</button>
                </div>
            </form>
    )
}

const RegistrationReduxForm = reduxForm({form: 'RegistrationForm'})(RegistrationForm)

const Registration = (props) => {
    const OnSubmit = (formData) => {
        props.registration(formData.username, formData.password, formData.firstName, formData.lastName, formData.age, formData.gender)
    }

    if(props.isAuth) { 
        return <Redirect to={'/'}/>
    }

    return (
        <div className={Style.loginForm}>
            <h1>Registration</h1>
            <RegistrationReduxForm onSubmit={OnSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    captchaUrl: state.profile.captchaUrl,
    isAuth: state.profile.isAuth
})

export default connect(mapStateToProps, {registration})(Registration);