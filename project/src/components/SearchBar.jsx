import { useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const clearSearch = () => {
    setSearchTerm('')
    onSearch('')
  }

  return (
    <form onSubmit={handleSearch} className="relative mb-6">
      <div className="flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users by name, email, city or country..."
            className="form-control pl-10 pr-10"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary ml-2 whitespace-nowrap"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar