export const makeRequest = async ({ method, todo }) => {
  this.response = null
  try {
    switch (method.toLowerCase()) {
      case 'post':
        this.response = await fetch('http://localhost:3000/api/v1/todo_items', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todo),
        })
        break
      case 'delete':
        this.myInit = {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json',
          },
        }
        this.response = await fetch("http://localhost:3000/api/v1/todo_items/"+todo.id, this.myInit)
        break
      case 'put':
        this.myInit = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todo),
        }
        this.response = await fetch("http://localhost:3000/api/v1/todo_items/"+todo.id, this.myInit)
        break
      default:
        this.response = await fetch('http://localhost:3000/api/v1/todo_items')
        break
    }
  } catch (error) {
    console.log(error)
  }
      'Content-Type': 'application/json',
  try {
    if (this.response === null) {
      throw new Error('Error, no promise was created')
    }
    if (this.response.status >= 400) {
      throw new Error(this.response.statusText)
    }
    return this.response.json()
  } catch (error) {
    console.log(error)
  }
}
