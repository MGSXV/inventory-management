import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks"
import { useState } from "react"
import { Signup } from "."
import { Login } from "."


const Authentication = () => {

	const { toast } = useToast()
	const [tab, setTab] = useState("login");

	const tabChange = () => setTab(tab === "login" ? "signup" : "login")

	return (
		<div className="w-full h-full flex items-center justify-center bg-pattern">
			<div className="bg-gray-100 px-4 py-6 shadow-2xl rounded-md">
				<Tabs defaultValue="login" value={tab} onValueChange={tabChange} id="form-container" className="w-[400px]">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="login">Login</TabsTrigger>
						<TabsTrigger value="signup">Signup</TabsTrigger>
					</TabsList>
					<Login toast={toast} />
					<Signup toast={toast} setTab={tabChange} />
				</Tabs>
			</div>
		</div>
	)
}

export default Authentication;