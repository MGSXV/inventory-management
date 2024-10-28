import { MouseEventHandler } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { PlusIcon } from "lucide-react"

export const AddCard = ({ onclick }: { onclick: MouseEventHandler<HTMLDivElement> }) => {

	return (
		<Card className={`flex items-center justify-center cursor-pointer transition-colors duration-300
			hover:text-secondary`} onClick={onclick}>
			<CardContent className="m-0 p-0">
				<PlusIcon className="size-28" />
			</CardContent>
		</Card>
	)
}