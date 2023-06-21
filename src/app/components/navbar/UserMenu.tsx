'use client';
import useLoginModal from '@/app/hooks/useLoginModel';
import useRegisterModal from '@/app/hooks/useRegisterModel';

import useRentModal from '@/app/hooks/useRentModel';
import { SafeUser } from '@/app/types';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';

interface UserMenuProps{
    currentUser?: SafeUser|null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const router = useRouter();
    const rentModal = useRentModal();
    const registerModal = useRegisterModal();
    const loginModel = useLoginModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() =>{
        setIsOpen((value) => !value);
    },[]);

    const onRent = useCallback(()=>{
        if(!currentUser){
            return loginModel.onOpen();
        }

        rentModal.onOpen();
    },[currentUser,loginModel, rentModal]);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div 
                onClick={onRent}
                className="hidden 
                md:block 
                text-sm 
                font-semibold 
                py-3 
                px-4 
                rounded-full 
                hover:bg-neutral-100 
                transition 
                cursor-pointer">
            Airbnb you home
                </div>
                <div onClick={toggleOpen} className="
                p-4
                md:py-1md:px-2
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                gap-3
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition
                ">
                    <AiOutlineMenu />

                    <div className='hidden md:block'>
                        <Avatar src={currentUser?.image} />

                    </div>
                </div>
            </div>

            {isOpen && (
            <div
                className='absolute
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm
            '>
                <div className='flex flex-col cursor-pointer'>
                    {currentUser ? (
                        <>
                            <MenuItem 
                                onClick={()=>router.push("/trips")}
                                label='My trips'
                            />
                            <MenuItem 
                                onClick={()=>router.push("/favorites")}
                                label='My favorites'
                            />
                            <MenuItem 
                                onClick={()=>router.push("/reservations")}
                                label='My reservations'
                            />
                            <MenuItem 
                                onClick={()=>router.push("/properties")}
                                label='My properties'
                            />
                            <MenuItem 
                                onClick={rentModal.onOpen}
                                label='Airbnb my home'
                            />
                            <hr />
                            <MenuItem 
                                onClick={()=> signOut()}
                                label='Logout'
                            />
                        </>
                    ):(
                    <> 
                        <MenuItem 
                        onClick={loginModel.onOpen}
                        label="Login"
                        />
                        <MenuItem 
                        onClick={registerModal.onOpen}
                        label="Sign up"
                        />
                    </>
                    )}
                </div>
            </div>
            )}
        </div>
    );
}
export default UserMenu;