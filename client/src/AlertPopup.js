import React from 'react'
import { Alert } from 'reactstrap'

class AlertPopup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: true,
    }

    this.onDismiss = this.onDismiss.bind(this)
  }

  onDismiss() {
    this.setState({ visible: false })
  }

  render() {
    const {
      type,
      message,
    } = this.props
    return (
      <Alert color={type} isOpen={this.state.visible} toggle={this.onDismiss}>
        { message.message }
      </Alert>
    )
  }
}

export default AlertPopup
