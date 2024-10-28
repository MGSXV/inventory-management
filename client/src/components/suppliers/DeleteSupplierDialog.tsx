import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useErrorHandler, useToast } from "@/hooks"
import { useAxiosPrivate } from "@/hooks"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useSupplier } from "@/context"

export const DeleteSupplierDialog = ({ isOpen, onOpenChange, id }:
	{ isOpen: boolean, id: string, onOpenChange: (open: boolean) => void }) => {

	const [isLoading, setIsLoading] = useState(false)
	const { suppliers, setSuppliers } = useSupplier()
	const axios = useAxiosPrivate()
	const errorHandler = useErrorHandler()
	const { toast } = useToast()

	const handleDelete = () => {
		setIsLoading(true)
		axios.delete(`/supplier/${id}`).then(response => {
			if (response && response.status && response.status === 200) {
				setSuppliers(suppliers.filter(supplier => supplier.id !== id))
				onOpenChange(false)
				toast({
					title: "Success",
					description: "Supplier deleted successfully",
					variant: "default",
				})
			}
		}).catch(error => {
			errorHandler(error)
		}).finally(() => {
			setIsLoading(false)
		})
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Are you sure?</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<DialogDescription>
						You are about to delete this supplier with all the products associated
						with it. This action cannot be undone.
					</DialogDescription>
				</div>
				<DialogFooter>
					<Button type="submit" variant="destructive" onClick={handleDelete} disabled={isLoading}>
						Yes, delete
					</Button>
					<Button variant="secondary" onClick={() => onOpenChange(false)} disabled={isLoading}>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}