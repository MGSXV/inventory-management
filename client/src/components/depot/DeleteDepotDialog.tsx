import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useErrorHandler, useToast } from "@/hooks"
import { useAxiosPrivate } from "@/hooks"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useDepot } from "@/context"

export const DeleteDepotDialog = ({ isOpen, onOpenChange, id }:
	{ isOpen: boolean, id: string, onOpenChange: (open: boolean) => void }) => {

	const [isLoading, setIsLoading] = useState(false)
	const { depots, setDepots } = useDepot()
	const axios = useAxiosPrivate()
	const errorHandler = useErrorHandler()
	const { toast } = useToast()

	const handleDelete = () => {
		setIsLoading(true)
		axios.delete(`/depot/${id}`).then(response => {
			if (response && response.status && response.status === 200) {
				setDepots(depots.filter(depot => depot.id !== id))
				onOpenChange(false)
				toast({
					title: "Success",
					description: "Depot deleted successfully",
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
						You are about to delete this depot with all the products and categories associated
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