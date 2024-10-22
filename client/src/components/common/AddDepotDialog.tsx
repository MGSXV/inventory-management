import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { axios_private } from "@/config/api"
import { useErrorHandler, useToast } from "@/hooks"
import { useDepot } from "@/context"
import { useEffect, useState } from "react"

interface IDepotInfo {
	name: string
	description?: string
	picture?: File
}

export const AddDepotDialog = ({ isOpen, onOpenChange }:
	{ isOpen: boolean, onOpenChange: (open: boolean) => void }) => {

	const errorHandler = useErrorHandler()
	const { toast } = useToast()
	const { depots, setDepots } = useDepot()
	const [isLoading, setIsLoading] = useState(false)

	const { register, handleSubmit, formState: { errors }, reset } = useForm<IDepotInfo>()
	const onSubmit = async (data: IDepotInfo) => {
		setIsLoading(true)
		const formData = new FormData()
		formData.append("name", data.name)
		if (data.description) formData.append('description', data.description);
		const fileInput = (data.picture as unknown as FileList)?.[0];
		if (data.picture) formData.append('file', fileInput);
		axios_private.post("/depot", formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			}, withCredentials: true
		}).then(response => {
			if (response && response.data && response.status && response.status === 201) {
				setDepots([...depots, response.data])
				toast({
					title: "Success",
					description: "Depot added successfully",
					variant: "default",
				})
				onOpenChange(false)
			}
		}).catch(error => {
			errorHandler(error)
		}).finally(() => {
			setIsLoading(false)
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
				<DialogTitle>Add new depot</DialogTitle>
				<DialogDescription>
					Add a new depot by adding a name, optionallu a description and an image
				</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="name" className="text-right">
					Name <span className="text-destructive">*</span>
					</Label>
					<Input id="name" placeholder="New depot" className="col-span-3" disabled={isLoading}
						{...register("name", { required: true, minLength: 4, maxLength: 20})}
						aria-invalid={errors.name ? true : false } />
				</div>
				<div className="grid grid-cols-4 items-start gap-4">
					<Label htmlFor="description" className="text-right">
					description
					</Label>
					<Textarea id="description" placeholder="description" className="col-span-3"
						{...register("description", { required: false, minLength: 4, maxLength: 200})}
						aria-invalid={errors.description ? true : false } disabled={isLoading} />
				</div>
				<div className="grid grid-cols-4 items-start gap-4">
					<Label htmlFor="picture">Picture</Label>
					<Input id="picture" type="file" className="col-span-3" disabled={isLoading}
						{...register("picture")} aria-invalid={errors.picture ? true : false } />
				</div>
				</div>
				<DialogFooter>
					<Button type="submit" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
						Add new depot
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
