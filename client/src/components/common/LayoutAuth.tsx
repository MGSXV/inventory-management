import { Outlet } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Navbar } from "."

const LayoutAuth = () => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex flex-col w-auto flex-grow p-2 overflow-x-hidden overflow-y-auto">
				<Navbar />
				<div className="flex flex-col flex-grow my-4">
					<Outlet />
				</div>
			</main>
		</SidebarProvider>
	)
}

export default LayoutAuth