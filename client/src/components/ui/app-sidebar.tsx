import { Calendar, ChevronUp, Home, Inbox, LogOut, Search, Settings } from "lucide-react"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { useAuth } from "@/hooks"
import { Label } from "./label"
import { Button } from "./button"

// Menu items.
const items = [
	{
		title: "Home",
		url: "#",
		icon: Home,
	},
	{
		title: "Inbox",
		url: "#",
		icon: Inbox,
	},
	{
		title: "Calendar",
		url: "#",
		icon: Calendar,
	},
	{
		title: "Search",
		url: "#",
		icon: Search,
	},
	{
		title: "Settings",
		url: "#",
		icon: Settings,
	},
]

const Footer = () => {

	const { user } = useAuth()
	const avatar_fallback = `${user?.first_name.charAt(0)}${user?.last_name.charAt(0)}`.toUpperCase()
	const avatar_src = user?.avatar 

	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton>
								<Avatar>
									<AvatarImage src={avatar_src} alt={user?.first_name}/>
									<AvatarFallback>{avatar_fallback}</AvatarFallback>
								</Avatar>
								<Label className="capitalize">
									{`${user?.first_name} ${user?.last_name}`}
								</Label>
								<ChevronUp className="ml-auto" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
							<DropdownMenuItem>
								<Button variant='link' className="text-destructive">
									<span>Sign out</span>
									<LogOut />
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	)
}

export function AppSidebar() {
	return (
		<Sidebar variant="floating">
			<SidebarHeader />
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild>
								<a href={item.url}>
								<item.icon />
								<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<Footer />
		</Sidebar>
	)
}
