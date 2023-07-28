'use client';

import { Navbar } from 'flowbite-react';

export default function DefaultNavbar() {
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
                >
                    Payments
                </Navbar.Link>
                <Navbar.Link
                    href="/categories"
                >
                    Categories
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}