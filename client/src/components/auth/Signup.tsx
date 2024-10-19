import { TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { axios } from "@/config/api"
import { useForm, SubmitHandler } from "react-hook-form"
import { useRef, useState } from "react"
import { getErrorMessage } from "@/config/errors"

const SIGNUP_ENDPOINT = "/auth/local/signup"
const USERNAME_REGEX = /^[A-Za-z0-9]+$/i
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_#@$%]).+$/

interface ISignup {
	first_name: string
	last_name: string
	username: string
	password: string
	repeat_password: string
}

const Signup = ({ toast, setTab }: { toast: any, setTab: Function }) => {

	const [isLoading, setIsLoading] = useState(false)
	const signup_button = useRef<HTMLButtonElement>(null)
	const { register, handleSubmit, formState: { errors }} = useForm<ISignup>()

	const signup = (data: ISignup) => {
		setIsLoading(true)
		console.log(data)
		axios.post(SIGNUP_ENDPOINT, {
			username: data.username,
			password: data.password,
			first_name: data.first_name,
			last_name: data.last_name
		}, {
			headers: { 'Content-Type': 'application/json' },
			withCredentials: true
		}).then(response => {
			console.log(response)
			setTab()
		}).catch(error => {
			console.log(error)
			if (!error) {
				toast({
					title: "Error",
					description: "No server response",
					variant: "destructive",
				})
				return
			}
			if (error.code && error.code === "ERR_NETWORK") {
				toast({
					title: "Error",
					description: "Network error",
					variant: "destructive",
				})
				return
			}
			toast({
				title: "Error",
				description: getErrorMessage(error.response.data),
				variant: "destructive",
			})
		}).finally(() => {
			setIsLoading(false)
		})
	}

	const onSubmit: SubmitHandler<ISignup> = data => signup(data)

	return (
		<TabsContent value="signup">
			<Card>
				<CardHeader>
					<CardTitle>Signup</CardTitle>
				</CardHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent className="space-y-2">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
							<div>
								<Label htmlFor="first">First name</Label>
								<Input id="first" type="signup" disabled={isLoading} placeholder="first name..."
									{...register('first_name', { required: true })}
									aria-invalid={errors.first_name ? true : false } />
							</div>
							<div>
								<Label htmlFor="last">Last name</Label>
								<Input id="last" type="signup" disabled={isLoading} placeholder="last name..."
									{...register('last_name', { required: true })}
									aria-invalid={errors.last_name ? true : false } />
							</div>
						</div>
						<div className="space-y-1">
							<Label htmlFor="username">Username</Label>
							<Input id="username" type="text" disabled={isLoading} placeholder="Username..."
								{...register('username', { required: true, minLength: 4, maxLength: 20, pattern: USERNAME_REGEX  })}
								aria-invalid={errors.username ? true : false } />
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
							<div>
								<Label htmlFor="password">Password</Label>
								<Input id="password" type="password" disabled={isLoading} placeholder="Password..."
									{...register('password', { required: true, minLength: 8, pattern: PASSWORD_REGEX })}
									aria-invalid={errors.password ? true : false } />
							</div>
							<div>
								<Label htmlFor="repeat">Repeat password</Label>
								<Input id="repeat" type="password" disabled={isLoading} placeholder="Repeate password..."
									{...register('repeat_password', { required: true, minLength: 8, pattern: PASSWORD_REGEX })}
									aria-invalid={errors.repeat_password ? true : false } />
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button  ref={signup_button} disabled={isLoading}>
								{isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : null}
								{isLoading ? "Wait..." : "Signup"}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</TabsContent>
	)
}

export default Signup