import { useDepot } from "@/hooks";
import { useEffect } from "react";

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
		<div>
			<h1>Dashboard</h1>
		</div>
	);
}

export default Dashboard;