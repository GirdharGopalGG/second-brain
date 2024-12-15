import { useNavigate } from "react-router-dom";
import { Button } from "../components/Buttons";
import { backgroundStyle } from "../icons/Background";

export function LandingPage(){

    const navigate = useNavigate()
    
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
                <div className="right-60 fixed top-52 flex justify-center text-5xl text-blue-200 ">
                    <div className="underline italic font-semibold px-4">
                        Second Brain
                    </div>
                    <div>
                        <img src="https://img.icons8.com/?size=100&id=2802&format=png&color=228BE6" alt="Blue-Brain" className="size-16"/>
                    </div>
                    
                </div>
                <div className="flex gap-8 flex-col justify-center items-center ">
                    <div className="pl-6 flex gap-6 justify-center items-center text-5xl text-blue-200">
                        <div > New User &gt;</div>
                    <Button variant="primary" onClick={()=>navigate('/signup')} text="Sign up" />
                    </div>
                    <div className="flex justify-center items-center text-5xl text-blue-200">
                        <div>Existing User &gt;</div>
                    <Button variant="secondary" onClick={()=>navigate('/signin')} text="Login" />
                    </div>
                </div>
           </div>
        </div>
    </div>
}