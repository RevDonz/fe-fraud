"use client";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<NextUIProvider>
				<NextThemesProvider attribute="class" defaultTheme="light">
					{children}
				</NextThemesProvider>
			</NextUIProvider>
			<ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
		</QueryClientProvider>
	);
}
