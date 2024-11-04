import { useState, useContext,useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css';
import Aos from 'aos';
import '../css/login.css'

export default function Login() {
    const navigate=useNavigate()
    const { handleLogin } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        Aos.init({ duration: 1500 });
    }, []);

    const validate = () => {
        let isValid = true;

        if (!email.includes('@gmail.com') || password.length < 8) {
            setError("Invalid email or password");
            isValid = false;
        } else {
            setError('');
        }

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            const formData = { email, password };
            handleLogin(formData);
            setEmail('');
            setPassword('');
        }
    };

    const handleRegisterRedirect=()=>{
        navigate('/')
    }

    return (
        <div className='register-container'>
        <div className="login-page">
        <div className="image-container" data-aos='fade-in'>
        <img 
                className='background-image'
                src="AgriBackgound.jpg"
                alt="Agriculture Equipment"
            />
        <div className="form-overlay" data-aos='fade-up'>
                <b className='bb'>Login/sign In</b>
                {error && <b className="error-message">{error}</b>}

                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <input
                            type="text"
                            placeholder='Enter email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className={error ? 'error-input' : ''}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type="password"
                            placeholder='Enter password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className={error ? 'error-input' : ''}
                        />
                    </div>
                    <div className="button-group">
                        <input type="submit" value="Login" className="btn-primary" />
                        <button type="button" onClick={handleRegisterRedirect} className="btn-secondary">
                            Register
                        </button>  
                        </div>
                </form>
            </div>
            </div>
            </div>
        </div>
    );
}
