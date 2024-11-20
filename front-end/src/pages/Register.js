import { useState, useContext,useEffect } from 'react';
import 'aos/dist/aos.css';
import Aos from 'aos';
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import '../css/register.css'

export default function Register() {
    const { handleRegister } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        Aos.init({ duration: 1500 });
    }, []);

    // Client-side validation
    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        if (username.trim().length === 0) {
            tempErrors.username = 'Username is required';
            isValid = false;
        }

        if (!email.includes('@')) {
            tempErrors.email = 'Valid email is required';
            isValid = false;
        }

        if (password.length < 8) {
            tempErrors.password = 'Password must be at least 8 characters, Atleast one uppercase, one lowercase, one numeric and one special character';
            isValid = false;
        }

        if (phone.length !== 10) {
            tempErrors.phone = 'Phone number must be 10 digits';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            const formData = { username, email, password, phone };
            handleRegister(formData);
            setUsername('');
            setEmail('');
            setPassword('');
            setPhone('');
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login')
    };

    return (
        <div className='register-container'>
        <div className="image-container" data-aos='fade-in'>
            <img 
                className='background-image'
                src="AgriBackgound.jpg"
                alt="Agriculture Equipment"
            />
                <div className="form-overlay" data-aos='fade-up'>
                <b className='bb'>Register/Sign Up</b>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <input
                            type="text"
                            placeholder='Enter username'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className={errors.username ? 'error-input' : ''}
                        />
                        {errors.username && <span className="error-message">{errors.username}</span>}
                    </div>
                    <div className='form-group'>
                        <input
                            type="email"
                            placeholder='Enter email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className={errors.email ? 'error-input' : ''}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className='form-group'>
                        <input
                            type="password"
                            placeholder='Enter password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className={errors.password ? 'error-input' : ''}
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                    <div className='form-group'>
                        <input
                            type="text"
                            placeholder='Enter phone number'
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className={errors.phone ? 'error-input' : ''}
                        />
                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>
                    <div className="button-group">
                        <input type="submit" value="Register" className="btn-primary" />
                        <button type="button" onClick={handleLoginRedirect} className="btn-secondary">
                            Login
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}
