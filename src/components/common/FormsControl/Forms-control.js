import React from 'react'
import { Field } from 'redux-form';
import Style from './Forms-control.module.css'

const FormControl = ({input, meta: {touched, error}, children}) => {

    const HasError = touched && error;

    return(
        <div className={Style.form_control + " " + (HasError? Style.error : "" )}>
            <div>
                {children}
            </div>
            {HasError && <span>{error}</span>}
        </div>
    )
}

export const TextArea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}> <textarea {...input} {...restProps}/> </FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl  {...props}> <input  {...input} {...restProps}/> </FormControl>
}

export const InputDisableAutoComplete = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl  {...props}> <input autoComplete='new-password' {...input} {...restProps}/> </FormControl>
}

export const SelectCity = (props) => {
    const {input, meta, child, ...restProps} = props;
    
    return <FormControl {...props}> 
        <select {...input} {...restProps} >
            <option value="" hidden>Choose city</option>
            <option value="null" hidden>Not in Korea</option>
            {restProps.citylist.map(city => (
                <option value={city.cityName} key={city.id}>{city.cityName}</option>
            ))}
        </select>
    </FormControl>
}

export const SelectDistrict = (props) => {
    const {input, meta, child, cityId, districtlist, ...restProps} = props;
    return <FormControl {...props}> 
        <select {...input} {...restProps}>
            {cityId!=='null' && cityId? <option value="null">Choose district</option>: <option value="null">Choose city first</option>}
            {cityId!=='null' && cityId? districtlist.map(district => (
                <option value={district.id} key={district.id}>{district.districtName}</option>
            )): <option value="null">Choose city first</option>}
        </select>
    </FormControl>
}

export const CreateField = (type, name, placeholder, component, validators, props = {}, text = "") => (
    <div>
        <Field type={type} name={name} placeholder={placeholder} component={component} validate={validators} {...props}/> {text}
    </div>
)