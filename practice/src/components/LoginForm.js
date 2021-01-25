import React from 'react';

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handelPasswordChange,
    username,
    password,
}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    password{' '}
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={handelPasswordChange}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
};

export default LoginForm;
