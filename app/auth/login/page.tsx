"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function page() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (username && password) {
            localStorage.setItem("isLoggedIn", "true");
            router.push("/features/liveview/overview");
        } else {
            alert("Enter both username and password");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 shadow-md rounded w-80 flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-center">Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 rounded"/>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded"/>
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Login
                </button>
            </form>
        </div>
    );
}

