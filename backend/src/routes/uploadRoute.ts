import express from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import UploadedImage from '../models/UploadedImage';

const router = express.Router();

//Set up in-memory storage for uploaded files 
const storage = multer.memoryStorage();
const upload = multer({ storage });

//Declared keys here as variable because AWS was throwing errors when just putting it in the s3 function
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

if(!accessKeyId || !secretAccessKey){
    throw new Error("Missing AWS Credentials!");
}

const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    credentials: new AWS.Credentials({
        accessKeyId,
        secretAccessKey
    }),
});

const cloudfrontDomain = process.env.CLOUDFRONT_DOMAIN!;


/**
 * POST /upload-image
 * Handles image uploads via admin dashboard.
 * Accepts an image file, uploads it to S3, and returns the CloudFront URL.
 */
router.post('/', upload.single('image'), async (req, res) => {
    try{
        const file = req.file

        //Safeguard to avoid warnings for 'file' variable
        if(!file){
            res.status(400).json({error: 'No file uploaded'});
            return;
        }

        //Generate a unique filename using UUID to avoid overwrites
        const filename = `${uuidv4()}-${file.originalname}`;

        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `images/${filename}`,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'private',        
        }

        await s3.upload(uploadParams).promise();

        //Construct the public URL
        const imageUrl = `${cloudfrontDomain}/images/${filename}`;

        //Save the info to MongoDB
        await UploadedImage.create({
            originalName: file.originalname,
            cloudfrontUrl: imageUrl
        })

        res.json({ imageUrl })
    }catch(err){
        console.error("Failed to upload", err);
        res.status(500).json({ error: 'Image upload failed'});
    }
});

//GET for the log of imageUrl info
router.get('/log', async (req, res) => {
    try{
        const logs = await UploadedImage.find().sort({ uploadedAt: -1 });
        res.json(logs);
    }catch(err){
        console.error('Failed to fetch image logs', err);
        res.status(500).json({ error: 'Failed to fetch image logs' });
    }
})

export default router;