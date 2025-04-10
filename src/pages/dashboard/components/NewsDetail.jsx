import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import {useState, useEffect} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {Typography, Box, Paper, Divider, Card, CardContent, List, ListItem, ListItemText, Alert, Snackbar, Grid} from "@mui/material";
import {getNewsDetailByNewsId, getNewsByUserStockId, getNewsDashboardSummary} from "../../../api/news.js";
import Chip from "@mui/material/Chip";
import * as React from "react";
import StatCardNewsList from "./StatCardNewsList.jsx";
import AppTheme from "../../shared-theme/AppTheme"
import CssBaseline from "@mui/material/CssBaseline";
import { alpha } from "@mui/material/styles";
import { dislikeNews } from "../../../api/news";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "../../dashboard/theme/customizations";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function NewsDetail() {
    const [selectedButton, setSelectedButton] = useState('Intermediate');
    const {id, user_stock_id} = useParams();
    const [newsData, setNewsData] = useState([]);
    const [newsDetail, setNewsDetail] = useState(null);
    const [newsSummary, setNewsSummary] = useState({ positive_summary_list: [], negative_summary_list: [] });

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleDislike = async () => {
        try {
            await dislikeNews(newsDetail.id);
            setOpen(true);
        } catch (error) {
            // 에러 처리 (예: 에러 메시지를 보여주기)
            console.error("Failed to dislike news:", error);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        const fetchNewsDetail = async () => {
            const detail = await getNewsDetailByNewsId(id);
            setNewsDetail(detail);
        };

        fetchNewsDetail();
    }, [id]);

    useEffect(() => {
        const fetchNewsData = async () => {
            const allNews = await getNewsByUserStockId(user_stock_id);
            setNewsData(allNews);
            
            const summary = await getNewsDashboardSummary(user_stock_id);
            setNewsSummary(summary);
        };

        if (user_stock_id) {
            fetchNewsData();
        }
    }, [user_stock_id]);

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
        <AppTheme themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: "flex" }}>
                <Box
                    component="main"
                    sx={(theme) => ({
                        flexGrow: 1,
                        backgroundColor: theme.vars
                            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                            : alpha(theme.palette.background.default, 1),
                        overflow: "auto",
                    })}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            alignItems: "center",
                            mx: 3,
                            pb: 5,
                            mt: { xs: 8, md: 0 },
                            mt: 3
                        }}
                    >
                        <Box sx={{
                            width: "100%", 
                            maxWidth: {sm: "100%", md: "1700px"},
                            display: "flex", 
                            flexDirection: "row", 
                            gap: 2
                        }}>
                            {/* Left part - News Detail */}
                            <Box sx={{flex:1.3}}>
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
                                            lineHeight: '1.2'
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
                                                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: 1 }}>
                                                        Overall Sentiment:
                                                    </Typography>
                                                    <Chip
                                                        label={
                                                            <span style={{color: text, fontWeight: 500}}>
                                                                {newsDetail.sentiment}
                                                            </span>
                                                        }
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: bg,
                                                        }}
                                                    />
                                                </Box>
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
                                                <Button variant="outlined" color="error" onClick={handleDislike} startIcon={<span>👎</span>}>
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

                            {/* News List */}
                            <Box sx={{flex: 1, overflow: 'auto', height: '90vh'}}>
                                <Typography component="h2" variant="h6" sx={{mb: 2}}>
                                    Personalized News Curation
                                </Typography>

                                <Paper elevation={1} sx={{ padding: 2, marginBottom: 2 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}> 🧠 Quick Summary </Typography>
                                    
                                    <Typography variant="body2" sx={{ mb: 2 }}>
                                        {(() => {
                                            const sentimentCounts = {};
                                            for (let item of newsData) {
                                                const sentiment = item.sentiment;
                                                if (sentimentCounts[sentiment]) {
                                                    sentimentCounts[sentiment]++;
                                                } else {
                                                    sentimentCounts[sentiment] = 1;
                                                }
                                            }
                                            const orderedSentiments = ["Highly Positive", "Positive", "Neutral", "Negative", "Highly Negative"];
                                            const summaryList = orderedSentiments
                                                .filter(sentiment => sentimentCounts[sentiment])
                                                .map(sentiment => `${sentiment}: ${sentimentCounts[sentiment]}`);

                                            return summaryList.join(" · ");
                                        })()}
                                    </Typography>

                                    {newsSummary.positive_summary_list.length > 0 && (
                                        <Box sx={{ mt: 1 }}>
                                            <Typography variant="subtitle2" color="success.main">Key Positive News</Typography>
                                            <ul style={{ margin: 0, paddingLeft: 20 }}>
                                                {newsSummary.positive_summary_list.map((summary, index) => (
                                                    <li key={index}>
                                                        <Typography variant="body2">{summary}</Typography>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Box>
                                    )}
                                    {newsSummary.negative_summary_list.length > 0 && (
                                        <Box sx={{ mt: 1 }}>
                                            <Typography variant="subtitle2" color="error.main">Key Negative News</Typography>
                                            <ul style={{ margin: 0, paddingLeft: 20 }}>
                                                {newsSummary.negative_summary_list.map((summary, index) => (
                                                    <li key={index}>
                                                        <Typography variant="body2">{summary}</Typography>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Box>
                                    )}
                                    {newsSummary.positive_summary_list.length === 0 && newsSummary.negative_summary_list.length === 0 && (
                                        <Typography variant="body2" sx={{ mt: 1 }}>No news summary available</Typography>
                                    )}
                                </Paper>

                                <Grid container spacing={2} columns={12}>
                                    {newsData.map((news) => (
                                        <Grid item key={news.id} xs={12} sm={12} lg={12}>
                                            <StatCardNewsList
                                                {...news}
                                                user_stock_id={parseInt(user_stock_id)}
                                                highlight={news.sentiment === "Highly Positive" || news.sentiment === "Highly Negative"}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </AppTheme>
    );
}
