
import React, { useState, memo, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { FormControl } from '@material-ui/core';
import { useCreateUser } from '../../resources/useCreateUser';
import { useTranslation, Trans } from "react-i18next";

const useStyles2 = makeStyles({

  root: {
    display: "flex",
    marginLeft:'20px'
  },
  table: {
    minWidth: 650
  },
  formControl: {
    minWidth: 200,
  },

});

export const AddUser = () => {

  const classes = useStyles2();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState('');
  const [validation, setValidation] = useState('');
  const [validationCheck, setValidationCheck] = useState('');
  const [formValidation, setFormValidation] = useState({
    fullName: '', userName: '', password: '', role: ''
  })

  // using custom react query hook for fetching roles

  const mutation = useCreateUser()
  // const { isLoading, isError, data: roleData } = useContractorCompany(roleId);

  const { t } = useTranslation();
  const handleValidation = () => {
    let formIsValid = true;
    //Name
    if (fullName === '') {
      formIsValid = false;
      formValidation["fullName"] = "Full Name cannot be empty";
      setValidationCheck('Full Name cannot be empty')
    } else {
      formValidation["fullName"] = "";
    }

    if (email === '') {
      formIsValid = false;
      formValidation["userName"] = "email cannot be empty";
      setValidationCheck('User Name cannot be empty')
    } else {
      formValidation["userName"] = "";
    }

    //Email
    if (password === '') {
      formIsValid = false;
      formValidation["password"] = "Password cannot be empty";
      setValidationCheck('Password cannot be empty')
    } else {
      formValidation["password"] = "";
    }
    if (roleId === '') {
      formIsValid = false;
      formValidation["role"] = "Role cannot be empty";
      setValidationCheck('Role cannot be empty')

    } else {
      formValidation["role"] = "";
    }
    return formIsValid;
  }
  // submit function

  const onCreateUser = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    if (handleValidation()) {
      setValidation("")
      mutation.mutate({
        name: fullName, email: email, password: password, role: roleId
      })

    }
  }



  return (
    <div className={classes.root}>
      <main className='width pr-20'>
        <div />
        <div className="livetabletitle">
          <Grid className={classes.table} container direction="row" alignItems="center">

            <Grid item>
              <p className="leftfloat">&nbsp;{t("Add New Users")}</p>
            </Grid>
          </Grid>
          <div className="gridpsacing">
          </div>
        </div>
        <div className="gridpsacing">
          <form className="manageUserFonts" onSubmit={onCreateUser}  >
            <Grid container direction="row" alignItems="center">
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl className="create_user_input">
                  <label>{t("Full Name")}*</label>
                  <span style={{ color: "red" }}>{formValidation["fullName"]}</span>
                  <input className="inputbox" type="text" placeholder={t("Add Full Name")} onChange={e => setFullName(e.target.value)} ></input>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl className="create_user_input">
                  <label>{t("Email")}*</label>
                  <span style={{ color: "red" }}>{formValidation["userName"]}</span>
                  <input className="inputbox" type="email" placeholder={t("Email")} onChange={e => setEmail(e.target.value)}></input>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl className="create_user_input">
                  <label>{t("Password")}*</label>
                  <span style={{ color: "red" }}>{formValidation["password"]}</span>
                  <input className="inputbox" type="password" placeholder={t("Password")} onChange={e => setPassword(e.target.value)}></input>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl className="create_user_input">
                  <label>{t("Role")}*</label>
                  <span style={{ color: "red" }}>{formValidation["role"]}</span>
                  <span style={{ color: "red" }}>{validation}</span>
                  <select className="inputbox" onChange={e => setRoleId(e.target.value)} >
                    <option value=''>{t("Select a Role")}</option>
                    <option value='Admin'>{t("Admin")}</option>
                    <option value='Teacher'>{t("Teacher")}</option>
                    <option value='Parent'>{t("Parent")}</option>
                  </select>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl>
                  {mutation.isLoading ? (
                    'Creating Users ...'
                  ) : (
                    <>
                      {mutation.isError ? (
                        <div>An error occurred: {mutation.error}</div>
                      ) : null}
                      {mutation.isSuccess ? <div>{mutation.data?.data.message || mutation.data?.data.error}</div> : null}
                      <button
                        className="inputboxButton"
                        type="submit"
                      >{t("Create users")}</button>
                    </>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </div>
      </main>
    </div>
  );
}
