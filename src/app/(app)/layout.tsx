import type { Metadata } from 'next';
import NavBar from './components/NavBar';
import { Button } from 'react-bootstrap';
import { signout } from '../(login)/login/actions';
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
                    <Button className="logoutButton" onClick={signout}> Log out </Button>
                    {children}
                </div>
            </body>
        </html>
    )
}
