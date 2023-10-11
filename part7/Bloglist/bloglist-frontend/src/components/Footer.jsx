import { Typography } from "@mui/material"

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  }

  return (
    <div style={footerStyle}>
      <br />
      <Typography variant="body2">
        <em>Bloglist app</em>
      </Typography>
    </div>
  )
}

export default Footer
