import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import UserList from './pages/UserList'
import UserForm from './pages/UserForm'
import UserView from './pages/UserView'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-6">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/:id/edit" element={<UserForm />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="bg-gray-100 py-4 text-center text-gray-600 border-t">
        <div className="container">
          <p>© 2025 User Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App