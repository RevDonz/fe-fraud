"use client";

import {
	Button,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from "@nextui-org/react";

const NavbarComponent = () => {
	const Menus = [
		{
			name: "Assesment Risiko",
			url: "assesment",
		},
		{
			name: "Laporan Keuangan",
			url: "laporan",
		},
		{
			name: "Data Staff",
			url: "data-staff",
		},
	];

	return (
		<Navbar maxWidth="xl" isBordered>
			<NavbarBrand>
				<p className="font-bold text-inherit">Fraud Deterrence Propeller</p>
			</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{Menus.map((menu) => {
					return (
						<NavbarItem key={menu.name} >
							<Link color="foreground" href={menu.url}>{menu.name}</Link>
						</NavbarItem>
					);
				})}
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem className="hidden lg:flex">
					<Link href="#">Login</Link>
				</NavbarItem>
				<NavbarItem>
					<Button as={Link} color="primary" href="#" variant="flat">
						Sign Up
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};

export default NavbarComponent;
