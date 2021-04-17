import './App.css';
import Home from './containers/Home/Home';
import React, { useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import Blogs from './containers/Blogs/Blogs';
import Signin from './containers/SignIn/Signin';
import Signup from './containers/SignUp/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { isUserLoggedIn } from "./actions";
import { useDispatch, useSelector } from 'react-redux';
import CreateBlog from './containers/CreateBlog/CreateBlog';
import AdminRoute from './components/HOC/AdminRoute';

function App() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!auth.authenticate)
      dispatch(isUserLoggedIn())
  }, []);


  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <PrivateRoute path="/blogs" component={Blogs} />
        <AdminRoute path="/createblog" component={CreateBlog} />

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </>
  );
}

export default App;
