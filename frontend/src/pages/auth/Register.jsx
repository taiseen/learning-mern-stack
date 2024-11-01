
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registration } from "../../api";
import { toast } from "react-toastify";
import { route } from "../../routes";
import { useState } from "react";
import Loading from "../../utils/Loading";


const name = 'name';
const email = 'email';
const password = 'password';
const cant = 'Field is required';
const min2 = 'Minimum 2 characters';
const min4 = 'Minimum 4 characters'
const max20 = 'Maximum 20 characters';
const min30 = 'Maximum 30 characters';
const space = 'Space Not Allow';


const Register = () => {

    const { register, handleSubmit, reset, setFocus, formState: { errors } } = useForm(); // custom hook by lib...

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();


    // go to login page
    const handleLoginNow = () => navigate(route.login);


    const handleRegistrationSubmit = async (data) => {
        const { name, email, password } = data;

        try {
            setIsLoading(true);
            const userInfo = { name, email, password };
            const { data } = await registration(userInfo);

            toast.success(data.message);

            setFocus('name', { shouldFocus: true }) // cursor focus back into 1st input field...

            reset(); // clear user input fields... after submit data...

            setTimeout(() => navigate(route.login), 5000) // auto redirect after 5 second...

        } catch (error) {

            const res = error.response;

            // if (errorRes.status === 400) { // "Bad Request"
            //     toast.error(errorRes.data?.error?.details[0]?.message);
            // }

            // if (errorRes.status === 409) { // "Conflict"
            //     toast.error(errorRes.data?.message);
            // }

            const errorMap = {
                400: res.data?.error?.details[0]?.message, // Bad Request
                409: res.data?.message // Conflict
            };

            const errorMessage = errorMap[res.status];

            if (errorMessage) toast.error(errorMessage);

        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="authContainer">

            <p className="authTitle">Sign-up 📧</p>

            <form
                noValidate
                className="authForm"
                onSubmit={handleSubmit(handleRegistrationSubmit)}
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
                        type='text'
                        name={name}
                        className={`authInput ${errors.name ? 'focus:border-red-600 border-red-600' : ''}`}
                        placeholder="Enter Name"
                        {...register(name, {
                            required: cant,
                            minLength: { value: 2, message: min2 },
                            maxLength: { value: 20, message: max20 },
                        })}
                    />

                    {
                        errors.name &&
                        <p className="authInputError">
                            {errors.name.message}
                        </p>
                    }
                </div>


                <div className="authInputBlock">
                    <input
                        type={email}
                        name={email}
                        className={`authInput ${errors.email ? 'focus:border-red-600 border-red-600' : ''}`}
                        placeholder="Enter Email"
                        {...register(email, {
                            required: cant,
                            maxLength: { value: 30, message: min30 },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Invalid email address'
                            },

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
                            required: cant,
                            minLength: { value: 4, message: min4 },
                            maxLength: { value: 20, message: max20 },
                            validate: {
                                hasNoSpaces: (value) => !/\s/.test(value) || space,
                            },
                        })}
                    />

                    {
                        errors.password &&
                        <p className="authInputError">
                            {errors.password.message}
                        </p>
                    }
                </div>


                <button type="submit" className="submitBtn">
                    Register
                </button>

                <p>Already have an account?
                    <span onClick={handleLoginNow} className="navLink">
                        Login Now
                    </span>
                </p>
            </form>

        </div>
    )
}

export default Register