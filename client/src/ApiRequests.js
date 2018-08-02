export const makeRequest = async ({ route, method, body }) => {
  const response = await fetch(route, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: body && JSON.stringify(body),
  })
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

export const allTodos = () => {
  return makeRequest({ method: 'GET', route: 'http://localhost:3000/api/v1/todo_items' })
}

export const createTodo = (payload) => {
  return makeRequest({ method: 'POST', route: 'http://localhost:3000/api/v1/todo_items', body: payload })
}

export const destroyTodo = (payload) => {
  return makeRequest({ method: 'DELETE', route: 'http://localhost:3000/api/v1/todo_items/'+payload.id })
}

export const updateTodo = (payload) => {
  return makeRequest({ method: 'PUT', route: 'http://localhost:3000/api/v1/todo_items/'+payload.id, body: payload })
}
