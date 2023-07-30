import { useAuth } from "../../Context/AuthProvider";

const Profile = () => {
    const auth = useAuth();
    return (
        <div className='md:w-10/12 mx-auto'>
            <h3 className="text-xl font-semibold md:mb-10 mb-8">Profile</h3>
            <div className="border-slate-200 border md:p-12 p-5">
                <div className='flex md:items-center mb-10 md:flex-row flex-col item-start'>
                    <div className='md:w-1/6 w-full'>
                        <span className='mb-4 font-semibold text-base'>Name
                        </span>
                    </div>
                    <div className='md:w-5/6 w-full border-slate-300 border-b-2'>
                        <p className="pb-3">{auth.name}</p>
                    </div>
                </div>
                <div className='flex md:items-center mb-10 md:flex-row flex-col item-start'>
                    <div className='md:w-1/6 w-full'>
                        <span className='mb-4 font-semibold text-base'>Eamil
                        </span>
                    </div>
                    <div className='md:w-5/6 w-full border-slate-300 border-b-2'>
                        <p className="pb-3">{auth.email}</p>
                    </div>
                </div>
                <div className='flex md:items-center mb-10 md:flex-row flex-col item-start'>
                    <div className='md:w-1/6 w-full'>
                        <span className='mb-4 font-semibold text-base'>Tel
                        </span>
                    </div>
                    <div className='md:w-5/6 w-full border-slate-300 border-b-2'>
                        <p className="pb-3">{auth.tel}</p>
                    </div>
                </div>
                <div className='flex md:items-center mb-10 md:flex-row flex-col item-start'>
                    <div className='md:w-1/6 w-full'>
                        <span className='mb-4 font-semibold text-base'>CellPhone
                        </span>
                    </div>
                    <div className='md:w-5/6 w-full border-slate-300 border-b-2'>
                        <p className="pb-3">{auth.phoneNumber}</p>
                    </div>
                </div>
                <div className='flex md:items-center mb-10 md:flex-row flex-col item-start'>
                    <div className='md:w-1/6 w-full'>
                        <span className='mb-4 font-semibold text-base'>Address
                        </span>
                    </div>
                    <div className='md:w-5/6 w-full border-slate-300 border-b-2'>
                        <p className="pb-3">{auth.address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;