import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Paper, Divider, Card, CardContent, List, ListItem, ListItemText } from "@mui/material";
import { getNewsDetailByNewsId } from "../../../api/news.js";

export default function NewsDetail() {
    const [selectedButton, setSelectedButton] = useState('Intermediate');
    const { id } = useParams();
    const [newsDetail, setNewsDetail] = useState(null);

    useEffect(() => {
        getNewsDetailByNewsId(id)
            .then((data) => setNewsDetail(data))
            .catch((error) => console.error("Failed to fetch news detail:", error));
    }, [id]);

    if (!newsDetail) {
        return <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2, margin: 'auto', width: '80%' }} />;
    }

    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingX: '30px',
            paddingTop: '40px',
            minHeight: '100vh',
            backgroundColor: '#f4f6f8',
        }}>
            <Paper elevation={6} sx={{
                maxWidth: '900px',
                width: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
                padding: '30px',
                backgroundColor: '#ffffff',
            }}>
                <Stack spacing={2.5}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000', textAlign: 'center', paddingTop: '15px', lineHeight: '0.4' }}>
                        {newsDetail.title}
                    </Typography>

                    <Typography variant="subtitle2" sx={{ color: '#666', textAlign: 'center', marginTop: '-8px' }}>
                        Published on {new Date(newsDetail.published_date).toLocaleDateString() + ' ' + new Date(newsDetail.published_date).toLocaleTimeString('en-us')}
                    </Typography>

                    <Divider />
                    <Card variant="outlined" sx={{ borderRadius: '12px', backgroundColor: '#f9fafb', padding: '16px' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>
                                Summary
                            </Typography>
                            <Typography variant="body1">{newsDetail.summary}</Typography>
                        </CardContent>
                    </Card>

                    {/* Key Metrics */}
                    <Card variant="outlined" sx={{ borderRadius: '12px', backgroundColor: '#f9fafb', padding: '16px' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>
                                Key Metrics
                            </Typography>
                            <List sx={{ listStyleType: 'disc', paddingLeft: '20px', paddingBottom: '0px' }}>
                                {newsDetail.key_metrics.map((metric, index) => (
                                    <ListItem key={index} sx={{ display: 'list-item', paddingY: 0 }}>
                                        <ListItemText sx={{ fontSize: '1rem' }} primary={metric} />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>

                    {/* Sentiment Analysis */}
                    <Card variant="outlined" sx={{ borderRadius: '12px', backgroundColor: '#f9fafb', padding: '16px' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000', marginBottom: '10px' }}>
                                Sentiment Analysis
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                Overall Sentiment:
                                <span style={{ color: newsDetail.sentiment === 'Positive' ? 'green' : newsDetail.sentiment === 'Negative' ? 'red' : '#ff9800' }}>
                                    {` ${newsDetail.sentiment}`}
                                </span>
                            </Typography>
                            <Typography variant="body1">{newsDetail.sentiment_analysis}</Typography>
                        </CardContent>
                    </Card>

                    {/* Stock Impact Analysis */}
                    <Card variant="outlined" sx={{ borderRadius: '12px', backgroundColor: '#f9fafb', padding: '16px' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000', marginBottom: '10px' }}>
                                Stock Impact Analysis
                            </Typography>
                            <Typography variant="body1">
                                {selectedButton === 'Beginner' && (newsDetail.stock_impact_analysis_easy || newsDetail.fullanalysis)}
                                {selectedButton === 'Intermediate' && (newsDetail.stock_impact_analysis_intermediate || newsDetail.fullanalysis)}
                                {selectedButton === 'Expert' && (newsDetail.stock_impact_analysis_expert || newsDetail.fullanalysis)}
                            </Typography>
                        </CardContent>
                    </Card>

                    {/* Buttons */}
                    <Stack spacing={2} direction="row" justifyContent="center">
                        <Button
                            variant={selectedButton === 'Beginner' ? 'contained' : 'outlined'}
                            color="primary"
                            size="large"
                            sx={{ borderRadius: '24px', fontWeight: 'bold' }}
                            onClick={() => handleButtonClick('Beginner')}
                        >
                            Beginner
                        </Button>
                        <Button
                            variant={selectedButton === 'Intermediate' ? 'contained' : 'outlined'}
                            color="primary"
                            size="large"
                            sx={{ borderRadius: '24px', fontWeight: 'bold' }}
                            onClick={() => handleButtonClick('Intermediate')}
                        >
                            Intermediate
                        </Button>
                        <Button
                            variant={selectedButton === 'Expert' ? 'contained' : 'outlined'}
                            color="primary"
                            size="large"
                            sx={{ borderRadius: '24px', fontWeight: 'bold' }}
                            onClick={() => handleButtonClick('Expert')}
                        >
                            Expert
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    );
}
