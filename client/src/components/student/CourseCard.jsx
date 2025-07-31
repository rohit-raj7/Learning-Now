
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);

  const rating = calculateRating(course);
  const hasDiscount = course.discount > 0;
  const discountedPrice = (
    course.coursePrice - (course.discount * course.coursePrice) / 100
  ).toFixed(2);
  const originalPrice = course.coursePrice.toFixed(2);

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      to={`/course/${course._id}`}
      className="w-full sm:min-w-[240px] sm:max-w-xs border-2 border-green-500 bg-gray-800 text-gray-200 rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* ✅ Updated image with fixed min/max sizing */}
      <img
        className="w-full h-36 sm:h-40 md:h-44 object-cover min-w-full min-h-[9rem] max-h-[11rem]"
        src={course.courseThumbnail}
        alt={course.courseTitle}
        onError={(e) => {
          e.target.src = assets.placeholderImg || '/fallback.jpg';
        }}
      />

      <div className="p-3 sm:p-4 space-y-1 sm:space-y-2">
        <h3 className="text-base sm:text-lg font-semibold truncate">
          {course.courseTitle}
        </h3>
        {/* <p className="text-xs sm:text-sm text-gray-400">
          Educator: {course.educator?.name || 'Unknown Educator'}
        </p> */}
        <p className="text-sm sm:text-base font-medium mt-3 text-gray-300">
  <span className="text-gray-100">Educator :</span>{' '}
  <span className="text-green-300 tracking-wide">{course.educator?.name || 'Unknown Educator'}</span>
</p>



        {/* Ratings */}
        <div className="flex items-center space-x-2">
          <span className="text-xs sm:text-sm">{rating}</span>
          <div className="flex space-x-0.5">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                src={i < Math.round(rating) ? assets.star : assets.star_blank}
                alt=""
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm text-gray-400">
            ({course.courseRatings?.length || 0})
          </span>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base font-bold text-green-400">
            {currency}{discountedPrice}
          </span>
          {hasDiscount && (
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              {currency}{originalPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
