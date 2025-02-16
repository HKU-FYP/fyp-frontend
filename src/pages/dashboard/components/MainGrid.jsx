import * as React from "react";
import { useContext, useEffect, useState, memo } from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Copyright from "../internals/components/Copyright";
import ChartUserByCountry from "./ChartUserByCountry";
import CustomizedTreeView from "./CustomizedTreeView";
import CustomizedDataGrid from "./CustomizedDataGrid";
import HighlightedCard from "./HighlightedCard";
import PageViewsBarChart from "./PageViewsBarChart";
import SessionsChart from "./SessionsChart";
import StatCard from "./StatCard";
import TradingVolume from "./TradingVolume";
import { GlobalContext } from "../../../GlobalContext";
import { getUserStock } from "../../../api/user";
import { getStockDetailInfo } from "../../../api/stock";
import axios from "axios";

// Define fetchUserStock outside of useEffect
// const fetchUserStock = (setSelectedStockGlobal) => {
//   getUserStock()
//     .then((userStocks) => {
//       const userStock = userStocks[0];
//       console.log("userStocks", userStocks);
//       setSelectedStockGlobal({
//         id: userStock.id,
//         ticker: userStock.ticker,
//         name: userStock.name,
//       });
//     })
//     .catch((error) => {
//       console.error("Failed to fetch user stock:", error);
//     });
// };

export default function MainGrid() {
  // const { selectedStockGlobal, setSelectedStockGlobal } =
  //   useContext(GlobalContext);
  const [selectedStockGlobal, setSelectedStockGlobal] = useState({});
  const [datetime, setDatetime] = useState("");
  const [open, setOpen] = useState(0.0);
  const [volume, setVolume] = useState(0);
  const [percentChange, setPercentChange] = useState(0.0);
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [stockHistory, setStockHistory] = useState([]);

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
    } catch (error) {
      console.error("Failed to fetch user stock:", error);
    }
  };

  useEffect(() => {
    fetchUserStockSync();
  }, []);

  // const data = [
  //   {
  //     title: "Stock Price",
  //     value: "242.72 USD",
  //     interval: "Last 30 days",
  //     trend: "up",
  //   },
  //   {
  //     title: "Exchange",
  //     value: "NASDAQ (America/NY)",
  //     interval: "Last 30 days",
  //     trend: "",
  //   },
  //   {
  //     title: "Rolling Period Change",
  //     value: "123.123",
  //     interval: "Last 30 days",
  //     trend: "neutral",
  //   },
  //   {
  //     title: "Average Volume",
  //     value: "83571571",
  //     interval: "Last 30 days",
  //     trend: "down",
  //   },
  // ];

  const newsData = [
    {
      title: "Yahoo Finance",
      value:
        "If You’d Invested $1,000 in Apple During Trump’s First Presidency, What Would It Be Worth Now?",
      interval: "Last 30 days",
      trend: "",
      data: [
        200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360,
        340, 380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600,
        880, 920,
      ],
    },
    {
      title: "Yahoo Finance",
      value: "Why Apple Stock Gained 30% Last Year",
      interval: "Last 30 days",
      trend: "",
      data: [
        1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840,
        600, 820, 780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400,
        360, 300, 220,
      ],
    },
    {
      title: "Bloomberg",
      value: "Indonesian officials to discuss Apple investment proposal",
      interval: "Last 30 days",
      trend: "",
      data: [
        500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620,
        510, 530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430,
        520, 510,
      ],
    },
    {
      title: "New York Times",
      value:
        "Apple stock touches intraday high after nod of confidence from Wall Street",
      interval: "Last 30 days",
      trend: "",
      data: [
        500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620,
        510, 530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430,
        520, 510,
      ],
    },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, 
    display: "flex", flexDirection: "row", gap: 2 }}>
    <Box sx={{ flex: 1.3 }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
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
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {cardData.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        {/* <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid> */}
        <Grid size={{ xs: 12, md: 6 }}>
          {stockHistory.length > 0 && (
            <SessionsChart stock_history={stockHistory} />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {stockHistory.length > 0 && (
            <TradingVolume stock_history={stockHistory} />
          )}
        </Grid>
      </Grid>
      </Box>
      <Box sx={{ flex: 1 }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Personalized News Curation
      </Typography>
      <Grid container spacing={2} columns={12}>
        {/* <Grid size={{ xs: 12, lg: 12 }}> */}
        {newsData.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 12, lg: 12 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        {/* <CustomizedDataGrid /> */}
        {/* </Grid> */}
        {/* <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "column" }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid> */}
      </Grid>
      </Box>
    </Box>
  );
}
