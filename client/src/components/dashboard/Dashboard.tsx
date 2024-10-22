import { DepotCards } from "@/components/depot";

const Dashboard = ({ onclick }: { onclick: any }) => {

	return (
		<div className="w-full h-fit flex flex-col gap-3">
			<h2 className="text-3xl font-bold tracking-tight">
				Dashboard
			</h2>
			<DepotCards onclick={onclick} />
		</div>
	);
}

export default Dashboard;