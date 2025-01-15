import { useState, useEffect } from 'react';
import {Button} from 'react';

export const Home = () => {
    const [flag, setFlag] = useState(false); // Initialize flag to false
    
    useEffect(() => {
        setFlag(true); // Set flag to true when the component mounts
    }, []);

    return (
        <div>
            {flag === true && <p>Flag is true</p>}
            <p>Home page</p>
            <Button onClick = {()=>setFlag(!flag)}></Button>
        </div>
    );
};