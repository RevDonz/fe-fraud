import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex items-center justify-center min-h-screen h-full w-full flex-col gap-5">
			<Image
				src={"/assets/img/404.svg"}
				alt="404 NOt Found"
				height={400}
				width={400}
			/>
			<p>Halaman tidak dapat ditemukan!</p>
			<Link href={"/dashboard"}>
				<Button color="primary">Kembali ke Halaman Utama</Button>
			</Link>
		</div>
	);
}
