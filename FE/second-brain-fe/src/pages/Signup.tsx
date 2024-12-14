import { useRef, useState } from "react"
import { Button } from "../components/Buttons"
import { InputBox } from "../components/InputBox"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

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
    <div>
      <div className="h-screen w-screen bg-slate-300 flex justify-center items-center">
        <div className=" bg-white min-w-80 rounded-xl min-h-60 p-6">
          <div className="flex flex-col items-center  ">
            <InputBox type="text" placeholder={"Username"} reference={usernameRef} />
            <InputBox type="password" placeholder={"Password"} reference={passwordRef} />

          {error && <p className="text-red-600 pt-2">{error}</p>}


            <div className="flex justify-center gap-4 mt-4 w-full ">
              <Button
                wide={true}
                onClick={signup}
                variant="primary"
                text={`${isDisabled?'Submitting...':'Sign up'}`}
                classname="flex justify-center "
                disabled={isDisabled}
              />
            </div>
          </div>
          <div className="pt-3">
            Already have an account?{" "}
            <Link to={"/signin"}>
              {" "}
              <span className="text-blue-150 font-semibold">Log in</span>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
