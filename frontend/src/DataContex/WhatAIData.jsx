import { createContext } from "react";
import { axiosInstance } from "../utils/Axios.jsx";
import { useAuth, useUser, useClerk } from "@clerk/react";

export const WhatAIDataContext = createContext();

const WhatAIDataProvider = ({ children }) => {
    const { getToken } = useAuth()
    const { isSignedIn , isLoaded } = useUser()
    const { openSignIn } = useClerk()
    
    const ArticleWriter = async (prompt, length) => {
        if (!isLoaded) return; 

        // 2. Handle unauthenticated state once
        if (!isSignedIn) {
            openSignIn();
            return;
        }
        
        try {
            const token = await getToken();
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axiosInstance.post("/whatai/write-article", { prompt, length }, config);
            return response.data;
        } catch(error) {
            // Throw the error so the component calling this function can handle it (e.g., show a toast)
            throw error; 
        }
    }

    return (
        <WhatAIDataContext.Provider value={{ ArticleWriter }}>
            {children}
        </WhatAIDataContext.Provider>
    );
};

export default WhatAIDataProvider;