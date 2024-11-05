import { useLogin } from "../../api/auth/apiService";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { route } from "../../routes";
import Loading from "../../utils/Loading";


const space = 'Space Not Allow';
const password = 'password';
const email = 'email';


const Login = () => {

    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm(); // custom hook by lib...

    const { mutate: loginMutation, isPending } = useLogin();

    const isBtnDisable = isSubmitting || isPending;


    const handleUserLogin = data => loginMutation(data);


    return (
        <div className="authContainer">

            <p className="authTitle">Sign-in 🗝️</p>

            <form
                noValidate
                className="authForm"
                onSubmit={handleSubmit(handleUserLogin)}
            >

                {
                    isPending &&
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
                            validate: { hasNoSpaces: (value) => !/\s/.test(value) || space },
                        })}
                    />

                    {
                        errors.password &&
                        <p className="authInputError">
                            {errors.password.message}
                        </p>
                    }
                </div>


                <button
                    type="submit"
                    className="submitBtn"
                    disabled={isBtnDisable}
                >
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