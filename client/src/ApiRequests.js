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
    query: `{
      allTodos() {
        id
        name
        completed
      }
    }`,
  })
}

export const createTodo = (payload) => {
  return makeRequest({
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
}

export const destroyTodo = (payload) => {
  return makeRequest({
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
}

export const updateTodo = (payload) => {
  return makeRequest({
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
}
