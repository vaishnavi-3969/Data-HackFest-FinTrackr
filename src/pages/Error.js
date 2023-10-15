import React from 'react';

const Error = () => {
    return (
        <div className="error-page">
            <div className="error-content">
                <h2>Oops! Something went wrong.</h2>
                <p>The page you are looking for does not exist or there was an error.</p>
                <p>Return to the <a href="/">homepage</a></p>
            </div>
        </div>
    );
};

export default Error;