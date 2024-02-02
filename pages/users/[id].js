import { getUserData } from '../../utils/api'

const User = ({ user, todos }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>
        Address: {user.address.street}, {user.address.suite},{' '}
        {user.address.city}, {user.address.zipcode}
      </p>
      <h2>Todo List</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} - {todo.completed ? 'Completed' : 'Not Completed'}
          </li>
        ))}
      </ul>
    </div>
  )
}

const getStaticPaths = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const usersData = await response.json()

  const paths = usersData.map(user => ({
    params: { id: String(user.id) }
  }))

  return {
    paths,
    fallback: false
  }
}

const getStaticProps = async ({ params }) => {
  const user = await getUserData(params.id)

  const todosResponse = await fetch(
    `https://jsonplaceholder.typicode.com/todos?userId=${params.id}`
  )
  const todos = await todosResponse.json()

  return {
    props: {
      user,
      todos
    }
  }
}

export { getStaticPaths }
export { getStaticProps }
export default User
