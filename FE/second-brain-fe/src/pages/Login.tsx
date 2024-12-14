import { useRef } from "react";
import { Button } from "../components/Buttons";
import { InputBox } from "../components/InputBox";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export function Login(){
const navigate = useNavigate()


    const usernameRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()

    async function signin(){

        try{
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value

        const response = await axios.post("http://localhost:3000/signin", {

        username,
        password
    })
    
        // console.log(response)
        const jwt  = response.data.token

        if(!jwt){
            throw new Error('Login failed')
        }

        localStorage.setItem('token',jwt)
        navigate("/")
        }
        catch(e:any){
            alert(e.response?.data?.msg || 'Login error')
        }   


    }
    
    
    return <div> 
        <div className="h-screen w-screen bg-slate-300 flex justify-center items-center">
            <div className=" bg-white min-w-80 rounded-xl min-h-36 p-6 " >
                <div className="flex flex-col items-center   ">
                <InputBox placeholder={"Username"} reference={usernameRef} />
                <InputBox placeholder={"Password"} reference={passwordRef} />
                
                </div>
                
                <div className="flex justify-center gap-4 mt-4 w-full">
                 <Button wide={true} onClick={signin} variant="primary" text={"Login"} classname="flex justify-center" />
                </div>
                <div className="pt-3">
                    New to Brainly? <Link to={"/signup"}> <span className="text-blue-150 font-semibold" >Sign up</span>  </Link>
                
                </div>
                
            </div>
        </div>
    </div>
}