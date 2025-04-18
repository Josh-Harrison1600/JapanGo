
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

interface HoursType {
    [day: string]: string[];
}

function Footer(){
    const [hours, setHours] = useState<HoursType | null>(null);
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    //Get the hours from the API
    useEffect(() => {
        const fetchHours = async () => {
            try{
                const res = await axios.get('http://localhost:5000/hours');
                setHours(res.data);
            }catch(err){
                console.error("Failed to fetch hours", err);
            }
        }
        fetchHours();
    }, []);

    return(
        <footer className="bg-[#010b1c] text-white p-8 text-center">
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-center space-y-6 md:space-y-0 md:space-x-8 md:text-left">

            <div className="flex flex-col items-center mb-4 md:mb-0 ml-24">
            <h3 className="font-bold text-2xl text-center mb-4">Follow Us!</h3>
                <div className='flex gap-4'>
                    <a href="https://www.facebook.com/JapanGoMoncton/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-500 transition-colors duration-300">
                        <FaFacebook size={36} />
                    </a>
                    <a href="https://www.instagram.com/japango_moncton/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-500 transition-colors duration-300">
                        <FaInstagram size={36} />
                    </a>
                </div>
            </div>
                {/* Address, Hours, & Phone Number */}
                <div>
                    <h3 className="font-bold mb-2 text-2xl text-center">Hours</h3>
                        <div className=" text-xl text-center">
                            {hours ? (
                                daysOfWeek.map((day) => (
                                    <p key={day}>
                                        {day.charAt(0).toUpperCase() + day.slice(1)} | {hours[day].join(" |  ")}
                                    </p>
                                ))
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                </div>
                <div>
                    <h3 className="font-bold mb-2 text-2xl text-center">Phone</h3>
                        <p className="text-xl text-center mb-8">1+(506) 854-3600</p>
                    
                    <h3 className="font-bold mb-2 text-2xl text-center">Address</h3>
                        <p className="text-xl text-center">687 Main St, Moncton, NB E1C 1E3</p>

                </div>

                {/* Google Maps */}
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1598.4895307930199!2d-64.77792532114437!3d46.08893481121438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ca0b9391a9cc62b%3A0x2fcd3e0ddf2b92a9!2sJapan%20Go%20Sushi!5e0!3m2!1sen!2sca!4v1742178081468!5m2!1sen!2sca" 
                    className="w-full md:w-[400px] h-[250px] md:h-[300px]" 
                    style={{ border:0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>

            </div>
        </footer>
    )
}

export default Footer;