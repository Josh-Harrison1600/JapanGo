import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination } from '@mui/material';

interface ImageUploaderProps{
    onUploadComplete: (url: string) => void;
}

function ImageUploader({ onUploadComplete }: ImageUploaderProps){
    //States for if the image is being uploaded & for the image preview URL
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    
    //States for the page control
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    //State for the imageUrl log
    const [uploadLog, setUploadLog] = useState<{ originalName: string, cloudfrontUrl: string }[]>([]); 


    //Fetch the logs of all uploaded images
    useEffect(() => {
      axios.get('http://localhost:5000/upload-image/log')
      .then(res => setUploadLog(res.data))
      .catch(err => console.error("failed to get logs", err));
    }, [])
  
    //Function for handling the amount of rows before you can change
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
      setPage(newPage);
    };

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
        <Paper sx={{width: '100%', p: 2, mt: 6, mb: 4}}>
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
                    {uploadLog
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => (
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
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={uploadLog.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          )}
        </Paper>
      );
      
}

export default ImageUploader;

