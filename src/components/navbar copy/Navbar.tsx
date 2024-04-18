import restaurant from '@/assets/restaurant.png'
import { RootState } from '@/store'
import { User } from '@/types/User.types'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import LogoutDialog from './LogoutDialog'

export default function Navbar() {

    const nav = useNavigate()

    const user = useSelector<RootState, User | undefined>(state => state.user.user)


    const AuthenticatedButtons = useCallback(() => {
        if (!user) return null
        return <div className='flex flex-row items-center gap-4'>
            <Button className="mr-2 bg-[#692b2b] font-bold" onClick={() => nav("/create-review")}>Create Review</Button>

            <Link to="/profile">Profile</Link>
            <LogoutDialog />
        </div>
    }, [user])

    const NotAuthenticatedButtons = useCallback(() => {
        if (user) return null
        return <div className="flex flex-row gap-4 items-center">
            <Link to="/auth/register">Register</Link>
            <Link to="/auth/login">Login</Link>
        </div>
    }, [user])

    return <nav className='flex flex-row justify-between'>
        <div className='flex flex-row gap-8 items-center'>
            <div className='flex flex-row items-center gap-2 cursor-pointer' onClick={() => nav("/")}>
                <img src={restaurant} width={50} height={50} />
                <span className='font-bold'>Michelenne Reviews</span>
            </div>
            <div className='flex flex-row items-center gap-2'>
                <Link to="/about">About</Link>
            </div>
        </div>
        <AuthenticatedButtons />
        <NotAuthenticatedButtons />
    </nav>
}