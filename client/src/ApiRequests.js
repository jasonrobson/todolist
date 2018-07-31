export const insertTodo = (todo) => {
  return fetch('http://localhost:3000/api/v1/todo_items', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
    .then((response) => {
      if (response.status >= 400) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then(result => result)
}


export const getAllTodos = () => {
  return fetch('http://localhost:3000/api/v1/todo_items')
    .then((response) => {
      if (response.status >= 400) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then(result => result)
}

export const removeTodo = (payload) => {
  const myInit = {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  return fetch("http://localhost:3000/api/v1/todo_items/"+payload.id, myInit)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
}
