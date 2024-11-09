import {useReducer, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthContext from '../context/AuthContext'
import axios from "../config/axios"

const initialState = {
    user: null,
    isLoggedIn: false 
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN_USER' : {
            return {...state, isLoggedIn: true, user: action.payload }
        } 
        case 'LOGOUT_USER' : {
            return {...state, isLoggedIn: false, user: null }
        }
    }
}  

function AuthProvider(props){
    const navigate = useNavigate()
    const [state,dispatch] = useReducer(reducer, initialState)

    useEffect(() => { // handle page reload 
        (async () => {
            if(localStorage.getItem('token')) {
                try {
                    const userResponse = await axios.get('/api/users/account', { headers: { 'Authorization': localStorage.getItem('token')}})
                    dispatch({ type: 'LOGIN_USER', payload: userResponse.data })
                } catch(err) {
                    console.log(err)
                }
            }
        })();
    }, [])

    const handleRegister = async (formData) => {
        try { 
            const response = await axios.post('/api/users/register', formData)
            console.log(response.data)
            toast('Successfully Registered', { autoClose: 2000 })
            navigate('/login')
            
        } catch(err) {
            console.log(err)
        }
    }

    const handleLogin = async (formData) => {
        try {
            const response = await axios.post('/api/users/login', formData);
            localStorage.setItem('token', response.data.token);
            toast('Successfully logged in', { autoClose: 2000 });
    
            // Fetch user account details after login
            const userResponse = await axios.get('/api/users/account', { 
                headers: { 'Authorization': localStorage.getItem('token') }
            });
    
            const user = userResponse.data;
            dispatch({ type: 'LOGIN_USER', payload: user });
    
            // Check user role and navigate accordingly
            if (user.role === 'admin') {
                navigate('/manage-users'); // Navigate to admin dashboard
            } else {
                navigate('/home'); // Navigate to user home page
            }
        } catch (err) {
            console.log(err);
        }
    };
    

    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch({ type: 'LOGOUT_USER' })
        toast("successfully logged out" , { autoClose: 2000 })
        navigate('/login')
    }

    
    return (
        <AuthContext.Provider value={{ state, handleRegister, handleLogin, handleLogout}}>
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthProvider
