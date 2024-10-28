'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';

const LoginPage: React.FC = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setButtonDisabled(!email || !password);
    }, [email, password]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = { email, password };
            const response = await axios.post('/api/users/login', user);

            if (response.status === 200) {
                const userData = await axios.get('/api/users/me');
                const userId = userData.data.data._id;
                toast.success('Login successful');
                router.push(`/profile/${userId}`);
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
            console.error("Something went wrong", error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100 relative'>
            <Toaster position="top-center" reverseOrder={false} />
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
                    <FadeLoader color="#6366f1" />
                </div>
            )}
            <div className={`w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                <h1 className='text-2xl font-bold text-center text-gray-900'>Login</h1>
                <form onSubmit={onLogin} className='mt-8 space-y-6'>
                    <div className='rounded-md shadow-sm'>
                        <div>
                            <label htmlFor="email" className='sr-only'>Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="text" id="email" name="email" required
                                className='relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                placeholder="Email"
                            />
                        </div>
                        <div className='mt-4'>
                            <label htmlFor="password" className='sr-only'>Password</label>
                            <div className='relative'>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? "text" : "password"} id="password" name="password" required
                                    className='relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                    placeholder="Password"
                                />
                                <button type="button" onClick={togglePasswordVisibility} className='absolute inset-y-0 right-0 flex items-center px-2 text-sm text-gray-600'>
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='text-sm'>
                            <a href="#" className='font-medium text-indigo-600 hover:text-indigo-500'>
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={buttonDisabled}
                            className={`w-full py-2 rounded-lg transition duration-300 ${buttonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
                        >
                            Login
                        </button>
                    </div>
                    <p className="mt-4 text-center">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-indigo-500 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
