import { Outlet } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DepotProvider } from "@/context"
import AuthOutlet from "./AuthOutlet"

const LayoutAuth = () => {
	return (
		<SidebarProvider>
			<DepotProvider>
				<AuthOutlet>
					<Outlet />
				</AuthOutlet>
			</DepotProvider>
		</SidebarProvider>
	)
}

export default LayoutAuth