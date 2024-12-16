import { useRef, useState } from "react"
import { Button } from "../components/Buttons"
import { InputBox } from "../components/InputBox"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { backgroundStyle } from '../icons/Background';
import { EyeClose } from "../icons/EyeClose"


export function Signup() {


const beUrl = import.meta.env.VITE_BE_URL as string

  const navigate = useNavigate()
  const [isDisabled, setIsDisabled] = useState(false)
  const [error,setError] = useState('')

  const usernameRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()

  async function signup() {
    setIsDisabled(true)
    setError('')
    // console.log('hithere')

    const username = usernameRef.current?.value
    const password = passwordRef.current?.value
    
    try {
       const response = await axios.post(`${beUrl}signup`, {
        username: username,
        password: password,
      })
      // console.log('HI')

      

      alert(response.data.msg)
      console.log(response)
      console.log(response.data)
      console.log(response.statusText)
      // alert('you have signed up ')
      navigate("/signin")
    } 
    catch (e:any) {
      // console.log(response)
      // alert(e.response.data.msg)
      console.log(e.response)
      if(e.response){
      if(e.response.statusText!='ok'){
        setError(e.response.data.msg)
      }

      
    }
    else{
      console.error('something went Wrong!!!')
      setError("unexpected error occurred")
    }
      
    } 
    finally {
      setIsDisabled(false)
    }
  }

  

  return (
    
    <div
      style={backgroundStyle}
      className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-20 py-8 md:py-0"
    >
      <div className="hidden md:flex flex-col items-start md:fixed left-20">
        <div className="text-4xl md:text-5xl text-blue-150 mb-4">Why use 1?</div>
        <div className="text-5xl md:text-6xl underline italic text-blue-200">
          When you can use 2
        </div>
      </div>

      <div className="  bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-2 md:fixed md:right-60">
        <div className="flex flex-col items-center gap-2">
          <div className="text-3xl md:text-5xl text-blue-200 flex justify-center items-center">
            <div className="underline italic font-semibold">Second Brain</div>
            <div>
              <img
                src="https://img.icons8.com/?size=100&id=2802&format=png&color=228BE6"
                alt="Blue-Brain"
                className="size-10 md:size-16 mt-2"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2  ">
          <InputBox
            type="text"
            placeholder={"Username"}
            reference={usernameRef}
          />
          <InputBox
            type="password"
            placeholder={"Password"}
            reference={passwordRef}
            endIcon={<EyeClose />}
          />

          {error && <p className="text-red-600 text-sm pt-2">{error}</p>}

          <Button
            wide={true}
            onClick={signup}
            variant="primary"
            text={`${isDisabled ? "Submitting..." : "Sign up"}`}
            classname="flex justify-center"
            disabled={isDisabled}
          />

          <div className="text-center">
            Already have an account?{" "}
            <Link to={"/signin"}>
              <span className="text-blue-150 font-semibold">Log in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
