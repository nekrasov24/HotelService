import React, { useEffect, useState } from 'react';
import 'Styles/WelcomeStyle.css';
import axios from 'axios';

function HomePage() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:44344/api/getallrooms').then((response) => {
            setRooms(response.data);
        });
    }, []);

    return (
        <div>
            {rooms.map((x) => {
                return <div>{x.name}</div>;
            })}
        </div>
    );
}

export default HomePage;
