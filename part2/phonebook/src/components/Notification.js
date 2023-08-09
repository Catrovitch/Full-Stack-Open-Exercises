const Notification = ({ message, notificationError }) => {
    if (message === null) {
      return null
    }
    console.log(notificationError)
    const notificationStyle = {     
        color: notificationError ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }

  export default Notification