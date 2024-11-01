
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { route } from "../../routes";
import { useState } from "react";
import Loading from "../../utils/Loading";


const ResetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm(); // custom hook by lib...

    const email = 'email';

    const [isLoading, setIsLoading] = useState(false);

    const handleToastInfo = () => {
        if (errors[email]) return toast.error(errors[email].message);
    }

    const handlePasswordReset = async (data) => {
        const { email } = data;

        try {
            setIsLoading(true);
            // await resetUserPassword(email);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="authContainer">

            <p className="authTitle">Password Reset 🔐</p>

            <form
                className="authForm"
                onSubmit={handleSubmit(handlePasswordReset)}
            >

                {
                    isLoading &&
                    <div className="backdropLoading">
                        <Loading />
                    </div>
                }

                <input
                    type={email}
                    name={email}
                    className="authInput"
                    placeholder="Enter email address"
                    {...register(email, { required: 'Email Required...' })}
                />

                <button type="submit" className="submitBtn" onClick={handleToastInfo}>
                    Send email
                </button>

                <div className="text-center flex flex-col gap-1 mt-1.5">
                    <p>Don&apos;t have an account?
                        <Link to={route.register} className="navLink">
                            Please Register
                        </Link>
                    </p>
                </div>

            </form>
        </div>
    )
}

export default ResetPassword