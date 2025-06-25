import React, { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HomeContext } from '../context/HomeContext';
import { Parser } from 'html-to-react';
function Testimonials() {
    const { state, methods } = useContext(HomeContext);
    const [userReviews, setUserReviews] = useState([]);
    const fetchReviews = async () => {
        let reviews = await methods?.loadUserReviews();
        setUserReviews(reviews);
    }
    useEffect(() => {
        fetchReviews()
    }, []);
    const settings = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="bg-white p-3 container py-5 my-5 mx-auto" >
            <div className="text-center mb-8 pb-5">
                <span className="text-primary text-lg font-semibold">Reviews</span>
                <h2 className="text-secondary text-2xl font-bold">User Reviews</h2>
            </div>            <Slider  {...settings}>
                {userReviews?.map(review => (
                    <div key={review?.id || review?.review_date} className="space-y-4 max-w-md mx-auto h-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 fill-amber-300" viewBox="0 0 35 30" fill="none">
                            <path
                                d="M22.3838 27.6777C23.5264 28.9961 25.3721 29.6992 27.4814 29.6992C31.6123 29.6992 34.249 26.9746 34.249 22.7559C34.249 18.625 31.5244 15.6367 27.6572 15.6367C26.8662 15.6367 25.9873 15.8125 25.1084 16.0762C24.5811 9.48438 27.833 4.03516 32.2275 2.36523L31.7881 0.871094C24.2295 3.77148 19.4834 11.1543 19.4834 19.8555C19.4834 22.668 20.5381 25.7441 22.3838 27.6777ZM0.499023 19.8555C0.499023 24.6895 3.22363 29.6992 8.49707 29.6992C12.54 29.6992 15.1768 26.9746 15.1768 22.7559C15.1768 18.625 12.4521 15.6367 8.67285 15.6367C7.88184 15.6367 7.00293 15.8125 6.12402 16.0762C5.59668 9.48438 8.84863 4.03516 13.2432 2.36523L12.7158 0.871094C5.24512 3.77148 0.499023 11.1543 0.499023 19.8555Z">
                            </path>
                        </svg>
                        <div className="md:text-lg leading-relaxed">
                            {Parser().parse(review?.review_text)}
                        </div>
                        <p className="md:text-lg leading-relaxed text-gray-500">{review?.review_date}</p>
                        <div className="flex items-center gap-2">
                            {
                                review?.country === 'Guyana' ?
                                    <>

                                        <img alt="Yifan testimonial for ShipFast" loading="lazy" width="48" height="48" decoding="async" data-nimg="1" className="w-10 h-10 rounded-full object-cover" src="/images/pngwing.com.png" />

                                    </>
                                    :
                                    <>
                                        <img alt="Yifan testimonial for ShipFast" loading="lazy" width="48" height="48" decoding="async" data-nimg="1" className="w-10 h-10 rounded-full object-cover" src="/images/pngwing.com (1).png" />

                                    </>

                            }
                            <div className='flex flex-col items-center justify-center gap-1'>
                                <span className="font-bold">{review?.user_name}</span>
                                <span className="text-gray-500">{review?.user_email}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
export default Testimonials;