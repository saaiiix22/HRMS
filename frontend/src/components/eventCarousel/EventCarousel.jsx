import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import eventBanner from '../../assets/eventBanner.png'
import birthdayCard from '../../assets/birthday.webp'
import { useQuery } from '@tanstack/react-query'
import { eventAtOffice } from '../../api/ApiCall';

const EventCarousel = () => {
    const responsive = {
        superLargeDesktop: { breakpoint: { max: 5000, min: 3000 }, items: 1 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
    };

    const { data } = useQuery({
        queryKey: ['data'],
        queryFn: eventAtOffice,
        staleTime: 10000
    });

    const events = data?.data ?? [];

    const checkEvent = (dateStr) => {
        const eventDate = new Date(dateStr);
        const today = new Date();
        return (
            eventDate.getDate() === today.getDate() &&
            eventDate.getMonth() === today.getMonth()
        );
    };

    return (
        <div className="w-full">
            <Carousel responsive={responsive} infinite autoPlay>
                {events.map((i, index) => {
                    const isBirthday = checkEvent(i.birthDate);
                    const isAnniversary = checkEvent(i.joiningDate);

                    if (!isBirthday && !isAnniversary) return null;

                    return (
                        <div
                            key={index}
                            className="relative w-full md:h-[210px] overflow-hidden rounded-md"
                        >
                            <img
                                src={birthdayCard}
                                alt="Event Banner"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
                                <h3 className="text-yellow-400 text-2xl md:text-3xl font-semibold mb-2">
                                    {i.employeeName}
                                </h3>
                                {isBirthday && (
                                    <div className='flex flex-col items-center justify-center'>
                                        <h4 className="text-white text-xl md:text-2xl font-medium">
                                            Warm wishes on the occasion of your Birthday!
                                        </h4>
                                        <div className="w-2/3">
                                            <span className='block text-[14px] text-yellow-100 font-normal'>
                                                May your birthday be the start of a year filled with good luck, good health and much happiness & we hope that you have a great year and accomplish all the fabulous goals you have set.
                                            </span>
                                        </div>
                                    </div>
                                )}
                                {isAnniversary && (
                                    <div className='flex flex-col items-center justify-center'>
                                        <h4 className="text-white text-xl md:text-2xl font-medium">
                                            Congratulations on your Work Anniversary!
                                        </h4>
                                        <div className="w-2/3">
                                            <span className='block text-[14px] text-yellow-100 font-normal'>
                                                May this milestone be a reminder of the dedication, hard work, and excellence you bring to your role each day. Here's to continued success, new opportunities, and many more achievements in the years ahead. We’re proud to have you as part of the team—cheers to your journey and all the goals yet to come!
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </Carousel>
        </div>
    );
};

export default EventCarousel;
