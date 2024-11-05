import { useRegistration } from "../../api/auth/apiService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { route } from "../../routes";
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

    const navigate = useNavigate();
    
    const { register, handleSubmit, reset, setFocus, formState: { errors, isSubmitting } } = useForm(); // custom hook by lib...

    const { mutate: registrationMutation, isPending } = useRegistration(setFocus, reset);

    const isBtnDisable = isSubmitting || isPending;


    const handleLoginNow = () => navigate(route.login); // go to login page


    const handleRegistration = data => registrationMutation(data);


    return (
        <div className="authContainer">

            <p className="authTitle">Sign-up 📧</p>

            <form
                noValidate
                className="authForm"
                onSubmit={handleSubmit(handleRegistration)}
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


                <button
                    type="submit"
                    className="submitBtn"
                    disabled={isBtnDisable}
                >
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