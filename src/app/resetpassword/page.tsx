'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';

const ResetPassword: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async  (e: React.FormEvent) => {
        try {   
        e.preventDefault();
        // Handle reset password logic here
         console.log('Reset password for:', email);
        setLoading(true);
         const response = await axios.post('/api/users/resetpassword', { email });         
         toast.success('Check your email for a reset link');
            console.log('Reset password response:', response.data);
            router.push('/login');
        } catch (error: any) {
            toast.error(error.response.data.message);
            console.error('Error sending reset link:', error.response.data.message);
            
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
            <Toaster position="top-center" reverseOrder={false} />
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
                    <FadeLoader color="#6366f1"/>
                </div>
            )}
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Reset Password</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Your Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={email.length === 0}
                        >
                            Send Reset Link
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;