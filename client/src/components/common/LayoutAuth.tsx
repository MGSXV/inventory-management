import { Outlet } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { CategoryProvider, DepotProvider, SupplierProvider } from "@/context"
import AuthOutlet from "./AuthOutlet"

const LayoutAuth = () => {
	return (
		<SidebarProvider>
			<DepotProvider>
				<SupplierProvider>
					<CategoryProvider>
						<AuthOutlet>
							<Outlet />
						</AuthOutlet>
					</CategoryProvider>
				</SupplierProvider>
			</DepotProvider>
		</SidebarProvider>
	)
}

export default LayoutAuth