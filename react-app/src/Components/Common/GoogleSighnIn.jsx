import React from 'react';
import { FcGoogle } from "react-icons/fc";

function GoogleSignIn() {
    return (
        <button className="flex items-center justify-center gap-2 w-full py-2 border border-black shadow-md text-black font-medium">
            <FcGoogle className="text-2xl" />
            Sign in with Google
        </button>
    );
}

export default GoogleSignIn;
