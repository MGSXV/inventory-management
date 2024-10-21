import { ChevronsUpDown, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar"
import { ICurrentUser } from "@/types"
import { useAuth } from "@/hooks"
import { axios_private } from "@/config/api"

const LOGOUT_ENDPOINT = '/logout'

export function NavUser({ user }: {	user: ICurrentUser | null }) {
	const { isMobile } = useSidebar()
	const { logout } = useAuth()

	const avatar_fallback = `${user?.first_name.charAt(0)}${user?.last_name.charAt(0)}`.toUpperCase()

	const logout_request = () => {

		axios_private.post(LOGOUT_ENDPOINT, {}, {
			headers: { 'Content-Type': 'application/json' },
			withCredentials: true
		})
		logout()

	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src={user?.avatar} alt={`${user?.first_name} ${user?.last_name}`} />
								<AvatarFallback className="rounded-lg">{avatar_fallback}</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold capitalize">{`${user?.first_name} ${user?.last_name}`}</span>
								<span className="truncate text-xs">{`@${user?.username}`}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src={user?.avatar} alt={`${user?.first_name} ${user?.last_name}`} />
									<AvatarFallback className="rounded-lg">{avatar_fallback}</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold capitalize">{`${user?.first_name} ${user?.last_name}`}</span>
									<span className="truncate text-xs">{`@${user?.username}`}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="cursor-pointer text-destructive" onClick={logout_request}>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
