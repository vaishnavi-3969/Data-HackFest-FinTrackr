import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { useAuth0 } from '@auth0/auth0-react';
import app from '../db/Firebase';

const ViewProfile = () => {
    const db = getDatabase(app); 
    const { user } = useAuth0();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userEmail = user.email;

            try {
                const userRef = ref(db, 'profile'); 
                const snapshot = await get(userRef);

                snapshot.forEach((childSnapshot) => {
                    const applicationData = childSnapshot.val();

                    if (applicationData.email === userEmail) {
                        setProfileData(applicationData);
                    }
                });
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [db, user.email]);

    return (
        <div className="p-8 bg-white rounded-lg shadow-lg">
            {profileData ? (
                <>
                    <h2 className="text-2xl font-bold text-yellow-500 mb-4">User Profile</h2>
                    <div className="mb-4">
                        <img
                            src={profileData.profileImage} 
                            alt="Profile Image"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold">Personal Details</h3>
                        <p>Name: {`${profileData.firstName} ${profileData.lastName}`}</p>
                        <p>Email: {profileData.email}</p>
                        <p>Pronouns: {profileData.pronouns}</p>
                        <p>Short Bio: {profileData.bio}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold">School/Professional Details</h3>
                        {profileData.schoolDetails.map((school, index) => (
                            <div key={index}>
                                <p>School/University: {school.schoolName}</p>
                                <p>Degree/Course: {school.degree}</p>
                                <p>Graduation Year: {school.graduationYear}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold">Shared Links</h3>
                        <p>LinkedIn: <a href={profileData.linkedin}>{profileData.linkedin}</a></p>
                        <p>GitHub: <a href={profileData.github}>{profileData.github}</a></p>
                        <p>Other Links:</p>
                        <ul>
                            {profileData.otherLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link}>{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <p>Loading profile data...</p>
            )}
        </div>
    );
};

export default ViewProfile;
