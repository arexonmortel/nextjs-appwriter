'use client';
import React from 'react';

const ProfilePage: React.FC = () => {
    return (
        <div className="max-w-xl mx-auto p-5">
            <div className="p-5 text-center shadow-md rounded-lg">
                <img 
                    src="https://via.placeholder.com/150" 
                    alt="Profile" 
                    className="w-36 h-36 rounded-full mx-auto mb-5" 
                />
                <h1 className="text-2xl mb-2">
                    UserProfile
                </h1>
                <p className="text-gray-600 mb-1">
                    Email: john.doe@example.com
                </p>
                <p className="text-gray-600">
                    Location: New York, USA
                </p>
            </div>
        </div>
    );
};

export default ProfilePage;
