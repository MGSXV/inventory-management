import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useAxiosPrivate, useErrorHandler } from "@/hooks"
import { useCategory } from "@/context"

export const DeleteCategory = ({ isOpen, onOpenChange, id, parent_id }:
	{ isOpen: boolean, id: string, parent_id: string, onOpenChange: (open: boolean) => void }) => {

	const [isLoading, setIsLoading] = useState(false)
	const { categories, setCategories } = useCategory()
	const axios = useAxiosPrivate()
	const errorHandler = useErrorHandler()

	const handleDelete = () => {
		setIsLoading(true)
		axios.delete(`/category/${id}`).then(response => {
			if (response.status === 200) {
				if (parent_id !== '') {
					const newCategories = categories.map(category => {
						if (category.childCategories) {
							category.childCategories = category.childCategories.filter(child => child.id !== id)
						}
						return category
					})
					setCategories(newCategories)
				} else {
					setCategories(categories.filter(category => category.id !== id))
				}
			}
		}).catch(error => errorHandler(error)).finally(() => {
			setIsLoading(false)
			onOpenChange(false)
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
						You are about to delete this category with all the products and categories associated
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