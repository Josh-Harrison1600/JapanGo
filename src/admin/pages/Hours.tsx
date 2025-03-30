import { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';

interface HoursType {
    [day: string]: string;
}

// Function to edit the hours
const Hours = () => {
    const [hours, setHours] = useState<HoursType | null>(null);
    const [loading, setLoading] = useState(true);

    //Fetch the hours from the backend
    useEffect(() => {
        const fetchHours = async () => {
            try{
                const res = await axios.get('http://localhost:5000/hours');
                setHours(res.data);
            }catch(err){
                console.error('Failed to get hours:', err);
                toast.error('Failed to Get Hours');
            }finally{
                setLoading(false);
            }
        };
        fetchHours();
    }, []);

    const handleChange = (day: string, value: string) => {
        setHours((prev) => prev ? { ...prev, [day]: value } : prev);
    };

    const handleSave = async () => {
        try{
            await axios.put('http://localhost:5000/hours', hours);
            console.log('hours updated');
            toast.success('Updated Hours');
        }catch(err){
            console.error('Failed to update hours', err);
            toast.error('Failed to Update Hours');
        }
    };

    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    if (loading) return <p>Loading Hours Placeholder</p>
    if (!hours) return <p>No data found</p>

    return(
        <Paper sx={{ p: 4, mt: 4 }}>
            <Typography variant="h5" gutterBottom>
            Edit Business Hours
            </Typography>
        
        {daysOfWeek.map((day) => (
            <Box key={day} mb={2}>
                <TextField
                    fullWidth
                    label={day.charAt(0).toUpperCase() + day.slice(1)}
                    value={hours[day] || ''}
                    onChange={(e) => handleChange(day, e.target.value)}
                />
            </Box>
        ))}

        <Button variant='contained' color='primary' onClick={handleSave} style={{ backgroundColor: 'black', color: 'white' }}>
            Save Changes
        </Button>
    </Paper>
    )
}

export default Hours;