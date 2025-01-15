import { useState, useEffect } from 'react';

export const Home = () => {
    const [flag, setFlag] = useState(false); // Initialize flag to false

    useEffect(() => {
        setFlag(true); // Set flag to true when the component mounts
    }, []);

    return (
        <div>
            {flag && <p>Flag is true</p>}
            <p>Home page</p>
            <button onClick={() => setFlag(!flag)}>
                Toggle Flag
            </button>
        </div>
    );
};
