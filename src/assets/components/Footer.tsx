
function Footer(){
    return(
        <footer className="bg-[#010b1c] text-white p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">

                {/* Address, Hours, & Phone Number */}
                <div>
                    <h3 className="font-bold mb-2">Address</h3>
                        <p>687 Main St, Moncton, NB E1C 1E3</p>
                </div>
                <div>
                    <h3 className="font-bold mb-2">Hours</h3>
                        <p>Monday – Thursday | 11:30 a.m. – 10 p.m.</p>
                        <p>Friday – Saturday | 11:30 a.m. – 10:30 p.m.</p>
                        <p>Sunday | 12:00 a.m.– 9:30p.m.</p>
                </div>
                <div>
                    <h3 className="font-bold mb-2">Phone</h3>
                        <p>1+(506) 854-3600</p>
                </div>

                {/* Google Maps */}
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1598.4895307930199!2d-64.77792532114437!3d46.08893481121438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ca0b9391a9cc62b%3A0x2fcd3e0ddf2b92a9!2sJapan%20Go%20Sushi!5e0!3m2!1sen!2sca!4v1742178081468!5m2!1sen!2sca" 
                    width="400" height="300" 
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