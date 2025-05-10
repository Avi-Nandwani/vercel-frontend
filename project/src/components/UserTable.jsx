import { Link } from 'react-router-dom'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'

const UserTable = ({ users, onDelete }) => {
  if (!users || users.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">No users found.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-0">
                    <div className="text-sm font-medium text-gray-900">
                      {user.first_name} {user.last_name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{user.email}</div>
              </td>
              <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {user.phone || "-"}
                </div>
              </td>
              <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {user.city && user.country 
                    ? `${user.city}, ${user.country}` 
                    : user.city || user.country || "-"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                  <Link
                    to={`/users/${user._id}`}
                    className="text-gray-600 hover:text-primary-600"
                    title="View"
                  >
                    <FaEye />
                  </Link>
                  <Link
                    to={`/users/${user._id}/edit`}
                    className="text-gray-600 hover:text-primary-600"
                    title="Edit"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => onDelete(user._id)}
                    className="text-gray-600 hover:text-danger-600"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable