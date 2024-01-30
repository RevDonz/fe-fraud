"use client";

import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	User,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NavbarComponent = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	const Menus = [
		{
			name: "Assesment Risiko",
			url: "/assesment",
		},
		{
			name: "Laporan Keuangan",
			url: "/laporan",
		},
		{
			name: "Data Staff",
			url: "/data-staff",
		},
	];

	return (
		<Navbar
			maxWidth="xl"
			isBordered
			onMenuOpenChange={setIsMenuOpen}
			classNames={{
				item: [
					"flex",
					"relative",
					"h-full",
					"items-center",
					"data-[active=true]:after:content-['']",
					"data-[active=true]:after:absolute",
					"data-[active=true]:after:bottom-0",
					"data-[active=true]:after:left-0",
					"data-[active=true]:after:right-0",
					"data-[active=true]:after:h-[2px]",
					"data-[active=true]:after:rounded-[2px]",
					"data-[active=true]:after:bg-primary",
				],
			}}
		>
			<NavbarBrand>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="sm:hidden"
				/>
				<p className="font-bold text-inherit ml-3 sm:m-0">
					Fraud Deterrence Propeller
				</p>
			</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{Menus.map((menu) => {
					return (
						<NavbarItem key={menu.name} isActive={menu.url === pathname}>
							<Link
								color={menu.url === pathname ? "primary" : "foreground"}
								href={menu.url}
							>
								{menu.name}
							</Link>
						</NavbarItem>
					);
				})}
			</NavbarContent>
			<NavbarContent justify="end">
				<Dropdown placement="bottom-end">
					<DropdownTrigger>
						<User
							as="button"
							avatarProps={{
								isBordered: true,
								src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
							}}
							className="transition-transform"
							description="admin"
							name="John Doe"
						/>
					</DropdownTrigger>
					<DropdownMenu aria-label="User Actions" variant="flat">
						<DropdownItem
							isReadOnly
							key="theme"
							className="cursor-default"
							endContent={
								<select
									className="z-10 outline-none w-20 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
									id="theme"
									name="theme"
								>
									<option>System</option>
									<option>Dark</option>
									<option>Light</option>
								</select>
							}
						>
							Theme
						</DropdownItem>
						<DropdownItem key="logout" color="danger">
							Log Out
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</NavbarContent>
			<NavbarMenu>
				{Menus.map((menu) => (
					<NavbarMenuItem key={menu.name}>
						<Link
							className="w-full"
							href={menu.url}
							color={menu.url === pathname ? "primary" : "foreground"}
						>
							{menu.name}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
};

export default NavbarComponent;
