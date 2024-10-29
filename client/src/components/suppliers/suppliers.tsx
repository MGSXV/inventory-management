import { Fragment, MouseEventHandler, useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AddCard, DeleteSupplierDialog, EditSupplier, SupplierCard } from "."
import { AddSupplier } from "."
import { useSupplier } from "@/context"
import { useAxiosPrivate, useErrorHandler } from "@/hooks"
import { ISupplier } from "@/types"

const AllSuppliers = ({ onclick }: { onclick: MouseEventHandler<HTMLDivElement> }) => {

	const { suppliers } = useSupplier()
	const selectedSupplier = useRef<ISupplier | null>(null)
	const selectedSupplierId = useRef("")
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isDeletDialogOpen, setIsDeleteDialogOpen] = useState(false)

	const handleEditDialog = (supplier: ISupplier) => {
		setIsEditDialogOpen(!isEditDialogOpen)
		selectedSupplier.current = supplier
	}

	const handleDeleteDialogOpen = (id: string) => {
		setIsDeleteDialogOpen(!isDeletDialogOpen)
		selectedSupplierId.current = id
	}

	return (
		<Fragment>
			<Card>
				<CardHeader>
					<CardTitle>Available suppliers</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<AddCard onclick={onclick} />
					{
						suppliers.map((supplier) => (
							<SupplierCard key={supplier.id} supplier={supplier}
								handleDeleteDialogOpen={() => handleDeleteDialogOpen(supplier.id)}
								handleEditDialog={() => handleEditDialog(supplier)} />
						))
					}
				</CardContent>	
			</Card>
			{selectedSupplier.current && <EditSupplier isOpen={isEditDialogOpen}
				onOpenChange={setIsEditDialogOpen} supplier={selectedSupplier.current} />}
			{selectedSupplierId.current !== "" && <DeleteSupplierDialog isOpen={isDeletDialogOpen}
				onOpenChange={setIsDeleteDialogOpen} id={selectedSupplierId.current} />}
		</Fragment>
	)
}

export const SuppliersDetails = () => {

	const [isOpen, setIsOpen] = useState(false)
	const handleOpen = () => setIsOpen(!isOpen)

	const errorHandler = useErrorHandler()
	const { setSuppliers } = useSupplier()
	const axios = useAxiosPrivate()

	const get_all_suppliers = async () => {
		axios.get("/supplier", { withCredentials: true }).then(response => {
			if (response && response.data && response.status === 200) {
				setSuppliers([...response.data])
			}
		}).catch(error => {
			errorHandler(error)
		})
	}

	useEffect(() => {
		get_all_suppliers()
	}, [])

	return (
		<Fragment>
			<div className="w-full h-fit flex flex-col gap-3">
				<h2 className="text-3xl font-bold tracking-tight">
					Suppliers
				</h2>
				<AllSuppliers onclick={handleOpen} />
			</div>
			<AddSupplier isOpen={isOpen} onOpenChange={handleOpen} />
		</Fragment>
	)
}
