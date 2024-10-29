'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';


const NewPasswordPage: React.FC = () => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState(false);

    const setNewPassword = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            if (password !== confirmPassword) {
                return console.error('Passwords do not match');
            }
            const response = await axios.post('/api/users/newpassword', { password, token });
            console.log('New password response:', response.data);
            toast.success('New password set successfully');
            router.push('/login');
        } catch (error: any) {
            console.error('Error setting new password:', error.response.data.message);
            toast.error(error.response.data.message);
            
        }
    };

        useEffect(() => {
       const urlToken = window.location.search.split('=')[1];
         setToken(urlToken ||'');
         if (!urlToken) {
             setError(true);
         }
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Toaster
                position="top-center"
                reverseOrder={false}
             />
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Set New Password</h2>
                <form onSubmit={setNewPassword} className="space-y-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                    >
                        Set Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewPasswordPage;