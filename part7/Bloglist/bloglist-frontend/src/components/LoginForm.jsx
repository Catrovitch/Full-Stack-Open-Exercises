import PropTypes from 'prop-types'
import {
  TextField,
  Button,
  Typography
} from '@mui/material'


const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <Typography variant="h6">Login</Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button
          id="login-button"
          type="submit"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
