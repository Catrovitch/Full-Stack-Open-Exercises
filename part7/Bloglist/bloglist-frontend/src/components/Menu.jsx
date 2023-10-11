import { Link } from "react-router-dom"
import { 
  AppBar,
  Toolbar,
  Button
 } from '@mui/material'
  

const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
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
    )
  }

  
export default Menu