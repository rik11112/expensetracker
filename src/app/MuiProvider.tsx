'use client';

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function MuiProvider({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body>
                <AppRouterCacheProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <main>{children}</main>
                    </LocalizationProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}   