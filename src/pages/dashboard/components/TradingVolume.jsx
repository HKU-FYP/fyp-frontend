import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default function TradingVolume({ stock_history }) {
  const theme = useTheme();

  // Extract dates and trading volumes from stock history
  const xAxisData = stock_history.map((entry) => {
    const date = new Date(entry.datetime);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });
  const yAxisData = stock_history.map((entry) =>
    (entry.volume / 1000).toFixed(1)
  );

  // Determine start and end dates for x-axis
  const startDate = xAxisData[xAxisData.length - 1]; // Oldest date
  const endDate = xAxisData[0]; // Most recent date

  const colorPalette = [theme.palette.primary.light];

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Stack sx={{ justifyContent: "space-between" }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h6" component="p">
              Trading Volume
            </Typography>
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Trading volume from {startDate} to {endDate} (in 1,000)
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: "point",
              data: xAxisData.reverse(), // Reverse to show oldest first
              tickInterval: (index, i) => (i + 1) % 5 === 0,
            },
          ]}
          yAxis={[
            {
              min: Math.min(...yAxisData) * 0.9, // Add margin below min value
            },
          ]}
          // yAxis={[
          //   {
          //     min: Math.min(...yAxisData) * 0.9,
          //     tickFormatter: (value) => `${(value / 1000).toFixed(1)}k`, // Format as '10.5k'
          //   },
          // ]}
          series={[
            {
              id: "trading_volume",
              label: "Volume",
              showMark: false,
              curve: "linear",
              stack: "total",
              area: true,
              stackOrder: "ascending",
              data: yAxisData.reverse(), // Reverse to align with x-axis
            },
          ]}
          height={170}
          margin={{ left: 60, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            "& .MuiAreaElement-series-trading_volume": {
              fill: "url('#trading_volume')",
            },
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        >
          <AreaGradient
            color={theme.palette.primary.light}
            id="trading_volume"
          />
        </LineChart>
      </CardContent>
    </Card>
  );
}

TradingVolume.propTypes = {
  stock_history: PropTypes.arrayOf(
    PropTypes.shape({
      datetime: PropTypes.string.isRequired,
      open: PropTypes.number,
      high: PropTypes.number,
      low: PropTypes.number,
      close: PropTypes.number,
      volume: PropTypes.number.isRequired,
    })
  ).isRequired,
};
