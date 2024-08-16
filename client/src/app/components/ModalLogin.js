import { useContext, useState } from "react";
import Image from 'next/image';
import { useFetch } from "../utils/useFetch";
import { AuthContext } from "../context/LoginContext";
import RadioButton from "./RadioButton";
import RegisterImg from "../assets/img/register.png"
import LoginImg from "../assets/img/login.png"

export default function ModalLogin({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(true);
    const [error, setError] = useState(null);
    const endpoint = "auth/login";
    const api = useFetch();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); 
        
        try {
            const body = {
                username: username,
                password: password
            };
            
            const response = await api.post(endpoint, body);
            console.log(response);
            if(response.status !== 200){
                setError(response.data.message); 
                throw new Error('Login failed');
            }else{
                const data = await response.data;
                const token = data.access_token;
                login(token);
            }

        } catch (err) {
            console.log(err);
            // setError(err); 
        }
    };

    const handleRadioChange = (event) => {
        if(event.target.value=="Sign_Up"){
            setIsRegister(true)
        }else{
            setIsRegister(false)
        }
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
                            <button>Register with your Email</button>
                        </div> :
                        <div>
                            <h2>We love having you back</h2>
                            <form onSubmit={handleLogin}>
                                <div>
                                    <label>Username:</label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>Password:</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit">Login</button>
                            </form>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <div>{children}</div>
                        </div>
                    }
                    <p>For any questions, reach out to support@Quikbetdmovies.com</p>
                </div>
                <div style={modalStyleRight}>
                    {
                        isRegister ?
                        <h2>Welcome to Quikbet Movies!</h2>:
                        <h2>Welcome back to Quikbet Movies!</h2>
                    }
                    {
                        isRegister ?
                        <h6>🎬 Ready to unlock a universe of cinematic delights? Sign up now and start your journey with us!</h6>:
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
};

const modalStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    backdropFilter: 'blur(10px)', 
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '8px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: "row"
};
const modalStyleLeft = {
    backgroundColor: 'transparent',
    padding: '20px 100px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '70%',
    textAlign: 'center',
};
const modalStyleRight = {
    backgroundColor: '#1C1C1C',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    textAlign: 'center',
    color:"#fff"
};
