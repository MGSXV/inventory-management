import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAxiosPrivate, useErrorHandler, useToast } from "@/hooks"
import { useForm } from "react-hook-form"
import { useSupplier } from "@/context"
import { useEffect, useState } from "react"
import { ISupplier, ISupplierInfo } from "@/types"

export const EditSupplier = ({ isOpen, onOpenChange, supplier }:
	{ isOpen: boolean, supplier: ISupplier, onOpenChange: (open: boolean) => void }) => {

	const { register, handleSubmit, formState: { errors }, reset } = useForm<ISupplierInfo>()
	const errorHandler = useErrorHandler()
	const { toast } = useToast()
	const { suppliers, setSuppliers } = useSupplier()
	const [isLoading, setIsLoading] = useState(false)
	const axios = useAxiosPrivate()

	const onSubmit = async (data: ISupplierInfo) => {
		setIsLoading(true)
		const formData = new FormData()
		formData.append("name", data.name)
		if (data.description) formData.append('description', data.description);
		const fileInput = (data.picture as unknown as FileList)?.[0];
		if (data.picture) formData.append('file', fileInput);
		axios.patch(`supplier/${supplier.id}`, formData,  {
			headers: { "Content-Type": "multipart/form-data" },
			withCredentials: true
		}).then(response => {
			console.log(response)
			const new_suppliers = suppliers.map(supplier => supplier.id === response.data.id ? response.data : supplier)
			setSuppliers(new_suppliers)
			toast({
				title: "Success",
				description: "Supplier edited successfully",
				variant: "default",
			})
			onOpenChange(false)
		}).catch(error => errorHandler(error)).finally(() => {
			setIsLoading(false)
			onOpenChange(false)
		})
	}

	useEffect(() => {
		if (isOpen)
			reset();
	}, [isOpen])

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit supplier</DialogTitle>
					<DialogDescription>
						You are about to edit this supplier.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
						Name <span className="text-destructive">*</span>
						</Label>
						<Input id="name" placeholder="Supplier name" className="col-span-3" disabled={isLoading}
							{...register("name", { required: true, minLength: 4, maxLength: 20})}
							defaultValue={supplier.name || ""} aria-invalid={errors.name ? true : false } />
					</div>
					<div className="grid grid-cols-4 items-start gap-4">
						<Label htmlFor="description" className="text-right">
							description
						</Label>
						<Textarea id="description" placeholder="description" className="col-span-3"
							{...register("description", { required: false, minLength: 4, maxLength: 200})}
							defaultValue={supplier.description || ""} aria-invalid={errors.description ? true : false }
							disabled={isLoading} />
					</div>
					<div className="grid grid-cols-4 items-start gap-4">
						<Label htmlFor="picture">Picture</Label>
						<Input id="picture" type="file" className="col-span-3" disabled={isLoading}
							{...register("picture")} aria-invalid={errors.picture ? true : false } />
					</div>
				</div>
				<DialogFooter>
					<Button type="submit" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
						Edit the supplier
					</Button>
					<Button variant="secondary" onClick={() => onOpenChange(false)} disabled={isLoading}>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}