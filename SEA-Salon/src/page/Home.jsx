import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Navigate, useNavigate } from 'react-router-dom';
import '../index.css';
import bghero from '../assets/bghero.webp';
import Review from '../component/Review';
import axios from 'axios';
import { RxCross1 } from "react-icons/rx";

export default function Home() {
    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isPopup1Open, setIsPopup1Open] = useState(false);
    const [isPopup2Open, setIsPopup2Open] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setIsScrollingUp(false);
            } else {
                setIsScrollingUp(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            'name': name,
            'email': email,
            'phoneNumber': phoneNumber,
            'password': password
        };

        try {
            const response = await axios.post('http://localhost:3000/api/users', formData)
            console.log(response.data);
            setIsPopup2Open(false);
            setIsPopup1Open(true);
        } catch (error) {
            console.error(error);
        }
        setName('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = {
            email: email,
            password: password,
        };
    
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', formData);
            console.log('Response data:', response.data);
            setIsPopup1Open(false);
            if (response.data.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/reservation');
            }
        } catch (error) {
            console.error('Error response:', error.response);
            if (error.response) {
                alert(error.response.data.message || "Invalid email or password!");
            } else if (error.request) {
                alert("No response received from server.");
            } else {
                alert("Error in setting up request.");
            }
        }
        setEmail('');
        setPassword('');
    };
    

    return (
        <div className='home relative flex flex-col w-full h-screen'>
            <img src={bghero} alt='bghero' className='absolute object-cover w-full h-screen' />
            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-gray-800 bg-opacity-30'></div>
            <div className={`navbar fixed top-0 z-20 flex justify-between w-full p-4 items-center bg-opacity-50 bg-gray-800 transition-transform duration-300 ${isScrollingUp ? 'transform translate-y-0' : 'transform -translate-y-full'}`}>
                <Link to='hero' smooth={true} className='text-2xl ml-4 md:ml-8 text-white font-medium hover:text-gray-300 cursor-pointer'>
                    SEA Salon
                </Link>
                <div className='flex space-x-10 md:space-x-20 mr-4 md:mr-8 text-white items-center'>
                    <Link to='services' smooth={true} className='hover:text-gray-300 cursor-pointer'>
                        Services
                    </Link>
                    <Link to='contact' smooth={true} className='hover:text-gray-300 cursor-pointer'>
                        Contact
                    </Link>
                </div>
            </div>
            <div className='content'>
                <div id="hero" className='hero relative z-10 flex flex-col justify-center items-center w-full h-screen pb-[85px]'>
                    <h1 className='text-5xl md:text-9xl text-white p-4 font-semibold'>SEA Salon</h1>
                    <h2 className='text-2xl md:text-5xl text-white'>Beauty and Elegance Redefined</h2>
                    <button 
                        className='bg-gray-500 text-white text-lg md:text-2xl font-medium rounded-lg p-2 mt-8 hover:bg-opacity-70 hover:tracking-wider transform hover:scale-110 ease-in-out duration-300'
                        onClick={() => setIsPopup1Open(true)}
                        >
                        BOOK NOW
                    </button>
                    {isPopup1Open && (
                    <div className='fixed z-20 inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
                        <div className='relative flex flex-col items-center bg-white p-4 rounded-lg w-4/5 md:w-1/5'>
                            <RxCross1 className='absolute top-2 right-2 text-2xl cursor-pointer' onClick={() => setIsPopup1Open(false)} />
                            <p className='text-2xl pb-2 font-semibold'>Sign in</p>
                            <form onSubmit={handleLogin}>
                                <input type='text' value={email} placeholder='Email' className='p-2 border rounded mt-4 w-full' onChange={(e) => setEmail(e.target.value)}/>
                                <input type='password' value={password} placeholder='Password' className='p-2 border rounded mt-4 w-full' onChange={(e) => setPassword(e.target.value)}/>
                                <button type='submit' className='bg-blue-500 text-white rounded p-2 mt-4 hover:bg-blue-700 w-full'>Sign in</button>
                            </form>  
                            <hr className='border-gray-500 w-full mt-4'/>
                            <p className='mt-4'>Don't have an account?</p>
                            <button className='bg-blue-500 text-white rounded p-2 mt-4 hover:bg-blue-700 w-full' onClick={() => {setIsPopup1Open(false); setIsPopup2Open(true);}}>Sign up</button>
                        </div>
                    </div>
                    )}
                    {isPopup2Open && (
                    <div className='fixed z-20 inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
                        <div className='relative flex flex-col items-center bg-white p-4 rounded-lg w-4/5 md:w-1/5'>
                            <RxCross1 className='absolute top-2 right-2 text-2xl cursor-pointer' onClick={() => setIsPopup2Open(false)} />
                            <p className='text-2xl pb-2 font-semibold'>Sign up</p>
                            <form onSubmit={handleSubmit}>
                                <input type='text' value={name} placeholder='Full Name' className='p-2 border rounded mt-4 w-full' onChange={(e) => setName(e.target.value)}/>
                                <input type='text' value={email} placeholder='Email' className='p-2 border rounded mt-4 w-full' onChange={(e) => setEmail(e.target.value)}/>
                                <input type='tel' value={phoneNumber} placeholder='Phone Number' className='p-2 border rounded mt-4 w-full' onChange={(e) => setPhoneNumber(e.target.value)}/>
                                <input type='password' value={password} placeholder='Password' className='p-2 border rounded mt-4 w-full' onChange={(e) => setPassword(e.target.value)}/>
                                <button type='submit' className='bg-blue-500 text-white rounded p-2 mt-4 hover:bg-blue-700 w-full'>Sign up</button>
                            </form>
                            <hr className='border-gray-500 w-full mt-4'/>
                            <button className='mt-3' onClick={() => {setIsPopup2Open(false); setIsPopup1Open(true);}}>Already have an account?</button>
                        </div>
                    </div>
                    )}
                </div>
                <div id="services" className='services relative justify-center w-full h-screen bg-gray-800 flex flex-col items-center shadow-2xl'>
                    <h1 className='text-3xl md:text-5xl text-white font-medium mb-10 md:mb-20'>Our Services</h1>
                    <div className='flex flex-col md:flex-row items-center justify-center space-y-5 md:space-y-0 md:space-x-10'>
                        <div className='relative group w-3/5 md:w-1/4'>
                            <img src='../src/assets/hairstyle.webp' alt='hairstyle' className='w-full rounded-xl'/>
                            <div className='absolute text-lg md:text-2xl font-medium inset-0 flex items-end pb-14 justify-center bg-gradient-to-b from-transparent to-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                Haircuts and Styling
                            </div>
                        </div>
                        <div className='relative group w-3/5 md:w-1/4'>
                            <img src='../src/assets/manicure.webp' alt='manicure' className='w-full rounded-xl'/>
                            <div className='absolute text-lg md:text-2xl font-medium inset-0 flex items-end pb-14 justify-center bg-gradient-to-b from-transparent to-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                Manicure and Pedicure
                            </div>
                        </div>
                        <div className='relative group w-3/5 md:w-1/4'>
                            <img src='../src/assets/facial.webp' alt='facial' className='w-full rounded-xl'/>
                            <div className='absolute text-lg md:text-2xl font-medium inset-0 flex items-end pb-14 justify-center bg-gradient-to-b from-transparent to-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                Facial Treatment
                            </div>
                        </div>
                    </div>
                </div>
                <div className='relative flex flex-col md:flex-row items-center justify-center md:h-1/5'>
                    <div id="contact" className='contact relative flex flex-col w-full md:w-1/2 space-y-2 pl-4 md:pl-16'>
                        <h1 className='text-3xl md:text-4xl mt-6 md:mt-0 font-semibold pb-6'>Contact Us</h1>
                        <p className='text-base md:text-lg'>Need our help and information, <span className='block md:inline'>please contact us at:</span></p>
                        <div className='flex flex-row items-center space-x-4'>
                            <img src='../src/assets/iconWA.webp' alt='phone' className='w-10 md:w-14'/>
                            <div className='text-base md:text-lg'>
                                <p>Thomas: 08123456789</p>
                                <p>Sekar: 08164829372</p>
                            </div>
                        </div>
                    </div>
                    <div id="review" className='review relative w-full pl-4 md:pl-0 md:w-1/2 pr-4 md:pr-16'>
                        <Review />
                    </div>
                </div>
                <div className='footer relative z-10 flex justify-center items-center w-full p-4 bg-gray-900'>
                    <p className='text-white text-sm md:text-base'>
                        © 2024 SEA Salon. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
