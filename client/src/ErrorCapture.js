
export const errorCapture = (func, notify) => {
  return async (...args) => {
    try {
      await func(...args)
    } catch (error) {
      notify('error', error.message)
    }
  }
}
