import { useDepot } from "@/hooks";
import { useEffect } from "react";
import { DepotCards } from ".";

const Dashboard = () => {

	const get_depot = useDepot()

	useEffect(() => {
		async function depots() {
			const depots = await get_depot()
			console.log(depots)
		}
		depots()
	}, [])

	return (
		<div className="w-full h-fit flex flex-col gap-3">
			<h2 className="text-3xl font-bold tracking-tight">
				Dashboard
			</h2>
			<DepotCards />
		</div>
	);
}

export default Dashboard;