'use client';

import { Navbar } from 'flowbite-react';

export default function DefaultNavbar({ currentPage }: { currentPage: string }) {
    return (
        <Navbar
            fluid
            rounded
        >
            Expense Tracker {process.env.NEXT_PUBLIC_NAME || 'Michiel'}
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link
                    href="/"
                    active={currentPage === 'home'}
                >
                    Payments
                </Navbar.Link>
                <Navbar.Link
                    href="/categories"
                    active={currentPage === 'categories'}
                >
                    Categories
                </Navbar.Link>
                <Navbar.Link
                    href="/charts"
                    active={currentPage === 'charts'}
                >
                    Charts
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}