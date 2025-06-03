import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import wishes from '../../assets/birthday.png'
import eventBanner from '../../assets/eventBanner.png'
import { useQuery } from '@tanstack/react-query'
import { eventAtOffice } from '../../api/ApiCall';


const EventCarousel = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 5000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const { data } = useQuery({
        queryKey: ['data'],
        queryFn: eventAtOffice,
        staleTime: 10000
    })
    console.log(data?.data);
    const events = data?.data ?? [];
    // console.log(events);
    const date = new Date()
    console.log(date);

    const checkEvent = (dateStr) => {
        const eventDate = new Date(dateStr);
        const today = new Date();

        return (
            eventDate.getDate() === today.getDate() &&
            eventDate.getMonth() === today.getMonth()
        );
    };
    // checkEvent()
    // console.log(events);


    return (
        <div className='w-full'>
            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
            >
                {
                    events.map((i, index) => {
                        return (
                            <div key={index} className='w-full overflow-hidden relative' >
                                <div className='absolute top-[85px] right-[30%]'>
                                    <h3 className=' font-semibold text-yellow-400 text-[20px] text-end'>{i.employeeName}</h3>
                                        {
                                            checkEvent(i.birthDate) && <h4 className='mt-1 text-[30px] font-semibold text-white'>Warm wishes on the occasion of your birthday</h4>
                                        }
                                        {
                                            checkEvent(i.joiningDate) && <h4 className='mt-1 text-[30px] font-semibold text-white'>Warm wishes on the occasion of your Work Anniversary</h4>
                                        }
                                </div>
                                {
                                    checkEvent(i.birthDate) && <img src={eventBanner} alt="" className='w-full h-full' />
                                }
                                {
                                    checkEvent(i.joiningDate) && <img src={eventBanner} alt="" className='w-full h-full' />
                                }

                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default EventCarousel