"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const VerifyEmailPage: React.FC = () => {
    const [token, setToken] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyEmail = async () => {
        try {
            const response = await axios.post('/api/users/verifyemail', { token });
            console.log('Email verified:', response.data);
            setIsVerified(true);            
        } catch (error: any) {
            setError(true);
            console.error('Error verifying email:', error.response.data.message);        
        }
    };

    useEffect(() => {
       const urlToken = window.location.search.split('=')[1];
         setToken(urlToken ||'');
         if (!urlToken) {
             setError(true);
         }
    }, []);

    useEffect(() => {
        if (token.length > 0 ) {
            verifyEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {isVerified && 
            <div className="p-6 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Email verified successfully</h1>
                <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Login
                </Link>
            </div>
            }
            {error && <h1 className="text-2xl text-red-500">{token.length > 0 ? 'Error verifying email': 'No Token'}</h1>}
        </div>
    );
};

export default VerifyEmailPage;