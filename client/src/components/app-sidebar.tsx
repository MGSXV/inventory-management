import * as React from "react"
import { Command } from "lucide-react"
import { NavDepots } from "@/components/nav-depots"
import { NavUser } from "@/components/nav-user"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks"
import { useCategory, useDepot, useSupplier } from "@/context"
import { NavSuppliers } from "./nav-suppliers"
import { NavCategories } from "./nav-categories"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

	const { user } = useAuth()
	const { depots } = useDepot()
	const { suppliers } = useSupplier()
	const { categories } = useCategory()

	return (
		<Sidebar variant="floating" collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="/">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<Command className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">Inventory management</span>
									<span className="truncate text-xs">selkhamlichi97@gmail.com</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavDepots depots={depots} />
				<NavSuppliers suppliers={suppliers} />
				<NavCategories categories={categories} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	)
}
