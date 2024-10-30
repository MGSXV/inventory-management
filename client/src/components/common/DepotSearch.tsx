import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDepot } from "@/context"
import { useState } from "react"

export function DepotSearch({ selected_depot }:
	{ selected_depot: React.MutableRefObject<string> }) {
	const [open, setOpen] = useState(false)
	const { depots } = useDepot()
 
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild className="w-full">
				<Button variant="outline" role="combobox" aria-expanded={open}
					className="w-full justify-between">
					{selected_depot.current !== "" ?
						depots.find((depot) => depot.id === selected_depot.current)?.name :
						"Select depot..."}
					<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[375px] p-0">
				<Command>
					<CommandInput placeholder="Search depot..." className="h-9" />
					<CommandList>
						<CommandEmpty>No depot found.</CommandEmpty>
						<CommandGroup>
							{depots.map((depot) => (
								<CommandItem className="cursor-pointer"
									key={depot.id}
									value={depot.name}
									onSelect={() => {
										selected_depot.current = depot.id
										setOpen(false)
									}}>
									<span>{depot.name}</span>
									<CheckIcon className={
										cn("ml-auto h-4 w-4", selected_depot.current === depot.id ? "opacity-100" : "opacity-0")}/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
