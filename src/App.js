import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import SearchBarContaner from './components/SearchBar/SearchBarContaner';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import { compose } from 'redux';
import store from './redux/redux-store';
import { WithSuspence } from './components/Hok/WithSuspence';
import ContentContaner from './components/Content/ContentContaner';
let Registration = React.lazy(() => import('./components/Registration/Registration'));
let ProfileContaner = React.lazy(() => import('./components/Profile/ProfileContaner'));
let Login = React.lazy(() => import('./components/Login/Login'));

class App extends Component {

  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    console.log(promiseRejectionEvent);
  };

  componentDidMount() {
    this.props.initializeApp();
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
          <SearchBarContaner/>
          <div className='app-wraper-content'>
            <ContentContaner/>
          </div>
          <div className='app-wraper-profile'>
            {this.props.isAuth ? <Route exact path='/' render={WithSuspence(ProfileContaner)}/> : <Route exact path='/' render={WithSuspence(Login)}/> }
            <Route path='/registration' render={WithSuspence(Registration)}/>
            <Route path='/login' render={WithSuspence(Login)}/>
          </div>
        </div>
      
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  isAuth: state.profile.isAuth
})

let AppContaner = compose(withRouter,connect(mapStateToProps, {initializeApp}))(App);

const WorkTableApp = (props) => {
  return <BrowserRouter>
            <Provider store={store}>
              <AppContaner/>
            </Provider>
         </BrowserRouter>
}

export default WorkTableApp