import React, { useEffect, useState } from 'react'
import '../componentsCss/LoginSignup.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../redux/features/opening/loginSlice.js';

export default function SiginSignup() {
    const dispatch = useDispatch();
    const { email, password, token } = useSelector((state) => state.login);
    const [isStart, setisStart] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            import('../componentsJs/LoginSignup.js')
                .catch(error => console.error('Error loading LoginSignup.js:', error));
            setisStart(true);

        }, 900);



    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Dispatch the loginAsync action with the email and password
                await dispatch(loginAsync({ email, password }));
                // The token is now updated in the Redux store; you can handle success here
                console.log('Login successful!');
            } catch (error) {
                console.error('Login failed:', error.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (token != null) {
            console.log(token)
        }
    }, [token])



    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault(); // Formun normal submit işlemini engelle
        let emailInput = document.getElementById('signinemail').value;
        let passwordInput = document.getElementById('signinpassword').value;
        if (!validateEmail(emailInput)||passwordInput.length < 5) {
            emailInput = ""; passwordInput = "";
            return;
        }
        console.log('Email:', emailInput);
        console.log('Password:', passwordInput);
    };

    if (isStart) {
        return (
            <div className='myBody'>
                <div className="container animate__animated animate__backInDown" id="container">
                    <div className="form-container sign-up-container">
                        <form action="#">
                            <h1>Create Account</h1>
                            <span>or use your email htmlFor registration</span>
                            <input type="text" placeHolder="Name" />
                            <input type="email" placeHolder="Email" />
                            <input type="password" placeHolder="Password" />
                            <button>Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form onSubmit={handleLoginSubmit}>
                            <h1>Sign in</h1>
                            <input
                                type="email"
                                placeholder="Email"
                                id="signinemail"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                id="signinpassword"
                                required
                                minLength="5"
                            />
                            <button type="submit">Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className="ghost" id="signIn">Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className="ghost" id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className='animate__animated animate__rotateInUpLeft'>
                    <p>
                        Created with <i className="fa fa-heart"></i> by
                        <a target="_blank" href="https://www.linkedin.com/in/nihad-axundzade-760296240/"> Nihad Axundzade</a>.
                    </p>
                </footer>


                <script src='./componentsJs/LoginSignup.js'></script>
            </div>
        )
    }
    else {
        return <></>
    }

}
