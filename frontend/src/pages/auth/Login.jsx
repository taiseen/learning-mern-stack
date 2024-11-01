import { useAuthUserContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { route } from "../../routes";
import { useState } from "react";
import { login } from "../../api";
import Loading from "../../utils/Loading";
import dbLocal from "../../utils/dbLocal";


const space = 'Space Not Allow';
const password = 'password';
const email = 'email';


const Login = () => {

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm(); // custom hook by lib...

    const [isLoading, setIsLoading] = useState(false);

    const { setAuthUser } = useAuthUserContext();

    const navigate = useNavigate();


    const handleUserLogin = async (data) => {
        const { email, password } = data;
        const userInfo = { email, password };

        try {
            setIsLoading(true);
            const res = await login(userInfo);

            if (res.status === 200) {
                const userInfo = { ...res.data, isAuth: true };

                dbLocal('set', 'user', userInfo); // set info to localStorage
                setAuthUser(userInfo) // init user data for app...

                navigate(route.home); // redirect user to home page
                reset(); // clear user input fields... after submit data...
                toast.dismiss();
            }

        } catch (error) {

            const res = error.response;
            console.log(res);
            toast.error(res?.data?.message)

        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="authContainer">

            <p className="authTitle">Sign-in 🗝️</p>

            <form
                noValidate
                className="authForm"
                onSubmit={handleSubmit(handleUserLogin)}
            >

                {
                    isLoading &&
                    <div className="backdropLoading">
                        <Loading />
                    </div>
                }

                <div className="authInputBlock">
                    <input
                        autoFocus
                        type={email}
                        name={email}
                        className={`authInput ${errors.email ? 'focus:border-red-600 border-red-600 ' : ''}`}
                        placeholder="Enter Email"
                        {...register(email, {
                            required: 'Email Required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Invalid email address'
                            }
                        })}
                    />

                    {
                        errors.email &&
                        <p className="authInputError">
                            {errors.email.message}
                        </p>
                    }
                </div>


                <div className="authInputBlock">
                    <input
                        type={password}
                        name={password}
                        className={`authInput ${errors.password ? 'focus:border-red-600 border-red-600' : ''}`}
                        placeholder="Enter Password"
                        {...register(password, {
                            required: 'Password Required...',
                            minLength: { value: 4, message: 'Minimum 4 characters' },
                            validate: {
                                hasNoSpaces: (value) => !/\s/.test(value) || space,
                            },
                        })
                        }
                    />

                    {
                        errors.password &&
                        <p className="authInputError">
                            {errors.password.message}
                        </p>
                    }
                </div>


                <button type="submit" className="submitBtn">
                    Login
                </button>


                <div className="text-center flex flex-col gap-1 mt-1.5">
                    <p>For new account please
                        <Link to={route.register} className="navLink">
                            Register
                        </Link>
                    </p>

                    <p>Forgat password?
                        <Link to={route.resetPassword} className="navLink">
                            Reset
                        </Link>
                    </p>
                </div>

            </form>

            <DevTool control={control} />
        </div>
    )
}

export default Login