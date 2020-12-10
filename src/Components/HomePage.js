import React, { useState, useEffect } from 'react';
import 'Styles/WelcomeStyle.css';
import axios from 'axios';
import Draw from './Drawer';

function HomePage() {
    const [room, setRooms] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:44344/api/getallrooms').then((response) => {
            setRooms(response);
            console.log(response);
            console.log('asdasdasdasda');
            console.log('asdasdasd');
            console.log('asdasdasdasdas');
        });
    }, []);

    return (
        <>
            <Draw />
            <div>
                <div>
                    {room.map((item) => (
                        <li>
                            {item.name} {item.price}
                        </li>
                    ))}
                </div>
            </div>
        </>
    );
}

export default HomePage;
