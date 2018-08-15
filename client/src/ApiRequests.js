export const makeRequest = async ({ query }) => {
  const response = await fetch('http://localhost:3000/graphql/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  })
  if (response === null) {
    throw new Error('Error, no promise was created')
  }
  if (response.status >= 400) {
    throw new Error(response.statusText)
  }
  return response.json()
}

export const allTodos = async () => {
  const request = await makeRequest({
    query: `{
      allTodos() {
        id
        name
        completed
      }
    }`,
  })
  return request.data["allTodos"]
}

export const createTodo = async (payload) => {
  const request = await makeRequest({
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
  })
  return request.data["createTodo"]
}

export const destroyTodo = async (payload) => {
  const request = await makeRequest({
    query: `mutation {
      deleteTodo (
        id: ${payload.id}
      ){
        id
        name
        completed
      }
    }`,
  })
  return request.data["deleteTodo"]
}

export const updateTodo = async (payload) => {
  const request = await makeRequest({
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
  })
  return request.data["updateTodo"]
}
