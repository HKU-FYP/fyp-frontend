import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Typography, Box, Paper, Divider, Card, CardContent, List, ListItem, ListItemText, Alert, Snackbar} from "@mui/material";
import {getNewsDetailByNewsId} from "../../../api/news.js";
import Chip from "@mui/material/Chip";
import * as React from "react";

export default function NewsDetail() {
    const [selectedButton, setSelectedButton] = useState('Intermediate');
    const {id} = useParams();
    const [newsDetail, setNewsDetail] = useState(null);

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        getNewsDetailByNewsId(id)
            .then((data) => setNewsDetail(data))
            .catch((error) => console.error("Failed to fetch news detail:", error));
    }, [id]);


    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    if (!newsDetail) return null;

    const sentimentColorMap = {
        "Highly Positive": { bg: "#1b5e20", text: "#ffffff" },
        "Positive":        { bg: "#4caf50", text: "#ffffff" },
        "Neutral":         { bg: "#e5cb74", text: "#000000" },
        "Negative":        { bg: "#ff9800", text: "#000000" },
        "Highly Negative": { bg: "#d32f2f", text: "#ffffff" },
    };
    const { bg, text } = sentimentColorMap[newsDetail.sentiment] || { bg: "#e0e0e0", text: "#000" };



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
                    <Typography variant="h5" sx={{
                        fontWeight: 'bold',
                        color: '#000',
                        textAlign: 'center',
                        paddingTop: '15px',
                        lineHeight: '0.4'
                    }}>
                        {newsDetail.title}
                    </Typography>

                    <Typography variant="subtitle2" sx={{color: '#666', textAlign: 'center', marginTop: '-8px'}}>
                        Published
                        on {new Date(newsDetail.published_date).toLocaleDateString() + ' ' + new Date(newsDetail.published_date).toLocaleTimeString('en-us')}
                    </Typography>

                    <Divider/>
                    <Card variant="outlined" sx={{borderRadius: '12px', backgroundColor: '#f9fafb', padding: '16px'}}>
                        <CardContent>
                            <Typography variant="h6" sx={{fontWeight: 'bold', color: '#000'}}>
                                Summary
                            </Typography>
                            <Typography variant="body1">{newsDetail.summary}</Typography>
                        </CardContent>
                    </Card>

                    {/* Key Metrics */}
                    <Card variant="outlined" sx={{borderRadius: '12px', backgroundColor: '#f9fafb', padding: '16px'}}>
                        <CardContent>
                            <Typography variant="h6" sx={{fontWeight: 'bold', color: '#000'}}>
                                Key Metrics
                            </Typography>
                            <List sx={{listStyleType: 'disc', paddingLeft: '20px', paddingBottom: '0px'}}>
                                {newsDetail.key_metrics.map((metric, index) => (
                                    <ListItem key={index} sx={{display: 'list-item', paddingY: 0}}>
                                        <ListItemText sx={{fontSize: '1rem'}} primary={metric}/>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>

                    {/* Sentiment Analysis */}
                    <Card variant="outlined" sx={{borderRadius: '12px', backgroundColor: '#f9fafb', padding: '16px'}}>
                        <CardContent>
                            <Typography variant="h6" sx={{fontWeight: 'bold', color: '#000', marginBottom: '10px'}}>
                                Sentiment Analysis
                            </Typography>
                            <Typography variant="body1" sx={{fontWeight: 'bold', marginBottom: "4px"}}>
                                Overall Sentiment:
                                <Chip
                                    label={
                                        <span style={{color: text, fontWeight: 500}}>
                                            {newsDetail.sentiment}
                                        </span>
                                    }
                                    size="small"
                                    sx={{
                                        backgroundColor: bg,
                                        ml: '4px',
                                        mb: '2px'
                                    }}
                                />
                            </Typography>
                            <Typography variant="body1">{newsDetail.sentiment_analysis}</Typography>
                        </CardContent>
                    </Card>

                    {/* Stock Impact Analysis */}
                    <Card variant="outlined" sx={{borderRadius: '12px', backgroundColor: '#f9fafb', padding: '16px'}}>
                        <CardContent>
                            <Typography variant="h6" sx={{fontWeight: 'bold', color: '#000', marginBottom: '10px'}}>
                                Stock Impact Analysis
                            </Typography>
                            <Typography variant="body1">
                                {selectedButton === 'Beginner' && (newsDetail.stock_impact_analysis_easy || newsDetail.fullanalysis)}
                                {selectedButton === 'Intermediate' && (newsDetail.stock_impact_analysis_intermediate || newsDetail.fullanalysis)}
                                {selectedButton === 'Expert' && (newsDetail.stock_impact_analysis_expert || newsDetail.fullanalysis)}
                            </Typography>

                            <Stack spacing={2} paddingTop={"20px"} direction="row" justifyContent="center">
                                <Button
                                    variant={selectedButton === 'Beginner' ? 'contained' : 'outlined'}
                                    color="primary"
                                    size="large"
                                    sx={{borderRadius: '24px', fontWeight: 'bold'}}
                                    onClick={() => handleButtonClick('Beginner')}
                                >
                                    Beginner
                                </Button>
                                <Button
                                    variant={selectedButton === 'Intermediate' ? 'contained' : 'outlined'}
                                    color="primary"
                                    size="large"
                                    sx={{borderRadius: '24px', fontWeight: 'bold'}}
                                    onClick={() => handleButtonClick('Intermediate')}
                                >
                                    Intermediate
                                </Button>
                                <Button
                                    variant={selectedButton === 'Expert' ? 'contained' : 'outlined'}
                                    color="primary"
                                    size="large"
                                    sx={{borderRadius: '24px', fontWeight: 'bold'}}
                                    onClick={() => handleButtonClick('Expert')}
                                >
                                    Expert
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Divider />
                    <Box sx={{ textAlign: 'center', marginTop: '24px' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Find it relevant to the stock?
                        </Typography>
                        <Stack direction="row" spacing={3} justifyContent="center">
                            <Button variant="outlined" color="success" onClick={handleClick} startIcon={<span>👍</span>}>
                                Yes
                            </Button>
                            <Button variant="outlined" color="error" onClick={handleClick} startIcon={<span>👎</span>}>
                                No
                            </Button>
                            <Snackbar
                                open={open}
                                autoHideDuration={500}
                                onClose={handleClose}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            >
                                <Alert
                                    onClose={handleClose}
                                    severity="success"
                                    variant="filled"
                                    sx={{width: '100%'}}
                                >
                                    Thanks for your feedback!
                                </Alert>
                            </Snackbar>
                        </Stack>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    );
}
