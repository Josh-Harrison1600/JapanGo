import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import emailjs from '@emailjs/browser';

function Contact(){
    //States for the modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //States for the form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    //Env variables for emailjs
    const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

    //Function for clearing the form
    const clearForm = () => {
        setName('');
        setEmail('');
        setMessage('');
        localStorage.removeItem('contactName');
        localStorage.removeItem('contactEmail');
        localStorage.removeItem('contactMessage');
    }

    //Function for the submit button that also handles the MUI modal (handleOpen)
    const formRef = useRef<HTMLFormElement | null>(null);

    //Animation variants for the fade-up effect
    const fadeUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    //Styling for MUI Modal
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    //Load saved data when the component mounts
    useEffect(() => {
        const savedName = localStorage.getItem('contactName');
        const savedEmail = localStorage.getItem('contactEmail');
        const savedMessage = localStorage.getItem('contactMessage'); 

        if(savedName) setName(savedName);
        if(savedEmail) setEmail(savedEmail);
        if(savedMessage) setMessage(savedMessage);
    }, []);

    //Save to local storage when form changes
    useEffect(() => {
        localStorage.setItem('contactName', name);
        localStorage.setItem('contactEmail', email);
        localStorage.setItem('contactMessage', message);
    }, [name, email, message]);

    //Function for the emailjs
    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        emailjs.sendForm(
            SERVICE_ID,
            TEMPLATE_ID,
            formRef.current!,
            PUBLIC_KEY
        )
        .then((result) => {
            console.log("Email sent successfully:", result.text);
            handleOpen();
            clearForm();
        })
        .catch((error) => {
            console.error('Email sending failed:', error);
            alert('Oops! Failed to send message. Try again later.');
        });
    }

    return(
        <>
            {/* Title */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.7 }}
            >
            <h1 className="text-black text-3xl font-bold text-center mt-18">Contact Us!</h1>
                <p className="text-center mt-2 mb-8">
                    Contact the Japan Go Team by filling out the form below
                </p>

            {/* Form  Fields*/}
            <div className="max-w-lg mx-auto px-4 sm:px-6">
                <form ref={formRef} onSubmit={sendEmail} className='space-y-6'>

                    {/* Your Name Section */}
                    <div>
                        <label 
                            htmlFor='name'
                            className='block text-sm font-medium text-black'
                        >
                            Your Name
                        </label>
                        <input 
                            type="text"
                            id="name"
                            name="user_name"
                            required
                            placeholder="Enter Your Name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className='mt-1 block w-full px-3 py-2 border border-black focus:outline-none focus:bg-gray-100 duration-300 transition-all'
                        />
                    </div>

                    {/* Your Email Section */}
                    <div>
                        <label 
                            htmlFor='email'
                            className='block text-sm font-medium text-black'
                        >
                            Your Email
                        </label>
                        <input 
                            type="email"
                            id="email"
                            name="user_email"
                            required
                            placeholder="Enter Your Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className='mt-1 block w-full px-3 py-2 border border-black focus:outline-none focus:bg-gray-100 duration-300 transition-all'
                        />
                    </div>

                    {/* Your Message Section */}
                    <div>
                        <label 
                            htmlFor='message'
                            className='block text-sm font-medium text-black'
                        >
                            Your Message
                        </label>
                        <textarea 
                            id="message"
                            name="message"
                            rows={4}
                            required
                            placeholder="Enter Your Message"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            className='mt-1 block w-full px-3 py-2 border border-black focus:outline-none focus:bg-gray-100 duration-300 transition-all'
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button type="submit" className=" cursor-pointer relative group px-14 py-4 block border border-black bg-white text-black font-semibold overflow-hidden mb-24 transform transition-transform duration-300 hover:-translate-y-2">
                            <span className="relative z-10">Submit</span>
                            {/* Red circle effect */}
                            <span className="absolute inset-0 flex justify-center items-center">
                                <span className="w-0 h-0 bg-red-600 rounded-full transition-all duration-300 ease-in-out group-hover:w-10 group-hover:h-10"></span>
                            </span>
                        </button>
                    </div>
                </form>

            </div>
        </motion.div>
        {/* Success Modal */}
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center'>
                    Your Message has been sent!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} className='text-center'>
                    We will get back to you as soon as possible.
                    </Typography>
                </Box>
            </Fade>
            </Modal>
        </>
    )
} 

export default Contact;
