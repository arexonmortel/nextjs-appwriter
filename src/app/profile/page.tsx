'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import  axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import {FadeLoader} from 'react-spinners';

const ProfilePage: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    // Logout function
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
        <div className='flex items-center justify-center min-h-screen bg-gray-100 relative'>
             <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
                    <FadeLoader color="#6366f1"/>
                </div>
            )}
        <div className="max-w-2xl mx-auto p-5">
            <div className={`flex justify-between items-center mb-5 ${loading ? 'opacity-50 pointer-events-none': ''}`}>
                <h1 className="text-3xl font-bold">Profile</h1>
                <button 
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                    onClick={onLogout}
                >
                    Logout
                </button>
            </div>
            <div className="p-5 text-center shadow-md rounded-lg bg-white">
                <img 
                    src="https://via.placeholder.com/150" 
                    alt="Profile" 
                    className="w-36 h-36 rounded-full mx-auto mb-5 border-4 border-gray-200" 
                />
                <h1 className="text-2xl font-semibold mb-2">
                    John Doe
                </h1>
                <p className="text-gray-600 mb-1">
                    Email: john.doe@example.com
                </p>
                <p className="text-gray-600 mb-5">
                    Location: New York, USA
                </p>
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    onClick={() => alert('Edit Profile functionality not implemented yet')}
                >
                    Edit Profile
                </button>
            </div>
        </div>
    </div>
    );
};

export default ProfilePage;
