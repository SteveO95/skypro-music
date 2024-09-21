import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import ReduxProvider from '../store/ReduxProvider';
import './globals.css';
// import Toast from "../../components/Toast/Toast";

const montserrat = Montserrat({ subsets: ['cyrillic'] });

export const metadata: Metadata = {
	title: 'Skypro music',
	description: 'Прекрасная музыка для прекрасных людей',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ru'>
			<ReduxProvider>
				<body className={montserrat.className}>{children}</body>
			</ReduxProvider>
		</html>
	);
}
