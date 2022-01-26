import React, { useState, useEffect } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import Dashboard from '../assets/icon/Dashboard.png';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Bus from '../assets/icon/Fleet.png';
import Payment from '../assets/icon/SideBarPayment.png';
import Calander from '../assets/icon/SideCalander.png';
import Help from '../assets/icon/Help.png';
import { isLogin, isAdmin, isAgent } from '.././utils/auth';
import { NavLink, useHistory } from "react-router-dom";
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      zIndex: 0,
      backgroundColor: '#373D49'
      , height: '100%'

    },
  },
  textcolor: {
    color: "#ffffff"

  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      // width: `calc(100% - ${drawerWidth}px)`,
      // marginLeft: drawerWidth,
      backgroundColor: '#FFFFFF'

    },

  },
  avatar: {
    // marginLeft: '75%'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#373D49'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


export const SideBar = (props: any) => {

  const [name, setName] = useState('');
  const [selectedUser, setselectedUser] = useState(null);
  // let name: string | null | object = null
  const user_info = localStorage.getItem("user_info");

  useEffect(() => {
    if (user_info) {
      if (JSON.parse(user_info).name) {
        setName(JSON.parse(user_info).name)
      }
      if (JSON.parse(user_info).selected_user) {
        setselectedUser(JSON.parse(user_info).selected_user)
      }
    }

  }, [user_info])

  const { window } = props;
  const classes = useStyles();
  const { t, i18n } = useTranslation();



  const drawer = (
    <div>

      {(isLogin() && isAdmin() ?
        <List>
          <ListItem button component={NavLink} activeClassName="highlighted" to="/add_User">
            <ListItemIcon className={classes.textcolor}> <i className="fas fa-user-plus"></i></ListItemIcon>
            <ListItemText className={classes.textcolor} primary={t("Add users")} />
          </ListItem>
          <ListItem button component={NavLink} activeClassName="highlighted" to="/manage_users">
            <ListItemIcon className={classes.textcolor}> <i className="fas fa-users dashboardIcon"></i></ListItemIcon>
            <ListItemText className={classes.textcolor} primary={t("Manage Users")} />
          </ListItem>
          {/* <ListItem button component={NavLink} activeClassName="highlighted" to="/upload_csv">
            <ListItemIcon className={classes.textcolor}> <i className="fas fa-file-csv"></i></ListItemIcon>
            <ListItemText className={classes.textcolor} primary={'Upload CSV'} />
          </ListItem> */}
        </List> :
        <List>
          {/* <ListItem button component={NavLink} activeClassName="highlighted" to="/select_user">
              <ListItemIcon className={classes.textcolor}><i className="fas fa-users dashboardIcon"></i></ListItemIcon>
              <ListItemText className={classes.textcolor} primary={'Select User'} />
            </ListItem> */}
          <ListItem button component={NavLink} activeClassName="highlighted" to="/dashboard">
              <ListItemIcon className={classes.textcolor}><img src={Dashboard} alt="" /></ListItemIcon>
              <ListItemText className={classes.textcolor} primary={'Dashboard'} />
            </ListItem>
          {user_info ? JSON.parse(user_info).permission.some((permission: { [x: string]: string; }) => permission['permission'] === 'Fleet Details') ?
            <ListItem button component={NavLink} activeClassName="highlighted" to="/fleet_details">
              <ListItemIcon className={classes.textcolor}> <img src={Bus} alt="Dashboard Icon" className="dashboardIcon" /></ListItemIcon>
              <ListItemText className={classes.textcolor} primary={t('Fleet Details')} />
            </ListItem>
            :
            null
            :
            null
          }
          {user_info ? JSON.parse(user_info).permission.some((permission: { [x: string]: string; }) => permission['permission'] === 'Payments') ?
            <ListItem button component={NavLink} activeClassName="highlighted" to="/payment">
              <ListItemIcon className={classes.textcolor}> <img src={Payment} alt="Dashboard Icon" className="dashboardIcon" /></ListItemIcon>
              <ListItemText className={classes.textcolor} primary={t('Payments')} />
            </ListItem>
            :
            null
            :
            null
          }
          {user_info ? JSON.parse(user_info).permission.some((permission: { [x: string]: string; }) => permission['permission'] === 'Live Operations') ?
            <ListItem button component={NavLink} activeClassName="highlighted" to="/live_Operations">
              <ListItemIcon className={classes.textcolor}> <img src={Calander} alt="Dashboard Icon" className="dashboardIcon" /></ListItemIcon>
              <ListItemText className={classes.textcolor} primary={t('Live Operations')} />
            </ListItem>
            :
            null
            :
            null
          }
          {user_info ? JSON.parse(user_info).permission.some((permission: { [x: string]: string; }) => permission['permission'] === 'Ratings') ?
            <ListItem button component={NavLink} activeClassName="highlighted" to="/ratings" >
              <ListItemIcon className={classes.textcolor} ><StarHalfIcon /></ListItemIcon>
              <ListItemText className={classes.textcolor} primary={t('Ratings')} />
            </ListItem>
            :
            null
            :
            null
          }
          {user_info ? JSON.parse(user_info).permission.some((permission: { [x: string]: string; }) => permission['permission'] === 'Tickets') ?
            <ListItem button component={NavLink} activeClassName="highlighted" to="/ticket/ticket_for" >
              <ListItemIcon className={classes.textcolor} ><ConfirmationNumberIcon /></ListItemIcon>
              <ListItemText className={classes.textcolor} primary={t('Tickets')} />
            </ListItem>
            :
            null
            :
            null
          }
          {user_info ? JSON.parse(user_info).permission.some((permission: { [x: string]: string; }) => permission['permission'] === 'Help') ?
            <ListItem button >
              <ListItemIcon className={classes.textcolor} ><img src={Help} alt="Dashboard Icon" className="dashboardIcon" /></ListItemIcon>
              <ListItemText className={classes.textcolor} primary={t('Help')} />
            </ListItem>
            :
            null
            :
            null
          }

        </List>



      )}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <nav className={`leftSideBar ${classes.drawer}`} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        {drawer}

      </nav>
    </>
  );
}

