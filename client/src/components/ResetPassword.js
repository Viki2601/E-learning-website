import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'
import Cookies from 'js-cookie';

export default function ResetPassword() {
    const navigate = useNavigate()
    const url = "https://e-learning-website-server.onrender.com";
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')

    const submit = async (e) => {
        e.preventDefault();

        try {
            if (password !== repassword) {
                toast.error("Passwords doesn't match")
            }
            else if (password.length < 6) {
                toast.error("Password must be atleast 6 characters")
            }
            else {
                const cookieVal = Cookies.get("resetEmail")
                await axios.post(`${url}/resetPassword`, {
                    cookieVal, password
                })
                    .then(res => {
                        if (res.data === "pass") {
                            toast.success("Password changed successfully")
                            Cookies.remove("resetEmail")
                            navigate("/login")
                        }
                        else if (res.data === "fail") {
                            toast.error("Something went wrong!");
                        }
                    })
                    .catch(e => {
                        toast.error("Somethig went wrong!");
                    })
            }
        }
        catch (e) {
            toast.error("Somethig went wrong!");
        }
    }
    return (
        <div className='mb-6'>
            <form onSubmit={submit} >
                <section className="text-gray-600 mt-14 body-font grid place-items-center  relative  ">

                    <div className="lg:w-1/3 md:w-1/2 rounded-lg p-8 flex flex-col   mt-10 md:mt-0 relative z-10 shadow-md">
                        <h2 className="text-gray-900 text-2xl mb-5 font-medium title-font">Reset Password</h2>


                        <div className="relative mb-4">
                            <label for="password" className="leading-7 text-sm text-gray-400">Password</label>
                            <input value={password} onChange={(event) => setPassword(event.target.value)} required type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label for="password" className="leading-7 text-sm text-gray-400">Confirm Password</label>
                            <input value={repassword} onChange={(event) => setRepassword(event.target.value)} required type="password" id="repassword" name="repassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>

                        <input className="mt-3 cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" type="submit" value={"Submit"} />
                    </div>
                </section>
            </form>
            <ToastContainer/>
        </div>
    )
}
