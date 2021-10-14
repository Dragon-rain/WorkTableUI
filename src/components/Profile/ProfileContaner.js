import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { Logout, changeProfilePicture, getUserPostsCount } from '../../redux/profile-reducer'
import { compose } from 'redux';
import { withRouter } from 'react-router';

class ProfileComponent extends React.Component {

    componentDidMount() {
        this.props.getUserPostsCount(this.props.user.userId)
    }

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
    user: state.profile,
    isFetching: state.profile.isFetching
})

export default compose(connect(mapStateToProps, {Logout, changeProfilePicture, getUserPostsCount}), withRouter)(ProfileComponent);