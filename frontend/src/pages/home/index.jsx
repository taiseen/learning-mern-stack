import { useGetAllProduct } from "../../api/products/apiService";
import { useAuthUserContext } from "../../context/AuthContext";
import { Header } from "../../components/Header";
import { toast } from "react-toastify";


const Home = () => {

    const { authUser } = useAuthUserContext();
    const { name } = authUser ?? {};

    // useAxiosToken();

    // for 🔎 Read/Get data by id functionality...
    const { data, error, isLoading } = useGetAllProduct();


    if (error) {
        toast.error(error?.response?.data?.message);
    }

    if (isLoading) {
        return (
            <div className="h-screen bg-slate-600 flex items-center justify-center text-6xl text-black">
                Loading data...
            </div>
        )
    }

    // if (error) return <div className="">Error occurred : {error.message}</div>


    // if (loading) return (
    //     <div className="h-screen grid place-items-center">
    //         <p className="text-4xl font-semibold">User info loading...</p>
    //     </div>
    // )

    return (
        <div>
            <Header authUser={authUser} />

            <section className="flex items-center justify-center mt-52 text-5xl">
                Welcome {name || 'Unknown'}
            </section>


            <div className='bg-gray-200 p-4 w-80 mx-auto rounded mt-4'>

                <div className="mb-2">
                    <p>To see these data need : jwt Token</p>
                    <p>and if token become invalid : refresh it...</p>
                </div>

                <div className="p-2 bg-green-600 text-white rounded">
                    {
                        data?.length > 0 &&
                        data.map((obj, i) => <p key={i}>{obj.name} - {obj.price}</p>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Home