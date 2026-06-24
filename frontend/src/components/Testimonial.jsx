import React from 'react';

const Testimonial = () => {
  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center">
          
          {/* Header */}
          <div className="text-center px-2">
            <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-600 font-pj">
              2,157 people have said how good Rareblocks
            </p>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 font-pj leading-tight">
              Our happy clients say about us
            </h2>
          </div>

          {/* CTA Link */}
          <div className="mt-6 sm:mt-8 md:mt-10 text-center">
            <a
              href="#"
              className="pb-1.5 sm:pb-2 text-sm sm:text-base font-bold leading-7 text-gray-900 transition-all duration-200 border-b-2 border-gray-900 hover:border-gray-600 font-pj focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:text-gray-600"
            >
              Check all 2,157 reviews
            </a>
          </div>

          {/* Testimonials Grid */}
          <div className="relative mt-8 sm:mt-10 md:mt-16 lg:mt-24 w-full">
            {/* Background blur effect - hidden on small mobile */}
            <div className="hidden sm:block absolute -inset-x-1 sm:-inset-x-2 inset-y-10 sm:inset-y-16 md:-inset-y-6">
              <div className="w-full h-full max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-blue-100 to-purple-100 opacity-30 blur-lg filter"></div>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 max-w-lg md:max-w-none mx-auto">
              
              {/* Card 1 */}
              <div className="flex flex-col overflow-hidden rounded-2xl shadow-xl bg-white">
                <div className="flex flex-col justify-between flex-1 p-5 sm:p-6 lg:p-7 lg:py-8">
                  <div className="flex-1">
                    {/* Stars */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 sm:w-5 sm:h-5 text-[#FDB241]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <blockquote className="mt-6 sm:mt-8">
                      <p className="text-base sm:text-lg leading-relaxed text-gray-900 font-pj">
                        "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change."
                      </p>
                    </blockquote>
                  </div>

                  <div className="flex items-center mt-6 sm:mt-8">
                    <img
                      className="flex-shrink-0 object-cover rounded-full w-10 h-10 sm:w-11 sm:h-11"
                      src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png"
                      alt="Leslie Alexander"
                    />
                    <div className="ml-3 sm:ml-4">
                      <p className="text-sm sm:text-base font-bold text-gray-900 font-pj">Leslie Alexander</p>
                      <p className="mt-0.5 text-xs sm:text-sm font-pj text-gray-600">Freelance React Developer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col overflow-hidden rounded-2xl shadow-xl bg-white">
                <div className="flex flex-col justify-between flex-1 p-5 sm:p-6 lg:p-7 lg:py-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 sm:w-5 sm:h-5 text-[#FDB241]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <blockquote className="mt-6 sm:mt-8">
                      <p className="text-base sm:text-lg leading-relaxed text-gray-900 font-pj">
                        "Simply the best. Better than all the rest. I'd recommend this product to beginners and advanced users."
                      </p>
                    </blockquote>
                  </div>

                  <div className="flex items-center mt-6 sm:mt-8">
                    <img
                      className="flex-shrink-0 object-cover rounded-full w-10 h-10 sm:w-11 sm:h-11"
                      src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png"
                      alt="Jacob Jones"
                    />
                    <div className="ml-3 sm:ml-4">
                      <p className="text-sm sm:text-base font-bold text-gray-900 font-pj">Jacob Jones</p>
                      <p className="mt-0.5 text-xs sm:text-sm font-pj text-gray-600">Digital Marketer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col overflow-hidden rounded-2xl shadow-xl bg-white md:col-span-2 lg:col-span-1">
                <div className="flex flex-col justify-between flex-1 p-5 sm:p-6 lg:p-7 lg:py-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 sm:w-5 sm:h-5 text-[#FDB241]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <blockquote className="mt-6 sm:mt-8">
                      <p className="text-base sm:text-lg leading-relaxed text-gray-900 font-pj">
                        "I cannot believe that I have got a brand new landing page after getting Omega. It was super easy to edit and publish."
                      </p>
                    </blockquote>
                  </div>

                  <div className="flex items-center mt-6 sm:mt-8">
                    <img
                      className="flex-shrink-0 object-cover rounded-full w-10 h-10 sm:w-11 sm:h-11"
                      src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png"
                      alt="Jenny Wilson"
                    />
                    <div className="ml-3 sm:ml-4">
                      <p className="text-sm sm:text-base font-bold text-gray-900 font-pj">Jenny Wilson</p>
                      <p className="mt-0.5 text-xs sm:text-sm font-pj text-gray-600">Graphic Designer</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;