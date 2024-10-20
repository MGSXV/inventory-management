import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/AuthProvider.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider.tsx'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<AuthProvider>
			<ThemeProvider>
				<Routes>
					<Route path='/*' element={<App />} />
				</Routes>
			</ThemeProvider>
		</AuthProvider>
	</BrowserRouter>
)
