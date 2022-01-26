import React, { Fragment } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import { SignIn } from './Signin'

export const SigninPage = () => {
    let { path } = useRouteMatch();

    return (
        <div >
            <Fragment>
                <Switch>
                    <Route path={path} component={SignIn} exact />
                </Switch>
            </Fragment>
        </div>

    )
}