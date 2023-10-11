import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'


const Notification = () => {

  const notification = useSelector(state => state.notification);

  if (notification.message === null) {
    return null
  }

  const severity = notification.isError ? 'error' : 'success';

  return (
    <Alert severity={severity}>
      {notification.message}
    </Alert>
  )
}

export default Notification
