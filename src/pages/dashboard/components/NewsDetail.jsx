import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import {useState} from "react";
import {Typography, Box} from "@mui/material";

export default function NewsDetail() {

    const [selectedButton, setSelectedButton] = useState('Intermediate');

    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    return (
        <Box sx={{padding: '20px'}}>

            <Stack spacing={5}>
                <Typography
                    variant="h4"
                    sx={{
                        // padding: '20px',
                        fontWeight: 'bold',
                    }}
                >
                    Why Apple Stock Gained 30% Last Year
                </Typography>

                <h2> Summary</h2>
                <Skeleton variant="rectangular" height={200}/>
                <h2> Stock impact analysis </h2>
                <Skeleton variant="rounded" height={300}/>
                <Stack spacing={2} direction="row">
                    <Button
                        variant={selectedButton === 'Beginner' ? 'contained' : 'outlined'}
                        onClick={() => handleButtonClick('Beginner')}
                    >
                        Beginner
                    </Button>
                    <Button
                        variant={selectedButton === 'Intermediate' ? 'contained' : 'outlined'}
                        onClick={() => handleButtonClick('Intermediate')}
                    >
                        Intermediate
                    </Button>
                    <Button
                        variant={selectedButton === 'Expert' ? 'contained' : 'outlined'}
                        onClick={() => handleButtonClick('Expert')}
                    >
                        Expert
                    </Button>
                </Stack>
            </Stack>
        </Box>
    )
}