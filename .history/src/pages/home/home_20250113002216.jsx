
import {Button} from 'react';
import {useState, useEffect} from 'react';
export const Home = () => {
    const [flag, setFlag] = useState();
    useEffect(()=>{
        setFlag(true);
    },[])

    return (
        <div>
            if(flag === true){
                <p> flag is true</p>
            }
            <p>Home page</p>
        </div>
    )
}
