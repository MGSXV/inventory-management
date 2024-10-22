import { getErrorMessage } from "@/config/errors"
import { useToast } from "."

export const useErrorHandler = () => {

	const { toast } = useToast()

	const errorHandler = (error: any) => {
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
	}
	return errorHandler
}