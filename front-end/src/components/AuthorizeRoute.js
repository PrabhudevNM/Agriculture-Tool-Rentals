import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
export default function AuthorizeRoute(props){
    const {state}=useContext(AuthContext)
    if(!state.user){
        return <p>Loaading...</p>
    }
    if(props.permittedRoles.includes(state.user.role)){
        return props.children
    }else{
        return <Navigate to="/forbidden"/>
    }
}