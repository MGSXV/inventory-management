import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ModeToggle } from "../mode-toggle"

const LayoutAuth = () => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main>
				<SidebarTrigger />
				<ModeToggle />
				<Outlet />
			</main>
		</SidebarProvider>
	)
}

export default LayoutAuth