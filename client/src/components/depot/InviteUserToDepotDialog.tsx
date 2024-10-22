import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import useAxiosPrivate from "@/hooks/user-axios-private"
import { useAuth, useErrorHandler, useToast } from "@/hooks"
import {
	CalendarIcon,
	EnvelopeClosedIcon,
	FaceIcon,
	GearIcon,
	PersonIcon,
	RocketIcon,
} from "@radix-ui/react-icons"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command"
import { IUser } from "@/types"
	
export function CommandDemo() {

	const [isUsersLoading, setIsUsersLoading] = useState(false)
	const [users, setUsers] = useState<IUser[]>([])
	const axios = useAxiosPrivate()
	const errorHandler = useErrorHandler()
	const { user } = useAuth()

	const get_all_users = () => {
		setIsUsersLoading(true)
		axios.get('/users').then(response => {
			if (response && response.status && response.status === 200) {
				console.log(response)
				setUsers(response.data.filter((u: IUser) => u.id !== user?.id))
			}
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
		<Command className="rounded-lg border shadow-md md:min-w-[300px]">
			<CommandInput placeholder="Search for a user..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Suggestions">
				<CommandItem>
					<CalendarIcon />
					<span>Calendar</span>
				</CommandItem>
				<CommandItem>
					<FaceIcon />
					<span>Search Emoji</span>
				</CommandItem>
				<CommandItem disabled>
					<RocketIcon />
					<span>Launch</span>
				</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Settings">
				<CommandItem>
					<PersonIcon />
					<span>Profile</span>
					<CommandShortcut>⌘P</CommandShortcut>
				</CommandItem>
				<CommandItem>
					<EnvelopeClosedIcon />
					<span>Mail</span>
					<CommandShortcut>⌘B</CommandShortcut>
				</CommandItem>
				<CommandItem>
					<GearIcon />
					<span>Settings</span>
					<CommandShortcut>⌘S</CommandShortcut>
				</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	)
}

export const InviteUserToDepotDialog = ({ isOpen, onOpenChange, id }:
	{ isOpen: boolean, id: string, onOpenChange: (open: boolean) => void }) => {

	const [isLoading, setIsLoading] = useState(false)
	const axios = useAxiosPrivate()
	const errorHandler = useErrorHandler()
	const { toast } = useToast()

	const handleInvite = () => {
		setIsLoading(true)
		axios.patch(`/depot/${id}/add-user/:user_id`).then(response => {
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
					<CommandDemo />
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