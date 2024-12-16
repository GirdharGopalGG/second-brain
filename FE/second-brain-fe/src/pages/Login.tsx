import { useRef } from "react";
import { Button } from "../components/Buttons";
import { InputBox } from "../components/InputBox";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { backgroundStyle } from "../icons/Background";
import { EyeClose } from "../icons/EyeClose";


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

        <div style={backgroundStyle} className="min-h-screen bg-slate-300 flex flex-col md:flex-row justify-center items-center px-4 md:px-20 py-8 md:py-20">
            <div className="hidden md:flex flex-col  md:fixed md:left-20">
                <div className="text-3xl md:text-5xl text-blue-150 mb-4">
                    Why use 1?
                </div>
                <div className="text-3xl md:text-6xl underline italic text-blue-200">
                    When you can use 2
                </div>
            </div>

            <div className="flex rounded-xl items-center shadow-lg bg-white flex-col md:fixed md:right-60 p-6">
                <div className="p-2 flex justify-center text-3xl md:text-5xl text-blue-200">
                    <div className="underline italic font-semibold">Second Brain</div>
                    <div><img src="https://img.icons8.com/?size=100&id=2802&format=png&color=228BE6" alt="Blue-Brain" className="size-10 md:size-16"/></div>
                    </div>
                <div className=" flex flex-col items-center" >
                    <div className="gap-2 flex flex-col ">
                        <div className="flex flex-col items-center gap-2">
                            <InputBox type="text" placeholder={"Username"} reference={usernameRef} />
                            <InputBox type="password" placeholder={"Password"} reference={passwordRef} endIcon={<EyeClose/>} />
                    
                        </div>
                    <div>
                 <Button wide={true} onClick={signin} variant="primary" text={"Login"} classname="flex justify-center items-center" />
                </div>
                <div className="text-center">
                    New to Second Brain? <Link to={"/signup"}> <span className="text-blue-150 font-semibold" >Sign up</span>  </Link>
                
                </div>
                
            </div>
            </div>
            </div>
        </div>
    </div>
}