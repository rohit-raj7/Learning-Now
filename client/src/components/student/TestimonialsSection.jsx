import React from 'react';
import { assets, dummyTestimonial } from '../../assets/assets';

const TestimonialsSection = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-800 px-6 py-16">
      <div className="max-w-7xl mx-auto text-gray-200">
        <h2 className="text-4xl font-bold mb-2 text-center md:text-left">Testimonials</h2>
        <p className="text-gray-400 text-center md:text-left md:text-lg mt-2">
          Hear from our learners as they share their journeys of transformation, success, and how our
          <br className="hidden md:block" /> platform has made a difference in their lives.
        </p>

        <div className="grid gap-10 mt-14 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {dummyTestimonial.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl shadow-xl bg-gray-900/60 backdrop-blur-md border border-gray-700 text-white overflow-hidden hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Header */}
              <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600">
                <img className="h-14 w-14 rounded-full ring-2 ring-white" src={testimonial.image} alt={testimonial.name} />
                <div>
                  <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-100">{testimonial.role}</p>
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
                <p className="text-gray-300 text-sm leading-relaxed">{testimonial.feedback}</p>
              </div>

              {/* Footer */}
              <div className="px-6 pb-5">
                <a href="#" className="text-blue-400 hover:text-blue-300 text-sm underline">
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
