export const makeRequest = async ({ query, variables }) => {
  const response = await fetch('http://localhost:3000/graphql/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
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
    query: `mutation Create($todo: TodoInput!) {
      createTodo(todo: $todo) {
        id
        name
        completed
      }
    }`,
    variables: {
      todo: {
        completed: payload.completed,
        name: payload.name,
      },
    },
  })
  return request.data["createTodo"]
}

export const destroyTodo = async (payload) => {
  const request = await makeRequest({
    query: `mutation Delete($id: ID!) {
      deleteTodo(id: $id) {
        id
        name
        completed
      }
    }`,
    variables: {
      id: payload.id,
    },
  })
  return request.data["deleteTodo"]
}

export const updateTodo = async (payload) => {
  const request = await makeRequest({
    query: `mutation ($id: ID!, $todo: TodoInput!) {
      updateTodo(id: $id, todo: $todo) {
        id
        name
        completed
      }
    }`,
    variables: {
      id: payload.id,
      todo: {
        name: payload.name,
        completed: payload.completed,
      },
    },
  })

  return request.data["updateTodo"]
}
