import React, { useEffect, useState } from 'react'
import '../componentsCss/LoginSignup.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, signupAsync } from '../redux/features/opening/loginSignupSlice.js';
import { Navigate } from 'react-router-dom';

export default function SiginSignup() {
    const dispatch = useDispatch();
    
    const { email, password, token, isUser } = useSelector((state) => state.login);
    const [isStart, setisStart] = useState(false)
    const [isNihad,setisNihad] = useState(false);

    const fetchLoginData2 = async (email,password) => {
        try {
            await dispatch(loginAsync({ email, password }));

            console.log('Login successful!');
           setisNihad(true);
        } catch (error) {
            console.error('Login failed:', error.message);

        }
    };

    const fetchSignupData = async (name,email,password) =>{
        try {
            await dispatch(signupAsync({name,email,password}))
            console.log("Signup successful!");
            return true
        } catch (error) {
            console.log("Signup failed", error.message);
            return false
        }
    }

    useEffect(() => {
        setTimeout(() => {
            import('../componentsJs/LoginSignup.js')
                .catch(error => console.error('Error loading LoginSignup.js:', error));
            setisStart(true);

        }, 900);



    }, []);

    
    useEffect(() => {
        if(isUser){
            alert("------------")
            alert(email);
            fetchLoginData2(email,password);
        }

    }, [isUser]);

    useEffect(() => {
        if (token&&token != null&&token.length>6) {
            console.log(token)
        }
    }, [token])



    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault(); // Formun normal submit işlemini engelle
        let emailInput = document.getElementById('signinemail');
        let passwordInput = document.getElementById('signinpassword');
        if (!validateEmail(emailInput.value)||passwordInput.value.length <= 5) {
            emailInput.value = ""; passwordInput.value = "";
            return;
        }
        console.log('Email:', emailInput.value);
        console.log('Password:', passwordInput.value);
        fetchLoginData2(emailInput.value,passwordInput.value);
      
    };

    const handleSignupSubmit = async (e) =>{
        e.preventDefault();
        let nameInput = document.getElementById("namesignup");
        let emailInput = document.getElementById("emailsignup");
        let passwordInput = document.getElementById("passwordsignup");
        let signuptxt = document.getElementById("SignupTxt");
        if (nameInput.value.length<=2||!validateEmail(emailInput.value)||passwordInput.value.length <= 5) {
            emailInput.value = ""; passwordInput.value = ""; nameInput.value = "";
            return;
        }
        let boolen = await fetchSignupData(nameInput.value,emailInput.value,passwordInput.value)
        if(!boolen){
            nameInput.value = ""; emailInput.value = ""; passwordInput.value = "";
            signuptxt.innerHTML ="This email is already in use."
            signuptxt.style.fontSize = "19px";  
            signuptxt.style.color = "red";
            return
        }
    
        console.log("Name: ",nameInput.value)
        console.log('Email:', emailInput.value);
        console.log('Password:', passwordInput.value);
    }
    if(isNihad){
      return <Navigate to="/Home" />
    }
    else if (isStart) {
        return (
            <div className='myBody'>
                <div className="container animate__animated animate__backInDown" id="container">
                    <div className="form-container sign-up-container">
                        <form onSubmit={handleSignupSubmit}>
                            <h1 id="SignupTxt">Create Account</h1>
                            <span>or use your email htmlFor registration</span>
                            <input type="text" placeHolder="Name" id="namesignup" />
                            <input type="email" placeHolder="Email" id="emailsignup" />
                            <input type="password" placeHolder="Password" id="passwordsignup" />
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
