import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

function Contact(){
    //States for the modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const formRef = useRef<HTMLFormElement | null>(null);
    const sendEmailPLACEHOLDER = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('sendEmailPLACEHOLDER');
        handleOpen();
    }

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
                <form ref={formRef} onSubmit={sendEmailPLACEHOLDER} className='space-y-6'>

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
                            className='mt-1 block w-full px-3 py-2 border border-black focus:outline-none focus:bg-gray-100 duration-300 transition-all'
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button type="submit" className="relative group px-14 py-4 block border border-black bg-white text-black font-semibold overflow-hidden mb-24">
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
