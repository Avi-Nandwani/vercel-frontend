import { Link, useLocation } from 'react-router-dom'
import { FaUser, FaPlus } from 'react-icons/fa'

const Navbar = () => {
  const location = useLocation()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <FaUser className="text-primary-600 text-xl" />
          <span className="text-xl font-bold text-gray-900">User Management</span>
        </Link>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link 
                to="/" 
                className={`py-2 px-3 font-medium rounded-md transition ${
                  location.pathname === '/' 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Users
              </Link>
            </li>
            <li>
              <Link 
                to="/users/new" 
                className={`py-2 px-3 font-medium rounded-md flex items-center gap-1 transition ${
                  location.pathname === '/users/new' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                <FaPlus className="text-sm" />
                <span>Add User</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar