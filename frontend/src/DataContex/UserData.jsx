import { createContext, useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../utils/Axios.jsx";
import { useAuth, useUser, useClerk } from "@clerk/react";

export const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [billingData, setBillingData] = useState(null);
    const [ chatData , setchatData ] = useState(null)
    const [credits, setCredits] = useState(0);
    const [loading, setLoading] = useState(true);

    const { getToken } = useAuth();
    const { isSignedIn, isLoaded } = useUser(); // Added isLoaded
    const { openSignIn } = useClerk();

    // Wrapped in useCallback so it can be safely used in useEffect
    const refreshData = useCallback(async () => {
        // 1. Wait for Clerk to finish initializing before doing anything
        if (!isLoaded) return; 

        // 2. Handle unauthenticated state once
        if (!isSignedIn) {
            openSignIn();
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const token = await getToken();
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            // 3. Fetch all data concurrently for better performance
            const [userRes, billingRes, chatsRes, creditsRes] = await Promise.all([
                axiosInstance.get("/user/profile", config),
                axiosInstance.get("/user/billing", config),
                axiosInstance.get("/user/chats",config),
                axiosInstance.get("/credits/get-credits", config),
            ]);

            setUser(userRes.data);
            setBillingData(billingRes.data);
            setchatData(chatsRes.data);
            setCredits(creditsRes.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            // Optionally handle specific errors like 401 Unauthorized here
        } finally {
            // 4. Ensure loading is always set to false, even if an error occurs
            setLoading(false); 
        }
    }, [isLoaded, isSignedIn, getToken, openSignIn]); // Dependencies for useCallback


    const getSpecificChatData = async (chatId) => {
        const token = await getToken();
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const chatRes = await axiosInstance.get(`/user/${chatId}`,config);
        return chatRes.data;
    }
    // Trigger refreshData whenever Clerk's load state or sign-in state changes
    useEffect(() => {
        refreshData();
    }, [refreshData]);

    return (
        <UserDataContext.Provider 
            value={{ 
                user, 
                billingData, 
                chatData,
                credits, 
                loading, 
                refreshData,
                getSpecificChatData,
            }}
        >
            {children}
        </UserDataContext.Provider>
    );
};

export default UserDataProvider;