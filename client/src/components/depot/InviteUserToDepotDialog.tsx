import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import useAxiosPrivate from "@/hooks/user-axios-private"
import { useErrorHandler, useToast } from "@/hooks"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { IUser } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"

const API_ENDPOINT = '/user/all'

export function UserSearch({ value, setValue }:
	{ value: string, setValue: React.Dispatch<React.SetStateAction<string>> }) {
	const [open, setOpen] = useState(false)
	const [isUsersLoading, setIsUsersLoading] = useState(false)
	const [users, setUsers] = useState<IUser[]>([])
	const axios = useAxiosPrivate()
	const errorHandler = useErrorHandler()

	const get_all_users = () => {
		setIsUsersLoading(true)
		axios.get(API_ENDPOINT).then(response => {
			if (response && response.status && response.status === 200 && response.data && Array.isArray(response.data))
				setUsers([...response.data])
		}).catch(error => {
			errorHandler(error)
		}).finally(() => {
			setIsUsersLoading(false)
		})
	}

	useEffect(() => {
		get_all_users()
	}, [])
 
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" role="combobox" aria-expanded={open} disabled={isUsersLoading}
					className="w-full justify-between">
					{value && !isUsersLoading ? users.find((user) => user.id === value)?.username : "Select user..."}
					<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[375px] p-0">
				<Command>
					<CommandInput placeholder="Search user..." className="h-9" disabled={isUsersLoading} />
					<CommandList>
						<CommandEmpty>No user found.</CommandEmpty>
						<CommandGroup>
							{users.map((user) => (
								<CommandItem className="cursor-pointer"
									key={user.id}
									value={user.username}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? "" : user.id)
										setOpen(false)
									}}
								>
									<Avatar className="size-7 rounded-lg mr-2">
										<AvatarImage src={user.avatar} alt={`${user.username}`} />
										<AvatarFallback className="rounded-lg uppercase">
											{user.first_name.charAt(0) + user.last_name.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<span>{user.username}</span>
									<CheckIcon className={
										cn("ml-auto h-4 w-4", value === user.id ? "opacity-100" : "opacity-0")}/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export const InviteUserToDepotDialog = ({ isOpen, onOpenChange, id }:
	{ isOpen: boolean, id: string, onOpenChange: (open: boolean) => void }) => {

	const [isLoading, setIsLoading] = useState(false)
	const [value, setValue] = useState("")
	const axios = useAxiosPrivate()
	const errorHandler = useErrorHandler()
	const { toast } = useToast()

	const handleInvite = () => {
		setIsLoading(true)
		axios.patch(`depot/${id}/invite`, {
			userId: value
		}).then(response => {
			if (response && response.status && response.status === 200) {
				toast({
					title: "Success",
					description: "User added successfully",
					variant: "default",
				})				
			}
		}).catch(error => {
			errorHandler(error)
		}).finally(() => {
			setIsLoading(false)
			onOpenChange(false)
		})
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Invite User</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<DialogDescription>
						You are about to invite a user to this depot. Please enter their username.
					</DialogDescription>
					<UserSearch value={value} setValue={setValue}/>
				</div>
				<DialogFooter>
					<Button type="submit" variant="default" onClick={handleInvite} disabled={isLoading}>
						Invite
					</Button>
					<Button variant="secondary" onClick={() => onOpenChange(false)} disabled={isLoading}>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}