import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { userService } from '../services/api'
import UserDetails from '../components/UserDetails'

const UserView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const userData = await userService.getUserById(id)
        setUser(userData)
        setLoading(false)
      } catch (error) {
        toast.error('Failed to fetch user details')
        navigate('/')
        console.error(error)
      }
    }

    fetchUser()
  }, [id, navigate])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-pulse text-gray-600">Loading user details...</div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="page-title">User Details</h1>
      <UserDetails user={user} />
    </div>
  )
}

export default UserView