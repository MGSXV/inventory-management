import './App.css'
import Authentication from './components/auth/Authentication'
import Layout from './components/common/Layout'
import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './components/dashboard'
import { LayoutAuth, NotFound, RequireAuth } from './components/common'
import { useAuth } from './hooks'
import { useState } from 'react'

function App() {

	const { isLoading } = useAuth()
	const [isOpen, setIsOpen] = useState(false)
	const handleOpen = () => setIsOpen(!isOpen)

	if (isLoading)
		return <div>Loading...</div>

	return (
		<Routes>
			<Route path='/' element={<Layout />} >
				{ /** Public routes */ }

				<Route path='/auth' element={<Authentication />} />
				

				{ /** Private routes */ }
				<Route element={<RequireAuth />} >
					<Route element={<LayoutAuth />}>
						<Route path='/' element={<Dashboard onclick={handleOpen} />} />
					</Route>
				</Route>
				<Route path='/*' element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default App
