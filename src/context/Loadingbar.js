"use client";

import React, { createContext, useState } from "react";

export const LoadingContext = createContext(); // Corrected context name

export const LoadingContextProvider = ({ children }) => { // Corrected provider name
    const [loadingBar, setLoadingBar] = useState(0);
    return (
        <LoadingContext.Provider value={{ loadingBar, setLoadingBar }}> {/* Corrected context usage */}
            {children}
        </LoadingContext.Provider>
    );
};
