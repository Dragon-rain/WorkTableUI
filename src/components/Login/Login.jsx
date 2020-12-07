import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { required } from '../../utils/validators/validators'
import { CreateField, Input, CreateCheckBox } from '../common/FormsControl/Forms-control'
import { NavLink, Redirect } from 'react-router-dom'
import Style from '../common/FormsControl/Forms-control.module.css'
import { compose } from 'redux'
import { login } from '../../redux/profile-reduser'

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
            <form onSubmit={handleSubmit}>
                {CreateField("text", "username", 'Email', Input, [required])}
                {CreateField("password", "password", 'Password', Input, [required])}
                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl && CreateField("text", "captcha", 'Symbols from image', Input, [required])}
                {error && <div className = {Style.form_summary_error}>
                    {error}
                </div>}
                <div>
                    <button type='submit'>Login</button>
                </div>
            </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const OnSubmit = (formData) => {
        props.login(formData.username, formData.password, formData.captcha)
    }

    if(props.isAuth) { 
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={Style.loginForm}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={OnSubmit} captchaUrl={props.captchaUrl}/>
            <div className={Style.registrationButton}>
                <NavLink to='/registration'> Registration </NavLink>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    captchaUrl: state.profile.captchaUrl,
    isAuth: state.profile.isAuth
})

export default compose(connect(mapStateToProps, {login}))(Login);