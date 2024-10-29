import {
	EditIcon,
	MoreHorizontal,
	PlusIcon,
	Trash2,
	UserPlus,
	ViewIcon
} from "lucide-react"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar"
import { IDepot } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Fragment, useRef, useState } from "react"
import { AddDepotDialog, DeleteDepotDialog, InviteUserToDepotDialog, EditDepotDialog } from "./depot"

export function NavDepots({ depots }: { depots: IDepot[] }) {
	const { isMobile } = useSidebar()
	const [isDeletDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const selectedDepotId = useRef("")
	const selectedDepot = useRef<IDepot | null >(null)
	const handleOpen = () => setIsAddDialogOpen(!isAddDialogOpen)
	const handleDeleteDialogOpen = (id: string) => {
		setIsDeleteDialogOpen(!isDeletDialogOpen)
		selectedDepotId.current = id
	}
	const handleInviteDialogOpen = (id: string) => {
		setIsInviteDialogOpen(!isInviteDialogOpen)
		selectedDepotId.current = id
	}
	const handleEditDialog = (depot: IDepot) => {
		setIsEditDialogOpen(!isEditDialogOpen)
		selectedDepot.current = depot
	}

	return (
		<Fragment>
			<SidebarGroup>
				<SidebarGroupLabel>Depots</SidebarGroupLabel>
				<SidebarMenu>
					{depots.map((item) => (
						<SidebarMenuItem key={item.id}>
							<SidebarMenuButton asChild>
								<a href={`/depot/${item.id}`}>
									<Avatar className="h-6 w-6 rounded-lg">
										<AvatarImage src={item.image_url} alt={`${item.name}`} />
										<AvatarFallback className="rounded-lg uppercase">
											{item.name.substring(0, 2)}
										</AvatarFallback>
									</Avatar>
									<span>{item.name}</span>
								</a>
							</SidebarMenuButton>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuAction showOnHover>
										<MoreHorizontal />
										<span className="sr-only">More</span>
									</SidebarMenuAction>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-48" side={isMobile ? "bottom" : "right"}
									align={isMobile ? "end" : "start"}>
									<DropdownMenuItem>
										<ViewIcon className="text-muted-foreground" />
										<a href={`/depot/${item.id}`}>
											<span>View Depot</span>
										</a>
									</DropdownMenuItem>
									<DropdownMenuItem className="cursor-pointer"
										onClick={() => handleEditDialog(item)}>
										<EditIcon className="text-muted-foreground" />
										<span>Edit Depot</span>
									</DropdownMenuItem>
									<DropdownMenuItem className="cursor-pointer"
										onClick={() => handleInviteDialogOpen(item.id)}>
										<UserPlus className="text-muted-foreground" />
										<span>Invite a user</span>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem className="cursor-pointer"
										onClick={() => handleDeleteDialogOpen(item.id)}>
										<Trash2 className="text-muted-foreground" />
										<span>Delete Depot</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</SidebarMenuItem>
					))}
					<SidebarMenuItem>
						<SidebarMenuButton asChild onClick={handleOpen} className="cursor-pointer">
							<div>
								<PlusIcon className="text-muted-foreground size-20" />
								<span>Add Depot</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroup>
			<AddDepotDialog isOpen={isAddDialogOpen} onOpenChange={handleOpen} />
			<DeleteDepotDialog isOpen={isDeletDialogOpen} onOpenChange={setIsDeleteDialogOpen}
				id={selectedDepotId.current} />
			<InviteUserToDepotDialog isOpen={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}
				id={selectedDepotId.current} />
			{selectedDepot && selectedDepot.current ? <EditDepotDialog isOpen={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}
				depot={selectedDepot.current} /> : null}
		</Fragment>
	)
}
