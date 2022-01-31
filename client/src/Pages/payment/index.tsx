import React, { Fragment } from 'react'
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import { GeneratePayment } from './GeneratePayment'
import { PaymentList } from './PaymentList'
import PrimaryAppBar from '../../components/AppBar';
import { Grid } from '@material-ui/core';
import { SideBar } from '../../components/SideBar';

export const PaymentPage = () => {
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
                            <Route path={path} component={PaymentList} exact></Route>
                            <Route path={`${path}/generate/`} component={GeneratePayment} />
                        </Switch>
                    </Fragment>
                </Grid>
            </Grid>
        </div>

    )
}


