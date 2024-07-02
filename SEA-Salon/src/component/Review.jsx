import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Review = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [name, setName] = useState('');
    const [reviews, setReviews] = useState([]);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newReview = {
            'name': name,
            'rating': rating,
            'comment': comment
        };
        try {
            const response = await axios.post('http://localhost:3000/api/reviews', newReview);
            console.log(response.data);
            setReviews([...reviews, newReview]);
        } catch (error) {
            console.error(error);
        }
        // Clear the inputs
        setName('');
        setRating(0);
        setComment('');
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/reviews');
                setReviews(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchReviews();
    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto my-8 p-4 border rounded shadow-lg bg-white flex flex-col md:flex-row">
            <div className='w-full md:w-1/2'>
                <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
                <div className="flex">
                    {[1, 2, 3, 4, 5].map((index) => (
                        <FaStar
                            key={index}
                            onClick={() => handleRatingChange(index)}
                            className={`h-8 w-8 cursor-pointer ${index <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                        />
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="w-full p-2 border rounded mt-4"
                        placeholder="Your Name"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                    <textarea
                        className="w-full p-2 border rounded mt-4 min-h-16 max-h-36"
                        placeholder="Write your comment here"
                        value={comment}
                        onChange={handleCommentChange}
                        required
                    />
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <div className="mt-8 md:mt-0 md:ml-8 w-full md:w-1/2">
                <h3 className="text-xl font-semibold mb-4">Reviews</h3>
                <div className='max-h-64 overflow-y-auto'>
                    {reviews.length === 0 && <p>No reviews yet.</p>}
                    {reviews.map((review, index) => (
                        <div key={index} className="mb-4 p-4 border rounded bg-gray-100">
                            <div className="flex items-center mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        className={`h-5 w-5 ${star <= review.rating ? 'text-yellow-500' : 'text-gray-400'}`}
                                    />
                                ))}
                                <span className="ml-2 font-semibold">{review.name}</span>
                            </div>
                            <p>{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Review;
