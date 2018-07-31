// export const createNewProfile = (profile) => {
//   const formData = new FormData()
//   formData.append('first_name', profile.firstName)
//   formData.append('last_name', profile.lastName)
//   formData.append('email', profile.email)
//   return fetch('http://example.com/api/v1/registration', {
//     method: 'POST',
//     body: formData,
//   })
//     .then(response => response.json())
// }


export const getAllTodos = () => {
  return fetch('http://localhost:3000/api/v1/todo_items')
    .then((response) => {
      if (response.status >= 400) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
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
