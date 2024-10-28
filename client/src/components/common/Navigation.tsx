
import { useEffect, useState } from "react";
import {
	NavigationMenu,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface RouteProps {
	href: string;
	label: string;
}

const routeList: RouteProps[] = [
	{
		href: "/suppliers",
		label: "Suppliers",
	},
	{
		href: "/categories",
		label: "Categories",
	},
];

export const Navbar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		const menu_list = document.getElementById("menu-list") as HTMLElement;
		const first_child = menu_list.children[1] as HTMLElement;
		first_child.style.width = "100%";
	}, [])

	return (
		<header className="top-0 z-40 w-full bg-sidebar rounded-lg border border-sidebar-border shadow">
			<NavigationMenu id="menu-list" className="w-full max-w-full flex flex-row">
				<span className="font-bold flex ml-4">
					<SidebarTrigger />
				</span>
				<NavigationMenuList className="container h-14 px-4 w-full flex justify-between">
					{/* mobile */}
					<span className="flex md:hidden">
						<ModeToggle />
						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger className="px-2">
								<Menu className="flex md:hidden h-5 w-5" onClick={() => setIsOpen(true)}>
									<span className="sr-only">Menu Icon</span>
								</Menu>
							</SheetTrigger>
							<SheetContent side={"left"}>
								<SheetHeader>
									<SheetTitle className="font-bold text-xl">
										Shadcn/React
									</SheetTitle>
								</SheetHeader>
								<nav className="flex flex-col justify-center items-center gap-2 mt-4">
									{routeList.map(({ href, label }: RouteProps) => (
										<a rel="noreferrer noopener" key={label} href={href} 
											onClick={() => setIsOpen(false)}
											className={buttonVariants({ variant: "ghost" })}>
											{label}
										</a>
									))}
									<a rel="noreferrer noopener" href="https://github.com/MGSXV" target="_blank"
										className={`w-[110px] border ${buttonVariants({
											variant: "secondary",
										})}`}>
										<GitHubLogoIcon className="mr-2 w-5 h-5" />
										Github
									</a>
								</nav>
							</SheetContent>
						</Sheet>
					</span>

					{/* desktop */}
					<nav className="hidden md:flex gap-2">
						{routeList.map((route: RouteProps, i) => (
							<a
								rel="noreferrer noopener"
								href={route.href}
								key={i}
								className={`text-[17px] ${buttonVariants({
									variant: "ghost",
								})}`}
							>
								{route.label}
							</a>
						))}
					</nav>

					<div className="hidden md:flex gap-2">
						<a rel="noreferrer noopener" href="https://github.com/MGSXV" target="_blank"
							className={`border ${buttonVariants({ variant: "secondary" })}`} >
							<GitHubLogoIcon className="mr-2 w-5 h-5" />
							Github
						</a>
						<ModeToggle />
					</div>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
};