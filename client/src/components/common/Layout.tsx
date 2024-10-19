import { Outlet } from "react-router-dom"
import { Toaster } from "../ui/toaster"

const Layout = () => {
	return (
		<>
			<Outlet />
			<Toaster />
		</>
	)
}

export default Layout