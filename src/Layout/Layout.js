import Footer from '../component/Footer/Footer'
import Header from '../component/Header/Header'
import { Outlet } from 'react-router-dom'
import { useHero } from '../Context/HeroProvider';

function Layout() {
    const hero = useHero();
    return (
        <div className={`${hero ? '' : 'md:pt-24 pt-16'}`}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout