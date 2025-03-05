import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Typography, Box} from "@mui/material";
import {newsData} from "./MainGrid.jsx";

export default function NewsDetail() {

    //
    // const newsDetailData = [
    //     {
    //         id: 1,
    //         title: "If You’d Invested $1,000 in Apple During Trump’s First Presidency, What Would It Be Worth Now?",
    //
    //     },
    //     {
    //         id: 2,
    //         title: "Why Apple Stock Gained 30% Last Year",
    //         summary: "Summary",
    //         analysis: "Analysis"
    //     },
    //     {
    //         id: 3,
    //         title: "Indonesian officials to discuss Apple investment proposal",
    //         summary: "Summary",
    //         analysis: "Analysis"
    //     },
    //     {
    //         id: 4,
    //         title: "Apple stock touches intraday high after nod of confidence from Wall Street",
    //         summary: "Summary",
    //         analysis: "Analysis"
    //     },
    // ]

    const [selectedButton, setSelectedButton] = useState('Intermediate');

    const { id } = useParams();
    const [newsDetail, setNewsDetail] = useState(null);

    useEffect(() => {
        const detail = newsData.find(item => item.id === parseInt(id));
        setNewsDetail(detail);
    }, [id]);

    if (!newsDetail) {
        return <Skeleton variant="rectangular" height={400} />;
    }

    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    return (
        <Box sx={{padding: '20px'}}>

            <Stack spacing={5}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {newsDetail.title}
                </Typography>

                <h2> Summary</h2>
                <Typography variant="body1">{newsDetail.summary}</Typography>
                {/*<Skeleton variant="rectangular" height={200}/>*/}

                <h2> Stock impact analysis </h2>
                <Typography variant="body1">{newsDetail.fullanalysis}</Typography>
                {/*<Skeleton variant="rounded" height={300}/>*/}
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