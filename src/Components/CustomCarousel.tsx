
import    {Navigation,A11y}  from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/swiper-bundle.min.css';
import { Card } from 'react-bootstrap';
import ButtonShop from './ButtonShop';


//const slideData = [
//    { id: 1, imgSrc: '/Hoodies.webp', CategoryName: 'Hoodies' },
//    { id: 2, imgSrc: '/Hoodies.webp', CategoryName: 'Hoodies' },
//    { id: 6, imgSrc: '/leggings.webp', CategoryName: 'Leggings' },
//    { id: 7, imgSrc: '/shorts.webp', CategoryName: 'Shorts' },
//    { id: 8, imgSrc: '/better_in_black_vertical.webp', CategoryName: 'All' },
//    { id: 9, imgSrc: '/tanks.webp', CategoryName: 'Tanks' },
//];

// Define types for props
interface SlideData {
    id: number;
    name: string;
    imgsrc: string;
}

interface SSProps {
    slideData: SlideData[]; // Array of slides
    onClick: () => void;
    headers: {
        title: string;
        subtitle: string;
       
    }; // Header details
}

const CaourselCategories: React.FC<SSProps> = ({ slideData, headers,onClick }) => {
    return (
        <>
            <h4 className="pb-0 mb-0 hwm">{headers.title}</h4>
            <h3 className="hwmplus">{headers.subtitle}</h3>
            <Swiper
                style={{ maxWidth: '100vw',width:"100%" }}
                loop={true}
                modules={[Navigation, A11y]}
                breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 5 },
                    768: { slidesPerView: 2, spaceBetween: 15 },
                    1024: { slidesPerView: 4, spaceBetween: 20 },
                }}
            >
                {slideData.map((slide) => (
                    <SwiperSlide className="CardSwiperContainer" key={slide.id}>
                        <Card
                            className="bg-dark text-white cardBS"
                            style={{ height: '400px', border: 'none' }}
                        >
                            <Card.Img
                                src={slide.imgsrc}
                                alt="Card image"
                                className="img-fluid h-100 w-100"
                            />
                            <Card.ImgOverlay className="d-flex flex-column justify-content-end p-3">
                                <div>
                                    <Card.Title className="mb-3 fs-1 text-truncate ">
                                        {slide.name}
                                    </Card.Title>
                                    <ButtonShop onClick={onClick }>Shop Now</ButtonShop>
                                </div>
                            </Card.ImgOverlay>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default CaourselCategories;