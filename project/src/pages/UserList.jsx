import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FaPlus, FaFileDownload } from 'react-icons/fa'
import { userService } from '../services/api'
import SearchBar from '../components/SearchBar'
import UserTable from '../components/UserTable'
import Pagination from '../components/Pagination'
import ConfirmDialog from '../components/ConfirmDialog'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [exporting, setExporting] = useState(false)

  const USERS_PER_PAGE = 10

  useEffect(() => {
    fetchUsers()
  }, [currentPage, searchTerm])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await userService.getUsers(currentPage, USERS_PER_PAGE, searchTerm)
      console.log(data)
      setUsers(data.data)
      setTotalPages(data.totalPages)
      setLoading(false)
    } catch (error) {
      setError('Failed to fetch users')
      toast.error('Failed to fetch users')
      setLoading(false)
      console.error(error)
    }
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
    setCurrentPage(1) // Reset to first page on new search
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleExportCSV = async () => {
    try {
      setExporting(true)
      await userService.exportUsersCSV()
      toast.success('Users exported successfully')
      setExporting(false)
    } catch (error) {
      toast.error('Failed to export users')
      setExporting(false)
      console.error(error)
    }
  }

  const confirmDelete = (userId) => {
    setUserToDelete(userId)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!userToDelete) return
    
    try {
      await userService.deleteUser(userToDelete)
      toast.success('User deleted successfully')
      setDeleteDialogOpen(false)
      setUserToDelete(null)
      fetchUsers() // Refresh the list
    } catch (error) {
      toast.error('Failed to delete user')
      console.error(error)
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h1 className="page-title mb-4 sm:mb-0">User Management</h1>
        <div className="flex gap-2">
          <Link to="/users/new" className="btn btn-primary">
            <FaPlus className="mr-2" /> Add User
          </Link>
          <button 
            onClick={handleExportCSV} 
            className="btn btn-secondary"
            disabled={exporting || users?.length === 0}
          >
            <FaFileDownload className="mr-2" /> 
            {exporting ? 'Exporting...' : 'Export CSV'}
          </button>
        </div>
      </div>

      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-pulse text-gray-600">Loading users...</div>
        </div>
      ) : error ? (
        <div className="bg-danger-100 text-danger-700 p-4 rounded-lg">
          {error}
        </div>
      ) : (
        <>
          <UserTable users={users} onDelete={confirmDelete} />
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      <ConfirmDialog
        isOpen={deleteDialogOpen}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => {
          setDeleteDialogOpen(false)
          setUserToDelete(null)
        }}
      />
    </div>
  )
}

export default UserList