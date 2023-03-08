import React, { memo, useState } from 'react'
import { useHistory } from 'react-router-dom'

const LOGIN_CREDENTIALS = [{
  userId: "root_user@gmail.com",
  password: "root_password@gmail.com"
},{
  userId: "system_user@gmail.com",
  password: "system_password@gmail.com"
}]

function Login({setLoggedIn}) {
  const [state, setState] = useState({
    userId: "",
    password: "",
    error: ""
  })

  const history = useHistory()

  const onChangePassword = (event) => {
    setState({
      ...state,
      password: event.target.value
    })
  }

  const onChangeUserName = (event) => {
    setState({
      ...state,
      userId: event.target.value
    })
  }

  const loginToAccount = () => {
    const credential = LOGIN_CREDENTIALS.find(loginDetail => loginDetail.userId == state.userId)
    if(credential){
      if(state.password == credential.password){
        setState({
          ...state,
          error: ""
        })
        setLoggedIn(true)
        localStorage.setItem('loggedIn', JSON.stringify(true));
        history.push('/home')
      }else{
        setState({
          ...state,
          error: "Wrong password"
        })
      }
    }else{
      setState({
        ...state,
        error: "User not found"
      })
    }
  }

  return (
    <div className='login-block'>
      <h1>Log in to your account</h1>
      <div className='login-input-block'>
        <input
          data-input="email"
          placeholder='Enter user name'
          type={"text"}
          className="login-input user-name"
          value={state.userId}
          onChange={onChangeUserName}
        />
        <input
          data-input="password"
          placeholder='Enter password'
          type={"password"}
          className="login-input password"
          value={state.password}
          onChange={onChangePassword}
        />
      </div>
      <button
        data-cta="login"
        onClick={loginToAccount}>Login</button>
      {state.error !== "" ? <p className='login-error'>{state.error}</p> : null}
    </div>
  )
}

export default memo(Login)
