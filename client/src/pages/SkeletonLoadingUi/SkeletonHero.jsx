
//  import React from "react";

// const SkeletonLoadingUi = () => {
//   return (
//     <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen w-screen px-4 md:px-12 lg:px-24 py-10 bg-white gap-y-[5rem] lg:gap-x-[6rem]">
//       {/* Left side skeleton */}
//       <div className="flex flex-col gap-4 w-full max-w-2xl animate-pulse flex-1">
//         <div className="h-12 bg-gray-300 rounded w-3/4"></div>
//         <div className="h-16 bg-gray-300 rounded w-5/6"></div>
//         <div className="h-8 bg-gray-300 rounded w-1/2"></div>
//         <div className="h-12 bg-green-500 rounded-full w-full max-w-sm"></div>
//         <div className="h-12 border border-green-500 rounded w-full max-w-lg flex items-center px-4 gap-4">
//           <div className="h-5 w-5 border border-green-500 rounded-full"></div>
//           <div className="h-5 bg-green-300 rounded w-full"></div>
//           <button className="bg-green-500 text-white rounded px-4 py-2 font-semibold">
//             &nbsp;
//           </button>
//         </div>
//         <div className="flex gap-4 items-center mt-4 flex-wrap">
//           {[...Array(5)].map((_, i) => (
//             <div key={i} className="rounded-full bg-gray-300 h-10 w-10"></div>
//           ))}
//           <div className="h-6 bg-gray-300 rounded w-44 ml-2"></div>
//         </div>
//       </div>

//       {/* Right side skeleton */}
//       <div className="relative w-full max-w-xl animate-pulse flex-1">
//         <div className="bg-green-500 rounded-3xl p-6 sm:p-8">
//           <div className="rounded-xl bg-gray-300 aspect-[3/4] w-full"></div>
//         </div>

//         {/* Success story badge */}
//         <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-md flex items-center gap-3 min-w-[160px] sm:min-w-[180px]">
//           <div className="rounded-full bg-gray-300 h-10 w-10"></div>
//           <div className="flex flex-col flex-1 gap-1">
//             <div className="h-4 w-20 bg-gray-300 rounded"></div>
//             <div className="h-3 w-28 bg-gray-200 rounded"></div>
//             <div className="h-3 w-20 bg-gray-200 rounded"></div>
//           </div>
//           <div className="h-6 w-16 bg-green-800 rounded-full"></div>
//         </div>

//         {/* Learner reviews badge */}
//         <div className="absolute bottom-4 right-4 bg-white rounded-lg p-4 shadow-md min-w-[180px] sm:min-w-[200px] flex gap-3 items-center">
//           <div className="flex flex-col gap-2 w-full">
//             <div className="h-5 w-32 bg-gray-300 rounded self-end"></div>
//             {[5, 4, 3, 2, 1].map((rating) => (
//               <div key={rating} className="flex items-center gap-2">
//                 <div className="text-xs text-gray-500 w-3">{rating}</div>
//                 <div
//                   className="h-2 rounded bg-green-500"
//                   style={{ width: `${rating * 12}px` }}
//                 ></div>
//               </div>
//             ))}
//           </div>
//           <div className="h-6 w-16 bg-green-800 rounded"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SkeletonLoadingUi;

 

import React from "react";

const SkeletonLoadingUi = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen w-screen px-4 md:px-12 lg:px-24 py-10 bg-white gap-y-[5rem] lg:gap-x-[6rem]">
      {/* Left side skeleton */}
      <div className="flex flex-col gap-4 w-full max-w-2xl animate-pulse flex-1">
        <div className="h-12 bg-gray-300 rounded w-3/4"></div>
        <div className="h-16 bg-gray-300 rounded w-5/6"></div>
        <div className="h-8 bg-gray-300 rounded w-1/2"></div>
        <div className="h-12 bg-green-500 rounded-full w-full max-w-sm"></div>
        <div className="h-12 border border-green-500 rounded w-full max-w-lg flex items-center px-4 gap-4">
          <div className="h-5 w-5 border border-green-500 rounded-full"></div>
          <div className="h-5 bg-green-300 rounded w-full"></div>
          <button className="bg-green-500 text-white rounded px-4 py-2 font-semibold">
            &nbsp;
          </button>
        </div>
        <div className="flex gap-4 items-center mt-4 flex-wrap">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="rounded-full bg-gray-300 h-10 w-10"></div>
          ))}
          <div className="h-6 bg-gray-300 rounded w-44 ml-2"></div>
        </div>
      </div>

      {/* Right side skeleton */}
      <div className="relative w-full max-w-md animate-pulse flex-1"> {/* Changed max-w-xl to max-w-md */}
        <div className="bg-green-500 rounded-3xl p-4 sm:p-6"> {/* Adjusted padding */}
          <div className="rounded-xl bg-gray-300 aspect-[3/4] w-full"></div>
        </div>

        {/* Success story badge */}
        <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-md flex items-center gap-3 min-w-[160px] sm:min-w-[180px]">
          <div className="rounded-full bg-gray-300 h-10 w-10"></div>
          <div className="flex flex-col flex-1 gap-1">
            <div className="h-4 w-20 bg-gray-300 rounded"></div>
            <div className="h-3 w-28 bg-gray-200 rounded"></div>
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
          </div>
          <div className="h-6 w-16 bg-green-800 rounded-full"></div>
        </div>

        {/* Learner reviews badge */}
        <div className="absolute bottom-4 right-4 bg-white rounded-lg p-4 shadow-md min-w-[180px] sm:min-w-[200px] flex gap-3 items-center">
          <div className="flex flex-col gap-2 w-full">
            <div className="h-5 w-32 bg-gray-300 rounded self-end"></div>
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="text-xs text-gray-500 w-3">{rating}</div>
                <div
                  className="h-2 rounded bg-green-500"
                  style={{ width: `${rating * 12}px` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="h-6 w-16 bg-green-800 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoadingUi;
