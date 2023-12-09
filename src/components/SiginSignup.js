import React, { useEffect, useState } from 'react'
import '../componentsCss/LoginSignup.css';

export default function SiginSignup() {
    const [isStart, setisStart] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            import('../componentsJs/LoginSignup.js')
                .catch(error => console.error('Error loading LoginSignup.js:', error));
            setisStart(true);
        }, 900);
    }, []);

    if(isStart){
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
                        <form action="#">
                            <h1>Sign in</h1>
                            <div className="social-container">
                                <a href="#" className="social"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" className="social"><i class="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social"><i class="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your account</span>
                            <input type="email" placeHolder="Email" />
                            <input type="password" placeHolder="Password" />
                            <a href="#">Forgot your password?</a>
                            <button>Sign In</button>
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
    
                <footer  className='animate__animated animate__rotateInUpLeft'>
                    <p>
                        Created with <i className="fa fa-heart"></i> by 
                        <a target="_blank" href="https://www.linkedin.com/in/nihad-axundzade-760296240/"> Nihad Axundzade</a>.
                    </p>
                </footer>
    
    
                <script src='./componentsJs/LoginSignup.js'></script>
            </div>
        )
    }
    else{
        return <></>
    }
        
}
