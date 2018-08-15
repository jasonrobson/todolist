import React from 'react'
import { Alert } from 'reactstrap'

const AlertPopup = ({ type, error, onDismiss }) => (
  <Alert color={type} toggle={onDismiss} isOpen>
    {error && error.message}
  </Alert>
)

export default AlertPopup
