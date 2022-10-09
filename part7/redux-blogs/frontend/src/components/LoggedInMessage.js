const LoggedInMessage = (user, handleLogout) => {
  if (user !== null) {
    return (
      <h4>Logged in as {user.username}
        <button onClick={handleLogout}>logout</button>
      </h4>
    )
  }
  else {
    return <></>
  }
}

export default LoggedInMessage