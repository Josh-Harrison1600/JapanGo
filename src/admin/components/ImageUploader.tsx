import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

interface ImageUploaderProps{
    onUploadComplete: (url: string) => void;
}

function ImageUploader({ onUploadComplete }: ImageUploaderProps){
    //States for if the image is being uploaded & for the image preview URL
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    //State for the imageUrl log
    const [uploadLog, setUploadLog] = useState<{ originalName: string, cloudfrontUrl: string }[]>([]); 


    //Fetch the logs of all uploaded images
    useEffect(() => {
      axios.get('http://localhost:5000/upload-image/log')
      .then(res => setUploadLog(res.data))
      .catch(err => console.error("failed to get logs", err));
    }, [])

  /**
   * Triggered when the user selects a file.
   * Uploads the image to the backend, which then uploads it to S3.
   * On success, it returns the CloudFront image URL and displays a preview.
   */

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try{
            setUploading(true);

            //Send the image to the backend
            const res = await axios.post('http://localhost:5000/upload-image', formData);
            const imageUrl = res.data.imageUrl;

            setPreview(imageUrl);
            onUploadComplete(imageUrl);
        }catch(err){
            console.error("Upload failed", err);
        }finally{
            setUploading(false);
        }
    };

    return (
        <div className="mt-12 p-4 rounded-md shadow-md bg-white border max-w-full">
          <h3 className="text-lg font-semibold mb-2">Upload Image</h3>
      
          {/* Styled file input */}
          <label className="inline-block bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-800 transition duration-200">
            Select Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
      
          {uploading && (
            <p className="text-sm text-gray-600 mt-2">Uploading...</p>
          )}
      
          {preview && (
            <div className="mt-4 space-y-2">
              <img
                src={preview}
                alt="Uploaded Preview"
                className="w-32 h-auto rounded shadow border"
              />
              <p className="text-xs text-gray-800 break-words bg-gray-100 p-2 rounded">
                {preview}
              </p>
            </div>
          )}

          {/* Upload History Table */}
          {uploadLog.length > 0 && (
            <Box className="mt-6">
              <Typography variant="h6" className="mb-3 font-semibold">Upload History</Typography>

              <TableContainer component={Paper}>
                <Table size="small" aria-label="uploaded images table">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Original Name</strong></TableCell>
                      <TableCell><strong>Preview</strong></TableCell>
                      <TableCell><strong>URL</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {uploadLog.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.originalName}</TableCell>
                        <TableCell>
                          <img
                            src={item.cloudfrontUrl}
                            alt={item.originalName}
                            style={{ width: '64px', height: 'auto', borderRadius: '4px' }}
                          />
                        </TableCell>
                        <TableCell>
                          <a href={item.cloudfrontUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB' }}>
                            {item.cloudfrontUrl}
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </div>
      );
}

export default ImageUploader;

