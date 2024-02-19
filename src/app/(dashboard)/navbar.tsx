"use client";

import {
	Avatar,
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
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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
			url: "/report",
		},
		{
			name: "Data Staff",
			url: "/data-staff",
		},
	];

	const handleSignOut = async () => {
		const signout = signOut();
		toast.promise(signout, {
			loading: "Loading..",
			success: () => {
				return "Logout berhasil!";
			},
			error: () => {
				return "Logout gagal!";
			},
		});
	};

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
						<Avatar
							isBordered
							as="button"
							className="transition-transform"
							src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
						/>
					</DropdownTrigger>
					<DropdownMenu aria-label="Profile Actions" variant="flat">
						<DropdownItem key="profile" className="h-14 gap-2">
							<p className="font-semibold">Signed in as</p>
							<p className="font-semibold">John Doe</p>
						</DropdownItem>
						<DropdownItem key="settings">My Settings</DropdownItem>
						<DropdownItem key="logout" color="danger" onClick={handleSignOut}>
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
