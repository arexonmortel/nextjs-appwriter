'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import  axios  from 'axios';
import user from '@/models/userModel';
import { FadeLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';
 
const SignupPage: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (username === '' || email === '' || password === '' || confirmPassword === '') {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    }, [username, email, password, confirmPassword]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        try {  
        e.preventDefault();
        setLoading(true);
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        } 
        const user = { username, email, password };
        console.log(user);
        const response = await axios.post('/api/users/signup', user)

        if (response.status === 201){
            toast.success("Account created successfully.")
            console.log('Account created successfully:', response.data);
            router.push('/login');
        } 
        } catch (error:any) {
            toast.error(error.response.data.message)
            console.error('Error creating account:', error.response.data.message);
        }
        finally {
            setLoading(false);
        }
        
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
             <Toaster
              position="top-center"
              reverseOrder={false}
            />
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
                    <FadeLoader color="#6366f1"/>
                </div>
            )}
            <div className={`bg-white p-8 rounded-lg shadow-md w-full max-w-md ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={onSignUp}>
                    <div className="mb-4">
                        <label htmlFor="username" className="sr-only">Username</label>
                        <div className="relative">
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Username"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="sr-only">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Email"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <div className="relative">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                required
                                className="relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Password"
                            />
                            <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center px-2 text-sm text-gray-600">
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                        <div className="relative">
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                required
                                className="relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Confirm Password"
                            />
                            <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute inset-y-0 right-0 flex items-center px-2 text-sm text-gray-600">
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={buttonDisabled}
                        className={`w-full py-2 rounded-lg transition duration-300 ${
                            buttonDisabled
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-indigo-500 text-white hover:bg-indigo-600'
                        }`}
                    >
                        Sign Up
                    </button>
                    <p className="mt-4 text-center">
                        Already have an account?{' '}
                        <Link href="/login" className="text-indigo-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;