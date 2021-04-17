import React from 'react';
import { Redirect, Route } from "react-router-dom";

const AdminRoute = ({component: Component, ...rest}) => {
    return <Route {...rest} component={(props) => {
        const token = window.localStorage.getItem('token');
        let role=null;
        if(window.localStorage.getItem('user'))
        role = JSON.parse(window.localStorage.getItem('user')).role;
        if (token && role==='admin') 
        {
            return <Component {...props} />
        }
        else
        {
            return <Redirect to={`/signin`} />
        }
    }} />
}

export default AdminRoute;