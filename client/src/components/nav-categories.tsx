import { ICategory } from "@/types"
import { Fragment, useRef, useState } from "react"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EditIcon, MoreHorizontal, PlusIcon, Trash2, ViewIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu"
import { AddCategory } from "./category"

export const NavCategories = ({ categories }: { categories: ICategory[] }) => {

	const { isMobile } = useSidebar()
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isDeletDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const handleOpen = () => setIsAddDialogOpen(!isAddDialogOpen)

	const selectedCategoryId = useRef("")
	const selectedCategory = useRef<ICategory | null >(null)

	const handleEditDialog = (category: ICategory) => {
		setIsEditDialogOpen(!isEditDialogOpen)
		selectedCategory.current = category
	}
	const handleDeleteDialogOpen = (id: string) => {
		setIsDeleteDialogOpen(!isDeletDialogOpen)
		selectedCategoryId.current = id
	}

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
					{
						categories.map(item => (
							<SidebarMenuItem key={item.id}>
								<SidebarMenuButton asChild>
									<a href={`/category/${item.id}`}>
										<Avatar className="h-6 w-6 rounded-lg">
											<AvatarImage src={item.image_url} />
											<AvatarFallback className="rounded-lg uppercase">
												{`${item.name[0]}${item.name[1]}`}
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
											<a href={`/category/${item.id}`}>
												<span>View Category</span>
											</a>
										</DropdownMenuItem>
										<DropdownMenuItem className="cursor-pointer"
											onClick={() => handleEditDialog(item)}>
											<EditIcon className="text-muted-foreground" />
											<span>Edit Category</span>
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
						))
					}
					<SidebarMenuItem>
						<SidebarMenuButton asChild onClick={handleOpen} className="cursor-pointer">
							<div>
								<PlusIcon className="text-muted-foreground size-20" />
								<span>Add category</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroup>
			<AddCategory isOpen={isAddDialogOpen} onOpenChange={handleOpen} />
		</Fragment>
	)
}