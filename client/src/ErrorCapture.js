// import React from 'react'

export const errorCapture = (f, notify) => {
  try {
    f()
  } catch (error) {
    notify('error', error.message)
  }
}
