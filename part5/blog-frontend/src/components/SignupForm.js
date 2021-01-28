import React, { useState } from 'react';

const SignupForm = ({ signUp }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };
    const handleNameChange = event => {
        setName(event.target.value);
    };

    const addUser = event => {
        event.preventDefault();
        signUp({
            username,
            password,
            name,
        });

        setUsername('');
        setPassword('');
        setName('');
    };

    return (
        <div>
            <h2>Signup:</h2>
            <form onSubmit={addUser}>
                <div>
                    username:{' '}
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    full name:{' '}
                    <input
                        type="text"
                        value={name}
                        name="Name"
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    password:{' '}
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default SignupForm;
