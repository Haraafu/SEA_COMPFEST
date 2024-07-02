import React, { useState } from 'react';
import DropDown from '../component/DropDown';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

const picture = {
    'Haircuts and Styling': '../src/assets/hairstyle.webp',
    'Manicure and Pedicure': '../src/assets/manicure.webp',
    'Facial Treatments': '../src/assets/facial.webp'
};

const description = {
    'Haircuts and Styling': "Whether you're looking for a classic cut or a trendy new style, our expert stylists are here to create the perfect look for you.",
    'Manicure and Pedicure': "Pamper your hands and feet with our exquisite nail care services, complete with the latest nail art designs.",
    'Facial Treatments': "Rejuvenate your skin with our nourishing and revitalizing facial treatments, designed to give you a radiant glow."
};

export default function Reservation() {
    const [service, setService] = useState('Haircuts and Styling');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!checkTime(time)) {
            alert('Please enter a valid time between 9:00 AM. and 9:00 PM.');
            return;
        }
        const formData = {
            'name': name,
            'phoneNumber': phoneNumber,
            'service': service,
            'date': date,
            'time': time
        };
        try {
            const response = await axios.post('http://localhost:3000/api/reservations', formData)
            console.log(response.data);
            setIsPopUpOpen(true);
        } catch (error) {
            console.error(error);
        }
        setName('');
        setPhoneNumber('');
        setService('Haircuts and Styling');
        setDate('');
        setTime('');
    }

    const checkTime = (time) => {
        const [hour, minute] = time.split(':').map(Number);
        if (hour < 9 || hour > 21) {
            return false;
        }
        if (hour === 21 && minute !== 0) {
            return false;
        }
        return true;
    }

    return (
        <div className='relative flex flex-col w-full h-screen'>
            <Link to='/' className='header flex justify-between text-white items-center fixed z-20 w-full p-4 bg-opacity-50 bg-gray-900'>
                <div>
                    <span className='text-2xl font-semibold pr-3'>SEA Salon</span>
                    <span className='block md:inline text-md '>Beauty and Elegance Redefined</span>
                </div>
                <p className='z-20'>Log out</p>
            </Link>
            <div className='relative z-10 flex bg-gradient-to-r from-gray-800 to-gray-700 h-fit md:h-screen pt-40 pb-24 text-center justify-center items-center shadow-xl shadow-gray-400'>
                <div className='flex flex-col md:flex-row justify-between bg-white bg-opacity-100 w-4/5 md:w-3/5 md:h-fit z-20'>
                    <div className='form w-full md:w-4/5 p-4'>
                        <h1 className='text-2xl font-semibold pb-2'>Reservation Form</h1>
                        <hr className='border-2 border-gray-500 w-full' />
                        <p className='pt-2'>Book your one-hour session at SEA Salon and indulge in our luxurious services. Open daily from 9:00 a.m. to 9:00 p.m.</p>
                        <form className='flex flex-col p-4' onSubmit={handleSubmit}>
                            <input type='text' value={name} className='p-2 border rounded' placeholder='Full Name' onChange={e => setName(e.target.value)} required />
                            <input type='tel' value={phoneNumber} className='p-2 border rounded mt-4' placeholder='Phone Number' onChange={e => setPhoneNumber(e.target.value)} required />
                            <DropDown service={service} setService={setService} required />
                            <input type='date' value={date} className='p-2 border rounded mt-4' onChange={e => setDate(e.target.value)} required />
                            <input type='time' value={time} className='p-2 border rounded mt-4' onChange={e => setTime(e.target.value)} required />
                            <button className='bg-blue-500 text-white rounded p-2 mt-4 hover:bg-blue-700'>Submit</button>
                        </form>
                        {isPopUpOpen && (
                            <div className='fixed z-20 inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
                                <div className='flex flex-col items-center bg-white p-4 rounded-lg'>
                                    <p className='text-2xl pb-2 font-semibold'>Reservation Successful!</p>
                                    <p className='text-lg'>Thank you for choosing SEA Salon! We look forward to pampering you.</p>
                                    <Link to='/' className='bg-blue-500 text-white rounded p-2 mt-4 w-fit hover:bg-blue-700' onClick={() => setIsPopUpOpen(false)}>Close</Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='z-10 w-full md:w-2/5 p-4'>
                        <img src={picture[service]} alt={service} className='rounded-xl shadow-xl border-2 border-gray-500'/>
                        <p className='text-md text-black font-medium pt-4'>{description[service]}</p>
                    </div>
                </div>                
            </div>
            <div className='md:relative md:pt-6 inset-x-0 bg-white flex flex-col'>
                <div className='relative flex flex-col md:flex-row items-center justify-start'>
                    <div id="contact" className='contact relative flex flex-col w-full md:w-1/2 space-y-2 pl-4 md:pl-16 pb-3'>
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
                </div>
                <div className='footer relative z-10 flex justify-center w-full p-3'>
                    <p className='text-sm md:text-base'>
                        © 2024 SEA Salon. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
