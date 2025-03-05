import * as React from "react";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SessionsChart from "./SessionsChart";
import StatCard from "./StatCard";
import TradingVolume from "./TradingVolume";
import {getUserStock} from "../../../api/user";
import {getStockDetailInfo} from "../../../api/stock";
import {useNavigate} from "react-router-dom";
import StatCardNewsList from "./StatCardNewsList.jsx";
import { getNewsByUserStockId } from "../../../api/news";


export const newsData = [
    {
        id: 1,
        source: "Yahoo Finance",
        title: "If You’d Invested $1,000 in Apple During Trump’s First Presidency, What Would It Be Worth Now?",
        link: "https://finance.yahoo.com",
        summary: "Apple (AAPL) has seen tremendous growth since Donald Trump’s first presidency began in January 2017. Back then, Apple’s stock was trading at approximately $28 per share (adjusted for splits). With the company’s consistent expansion in services, aggressive stock buybacks, and strong iPhone sales, AAPL has delivered substantial returns to long-term investors. A $1,000 investment in Apple at the beginning of Trump’s term would have bought about 35 shares. As of today, Apple’s stock is trading at around $180, meaning that investment would now be worth over $6,300, representing an impressive return of more than 500%.\n",
        fullanalysis: "Several key factors have driven Apple’s stock growth over the past few years. The company capitalized on the smartphone boom, introduced the 5G-enabled iPhone lineup, and expanded its services segment, including Apple Music, iCloud, and the App Store. Additionally, Apple’s aggressive stock repurchase programs have significantly reduced the number of outstanding shares, boosting earnings per share. Despite occasional challenges such as supply chain disruptions and regulatory scrutiny, Apple has maintained strong financial performance, continuing to reward long-term investors. Looking ahead, Apple’s investment in AI, augmented reality, and potential new product lines, such as an autonomous vehicle, could continue to drive stock appreciation in the future.",
        interval: "Last 30 days",
        analysis: "Apple’s strong product innovation, stock buybacks, and service expansion have fueled impressive long-term returns for investors.",
        trend: "",
        data: [
            200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360,
            340, 380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600,
            880, 920,
        ],
    },
    {
        id: 2,
        source: "Yahoo Finance",
        title: "Why Apple Stock Gained 30% Last Year",
        link: "https://finance.yahoo.com",
        summary: "Apple’s stock price surged by 30% over the past year, driven by strong earnings, resilient demand for its products, and optimism surrounding AI and services growth. Despite broader economic uncertainty, Apple managed to maintain profitability, launch new iPhones and MacBooks, and expand its services revenue. Investors also reacted positively to Apple’s increasing investment in artificial intelligence, which is expected to enhance products like Siri and the company’s ecosystem.\n",
        fullanalysis: "Apple’s strong financial health, high margins, and dedicated customer base have helped the company sustain growth even in challenging economic conditions. The company’s ability to generate consistent free cash flow and return capital to shareholders through dividends and buybacks has made it a preferred stock among investors. Additionally, Apple’s growing services revenue, including subscriptions and advertising, has provided a stable income stream beyond hardware sales. As Apple continues to explore AI applications and potential new product innovations, investors remain optimistic about its future growth prospects. However, macroeconomic risks and potential regulatory challenges could still pose headwinds for the stock in the coming years.",
        interval: "Last 30 days",
        analysis: "Strong earnings, AI optimism, and growing services revenue have kept investors bullish on Apple’s future.",
        trend: "",
        data: [
            1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840,
            600, 820, 780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400,
            360, 300, 220,
        ],
    },
    {
        id: 3,
        source: "Bloomberg",
        title: "Indonesian officials to discuss Apple investment proposal",
        link: "https://finance.yahoo.com",
        summary: "Indonesian government officials are set to meet with Apple executives to discuss a potential investment proposal aimed at expanding the company’s presence in Southeast Asia. While details of the proposal remain undisclosed, analysts speculate that Apple may be looking to establish a manufacturing facility, expand its supply chain, or enhance its digital services in the region. Indonesia, with its growing consumer base and emerging tech sector, presents a lucrative opportunity for Apple’s continued global expansion.\n",
        fullanalysis: "Apple’s potential investment in Indonesia aligns with its broader strategy of diversifying its supply chain beyond China and strengthening its foothold in emerging markets. With Indonesia’s rapidly growing middle class and increasing smartphone penetration, Apple could benefit from localized production and a stronger retail presence. Additionally, Apple’s investment could contribute to Indonesia’s digital economy growth by fostering tech talent and infrastructure development. However, geopolitical factors, regulatory hurdles, and competition from established smartphone brands in Indonesia could influence Apple’s investment decisions. If the discussions lead to a deal, it could mark a significant milestone in Apple’s global expansion strategy.",
        interval: "Last 30 days",
        analysis: "pple’s potential investment in Indonesia aligns with its supply chain diversification and emerging market expansion strategy.",
        trend: "",
        data: [
            500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620,
            510, 530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430,
            520, 510,
        ],
    },
    {
        id: 4,
        source: "New York Times",
        title: "Apple stock touches intraday high after nod of confidence from Wall Street",
        link: "https://finance.yahoo.com",
        summary: "Apple’s stock hit an intraday high following positive remarks from Wall Street analysts, who expressed renewed confidence in the company’s long-term growth prospects. The stock rally was driven by bullish sentiment surrounding Apple’s AI initiatives, resilient product demand, and ongoing stock buybacks. Analysts highlighted Apple’s strong financial position, consistent revenue growth, and potential new product innovations as reasons for the stock’s upward momentum.\n",
        fullanalysis: "Investor confidence in Apple remains high as the company continues to demonstrate strong earnings performance and technological innovation. Analysts’ endorsements often play a crucial role in influencing investor sentiment, particularly when backed by solid financial results and strategic initiatives. The recent stock surge suggests that investors are optimistic about Apple’s upcoming product releases, AI advancements, and expansion into new markets. However, it is essential to monitor potential risks, such as supply chain disruptions, economic slowdowns, and increased regulatory scrutiny, which could impact future stock performance. Despite these risks, Apple’s ability to maintain its brand loyalty and drive innovation makes it a formidable player in the tech industry.",
        interval: "Last 30 days",
        analysis: "Positive analyst sentiment and Apple’s continued growth prospects have driven strong investor confidence",
        trend: "",
        data: [
            500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620,
            510, 530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430,
            520, 510,
        ],
    },
];


export default function MainGrid() {
    const [selectedStockGlobal, setSelectedStockGlobal] = useState({});
    const [cardData, setCardData] = useState([]);
    const [stockHistory, setStockHistory] = useState([]);
    const [newsData, setNewsData] = useState([]); // Add state for news data

    const navigate = useNavigate();

    const fetchUserStockSync = async () => {
        try {
            const userStocks = await getUserStock(); // Pauses until the Promise resolves
            const userStock = userStocks[0];
            setSelectedStockGlobal({
                id: userStock.id,
                ticker: userStock.ticker,
                name: userStock.name,
            });

            const stockDetailInfo = await getStockDetailInfo(userStock.ticker);
            setCardData((prev) => {
                if (prev.some((item) => item.title === "Stock Price")) {
                    return prev;
                }
                console.log(stockDetailInfo.percent_change);

                return [
                    ...prev,
                    {
                        title: "Stock Price",
                        value: `${stockDetailInfo.open} USD`,
                        percentChange: stockDetailInfo.percent_change,
                    },
                ];
            });

            setCardData((prev) => {
                if (prev.some((item) => item.title === "Exchange")) {
                    return prev;
                }

                return [
                    ...prev,
                    {
                        title: "Exchange",
                        value: `${stockDetailInfo.exchange}`,
                    },
                ];
            });

            setCardData((prev) => {
                if (prev.some((item) => item.title === "Previous Close")) {
                    return prev;
                }

                return [
                    ...prev,
                    {
                        title: "Previous Close",
                        value: `${stockDetailInfo.previous_close} USD`,
                    },
                ];
            });

            setCardData((prev) => {
                if (prev.some((item) => item.title === "Change")) {
                    return prev;
                }

                return [
                    ...prev,
                    {
                        title: "Change",
                        value: `${stockDetailInfo.change} USD`,
                    },
                ];
            });

            setStockHistory((prev) => {
                return stockDetailInfo.stock_history;
            });

            // **Fetch news data**
            const news = await getNewsByUserStockId(1); //TODO replace with user_stock_id
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
            <Box sx={{flex: 1.3}}>
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
                <Grid container spacing={2} columns={12}>
                    {newsData.map((card, index) => (
                        <Grid key={index} size={{xs: 12, sm: 12, lg: 12}}>
                            <StatCardNewsList {...card} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
