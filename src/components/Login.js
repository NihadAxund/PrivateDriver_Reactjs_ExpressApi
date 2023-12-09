import React from 'react'

export default function Login() {
    return (
        <div>
            <h2>Login</h2>
            <form>
                <label>
                    Username:
                    <input type="text" />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
