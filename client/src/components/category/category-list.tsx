import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCategory } from "@/context"
import { ICategory } from "@/types"
import { Fragment, MouseEventHandler, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { EditIcon, MoreHorizontal, PlusIcon, Trash2, ViewIcon } from "lucide-react"
import defaultDepot from "@/assets/images/default-depot.png" 
import { EditCategory } from "."
import { DeleteCategory } from "."

export const AddCard = ({ onclick }: { onclick: MouseEventHandler<HTMLDivElement> }) => {

	return (
		<Card className={`flex items-center justify-center cursor-pointer transition-colors duration-300
			hover:text-secondary`} onClick={onclick}>
			<CardContent className="m-0 p-0">
				<PlusIcon className="size-28" />
			</CardContent>
		</Card>
	)
}

export const CategoryCard = ({ category, handleEditDialog, handleDeleteDialogOpen }: {
		category: ICategory,
		handleEditDialog: (category: ICategory) => void,
		handleDeleteDialogOpen: (id: string) => void
	}) => {

	const navigator = useNavigate()

	return (
		<Card className="cursor-pointer flex flex-col justify-center items-start pt-6">
			<CardContent className="flex w-full items-center justify-center flex-1">
				<div className="relative flex flex-col w-full h-full max-w-xs overflow-hidden rounded-lg">
					<div className="flex items-center justify-center w-full aspect-w-1 aspect-h-1 rounded-xl overflow-hidden mb-5">
						<img className="object-cover w-full" src={category.image_url || defaultDepot} alt="product image" />
					</div>
					<div className="flex flex-col flex-1 gap-y-4">
						<div className="flex flex-col gap-y-2">
							<a href={`/category/${category.id}`}>
								<h5 className="text-lg lg:text-xl font-bold tracking-tight truncate">
								{category.name}
								</h5>
							</a>
							<p className="text-base truncate">
								{category.description || "View..."}
							</p>
						</div>
						<div className="flex flex-row w-full justify-between gap-x-3">
							<Button onClick={() => navigator(`/category/${category.id}`)} variant="outline" 
								className="flex flex-grow">View Category</Button>
							<DropdownMenu>
								<DropdownMenuTrigger>
									<MoreHorizontal />
									<span className="sr-only">More</span>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-48">
									<DropdownMenuItem>
										<ViewIcon className="text-muted-foreground" />
										<a href={`/category/${category.id}`}>
											<span>View Category</span>
										</a>
									</DropdownMenuItem>
									<DropdownMenuItem className="cursor-pointer"
										onClick={() => handleEditDialog(category)}>
										<EditIcon className="text-muted-foreground" />
										<span>Edit Category</span>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem className="cursor-pointer"
										onClick={() => handleDeleteDialogOpen(category.id)}>
										<Trash2 className="text-muted-foreground" />
										<span>Delete Category</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export const AllCategories = ({ onclick }: { onclick: MouseEventHandler<HTMLDivElement> }) => {

	const { categories } = useCategory()
	const selectedCategory = useRef<ICategory | null>(null)
	const selectedCategoryId = useRef("")
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isDeletDialogOpen, setIsDeleteDialogOpen] = useState(false)

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
			<Card>
				<CardHeader>
					<CardTitle>Available categorys</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<AddCard onclick={onclick} />
					{
						categories.map((category) => (
							<CategoryCard key={category.id} category={category}
								handleDeleteDialogOpen={() => handleDeleteDialogOpen(category.id)}
								handleEditDialog={() => handleEditDialog(category)} />
						))
					}
				</CardContent>	
			</Card>
			{selectedCategory.current && <EditCategory isOpen={isEditDialogOpen} parent_id=""
				onOpenChange={setIsEditDialogOpen} category={selectedCategory.current} />}
			{selectedCategoryId.current !== "" && <DeleteCategory isOpen={isDeletDialogOpen} parent_id=""
				onOpenChange={setIsDeleteDialogOpen} id={selectedCategoryId.current} />}
		</Fragment>
	)

}

export const CategoryList = () => {

	const [isOpen, setIsOpen] = useState(false)
	const handleOpen = () => setIsOpen(!isOpen)

	return (
		<Fragment>
			<div className="w-full h-fit flex flex-col gap-3">
				<h2 className="text-3xl font-bold tracking-tight">
					Categories
				</h2>
				<AllCategories onclick={handleOpen} />
			</div>
		</Fragment>
	)
}