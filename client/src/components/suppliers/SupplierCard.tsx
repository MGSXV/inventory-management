import { ISupplier } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import defaultSupplier from "@/assets/images/default-supplier.png"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EditIcon, MoreHorizontal, Trash2, ViewIcon } from "lucide-react"

export const SupplierCard = ({ supplier, handleEditDialog, handleDeleteDialogOpen }: {
		supplier: ISupplier,
		handleEditDialog: (supplier: ISupplier) => void,
		handleDeleteDialogOpen: (id: string) => void
	}) => {

	const navigator = useNavigate()

	return (
		<Card className="cursor-pointer flex flex-col justify-center items-start pt-6">
			<CardContent className="flex w-full items-center justify-center flex-1">
				<div className="relative flex flex-col w-full h-full max-w-xs overflow-hidden rounded-lg">
					<div className="flex items-center justify-center w-full aspect-w-1 aspect-h-1 rounded-xl overflow-hidden mb-5">
						<img className="object-cover w-full" src={supplier.image_url || defaultSupplier} alt="product image" />
					</div>
					<div className="flex flex-col flex-1 gap-y-4">
						<div className="flex flex-col gap-y-2">
							<a href={`/supplier/${supplier.id}`}>
								<h5 className="text-lg lg:text-xl font-bold tracking-tight truncate">
								{supplier.name}
								</h5>
							</a>
							<p className="text-base truncate">
								{supplier.description || "View..."}
							</p>
						</div>
						<div className="flex flex-row w-full justify-between gap-x-3">
							<Button onClick={() => navigator(`/supplier/${supplier.id}`)} variant="outline" 
								className="flex flex-grow">View Supplier</Button>
							<DropdownMenu>
								<DropdownMenuTrigger>
									<MoreHorizontal />
									<span className="sr-only">More</span>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-48">
									<DropdownMenuItem>
										<ViewIcon className="text-muted-foreground" />
										<a href={`/supplier/${supplier.id}`}>
											<span>View Supplier</span>
										</a>
									</DropdownMenuItem>
									<DropdownMenuItem className="cursor-pointer"
										onClick={() => handleEditDialog(supplier)}>
										<EditIcon className="text-muted-foreground" />
										<span>Edit Supplier</span>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem className="cursor-pointer"
										onClick={() => handleDeleteDialogOpen(supplier.id)}>
										<Trash2 className="text-muted-foreground" />
										<span>Delete Supplier</span>
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