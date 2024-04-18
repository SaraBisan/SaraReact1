import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import NotFound from './pages/notfound/Notfound'
import Auth from './pages/auth/Auth'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import About from './pages/about/About'
import Profile from './pages/profile/Profile'
import ProfileEdit from './pages/profile/ProfileEdit'
import Logout from './pages/auth/Logout'
import LikedReviews from './pages/profile/LikedReviews'
import MyReviews from './pages/profile/MyReviews'
import CreateReview from './pages/reviews/CreateReview'
import UpdateReview from './pages/reviews/UpdateReview'
import ReviewPage from './pages/reviews/ReviewPage'

export default function AppRouter() {
    return <Routes>

        <Route index element={<Home />} />

        <Route path='/auth' element={<Auth />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
        </Route>
        <Route path="/logout" element={<Logout />} />


        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} >
            <Route index element={<></>} />
            <Route path="profile-update" element={<ProfileEdit />} />
            <Route path="profile-my-reviews" element={<MyReviews />} />
            <Route path="profile-liked-reviews" element={<LikedReviews />} />
        </Route>

        <Route path="/create-review" element={<CreateReview />} />
        <Route path="/update-review/:id" element={<UpdateReview />} />
        <Route path="/view-review/:id" element={<ReviewPage />} />

        <Route path='*' element={<NotFound />} />

    </Routes>
}