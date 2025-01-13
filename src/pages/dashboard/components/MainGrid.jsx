import * as React from "react";
import { useContext, useEffect, useState } from "react";
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

  const fetchUserStockSync = async () => {
    try {
      const userStocks = await getUserStock(); // Pauses until the Promise resolves
      const userStock = userStocks[0];
      setSelectedStockGlobal({
        id: userStock.id,
        ticker: userStock.ticker,
        name: userStock.name,
      });
    } catch (error) {
      console.error("Failed to fetch user stock:", error);
    }
  };

  useEffect(() => {
    fetchUserStockSync();
  }, []);

  // useEffect(() => {
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
  // }, []);

  const data = [
    {
      title: "Stock Price",
      value: "242.72 USD",
      interval: "Last 30 days",
      trend: "up",
      data: [
        200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360,
        340, 380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600,
        880, 920,
      ],
    },
    {
      title: "Exchange",
      value: "NASDAQ (America/NY)",
      interval: "Last 30 days",
      trend: "",
      data: [
        1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840,
        600, 820, 780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400,
        360, 300, 220,
      ],
    },
    {
      title: "Rolling Period Change",
      value: "123.123",
      interval: "Last 30 days",
      trend: "neutral",
      data: [
        500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620,
        510, 530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430,
        520, 510,
      ],
    },
    {
      title: "Average Volume",
      value: "83571571",
      interval: "Last 30 days",
      trend: "down",
      data: [
        500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620,
        510, 530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430,
        520, 510,
      ],
    },
  ];

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
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        {selectedStockGlobal &&
        selectedStockGlobal.ticker &&
        selectedStockGlobal.name
          ? `${selectedStockGlobal.ticker} (${selectedStockGlobal.name})`
          : "Loading..."}
      </Typography>

      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        {/* <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid> */}
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TradingVolume />
        </Grid>
      </Grid>
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
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
