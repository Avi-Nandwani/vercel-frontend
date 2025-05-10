import { Link } from 'react-router-dom'
import { FaEdit, FaArrowLeft } from 'react-icons/fa'

const UserDetails = ({ user }) => {
  if (!user) return null

  const renderField = (label, value, icon = null) => (
    <div className="mb-4">
      <div className="text-sm font-medium text-gray-500">{label}</div>
      <div className="mt-1 flex items-center text-gray-900">
        {icon && <span className="mr-2 text-gray-400">{icon}</span>}
        {value || <span className="text-gray-400 italic">Not provided</span>}
      </div>
    </div>
  )

  const address = [
    user.address,
    user.city,
    user.state,
    user.zip_code,
    user.country
  ].filter(Boolean).join(', ')

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">
            {user.first_name} {user.last_name}
          </h2>
          <div className="flex space-x-3">
            <Link to="/" className="btn btn-secondary">
              <FaArrowLeft className="mr-2" /> Back to List
            </Link>
            <Link to={`/users/${user._id}/edit`} className="btn btn-primary">
              <FaEdit className="mr-2" /> Edit
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            {renderField("Email", user.email)}
            {renderField("Phone", user.phone)}
          </div>
          <div>
            {renderField("Address", address)}
            {renderField("Country", user.country)}
          </div>
        </div>

        <div className="mt-6 border-t pt-6">
          <div className="text-xs text-gray-500">
            <div>Created: {new Date(user.createdAt).toLocaleString()}</div>
            <div>Last Updated: {new Date(user.updatedAt).toLocaleString()}</div>
            <div>User ID: {user._id}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetails