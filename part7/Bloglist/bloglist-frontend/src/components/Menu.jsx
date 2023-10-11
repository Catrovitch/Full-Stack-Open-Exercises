import { Link } from "react-router-dom"
import { 
  AppBar,
  Toolbar,
  Button,
  Paper
 } from '@mui/material'
  

const Menu = () => {

    return (
      <Paper elevation={20}>
        <AppBar position="static">
          <Toolbar>
              <Button color="inherit" component={Link} to="/">
                blogs
              </Button>
              <Button color="inherit" component={Link} to="/users">
                users
              </Button>
          </Toolbar>
        </AppBar>
      </Paper>
    )
  }

  
export default Menu