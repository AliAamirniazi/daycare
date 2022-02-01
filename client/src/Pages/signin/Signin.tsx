import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Image from '../../assets/signin.png'; // Import using relative path
import logo from '../../assets/Swvl-Logo.png';
import { Link } from 'react-router-dom';
import { useCreateLogin } from '../../resources/useCreateLogin'
import { Redirect } from "react-router-dom";
import { isLogin, isAdmin, isTeacher } from '../../utils/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export const SignIn = () => {
  const classes = useStyles();
  const mutation = useCreateLogin()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Grid container component="main" className={`${classes.root} loginPage `}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={` login-image ${classes.image}`} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={` login-acc-div ${classes.paper}`}>
          <img src={logo} alt="" className="signinlogo" />
          <div className="title1">
            Login Into Your Account

          </div>
          <p className="wellcome">
            Welcome! Please login into your account
          </p>
          <form className={classes.form} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
            <div>
              {mutation.isLoading ? (
                'loging in...'
              ) : (
                <>
                  {mutation.isError ? (
                    <div>An error occurred: {mutation.error}</div>
                  ) : null}

                  { mutation.isSuccess && mutation.data?.data.status === 1 ? (isLogin() && isAdmin() ? <div> <Redirect to='/users' /></div> : (isLogin() && isTeacher() ? <Redirect to='/assignedUser' /> : <Redirect to='/dashboard' />)) : <div>{mutation.data?.data.message}</div>}
                  <div className="signinbutton custom-btn">
                    <Link to='' onClick={() => {
                      mutation.mutate({ email: email.toLowerCase(), password: password })
                    }}><p className="signinbuttontext">Login</p></Link>
                  </div>
                </>
              )}
            </div>

          </form>
        </div>
      </Grid>
    </Grid>
  );
}