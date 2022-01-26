import { Grid } from '@material-ui/core';
import React, { Fragment } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import AdminRoute from '../../components/auth/AdminRoute';
import PrimaryAppBar from '../../components/AppBar';
import { SideBar } from '../../components/SideBar';
import { ManageUser } from './ManageUser'


export const ManageUserPage = () => {
    let { path } = useRouteMatch();

    return (
        <div >
            <PrimaryAppBar />
            <Grid container >
                <Grid xs={2}>
                    <SideBar />
                </Grid>
                <Grid xs={10}>
                    <Fragment>
                        <Switch>
                            <AdminRoute path={path} component={ManageUser} exact />
                        </Switch>
                    </Fragment>
                </Grid>
            </Grid>
        </div>

    )
}