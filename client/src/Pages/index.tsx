import React, { Fragment, useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// import PrivateRoute from '../components/auth/PrivateRoute';
import AdminRoute from '../components/auth/AdminRoute';
// import { PaymentPage } from './payment/index'
import { SigninPage } from './signin/index'
// import { FleetPage } from './fleetDetail/index'
// import { LiveOperationstPage } from './liveOperations/index'
// import { HelpPage } from './help/index'
// import { DashboardPage } from './dashboard/index'
import { AddUserPage } from './addUser/index'
// import { UploadCsvPage } from './uploadCsv/index'
// import { SelectUsersPage } from './selectUser/index'
import { ManageUserPage } from './manageUser/index'
// import { RatingPage } from './rating/index'
// import { TicketPage } from './ticket/index'
import { useIsFetching } from 'react-query'
import '../../src/App.css';
// import { ForgetPassword } from './signin/ForgetPassword';
// import { ResetPassword } from './signin/ResetPassword';
// import { FirstTimeLogin } from './signin/FirstTimeLogin';
// import isAuth from '../components/auth/IsAuth';
import { Redirect, useHistory } from 'react-router';
// import { logout } from '../utils/auth';

export const Index = () => {
    let history = useHistory();
    const reload = () => {
        // eslint-disable-next-line no-restricted-globals
        location?.reload()
    }
    console.log('query', useIsFetching());
    if (useIsFetching() !== 0) {
        if ((document as any).getElementById("cover-spin"))
            (document as any).getElementById("cover-spin").style.display = "block";
    } else {
        if ((document as any).getElementById("cover-spin"))
            (document as any).getElementById("cover-spin").style.display = "none";
    }
    return (
        <div >

            <div id="cover-spin"></div>
            <Router>
                <Fragment>
                    <>

                        <Switch>
                                <>
                                    <Route path="/" exact component={SigninPage} />
                                    {/* <Route path={`/forget_password`} component={ForgetPassword} />
                                    <Route path={`/reset_password/:email/:otp`} component={ResetPassword} />
                                    <Route path={`/first_time_login/:email/:otp`} component={FirstTimeLogin} />
                                    <PrivateRoute path="/dashboard" component={DashboardPage} />
                                    <PrivateRoute path="/fleet_details" component={FleetPage} />
                                    <PrivateRoute path="/live_Operations" component={LiveOperationstPage} />
                                    <PrivateRoute path="/help" component={HelpPage} />
                                    <PrivateRoute path="/payment" component={PaymentPage} />
                                    <PrivateRoute path="/select_user" component={SelectUsersPage} />
                                    <PrivateRoute path="/ratings" component={RatingPage} />
                                    <PrivateRoute path="/ticket" component={TicketPage} /> */}
                                    <AdminRoute path="/add_User" component={AddUserPage} />
                                    {/* <AdminRoute path="/upload_csv" component={UploadCsvPage} /> */}
                                    <AdminRoute path="/manage_users" component={ManageUserPage} />
                                </>
                            
                        </Switch>


                    </>
                </Fragment>
            </Router>
        </div>
    )
}
