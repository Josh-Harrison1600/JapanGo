import { motion } from 'framer-motion';
import doorDashLogo from '../images/doorDashLogo.png';
import skipTheDishesLogo from '../images/skipTheDishesLogo.png';
import uberEatsLogo from '../images/uberEatsLogo.png';
import { useEffect, useState } from 'react';

function OrderNow() {
  const [imagesLoaded, setImagesLoaded] = useState(false);

    const deliveryOptions = [
      {
        name: "DoorDash",
        logo: doorDashLogo,
        url: "https://www.doordash.com/store/japan-go-moncton-670911/24823969/?rwg_token=AAiGsobgzIDdW2shpfqvKqEnKhaetAPAULwRYnic-he4-iLz1htMoBnYBIcmbmFVf_H0uEA7au1cT6ZDB487rXcYeaCfjH5s4w==",
      },
      {
        name: "SkipTheDishes",
        logo: skipTheDishesLogo,
        url: "https://www.skipthedishes.com/japan-go-restaurant?serviceType=delivery",
      },
      {
        name: "UberEats",
        logo: uberEatsLogo,
        url: "https://www.ubereats.com/ca/store/japan-go-main-st/_nwqhTcTVkOrXTJ58HhIZA",
      },
    ];

    //make sure all images are loaded before displaying the page
    useEffect(() => {
      let loadedCount = 0;

      deliveryOptions.forEach((option) => {
        const img = new Image();
        img.src = option.logo;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === deliveryOptions.length) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          console.error(`Error loading image: ${option.logo}`);
          loadedCount++;
          if(loadedCount === deliveryOptions.length) {
            setImagesLoaded(true);
          }
        }
      })
    }, [])

    if(!imagesLoaded){
      return(
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
          <p className='text-black text-3xl font-bold'>Loading...</p>
        </div>
      )
    }

return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 pt-16">
      <motion.h1
        className="text-4xl font-bold mb-6 text-center text-black"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Order Now
      </motion.h1>

      <p className="text-center mb-10 text-gray-700">
        Choose your favorite delivery platform below
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {deliveryOptions.map((option, index) => (
          <motion.a
            key={option.name}
            href={option.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <img src={option.logo} alt={option.name} className="w-32 h-16 object-contain mb-4" />
            <span className="font-bold text-lg text-black">{option.name}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

export default OrderNow;