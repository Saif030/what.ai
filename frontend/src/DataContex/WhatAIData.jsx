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

    const TitleWriter = async (keyword,categeory) => {
        if(!isLoaded) return;

        if(!isSignedIn){
            openSignIn();
            return;
        }

        try{
            const token = await getToken();
            const response = await axiosInstance.post(
                "/whatai/title-generator",
                { keyword, categeory },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        }catch(error){
            console.error(
                error.response?.data || error.message
            );
            throw error;
        }
    }

    const BackGroundRemover = async (formData) => {
        if(!isLoaded) return;

        if(!isSignedIn){
            openSignIn();
            return;
        }

        try{
            const token = await getToken();
            const response = await axiosInstance.post(
                "/whatai/remove-background",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        }catch(error){
            console.error(
                error.response?.data || error.message
            );
            throw error;
        }
    }

    const ObjectRemover = async (formData) => {
        if(!isLoaded) return;

        if(!isSignedIn){
            openSignIn();
            return;
        }

        try{
            const token = await getToken();
            const response = await axiosInstance.post(
                "/whatai/remove-object",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        }catch(error){
            console.error(
                error.response?.data || error.message
            );
            throw error;
        }
    }

    const ResumeAnalyzer = async (formData) => {
        if(!isLoaded) return;

        if(!isSignedIn){
            openSignIn();
            return;
        }

        try{
            const token = await getToken();
            const response = await axiosInstance.post(
                "/whatai/resume-analyzer",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        }catch(error){
            console.error(
                error.response?.data || error.message
            );
            throw error;
        }
    }

    const AICodeWriter = async (prompt, onChunk, onDone, onError) => {

        if (!isLoaded) return;
        if (!isSignedIn) {
            openSignIn();
            return;
        }

        try {
            const token = await getToken();
            
            // Use fetch, not Axios, for streaming
            const response = await fetch(
            "https://what-ai-henna.vercel.app/whatai/ai-code-writer",
            {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ prompt }),
            }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Request failed');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let fullContent = '';

            while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop(); // Keep incomplete line

            for (const line of lines) {
                if (!line.startsWith('data: ')) continue;

                const dataStr = line.slice(6).trim();
                if (!dataStr) continue;

                try {
                const data = JSON.parse(dataStr);

                switch (data.type) {
                    case 'content':
                    fullContent += data.content;
                    onChunk?.(data.content, fullContent);
                    break;

                    case 'done':
                    onDone?.(fullContent);
                    return { content: fullContent };

                    case 'error':
                    throw new Error(data.message);
                }
                } catch (e) {
                // Skip malformed lines
                }
            }
            }

            return { content: fullContent };

        } catch (error) {
            console.error(error);
            onError?.(error.message);
            throw error;
        }
    };


    return (
        <WhatAIDataContext.Provider
            value={{ ArticleWriter, TitleWriter, BackGroundRemover , ObjectRemover , ResumeAnalyzer , AICodeWriter }}
        >
            {children}
        </WhatAIDataContext.Provider>
    );
};

export default WhatAIDataProvider;