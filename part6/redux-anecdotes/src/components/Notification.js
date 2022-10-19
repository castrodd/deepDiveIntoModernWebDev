import { connect } from 'react-redux'

const Notification = (props) => {  
  const presentStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  const absentStyle = {
    display: 'none'
  }

  const style = props.notifications ? presentStyle : absentStyle

  return (
    <div style={style}>
      {props.notifications}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

export default connect(mapStateToProps)(Notification)
