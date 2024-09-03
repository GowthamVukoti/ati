import React, { useState, useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './components/Header/Header';
import SideNav from './components/SideNav';
import HeroSection from './components/HeroSection';
import ProductSection from './components/ProductSection';
import ProductPage from './components/ProductPage/ProductPage';
import ScrollingText from './components/Footer/ScrollingText';
import Footer from './components/Footer/Footer';
import LoginForm from './components/Login/LoginForm';
import SignupForm from './components/Login/SignupForm';

function App() {
    const [isSideNavOpen, setSideNavOpen] = useState(false);
    const headerRef = useRef(null);
    const heroTextRef = useRef(null);
    const location = useLocation();

    const toggleSideNav = () => {
        setSideNavOpen(prevState => !prevState);
    };

    const closeSideNav = () => {
        setSideNavOpen(false);
    };

    const handleScroll = () => {
        const header = headerRef.current;
        const heroText = heroTextRef.current;
        const threshold = header ? header.offsetHeight : 0;

        if (header) {
            if (window.scrollY > threshold) {
                header.classList.add('visible');
                header.classList.remove('pre-scroll');
            } else {
                header.classList.remove('visible');
                header.classList.add('pre-scroll');
            }
        }

        if (heroText) {
            if (window.scrollY >= threshold) {
                heroText.classList.add('sticky');
            } else {
                heroText.classList.remove('sticky');
            }
        }
    };

    useEffect(() => {
        if (headerRef.current) {
            headerRef.current.classList.add('pre-scroll');
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // Scroll to top instantly on route change
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const shouldShowFooter = location.pathname !== '/login' && location.pathname !== '/signup';

    return (
        <div className="App">
            {location.pathname === '/' && (
                <Header toggleSideNav={toggleSideNav} ref={headerRef} />
            )}
            <SideNav isOpen={isSideNavOpen} closeSideNav={closeSideNav} />
            <Routes>
                <Route path="/" element={
                    <>
                        <HeroSection ref={heroTextRef} />
                        <ProductSection />
                        <ScrollingText />
                    </>
                } />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
            </Routes>
            {shouldShowFooter && <Footer />}
        </div>
    );
}

export default App;
