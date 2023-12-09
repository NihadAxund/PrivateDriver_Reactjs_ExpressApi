import React from 'react'

export default function Signup() {
    return (
        <div>
            <h2>Signup</h2>
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
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}
