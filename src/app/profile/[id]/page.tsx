'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import toast, { Toaster } from 'react-hot-toast';
import {FadeLoader} from 'react-spinners';

interface User {
    username: string;
    email: string;
}

const UserProfile: React.FC = () => {
    const router = useRouter();
    const [me, setMe] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get('/api/users/me');
                setMe(response.data.data);
                console.log('User:', response.data.data);
            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    console.error('Error getting user:', error.message);
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        };
        getUser();
    }, []);
    const onLogout = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/users/logout');
            if (response.status === 200) {
                console.log('Logout successful:', response.data);
                toast.success('Logout successful');
                router.push('/login');
            }                       
        } catch (error:any) {
            console.error('Error logging out:', error.message);
            toast.error('Error logging out');   
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-xl mx-auto p-5">
            <button 
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                    onClick={onLogout}
                >
                    Logout
                </button>
            <div className="p-5 text-center shadow-md rounded-lg">
                <img 
                    src="https://via.placeholder.com/150" 
                    alt="Profile" 
                    className="w-36 h-36 rounded-full mx-auto mb-5" 
                />
                <h1 className="text-2xl mb-2">
                    {me?.username}
                </h1>
                <p className="text-gray-600 mb-1">
                    Email: {me?.email}
                </p>
            </div>
        </div>
    );
};

export default UserProfile;
