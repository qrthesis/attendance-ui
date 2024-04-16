"use client";
import React, { useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

import styles from "./styles.module.css";

import useLogin from "./useLogin";

const LoginPage: React.FC = () => {
  
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

  const {
    handleFieldChange,
    handleLogin,
    userCredential: {
      email,
      password
    },
    pageIndicators: {
      error,
      isLoading
    }
  } = useLogin()

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Attendance Login</h2>
        <Stack spacing={3} direction="column">
          <TextField
            fullWidth
            type="email"
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
          />
        <FormControl sx={{ m: 1}} variant="outlined" >
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
              fullWidth
              type={!isPasswordVisible ? 'password' : 'text'}
              id="password"
              label="Password"
              value={password}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>  setIsPasswordVisible(prevState => !prevState)}
                    edge="end"
                  >
                    {!isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          {
            error && <FormHelperText id="error-helper-text" className={styles.errorText}>{ error }</FormHelperText>
          }
        </FormControl>
        <Button onClick={handleLogin} variant="contained" disabled={email === '' || password === ''}>
          { isLoading ? 'Logging in ...' : 'Login'}
        </Button>

        </Stack>
      </div>
    </div>
  );
};

export default LoginPage;
