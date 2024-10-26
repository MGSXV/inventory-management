import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDepot } from "@/context"
import { IDepot } from "@/types"
import { PlusIcon } from "@radix-ui/react-icons"
import { MouseEventHandler } from "react"
import defaultDepot from "@/assets/images/default-depot.png"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"

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

const DepotCard = ({ depot }: { depot: IDepot }) => {

	const navigator = useNavigate()

	return (
		<Card className="cursor-pointer flex flex-col justify-center items-start pt-6">
			<CardContent className="flex w-full items-center justify-center flex-1">
				<div className="relative flex flex-col w-full h-full max-w-xs overflow-hidden rounded-lg">
					<div className="flex items-center justify-center w-full aspect-w-1 aspect-h-1 rounded-xl overflow-hidden mb-5">
						<img className="object-cover w-full" src={depot.image_url || defaultDepot} alt="product image" />
					</div>
					<div className="flex flex-col flex-1 gap-y-4">
						<div className="flex flex-col gap-y-2">
							<a href={`/depot/${depot.id}`}>
								<h5 className="text-lg lg:text-xl font-bold tracking-tight truncate">
								{depot.name}
								</h5>
							</a>
							<p className="text-base truncate">
								{depot.description || ""}
							</p>
						</div>
						<Button onClick={() => navigator(`/depot/${depot.id}`)} variant="outline" >View Depot</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export const DepotCards = ({ onclick }: { onclick: MouseEventHandler<HTMLDivElement> }) => {

	const { depots } = useDepot()

	return (
		<Card>
			<CardHeader>
				<CardTitle>Available depots</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<AddCard onclick={onclick} />
				{
					depots.map((depot) => (
						<DepotCard key={depot.id} depot={depot} />
					))
				}
			</CardContent>
		</Card>
	)
}