import React, { useState } from 'react';
import { X, Star, Send } from 'lucide-react';

export const FeedbackModal = ({ onClose }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');

    const handleSubmit = () => {
        // In a real app, you would send this data to a server
        console.log({
            rating: rating,
            feedback: feedbackText,
        });
        alert('Thank you for your feedback!');
        onClose(); // Close the modal after submission
    };

    const isSubmitDisabled = !feedbackText.trim() && rating === 0;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md m-4 flex flex-col">
                {/* Header */}
                <header className="px-6 py-4 flex justify-between items-center border-b dark:border-gray-700">
                    <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Submit Feedback</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                        <X size={22} />
                    </button>
                </header>

                {/* Body */}
                <div className="p-6 flex-grow">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        We'd love to hear what you think! How is your experience?
                    </p>

                    {/* Star Rating */}
                    <div className="flex justify-center items-center gap-2 mb-6">
                        {[1, 2, 3, 4, 5].map((starIndex) => (
                            <Star
                                key={starIndex}
                                size={32}
                                className={`cursor-pointer transition-colors ${
                                    (hoverRating || rating) >= starIndex
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-300 dark:text-gray-600'
                                }`}
                                onClick={() => setRating(starIndex)}
                                onMouseEnter={() => setHoverRating(starIndex)}
                                onMouseLeave={() => setHoverRating(0)}
                            />
                        ))}
                    </div>

                    {/* Text Area */}
                    <textarea
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        className="w-full h-32 p-3 bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                        placeholder="Tell us more about your experience..."
                    ></textarea>
                </div>

                {/* Footer */}
                <footer className="px-6 py-4 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md border dark:border-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitDisabled}
                        className="bg-blue-600 text-white font-bold py-2 px-5 rounded-md shadow-md hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={16} />
                        <span>Submit</span>
                    </button>
                </footer>
            </div>
        </div>
    );
};