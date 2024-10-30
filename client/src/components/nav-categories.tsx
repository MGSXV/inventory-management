import { ICategory } from "@/types"
import { Fragment } from "react"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const NavCategories = ({ categories }: { categories: ICategory[] }) => {

	return (
		<Fragment>
			<SidebarGroup>
				<SidebarGroupLabel>Categories</SidebarGroupLabel>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<a href="/categories">
								<Avatar className="h-6 w-6 rounded-lg">
									<AvatarFallback className="rounded-lg uppercase">AC</AvatarFallback>
								</Avatar>
								<span>All categories</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroup>
		</Fragment>
	)
}