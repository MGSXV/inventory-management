import { TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { axios } from "@/config/api"
import { getErrorMessage } from "@/config/errors"
import { useAuth } from "@/hooks"
import { IUser } from "@/types"
import { useForm, SubmitHandler } from "react-hook-form"
import { useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const LOGIN_ENDPOINT = "/auth/local/signin"

const USERNAME_REGEX = /^[A-Za-z0-9]+$/i
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_#@$%]).+$/

interface ILogin {
	username: string
	password: string
}

const Login = ({ toast }: { toast: any }) => {

	const [isLoading, setIsLoading] = useState(false)
	const login_button = useRef<HTMLButtonElement>(null)
	const { register, handleSubmit, formState: { errors } } = useForm<ILogin>()
	const { handleSetUser } = useAuth()
	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || '/'

	const login = (data: ILogin) => {
		setIsLoading(true)
		axios.post(LOGIN_ENDPOINT, {
			username: data.username,
			password: data.password,	
		}, {
			headers: { 'Content-Type': 'application/json' },
			withCredentials: true
		}).then(response => {
			handleSetUser(response.data.message as IUser)
			navigate(from, { replace: true })
		}).catch(error => {
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

	const onSubmit: SubmitHandler<ILogin> = (data) => login(data)

	return (
		<TabsContent value="login">
			<Card>
				<CardHeader>
					<CardTitle>Login</CardTitle>
				</CardHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent className="space-y-2">
						<div className="space-y-1">
							<Label htmlFor="username">Username</Label>
							<Input id="username" disabled={isLoading} placeholder="username..."
								{...register('username', { required: true, minLength: 4, maxLength: 20, pattern: USERNAME_REGEX  })}
								aria-invalid={errors.username ? true : false } />
						</div>
						<div className="space-y-1">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" disabled={isLoading} placeholder="password..."
								{...register('password', { required: true, minLength: 8, pattern: PASSWORD_REGEX })}
								aria-invalid={errors.password ? true : false } />
						</div>
					</CardContent>
					<CardFooter>
						<Button ref={login_button} type="submit" disabled={isLoading}>
							{isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : null}
							{isLoading ? "Wait..." : "Login"}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</TabsContent>
	)
}

export default Login