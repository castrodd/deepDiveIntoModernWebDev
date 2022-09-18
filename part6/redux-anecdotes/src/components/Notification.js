import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  
  const presentStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  const absentStyle = {
    display: 'none'
  }

  const style = notification ? presentStyle : absentStyle

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
