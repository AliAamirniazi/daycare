import React, { Fragment } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import { AddChildren } from './AddChildren'
import { ChildrenDetail } from './ChildrenDetail'
import { ChildrenList } from './ChildrenList'
import PrimaryAppBar from '../../components/AppBar';
import { Grid } from '@material-ui/core';
import { SideBar } from '../../components/SideBar';

export const ChildrenPage = () => {
    let { path } = useRouteMatch();

    return (
        <div>
            <PrimaryAppBar />
            <Grid container >
                <Grid xs={2}>
                    <SideBar/>
                </Grid>
                <Grid xs={10}>
                    <Fragment>
                        <Switch>
                            <Route path={path} component={ChildrenList} exact></Route>
                            <Route path={`${path}/add/`} component={AddChildren} />
                            <Route path={`${path}/detail/:id`} component={ChildrenDetail} />
                        </Switch>
                    </Fragment>
                </Grid>
            </Grid>
        </div>

    )
}


