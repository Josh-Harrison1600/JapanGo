import { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';

interface HoursType {
    [day: string]: string[];
}

// Function to edit the hours
const Hours = () => {
    const [hours, setHours] = useState<HoursType | null>(null);
    const [loading, setLoading] = useState(true);

    const daysOfWeek = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ];    

    //Fetch the hours from the backend
    useEffect(() => {
        const fetchHours = async () => {
          try {
            const res = await axios.get('http://localhost:5000/hours');
            // Ensure empty arrays if fields are missing
            const fetched = res.data;
            for (const day of daysOfWeek) {
              if (!Array.isArray(fetched[day])) {
                fetched[day] = [];
              }
            }
            setHours(fetched);
          } catch (err) {
            console.error('Failed to get hours:', err);
            toast.error('Failed to Get Hours');
          } finally {
            setLoading(false);
          }
        };
        fetchHours();
      }, []);
    
      const handleChange = (day: string, index: number, value: string) => {
        setHours((prev) => {
          if (!prev) return prev;
          const newHours = [...prev[day]];
          newHours[index] = value;
          return { ...prev, [day]: newHours };
        });
      };
    
      const handleAddRange = (day: string) => {
        setHours((prev) => {
          if (!prev) return prev;
          const newHours = [...prev[day], ''];
          return { ...prev, [day]: newHours };
        });
      };
    
      const handleRemoveRange = (day: string, index: number) => {
        setHours((prev) => {
          if (!prev) return prev;
          const newHours = prev[day].filter((_, i) => i !== index);
          return { ...prev, [day]: newHours };
        });
      };
    
      const handleSave = async () => {
        try {
          await axios.put('http://localhost:5000/hours', hours);
          toast.success('Updated Hours');
        } catch (err) {
          console.error('Failed to update hours', err);
          toast.error('Failed to Update Hours');
        }
      };
    
      if (loading) return <p>Loading Hours...</p>;
      if (!hours) return <p>No data found</p>;
    
      return (
        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Edit Business Hours
          </Typography>
    
          {daysOfWeek.map((day) => (
            <Box key={day} mb={2}>
              <Typography variant="h6" gutterBottom>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </Typography>
    
              {hours[day].map((range, index) => (
                <Box key={index} display="flex" gap={2} mb={1}>
                  <TextField
                    fullWidth
                    value={range}
                    onChange={(e) => handleChange(day, index, e.target.value)}
                    placeholder="e.g. 11am - 1pm"
                  />
                  <Button onClick={() => handleRemoveRange(day, index)} color="error">
                    Remove
                  </Button>
                </Box>
              ))}
    
              <Button 
                variant="contained" 
                size="small" 
                onClick={() => handleAddRange(day)}
                style={{ backgroundColor: 'black', color: 'white' }}
              >
                + Add Time Range
              </Button>
            </Box>
          ))}
    
        <div className='mt-8'>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            style={{ backgroundColor: 'black', color: 'white' }}
          >
            Save Changes
          </Button>
          </div>
        </Paper>
      );
    };
    
    export default Hours;