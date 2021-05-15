import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
 
let mapStateToPropsforRedirect = (state) => ({
    isAuth: state.profile.isAuth
})

export const WithAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if(!this.props.isAuth) return <Redirect to = {"/"}/>
            return <Component {...this.props}/>
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsforRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent;
} 

export const WithAuthRedirectLogedIn = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if(this.props.isAuth) return <Redirect to = {"/"}/>
            return <Component {...this.props}/>
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsforRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent;
} 