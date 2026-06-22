import { useAuth, useUser, useClerk } from "@clerk/react";

const Auth = async () => {
    const { getToken } = useAuth()
    const { isSignedIn , isLoaded } = useUser()
    const { openSignIn } = useClerk()

    if (!isLoaded) return; 

    if (!isSignedIn) {
        openSignIn();
        return;
    }

    const token = await getToken();
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return config;
}

export default Auth;