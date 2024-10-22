import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusIcon } from "@radix-ui/react-icons"
import { MouseEventHandler } from "react"

const AddCard = ({ onclick }: { onclick: MouseEventHandler<HTMLDivElement> }) => {

	return (
		<Card className={`flex items-center justify-center cursor-pointer transition-colors duration-300
			hover:text-secondary`} onClick={onclick}>
			<CardContent className="m-0 p-0">
				<PlusIcon className="size-28" />
			</CardContent>
		</Card>
	)
}

export const DepotCards = ({ onclick }: { onclick: MouseEventHandler<HTMLDivElement> }) => {

	return (
		<Card>
			<CardHeader>
				<CardTitle>Available depots</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<AddCard onclick={onclick} />
				<div className="bg-green-200 h-40"></div>
				<div className="bg-blue-200 h-40"></div>
				<div className="bg-yellow-200 h-40"></div>
				<div className="bg-violet-200 h-40"></div>
				<div className="bg-orange-200 h-40"></div>
				<div className="bg-amber-200 h-40"></div>
				<div className="bg-pink-200 h-40"></div>
			</CardContent>
		</Card>
	)
}