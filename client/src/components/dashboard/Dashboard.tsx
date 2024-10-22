import { DepotCards } from ".";

const Dashboard = () => {

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