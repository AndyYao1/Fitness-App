import type { Metadata } from 'next';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./global.css";

export const metadata: Metadata = {
    title: 'React App',
    description: 'Web site created with Next.js.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <div id="root">
                    <NavBar />
                    {children}
                </div>
            </body>
        </html>
    )
}
