import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { IDepot, IDepotInfo } from "@/types"
import { useForm } from "react-hook-form"
import { useAxiosPrivate, useErrorHandler, useToast } from "@/hooks"
import { useDepot } from "@/context"
import { useEffect, useState } from "react"

export const EditDepotDialog = ({ isOpen, onOpenChange, depot }:
	{ isOpen: boolean, depot: IDepot, onOpenChange: (open: boolean) => void }) => {

	const { register, handleSubmit, formState: { errors }, reset } = useForm<IDepotInfo>()
	const errorHandler = useErrorHandler()
	const { toast } = useToast()
	const { depots, setDepots } = useDepot()
	const [isLoading, setIsLoading] = useState(false)
	const axios = useAxiosPrivate()

	const onSubmit = async (data: IDepotInfo) => {
		setIsLoading(true)
		const formData = new FormData()
		formData.append("name", data.name)
		if (data.description) formData.append('description', data.description);
		const fileInput = (data.picture as unknown as FileList)?.[0];
		if (data.picture) formData.append('file', fileInput);
		axios.patch(`depot/${depot?.id}`, formData,  {
			headers: { "Content-Type": "multipart/form-data" },
			withCredentials: true
		}).then(response => {
			const new_depots = depots.map(depot => depot.id === response.data.id ? response.data : depot)
			setDepots(new_depots)
			toast({
				title: "Success",
				description: "Depot edited successfully",
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
					<DialogTitle>Edit depot</DialogTitle>
					<DialogDescription>
						You are about to edit this depot.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
						Name <span className="text-destructive">*</span>
						</Label>
						<Input id="name" placeholder="New depot" className="col-span-3" disabled={isLoading}
							{...register("name", { required: true, minLength: 4, maxLength: 20})}
							defaultValue={depot?.name || ""} aria-invalid={errors.name ? true : false } />
					</div>
					<div className="grid grid-cols-4 items-start gap-4">
						<Label htmlFor="description" className="text-right">
							description
						</Label>
						<Textarea id="description" placeholder="description" className="col-span-3"
							{...register("description", { required: false, minLength: 4, maxLength: 200})}
							defaultValue={depot?.description || ""} aria-invalid={errors.description ? true : false }
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
						Edit the depot
					</Button>
					<Button variant="secondary" onClick={() => onOpenChange(false)} disabled={isLoading}>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}