import { useContext, useState } from "react";
import Image from 'next/image';
import { useFetch } from "../utils/useFetch";
import { AuthContext } from "../context/LoginContext";
import RadioButton from "./RadioButton";
import RegisterImg from "../assets/img/register.png";
import LoginImg from "../assets/img/login.png";

export default function ModalLogin({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [emailReset, setEmailReset] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(true);
    const [isForgot, setIsForgot] = useState(false);
    const [error, setError] = useState(null);
    const endpoint = "auth/login";
    const endpointRegister = "auth/register";
    const endpointRestored = "auth/sendRestorePassword";
    const api = useFetch();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const body = { email, password };
            const response = await api.post(endpoint, body);
            if (response.status !== 200) {
                setError(response.data.message);
                throw new Error('Login failed');
            } else {
                const data = await response.data;
                const token = data.access_token;
                login(token);
            }

        } catch (err) {
            console.log(err);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const body = { email, password };
            const response = await api.post(endpointRegister, body);
            if (response.status !== 200) {
                setError(response.data.message);
                throw new Error('Register failed');
            } else {
                const data = await response.data;
            }

        } catch (err) {
            console.log(err);
        }
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const body = { email: emailReset };
            const response = await api.post(endpointRestored, body);
            if (response.status !== 200) {
                setError(response.data.message);
                throw new Error('Reset password failed');
            } else {
                const data = await response.data;
            }

        } catch (err) {
            console.log(err);
        }
    }

    const handleRadioChange = (event) => {
        setIsRegister(event.target.value === "Sign_Up");
    };

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <div style={modalStyleLeft}>
                    <RadioButton 
                        label="Sign Up"
                        value={"Sign_Up"}
                        name="myRadioGroup"
                        checked={isRegister}
                        onChange={handleRadioChange} />
                    <RadioButton 
                        label="Log in"
                        value={"Log_in"}
                        name="myRadioGroup"
                        checked={!isRegister}
                        onChange={handleRadioChange} />
                    {
                        isRegister ?
                        <div>
                            <form onSubmit={handleRegister}>
                                <div>
                                    <label style={labelStyle}>Email:</label>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={inputStyle}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Password:</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={inputStyle}
                                    />
                                </div>
                                <button type="submit" style={buttonStyle}>Register with your Email</button>
                            </form>
                        </div> :
                        <div>
                            <h2>We love having you back</h2>
                            <form onSubmit={handleLogin}>
                                <div>
                                    <label style={labelStyle}>Email:</label>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={inputStyle}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Password:</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={inputStyle}
                                    />
                                </div>
                                <button type="submit" style={buttonStyle}>Login</button>
                            </form>
                            {error && <p style={errorStyle}>{error}</p>}
                            <div>{children}</div>

                            <div onClick={()=>setIsForgot(true)}>Forgot your password?</div>
                            {
                                 <form onSubmit={handleChangePassword}>
                                 <div>
                                     <label style={labelStyle}>Email:</label>
                                     <input
                                         type="text"
                                         value={emailReset}
                                         onChange={(e) => setEmailReset(e.target.value)}
                                         style={inputStyle}
                                     />
                                 </div>
                                 <button type="submit" style={buttonStyle}>Reset Password</button>
                             </form>
                            }
                        </div>
                    }
                    <p style={supportStyle}>For any questions, reach out to support@Quikbetdmovies.com</p>
                </div>
                <div style={modalStyleRight}>
                    {
                        isRegister ?
                        <h2>Welcome to Quikbet Movies!</h2> :
                        <h2>Welcome back to Quikbet Movies!</h2>
                    }
                    {
                        isRegister ?
                        <h6>🎬 Ready to unlock a universe of cinematic delights? Sign up now and start your journey with us!</h6> :
                        <h6>🍿 Ready to dive into the world of unlimited entertainment? Enter your credentials and let the cinematic adventure begin!</h6>
                    }
                    {
                        isRegister ?
                        <Image src={RegisterImg} alt="Register" width={500} height={500} /> :
                        <Image src={LoginImg} alt="Login" width={500} height={500} />
                    }
                </div>
            </div>
        </div>
    );
}

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
};

const modalStyle = {
    backgroundColor: '#1F1F1F', 
    borderRadius: '8px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: "row",
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    color: '#EAEAEA', 
};

const modalStyleLeft = {
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '60%',
    textAlign: 'center',
    backgroundColor: '#2C2C2C', 
};

const modalStyleRight = {
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    textAlign: 'center',
    backgroundColor: '#333', 
    color: '#EAEAEA', 
};

const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '1rem',
};

const inputStyle = {
    padding: '0.5rem',
    border: '1px solid #444',
    borderRadius: '5px',
    backgroundColor: '#2C2C2C',
    color: '#EAEAEA', 
    width: '100%',
    marginBottom: '1rem',
};

const buttonStyle = {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
};

const errorStyle = {
    color: '#FF6F6F', 
    margin: '1rem 0',
};

const supportStyle = {
    marginTop: '1rem',
    color: '#B0B0B0', 
    fontSize: '0.9rem',
};
