import { Outlet } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DepotProvider, SupplierProvider } from "@/context"
import AuthOutlet from "./AuthOutlet"

const LayoutAuth = () => {
	return (
		<SidebarProvider>
			<DepotProvider>
				<SupplierProvider>
					<AuthOutlet>
						<Outlet />
					</AuthOutlet>
				</SupplierProvider>
			</DepotProvider>
		</SidebarProvider>
	)
}

export default LayoutAuth