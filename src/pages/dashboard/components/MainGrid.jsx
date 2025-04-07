import * as React from "react";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SessionsChart from "./SessionsChart";
import StatCard from "./StatCard";
import TradingVolume from "./TradingVolume";
import {getUserStock, getUserStockId} from "../../../api/user";
import {getStockDetailInfo} from "../../../api/stock";
import {useNavigate} from "react-router-dom";
import StatCardNewsList from "./StatCardNewsList.jsx";
import { getNewsByUserStockId } from "../../../api/news";
import Paper from "@mui/material/Paper";

import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";


export default function MainGrid() {
    const [selectedStockGlobal, setSelectedStockGlobal] = useState({});
    const [cardData, setCardData] = useState([]);
    const [stockHistory, setStockHistory] = useState([]);
    const [newsData, setNewsData] = useState([]); 
    const [userStocks, setUserStocks] = useState([]);
    const [selectedStockId, setSelectedStockId] = useState(null);

    const navigate = useNavigate();

    const fetchUserStockSync = async () => {
        try {
            const userStocks = await getUserStock(); 
            const userStock = userStocks[0];
            setUserStocks(userStocks);
            setSelectedStockGlobal({
                id: userStock.id,
                user_stock_id: userStock.user_stock_id,
                ticker: userStock.ticker,
                name: userStock.name,
            });


            const stockDetailInfo = await getStockDetailInfo(userStock.ticker);
            setCardData([
                { title: "Stock Price", value: `${stockDetailInfo.open.toFixed(2)} USD`, percentChange: stockDetailInfo.percent_change },
                { title: "Exchange", value: `${stockDetailInfo.exchange}` },
                { title: "Previous Close", value: `${stockDetailInfo.previous_close.toFixed(2)} USD` },
                { title: "Change", value: `${stockDetailInfo.change.toFixed(2)} USD` },
            ]);

            setStockHistory((prev) => {
                return stockDetailInfo.stock_history;
            });

            // **Fetch news data**
            // const response = await getUserStockId()
            // const user_stock_id = response.userStockId;

            const news = await getNewsByUserStockId(userStock.user_stock_id);
            setNewsData(news);


        } catch (error) {
            console.error("Failed to fetch user stock:", error);
        }
    };

    useEffect(() => {
        fetchUserStockSync();
    }, []);

    return (
        <Box sx={{
            width: "100%", maxWidth: {sm: "100%", md: "1700px"},
            display: "flex", flexDirection: "row", gap: 2
        }}>
            <Box sx={{flex: 1.6}}>
                {/* cards */}
                <Typography component="h2" variant="h6" sx={{mb: 2}}>
                    {selectedStockGlobal &&
                    selectedStockGlobal.ticker &&
                    selectedStockGlobal.name &&
                    cardData.length > 0
                        ? `${selectedStockGlobal.ticker} (${selectedStockGlobal.name})`
                        : "Loading..."}
                </Typography>

                <Grid
                    container
                    spacing={2}
                    columns={12}
                    sx={{mb: (theme) => theme.spacing(2)}}
                >
                    {cardData.map((card, index) => (
                        <Grid key={index} size={{xs: 12, sm: 6, lg: 3}}>
                            <StatCard {...card} />
                        </Grid>
                    ))}
                    <Grid size={{xs: 12, md: 6}}>
                        {stockHistory.length > 0 && (
                            <SessionsChart stock_history={stockHistory}/>
                        )}
                    </Grid>
                    <Grid size={{xs: 12, md: 6}}>
                        {stockHistory.length > 0 && (
                            <TradingVolume stock_history={stockHistory}/>
                        )}
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{flex: 1}}>
                <Typography component="h2" variant="h6" sx={{mb: 2}}>
                    Personalized News Curation
                </Typography>
                {/*TODO quick summary at dashboard (1-2line aggregated information/summary of news to save user's time reading a list of newsData)   */}
                <Paper elevation={1} sx={{ padding: 2, marginBottom: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}> 🧠 Quick Summary </Typography>
                    <Typography variant="body2">
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
                </Paper>

                <Grid container spacing={2} columns={12}>
                    {newsData.map((card, index) => (
                        <Grid key={index} size={{xs: 12, sm: 12, lg: 12}}>
                            <StatCardNewsList
                                {...card}
                                highlight = {card.sentiment === "Highly Positive" || card.sentiment === "Highly Negative"}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
