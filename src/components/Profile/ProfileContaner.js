import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { Logout } from '../../redux/profile-reducer'

class ProfileComponent extends React.Component {

    render() {
        return (
            <>
                <Profile {...this.props}/>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.profile.isAuth,
    username: state.profile.username,
    isFetching: state.profile.isFetching
})

export default connect(mapStateToProps, {Logout})(ProfileComponent);