import {useState} from "react"
import API from "./api"

function Login({setAdmin}){

const [username,setUsername] = useState("")
const [password,setPassword] = useState("")

async function login(){

 const res = await API.post("/admin/login",{
   username,
   password
 })

 if(res.data.success){
   setAdmin(true)
 }else{
   alert("Invalid login")
 }

}

return(

<div>

<h2>Admin Login</h2>

<input
placeholder="username"
onChange={e=>setUsername(e.target.value)}
/>

<input
type="password"
placeholder="password"
onChange={e=>setPassword(e.target.value)}
/>

<button onClick={login}>Login</button>

</div>

)

}

export default Login