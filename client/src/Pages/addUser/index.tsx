import React, { Fragment } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import { AddUser } from './AddUser'
import PrimaryAppBar from '../../components/AppBar';
import { Grid } from '@material-ui/core';
import { SideBar } from '../../components/SideBar';

export const AddUserPage = () => {
    let { path } = useRouteMatch();

    return (
        <div>
            <PrimaryAppBar />
            <Grid container >
                <Grid xs={2}>
                    <SideBar />
                </Grid>
                <Grid xs={10}>
                    <Fragment>
                        <Switch>
                            <Route path={path} component={AddUser} exact></Route>
                        </Switch>
                    </Fragment>
                </Grid>
            </Grid>
        </div>

    )
}


