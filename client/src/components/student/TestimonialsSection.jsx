import React, { useState } from 'react';
import { assets, dummyTestimonial } from '../../assets/assets';

const TestimonialsSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-800 px-6 py-16">
      <div className="max-w-7xl mx-auto text-gray-200">
        <h2 className="text-4xl font-bold text-green-500 mb-2 text-center md:text-left">Testimonials</h2>
        <p className="text-gray-400 text-center md:text-left md:text-lg mt-2">
          Hear from our learners as they share their journeys of transformation, success, and how our
          <br className="hidden md:block" /> platform has made a difference in their lives.
        </p>

        <div className="grid gap-10 mt-14 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {dummyTestimonial.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl shadow-xl bg-grey-900/60 backdrop-blur-md border border-gray-800 text-green-500 overflow-hidden hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Header */}
              <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-white to-green-200">
                <img className="h-14 w-14 rounded-full ring-2 ring-green-400" src={testimonial.image} alt={testimonial.name} />
                <div>
                  <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-900">{testimonial.role}</p>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                      alt="star"
                      className="h-5 w-5"
                    />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {expandedIndex === index
                    ? testimonial.feedback
                    : testimonial.feedback.length > 100
                    ? `${testimonial.feedback.slice(0, 100)}...`
                    : testimonial.feedback}
                </p>
              </div>

              {/* Footer */}
              {testimonial.feedback.length > 100 && (
                <div className="px-6 pb-5">
                  <button
                    onClick={() => toggleReadMore(index)}
                    className="text-blue-400 hover:text-blue-300 text-sm underline"
                  >
                    {expandedIndex === index ? 'Show less' : 'Read more'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
