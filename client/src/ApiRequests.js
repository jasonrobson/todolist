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
  return makeRequest({
    method: 'POST',
    route: 'http://localhost:3000/graphql/',
    body: {
      query: `{
        allTodos() {
          id
          name
          completed
        }
      }`,
    },
  })
}

export const createTodo = (payload) => {
  return makeRequest({
    method: 'POST',
    route: 'http://localhost:3000/graphql/',
    body: {
      query: `mutation {
        createTodo (
          todo: {
            name: "${payload.name}",
            completed: ${payload.completed}
          }
        ){
          id
          name
          completed
        }
      }`,
    },
  })
}

export const destroyTodo = (payload) => {
  return makeRequest({
    method: 'POST',
    route: 'http://localhost:3000/graphql/',
    body: {
      query: `mutation {
        deleteTodo (
          id: ${payload.id}
        ){
          id
          name
          completed
        }
      }`,
    },
  })
}

export const updateTodo = (payload) => {
  return makeRequest({
    method: 'POST',
    route: 'http://localhost:3000/graphql/',
    body: {
      query: `mutation {
        updateTodo (
          id: ${payload.id},
          todo: {
            name: "${payload.name}",
            completed: ${payload.completed},
          }
        ){
          id
          name
          completed
        }
      }`,
    },
  })
}
