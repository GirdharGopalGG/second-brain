import { useRef } from "react";
import { Button } from "../components/Buttons";
import { InputBox } from "../components/InputBox";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { backgroundStyle } from "../icons/Background";


export function Login(){
const navigate = useNavigate()


    const usernameRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()

    async function signin(){

const beUrl = import.meta.env.VITE_BE_URL as string


        try{
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value

        const response = await axios.post(`${beUrl}signin`, {

        username,
        password
    })
    
        // console.log(response)
        const jwt  = response.data.token

        if(!jwt){
            throw new Error('Login failed')
        }

        localStorage.setItem('token',jwt)
        navigate("/dash")
        }
        catch(e:any){
            alert(e.response?.data?.msg || 'Login error')
        }   


    }
    
    
    return <div>

        <div style={backgroundStyle} className="h-screen w-screen bg-slate-300 flex justify-center items-center">
            <div className="flex flex-col fixed left-20">
                <div className="text-5xl text-blue-150 mb-4">
                    Why use 1?
                </div>
                <div className="text-6xl underline italic text-blue-200">
                    When you can use 2
                </div>
            </div>
            <div className="fixed right-60">
           <div className=" fixed top-52 flex justify-center text-5xl text-blue-200">
            <div className="underline italic font-semibold px-4">Second Brain</div>
            <div><img src="https://img.icons8.com/?size=100&id=2802&format=png&color=228BE6" alt="Blue-Brain" className="size-16"/></div>
           </div>
            <div className=" bg-white min-w-80 rounded-xl min-h-36 p-6 mt-6" >
                <div className="flex flex-col items-center   ">
                <InputBox type="text" placeholder={"Username"} reference={usernameRef} />
                <InputBox type="password" placeholder={"Password"} reference={passwordRef} />
                
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
    </div>
}