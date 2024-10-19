import './App.css'
import Authentication from './components/auth/Authentication'
import Layout from './components/common/Layout'
import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './components/dashboard'
import { NotFound, RequireAuth } from './components/common'
import { useAuth } from './hooks'
import { useEffect } from 'react'

function App() {

	const { user } = useAuth()

	useEffect(() => {
		console.log('user ---->', user)
	}, [user])

	return (
		<Routes>
			<Route path='/' element={<Layout />} >
				{ /** Public routes */ }
				<Route path='/auth' element={<Authentication />} />

				{ /** Private routes */ }
				<Route element={<RequireAuth />} >
					<Route path='/' element={<Dashboard />} />
				</Route>
				<Route path='/*' element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default App
