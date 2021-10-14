import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import { compose } from 'redux';
import store from './redux/redux-store';
import { WithSuspence } from './components/Hok/WithSuspence';
import ContentContaner from './components/Content/ContentContaner';
import { getCityList, getDistrictsList } from './redux/content-reducer';
let Registration = React.lazy(() => import('./components/Registration/Registration'));
let ProfileContaner = React.lazy(() => import('./components/Profile/ProfileContaner'));
let Login = React.lazy(() => import('./components/Login/Login'));
let SearchBarContaner = React.lazy(() => import('./components/SearchBar/SearchBarContaner'));
let postDetailsContaner = React.lazy(() => import('./components/Content/PostDetails/postDetailsContaner'));

class App extends Component {

  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    console.log(promiseRejectionEvent);
  };

  componentDidMount() {
    this.props.initializeApp();
    this.props.getCityList();
    this.props.getDistrictsList();
    //window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
   // window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  render() {
    if(!this.props.initialized) {
      return <Preloader/>
    }

    return (
      
        <div className='app-wraper'>
          <div className='app-wraper-nav'>
            <Route path='/:userId?' render={WithSuspence(SearchBarContaner)}/>
          </div>
          <div className='app-wraper-content'>
            <Route exact path='/:userId?' render={WithSuspence(ContentContaner)}/>
            <Route path='/post-details/:id?' render={WithSuspence(postDetailsContaner)}/>
          </div>
          <div className='app-wraper-profile'>
            {this.props.isAuth ? <Route path='/' render={WithSuspence(ProfileContaner)}/> : <Route 
            path='/' render={WithSuspence(Login)}/> }
            <Route path='/registration' render={WithSuspence(Registration)}/>
          </div>
        </div>
      
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  isAuth: state.profile.isAuth
})

let AppContaner = compose(withRouter,connect(mapStateToProps, {initializeApp, getCityList, getDistrictsList}))(App);

const WorkTableApp = (props) => {
  return <BrowserRouter>
            <Provider store={store}>
              <AppContaner/>
            </Provider>
         </BrowserRouter>
}

export default WorkTableApp