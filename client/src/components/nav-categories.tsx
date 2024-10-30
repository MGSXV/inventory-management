import { ICategory } from "@/types"
import { Fragment, useRef, useState } from "react"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronRight, EditIcon, MoreHorizontal, PlusIcon, Trash2, ViewIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { AddCategory } from "./category"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export const NavCategories = ({ categories }: { categories: ICategory[] }) => {

	const { isMobile } = useSidebar()
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isDeletDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const handleOpen = () => setIsAddDialogOpen(!isAddDialogOpen)

	const selectedCategoryId = useRef("")
	const parentID = useRef("")
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
							<Collapsible key={item.id} asChild defaultOpen={false}>
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
										<DropdownMenuTrigger asChild className="right-7">
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
									<CollapsibleTrigger asChild className="right-1">
										<SidebarMenuAction className="data-[state=open]:rotate-90">
											<ChevronRight />
											<span className="sr-only">Toggle</span>
										</SidebarMenuAction>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.childCategories && item.childCategories.length > 0 && (
												<Fragment>
													{item.childCategories.map(child => (
														<SidebarMenuSubItem key={child.id}>
															<SidebarMenuSubButton asChild>
															<a href={`category/${child.id}`}>
																<span>{child.name}</span>
															</a>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													))}
												</Fragment>
											)}
											<SidebarMenuSubItem>
												<SidebarMenuSubButton asChild onClick={() => {
													parentID.current = item.id
													handleOpen()
												}} className="cursor-pointer">
												<div>
													<PlusIcon className="text-muted-foreground size-20" />
													<span>Add Subcategory</span>
												</div>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										</SidebarMenuSub>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
						))
					}
					<SidebarMenuItem>
						<SidebarMenuButton asChild onClick={() => {
							parentID.current = ""
							handleOpen()
						}} className="cursor-pointer">
							<div>
								<PlusIcon className="text-muted-foreground size-20" />
								<span>Add category</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroup>
			<AddCategory isOpen={isAddDialogOpen} onOpenChange={handleOpen} parent_category={parentID.current} />
		</Fragment>
	)
}