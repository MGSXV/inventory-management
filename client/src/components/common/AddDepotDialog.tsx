import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { axios_private } from "@/config/api"

interface IDepotInfo {
	name: string
	description?: string
	picture?: string
}

export const AddDepotDialog = ({ isOpen, onOpenChange }:
	{ isOpen: boolean, onOpenChange: (open: boolean) => void }) => {

		const { register, handleSubmit, formState: { errors } } = useForm<IDepotInfo>()
		const onSubmit = async (data: IDepotInfo) => {
			axios_private.post("/depot", data).then(response => {
				console.log(response)
			}).catch(error => {
				console.log(error)
			})
		}
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
					<Input id="name" placeholder="New depot" className="col-span-3"
						{...register("name", { required: true, minLength: 4, maxLength: 20})}
						aria-invalid={errors.name ? true : false } />
				</div>
				<div className="grid grid-cols-4 items-start gap-4">
					<Label htmlFor="description" className="text-right">
					description
					</Label>
					<Textarea id="description" placeholder="description" className="col-span-3"
						{...register("description", { required: false, minLength: 4, maxLength: 200})}
						aria-invalid={errors.description ? true : false } />
				</div>
				<div className="grid grid-cols-4 items-start gap-4">
					<Label htmlFor="picture">Picture</Label>
					<Input id="picture" type="file" className="col-span-3"
						{...register("picture")} aria-invalid={errors.picture ? true : false } />
				</div>
				</div>
				<DialogFooter>
					<Button type="submit" onClick={handleSubmit(onSubmit)}>Add new depot</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
