import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FaSave, FaArrowLeft, FaTimes } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { userService } from '../services/api'
import { validateUserForm } from '../utils/validation'

const UserForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)

  const initialFormState = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: ''
  }

  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(isEditMode)

  // Fetch user data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchUser = async () => {
        try {
          setInitialLoading(true)
          const userData = await userService.getUserById(id)
          setFormData(userData)
          setInitialLoading(false)
        } catch (error) {
          toast.error('Failed to fetch user data')
          navigate('/')
          console.error(error)
        }
      }
      
      fetchUser()
    }
  }, [id, isEditMode, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    const validationErrors = validateUserForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error('Please fix the errors in the form')
      return
    }
    
    setLoading(true)
    
    try {
      if (isEditMode) {
        await userService.updateUser(id, formData)
        toast.success('User updated successfully')
      } else {
        await userService.createUser(formData)
        toast.success('User created successfully')
      }
      navigate('/')
    } catch (error) {
      toast.error(typeof error === 'string' ? error : 'An error occurred')
      setLoading(false)
      console.error(error)
    }
  }

  const handleReset = () => {
    if (isEditMode) {
      // Reset to original data in edit mode
      const fetchUser = async () => {
        try {
          const userData = await userService.getUserById(id)
          setFormData(userData)
        } catch (error) {
          console.error(error)
        }
      }
      fetchUser()
    } else {
      // Reset to empty form in create mode
      setFormData(initialFormState)
    }
    setErrors({})
  }

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-pulse text-gray-600">Loading user data...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">{isEditMode ? 'Edit User' : 'Add New User'}</h1>
        <Link to="/" className="btn btn-secondary">
          <FaArrowLeft className="mr-2" /> Back to List
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-bold text-gray-700 mb-4">Basic Information</h2>
              
              {/* First Name */}
              <div className="mb-4">
                <label htmlFor="first_name" className="form-label">
                  First Name <span className="text-danger-600">*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`form-control ${errors.first_name ? 'border-danger-500' : ''}`}
                  required
                />
                {errors.first_name && (
                  <p className="form-error">{errors.first_name}</p>
                )}
              </div>
              
              {/* Last Name */}
              <div className="mb-4">
                <label htmlFor="last_name" className="form-label">
                  Last Name <span className="text-danger-600">*</span>
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={`form-control ${errors.last_name ? 'border-danger-500' : ''}`}
                  required
                />
                {errors.last_name && (
                  <p className="form-error">{errors.last_name}</p>
                )}
              </div>
              
              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-danger-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-control ${errors.email ? 'border-danger-500' : ''}`}
                  required
                />
                {errors.email && (
                  <p className="form-error">{errors.email}</p>
                )}
              </div>
              
              {/* Phone */}
              <div className="mb-4">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-control ${errors.phone ? 'border-danger-500' : ''}`}
                />
                {errors.phone && (
                  <p className="form-error">{errors.phone}</p>
                )}
              </div>
            </div>
            
            {/* Address Information */}
            <div>
              <h2 className="text-lg font-bold text-gray-700 mb-4">Address Information</h2>
              
              {/* Address */}
              <div className="mb-4">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              
              {/* City */}
              <div className="mb-4">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.city && (
                  <p className="form-error">{errors.city}</p>
                )}
              </div>
              
              {/* State & Zip Code (Side by Side) */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="state" className="form-label">
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="form-control"
                  />
                  {errors.state && (
                  <p className="form-error">{errors.state}</p>
                )}
                </div>
                <div>
                  <label htmlFor="zip_code" className="form-label">
                    Zip/Postal Code
                  </label>
                  <input
                    type="text"
                    id="zip_code"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleChange}
                    className={`form-control ${errors.zip_code ? 'border-danger-500' : ''}`}
                  />
                  {errors.zip_code && (
                    <p className="form-error">{errors.zip_code}</p>
                  )}
                </div>
              </div>
              
              {/* Country */}
              <div className="mb-4">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.country && (
                  <p className="form-error">{errors.country}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="flex justify-end space-x-3 mt-8 border-t pt-6">
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-secondary"
            >
              <FaTimes className="mr-2" /> Reset
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              <FaSave className="mr-2" />
              {loading ? 'Saving...' : isEditMode ? 'Update User' : 'Save User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserForm