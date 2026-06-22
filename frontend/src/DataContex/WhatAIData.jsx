import { createContext } from "react";
import { axiosInstance } from "../utils/Axios.jsx";
import { useAuth, useUser, useClerk } from "@clerk/react";

export const WhatAIDataContext = createContext();

const WhatAIDataProvider = ({ children }) => {
    const { getToken, isSignedIn } = useAuth();
    const { isLoaded } = useUser();
    const { openSignIn } = useClerk();

    const ArticleWriter = async (prompt, length) => {
        if (!isLoaded) return;

        if (!isSignedIn) {
            openSignIn();
            return;
        }

        try {
            const token = await getToken();
            const response = await axiosInstance.post(
                "/whatai/write-article",
                { prompt, length },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error(
                error.response?.data || error.message
            );
            throw error;
        }
    };

    return (
        <WhatAIDataContext.Provider
            value={{ ArticleWriter }}
        >
            {children}
        </WhatAIDataContext.Provider>
    );
};

export default WhatAIDataProvider;