import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import ReduxProvider from '../store/ReduxProvider';
import './globals.css';

const montserrat = Montserrat({ subsets: ['cyrillic'] });

export const metadata: Metadata = {
	title: 'Skypro Music',
	description: 'Музыкальный сервис',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<ReduxProvider>
				<body className={montserrat.className}>{children}</body>
			</ReduxProvider>
		</html>
	);
}
