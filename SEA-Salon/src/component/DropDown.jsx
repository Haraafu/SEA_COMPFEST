import React, { useState, useRef, useEffect } from 'react';

const DropDown = ({ service, setService }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null); // Ref to handle clicks outside the dropdown

    const toggleDD = () => {
        setIsOpen(!isOpen);
    };

    const handleServiceChange = (service) => {
        setService(service);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            window.addEventListener('mousedown', handleClickOutside);
        } else {
            window.removeEventListener('mousedown', handleClickOutside);
        }

        return () => window.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div ref={dropdownRef} className="relative inline-block text-left mt-4">
            <button
                onClick={toggleDD}
                className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-md font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <span>{service}</span>
                <span className="ml-2">{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && (
                <div className="origin-top-left absolute left-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1 text-md" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button
                            onClick={() => handleServiceChange('Haircuts and Styling')}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            Haircuts and Styling
                        </button>
                        <button
                            onClick={() => handleServiceChange('Manicure and Pedicure')}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            Manicure and Pedicure
                        </button>
                        <button
                            onClick={() => handleServiceChange('Facial Treatments')}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            Facial Treatments
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropDown;
