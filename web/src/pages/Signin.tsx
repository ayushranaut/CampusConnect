import { MouseEvent, useState } from "react"
import { useAuthStore } from "../stores/AuthStore/useAuthStore"
import { Eye, EyeOff, Loader } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { routeVariants } from "@/lib/routeAnimation"

export const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const { signin, isSigningIn } = useAuthStore()

    async function onClickHandler(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        signin({email, password})
    }
    
    return (
        <motion.div 
            className="min-h-screen grid dark:text-black place-items-center"
            variants={routeVariants}
            initial="initial"
            animate="final"
            exit="exit"    
        >
            <div className="w-full max-w-md bg-white dark:bg-neutral-700 rounded-lg shadow-lg p-8">
                <div className="grid gap-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-500">Sign In</h1>
                        <p className="text-gray-500 dark:text-gray-200 mt-2">Welcome back to PVPPCOE Campus Network</p>
                    </div>
                    
                    <form className="grid gap-5">
                        {/* Email */}
                        <div className="grid gap-2">
                            <label className="text-gray-600 dark:text-gray-200">College Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 dark:bg-gray-600/60 dark:text-gray-100 dark:placeholder:text-gray-400/40 bg-blue-50/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="you@pvppcoe.ac.in"
                            />
                        </div>

                        {/* Password */}
                        <div className="grid gap-2">
                            <label className="text-gray-600 dark:text-gray-200">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-blue-50/50 dark:bg-gray-600/60 dark:text-gray-100 dark:placeholder:text-gray-400/40 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-4 text-gray-500 dark:text-gray-400 dark:hover:text-gray-100 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSigningIn}
                                onClick={onClickHandler}
                                className={`w-full py-3 ${isSigningIn ? "bg-indigo-400": "dark:bg-indigo-500 dark:hover:bg-indigo-600 bg-indigo-600 hover:bg-indigo-700"} dark:text-gray-200  text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-md`}
                            >
                                {isSigningIn ? <div className="flex items-center justify-center"> <Loader className="animate-spin self-center" /> </div>: 'Sign In'}
                               
                            </button>
                        </div>

                        <div className="text-center pt-4">
                            <p className="text-gray-600">
                                Don't have an account?{" "}
                                <Link to="/signup" className="text-indigo-600 dark:text-indigo-500 font-medium hover:text-indigo-800">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    )
}