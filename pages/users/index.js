import Link from 'next/link'
import { getAllUserIds, getUserData } from '../../utils/api'

const Users = ({ users }) => {
  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const getStaticProps = async () => {
  const userPaths = await getAllUserIds()
  const users = await Promise.all(
    userPaths.map(async ({ params }) => {
      const user = await getUserData(params.id)

      const todosResponse = await fetch(
        `https://jsonplaceholder.typicode.com/todos?userId=${params.id}`
      )
      const todos = await todosResponse.json()

      return { id: user.id, name: user.name, todos }
    })
  )

  return {
    props: {
      users
    }
  }
}

export { getStaticProps }
export default Users
