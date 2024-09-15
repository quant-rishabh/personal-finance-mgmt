import React, { useState } from 'react';

function App() {
    const [message, setMessage] = useState('');

    const checkBackend = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/test');
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('Error connecting to backend');
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Finance Management App</h1>
                <button onClick={checkBackend}>Check Backend</button>
                <p>{message}</p>
            </header>
        </div>
    );
}

export default App;