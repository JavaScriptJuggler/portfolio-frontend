"use client";

import React, { createContext, useState } from "react";

export const ResumeContext = createContext(); // Corrected context name

export const ResumeContextProvider = ({ children }) => { // Corrected provider name
    const [resumeLink, setresumeLink] = useState('');
    const getHeroData = () => {
        fetch(process.env.NEXT_PUBLIC_API_URL + '/getHomeData')
            .then(async response => {
                let getData = await response.json()
                setresumeLink(getData.hero.resume_link || "");
            })
            .catch(error => console.log(error));
    }
    if (!resumeLink) {
        getHeroData();
    }
    return (
        <ResumeContext.Provider value={{ resumeLink, setresumeLink }}> {/* Corrected context usage */}
            {children}
        </ResumeContext.Provider>
    );
};
