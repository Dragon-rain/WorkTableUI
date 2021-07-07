import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { CreateField, Input, SelectCity, InputDisableAutoComplete } from '../common/FormsControl/Forms-control'
import Style from '../common/FormsControl/Forms-control.module.css'
import { registration } from '../../redux/profile-reducer'
import { getCityList } from '../../redux/content-reducer'
import { compose } from 'redux'
import { WithAuthRedirectLogedIn } from '../Hok/WithAuthRedirect'

const RegistrationForm = ({handleSubmit, error, captchaUrl, citylist}) => {
    
    return (
            <form onSubmit={handleSubmit}>
                {CreateField("email", "username", 'Email', InputDisableAutoComplete, [required, maxLengthCreator(50)])}
                {CreateField("password", "password", 'Password', InputDisableAutoComplete, [required])}
                {CreateField("password", "null", 'Repeat Password', Input, [required])}
                {CreateField("text", "firstName", 'Your first name', Input, [required])}
                {CreateField("text", "lastName", 'Your last name', Input, [required])}
                {CreateField("date", "dob", null, Input, [required])}
                {CreateField("radio", "gender", null, Input, [required], {value: 'man'}, "Man")}
                {CreateField("radio", "gender", null, Input, [required], {value: 'woman'}, "Woman")}
                {CreateField(null, "currentCity", null, SelectCity, null, {citylist: citylist})}
                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl && CreateField("text", "captcha", 'Symbols from image', Input, [required])}
                {error && alert(error)}
                <div>
                    <button type='submit'>Registration</button>
                </div>
            </form>
    )
}

const RegistrationReduxForm = reduxForm({form: 'registrationform'})(RegistrationForm)

const Registration = (props) => {

    const [citylist, setCitylist] = useState(props.citylist)

    useEffect(() => {
        props.getCityList();
    }, [citylist])

    const OnSubmit = (formData) => {
        props.registration(formData.username, formData.password, formData.firstName, formData.lastName, formData.dob, formData.gender, formData.currentCity)
    }

    return (
        <div className={Style.loginForm}>
            <h1>Registration</h1>
            <RegistrationReduxForm onSubmit={OnSubmit} captchaUrl={props.captchaUrl} citylist={props.citylist}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    captchaUrl: state.profile.captchaUrl,
    isAuth: state.profile.isAuth,
    citylist: state.contentPage.cityList
})

export default compose(connect(mapStateToProps, {registration, getCityList}), WithAuthRedirectLogedIn)(Registration);