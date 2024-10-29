import { ISupplier } from "@/types"
import { Fragment, useRef, useState } from "react"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditIcon, MoreHorizontal, PlusIcon, Trash2, ViewIcon } from "lucide-react"
import { DeleteSupplierDialog, EditSupplier } from "./suppliers"

export const NavSuppliers = ({ suppliers }: { suppliers: ISupplier[]}) => {

	const { isMobile } = useSidebar()

	const [isDeletDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

	const selectedSupplierId = useRef("")
	const selectedSupplier = useRef<ISupplier | null >(null)
	const handleOpen = () => setIsAddDialogOpen(!isAddDialogOpen)
	const handleDeleteDialogOpen = (id: string) => {
		setIsDeleteDialogOpen(!isDeletDialogOpen)
		selectedSupplierId.current = id
	}
	const handleEditDialog = (depot: ISupplier) => {
		setIsEditDialogOpen(!isEditDialogOpen)
		selectedSupplier.current = depot
	}

	return (
		<Fragment>
			<SidebarGroup>
				<SidebarGroupLabel>Suppliers</SidebarGroupLabel>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<a href="/suppliers">
								<Avatar className="h-6 w-6 rounded-lg">
									<AvatarFallback className="rounded-lg uppercase">AS</AvatarFallback>
								</Avatar>
								<span>All suppliers</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
					{suppliers.map((item) => (
						<SidebarMenuItem key={item.id}>
							<SidebarMenuButton asChild>
								<a href={`/supplier/${item.id}`}>
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
										<a href={`/supplier/${item.id}`}>
											<span>View supplier</span>
										</a>
									</DropdownMenuItem>
									<DropdownMenuItem className="cursor-pointer"
										onClick={() => handleEditDialog(item)}>
										<EditIcon className="text-muted-foreground" />
										<span>Edit Depot</span>
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
								<span>Add supplier</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroup>
			{selectedSupplier.current && <EditSupplier isOpen={isEditDialogOpen}
				onOpenChange={setIsEditDialogOpen} supplier={selectedSupplier.current} />}
			{selectedSupplierId.current !== "" && <DeleteSupplierDialog isOpen={isDeletDialogOpen}
				onOpenChange={setIsDeleteDialogOpen} id={selectedSupplierId.current} />}
		</Fragment>
	)
}