"use client";

import { ListMenuNavbar, type MenuItem } from "@/constant/navbar-menu";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@nextui-org/react";
import { ChevronDown } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const NavbarComponent = ({
	name,
	role,
	email,
}: { name: string; role: string; email: string }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	const isAuthPage = ["/", "/auth/login", "/auth/register"].includes(pathname);
	let Menus: MenuItem[] = [];

	if (isAuthPage) {
		Menus = ListMenuNavbar.landingPage;
	} else if (role === "admin") {
		Menus = ListMenuNavbar.admin;
	} else if (role === "super_admin") {
		Menus = ListMenuNavbar.super_admin;
	} else if (role === "staff") {
		Menus = ListMenuNavbar.staff;
	} else if (role === "reviewer") {
		Menus = ListMenuNavbar.reviewer;
	}

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
			maxWidth="2xl"
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
			<NavbarMenuToggle
				aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				className="sm:hidden"
			/>
			<NavbarBrand>
				<Link href="/" className="font-bold text-inherit" prefetch>
					<Image
						alt="fraud-detect"
						src={"/assets/img/logo.svg"}
						width={40}
						height={40}
					/>
				</Link>
			</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-10" justify="center">
				{Menus.map((menu) => {
					return (
						<NavbarItem key={menu.name} isActive={menu.url === pathname}>
							<Link
								color={menu.url === pathname ? "primary" : "foreground"}
								href={menu.url}
								prefetch
							>
								{menu.name}
							</Link>
						</NavbarItem>
					);
				})}
			</NavbarContent>
			<NavbarContent justify="end">
				{role ? (
					<Dropdown placement="bottom-end">
						<DropdownTrigger>
							<Button
								type="button"
								variant="light"
								endContent={<ChevronDown className="h-4 w-4" />}
							>
								{name}
							</Button>
						</DropdownTrigger>
						<DropdownMenu aria-label="Profile Actions" variant="flat">
							<DropdownItem
								key="dashboard"
								className="h-14 gap-2"
								href="/dashboard"
								textValue="dashboard"
								description={email}
							>
								<p className="font-semibold">Signed in as {role}</p>
							</DropdownItem>

							<DropdownItem
								key="logout"
								color="danger"
								onClick={handleSignOut}
								textValue="logout"
							>
								Log Out
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				) : (
					<>
						<Button
							variant="bordered"
							color="primary"
							as={Link}
							href="/auth/login"
							prefetch
						>
							Masuk
						</Button>

						<Button color="primary" as={Link} href="/auth/register">
							Daftar
						</Button>
					</>
				)}
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
