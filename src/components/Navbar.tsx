'use client';

import { Navbar } from 'flowbite-react';

export default function DefaultNavbar({ currentPage }: { currentPage: string }) {
    return (
        <Navbar
            fluid
            rounded
        >
            Expense Tracker Michiel
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
            </Navbar.Collapse>
        </Navbar>
    )
}