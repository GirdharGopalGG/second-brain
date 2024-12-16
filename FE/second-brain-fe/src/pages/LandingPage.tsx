import { useNavigate } from "react-router-dom";
import { Button } from "../components/Buttons";
import { backgroundStyle } from "../icons/Background";


export function LandingPage(){
    const navigate = useNavigate()
    
    return (
        <div className="min-h-screen w-full bg-slate-300">
            <div style={backgroundStyle} className="h-screen w-full flex flex-col md:flex-row justify-center items-center p-4">
                <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:pl-8">
                    <div className="text-3xl md:text-5xl text-blue-150 mb-4">
                        Why use 1?
                    </div>
                    <div className="text-4xl md:text-6xl underline italic text-blue-200">
                        When you can use 2
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col items-center">
                    <div className="flex items-center justify-center mb-8">
                        <div className="text-3xl md:text-5xl text-blue-200">
                            <span className="underline italic font-semibold px-4">
                                Second Brain
                            </span>
                        </div>
                        <img 
                            src="https://img.icons8.com/?size=100&id=2802&format=png&color=228BE6" 
                            alt="Blue-Brain" 
                            className="w-12 h-12 md:w-16 md:h-16"
                        />
                    </div>

                    <div className="flex flex-col gap-6 w-full max-w-md px-4">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-2xl md:text-5xl text-blue-200">
                            <div>New User </div>
                            <Button 
                                variant="primary" 
                                onClick={()=>navigate('/signup')} 
                                text="Sign up" 
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-2xl md:text-5xl text-blue-200">
                            <div>Existing User</div>
                            <Button 
                                variant="secondary" 
                                onClick={()=>navigate('/signin')} 
                                text="Login" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}