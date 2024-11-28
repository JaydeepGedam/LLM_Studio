import { useMsal, useAccount } from "@azure/msal-react";

const UserProfile = () => {
    const { accounts } = useMsal();
    const account = accounts[0]; // Default to the first account logged in

    return (
        <div>
            {account ? (
                <h2>Welcome, {account.username}</h2>
            ) : (
                <p>No user logged in</p>
            )}
        </div>
    );
};

export default UserProfile;
