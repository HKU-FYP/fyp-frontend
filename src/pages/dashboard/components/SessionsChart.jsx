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

function SessionsChart({ stock_history }) {
  const theme = useTheme();

  // Extract dates and close prices from stock history
  // const xAxisData = stock_history.map((entry) => entry.datetime);
  const xAxisData = stock_history.map((entry) => {
    const date = new Date(entry.datetime);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });
  const yAxisData = stock_history.map((entry) => entry.close);

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
              Stock Price History
            </Typography>
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Stock prices from {startDate} to {endDate}
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
              min: Math.min(...yAxisData) - 5, // Add margin below min value
            },
          ]}
          series={[
            {
              id: "stock_close",
              label: "Closing Price",
              showMark: false,
              curve: "linear",
              stack: "total",
              area: true,
              stackOrder: "ascending",
              data: yAxisData.reverse(), // Reverse to align with x-axis
            },
          ]}
          height={420}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            "& .MuiAreaElement-series-stock_close": {
              fill: "url('#stock_close')",
            },
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        >
          <AreaGradient color={theme.palette.primary.light} id="stock_close" />
        </LineChart>
      </CardContent>
    </Card>
  );
}

SessionsChart.propTypes = {
  stock_history: PropTypes.arrayOf(
    PropTypes.shape({
      datetime: PropTypes.string.isRequired,
      open: PropTypes.number.isRequired,
      high: PropTypes.number.isRequired,
      low: PropTypes.number.isRequired,
      close: PropTypes.number.isRequired,
      volume: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default SessionsChart;
