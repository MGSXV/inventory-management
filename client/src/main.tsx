import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/AuthProvider.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<AuthProvider>
			<Routes>
				<Route path='/*' element={<App />} />
			</Routes>
		</AuthProvider>
	</BrowserRouter>
)
