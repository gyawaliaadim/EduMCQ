"use client"

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from 'react';

interface SessionProps {
    children: ReactNode;
}
const SessionWrapper = ({ children }: SessionProps
) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default SessionWrapper