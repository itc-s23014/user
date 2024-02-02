const getAllUserIds = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const usersData = await response.json()

  return usersData.map(user => ({
    params: { id: String(user.id) }
  }))
}

const getUserData = async id => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  )
  const userData = await response.json()

  return userData
}

export { getAllUserIds, getUserData }
