import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap'


function sim(){
    return new Promise((resolve) => setTimeout(resolve,1000))
}

function Entry() {

    const [isLoading,setLoading] = useState(false)
    useEffect(() => {
        if(isLoading){
            sim()
                .then(() => {
                    setLoading(false);
                })
        }
    },[isLoading]);

    const handleClick = () => setLoading(true)

    return(
        <div className='first-page'>
                Welcome
                <Button variant='dark' 
                        disabled={isLoading}
                        onClick={!isLoading ? handleClick :null}
                        href="localhost:8888/login">
                    {isLoading ? 'Entering....' : 'Click to Enter'}
                </Button>
        </div>
    );
}


export default Entry;