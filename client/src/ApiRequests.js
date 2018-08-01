export const handleRequest = (initOptions, id) => {
  try {
    switch (initOptions.method.toLowerCase()) {
      case 'post':
        return fetch('http://localhost:3000/api/v1/todo_items', initOptions)
      case 'delete':
        return fetch("http://localhost:3000/api/v1/todo_items/"+id, initOptions)
      case 'put':
        return fetch("http://localhost:3000/api/v1/todo_items/"+id, initOptions)
      default:
        return fetch('http://localhost:3000/api/v1/todo_items')
    }
  } catch (error) {
    console.log(error)
  }
}

export const makeRequest = async (initOptions) => {
  const newBody = initOptions.body
  const newInitOptions = {
    ...initOptions,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: initOptions.body && JSON.stringify(newBody),
  }
  const response = await handleRequest(newInitOptions, initOptions.body && initOptions.body.id)
  try {
    if (response === null) {
      throw new Error('Error, no promise was created')
    }
    if (response.status >= 400) {
      throw new Error(response.statusText)
    }
    return response.json()
  } catch (error) {
    console.log(error)
  }
}
