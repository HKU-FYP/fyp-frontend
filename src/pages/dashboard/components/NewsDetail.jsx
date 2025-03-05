import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Typography, Box} from "@mui/material";
import {newsData} from "./MainGrid.jsx";
import {getNewsDetailByNewsId} from "../../../api/news.js";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";

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
        getNewsDetailByNewsId(id)
            .then((data) => setNewsDetail(data))
            .catch((error) => console.error("Failed to fetch news detail:", error));
    }, [id]);

    if (!newsDetail) {
        return <Skeleton variant="rectangular" height={400} />;
    }

    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    return (
        <Box sx={{padding: '20px'}}>

            <Stack spacing={1.5}>
                <Typography variant="h4" sx={{fontWeight: 'bold'}}>
                    {newsDetail.title}
                </Typography>

                <h2> Summary</h2>
                <Typography variant="body1">{newsDetail.summary}</Typography>
                {/*<Skeleton variant="rectangular" height={200}/>*/}

                {/*<h2> Content</h2>*/}
                {/*<Typography variant="body1">{newsDetail.content}</Typography>*/}


                <h2>Key Metrics</h2>
                <List>
                    {newsDetail.key_metrics.map((metric, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={metric}/>
                        </ListItem>
                    ))}
                </List>

                <h2> Stock impact analysis </h2>

                <Typography variant="body1">Overall Sentiment: {newsDetail.sentiment}</Typography>
                <Typography variant="body1">{newsDetail.sentiment_analysis}</Typography>

                {/*<Typography variant="body1">{newsDetail.fullanalysis}</Typography>*/}
                <Typography variant="body1">
                    {selectedButton === 'Beginner' && (newsDetail.stock_impact_analysis_easy || fullanalysis)}
                    {selectedButton === 'Intermediate' && (newsDetail.stock_impact_analysis_intermediate || fullanalysis)}
                    {selectedButton === 'Expert' && (newsDetail.stock_impact_analysis_expert || fullanalysis)}
                </Typography>
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