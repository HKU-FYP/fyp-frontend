import { useEffect, useState, useContext } from "react";
import { Autocomplete, TextField, Button, Box, Chip } from "@mui/material";
import axios from "axios";
import { GlobalContext } from "../../GlobalContext";
import { getAuthHeaders } from "../../util/authUtils";
import { useGlobalAlert } from "../../GlobalAlertManager";
import { useNavigate } from "react-router-dom";
// import Card from "../../components/Card";
// import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "750px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  justifyContent: "center", // Center vertically
  alignItems: "center", // Center horizontally
  marginTop: "-100px", // Moves the component up by 50 pixels
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

function StockInput() {
  const [stocks, setStocks] = useState([]);
  const [selectedStocksLocal, setSelectedStocksLocal] = useState([]);
  const { selectedStockGlobal, setSelectedStockGlobal } = useContext(GlobalContext);
  const showAlert = useGlobalAlert();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8888/api/v1/all-stock-ticker-info", {
        headers: getAuthHeaders(),
      })
      .then((resp) => {
        setStocks(resp.data.stocks || []);
        showAlert("Stocks loaded successfully", "success");
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Handle submit button click
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStocksLocal.length === 0) {
      showAlert("Please select at least one stock", "error");
      return;
    }

    axios
      .post(
        `http://localhost:8888/api/v1/users/stock`,
        {
          stock_info_id: selectedStocksLocal.map(stock => stock.id),
        },
        {
          headers: getAuthHeaders(),
        }
      )
      .then((response) => {
        showAlert("Stocks saved successfully!", "success");
        setSelectedStockGlobal(selectedStocksLocal[0]);
        setTimeout(() => navigate("/dashboard"), 1000);
      })
      .catch((error) => {
        showAlert(error.response.data.detail, "error");
      });
  };

  const handleStockRemove = (stockToRemove) => {
    setSelectedStocksLocal(selectedStocksLocal.filter((stock) => stock.id !== stockToRemove.id));
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <SignUpContainer>
        <Card>
          <Typography variant="h2" gutterBottom>
            Enter stocks you wish to track!
          </Typography>
          
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Autocomplete
              options={stocks.filter(
                (stock) => !selectedStocksLocal.some((selected) => selected.id === stock.id)
              )}
              getOptionLabel={(option) => `${option.ticker} (${option.name})`}
              onChange={(_, stock) => {
                if (stock) {
                  setSelectedStocksLocal([...selectedStocksLocal, stock]);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Stock Tickers"
                  variant="outlined"
                  placeholder="Type to search..."
                />
              )}
              value={null}
              clearOnBlur
              blurOnSelect
            />

            {selectedStocksLocal.length > 0 && (
              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Selected Stocks:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {selectedStocksLocal.map((stock) => (
                    <Chip
                      size="medium"
                      sx={{
                        backgroundColor: '#1c4e06',
                      }}
                      key={stock.id}
                      label={`${stock.ticker} (${stock.name})`}
                      onDelete={() => handleStockRemove(stock)}
                      color="primary"
                    />
                  ))}
                </Box>
              </Box>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={selectedStocksLocal.length === 0}
            >
              Confirm
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );

  //   return (
  //     <Card variant="outlined">
  //       <Box
  //         sx={{ width: 500, margin: "0 auto", textAlign: "center", padding: 2 }}
  //       >
  //         <Autocomplete
  //           options={stocks}
  //           getOptionLabel={(option) => `${option.ticker} (${option.name})`}
  //           onChange={(event, value) => setSelectedStockLocal(value)}
  //           renderOption={(props, option) => (
  //             <li {...props} key={option.id}>
  //               {option.ticker} ({option.name})
  //             </li>
  //           )}
  //           renderInput={(params) => (
  //             <TextField
  //               {...params}
  //               label="Select Stock Ticker"
  //               variant="outlined"
  //             />
  //           )}
  //           filterSelectedOptions
  //           isOptionEqualToValue={(option, value) =>
  //             option.ticker === value.ticker
  //           }
  //         />
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           onClick={handleSubmit}
  //           sx={{ marginTop: 2 }}
  //         >
  //           Submit
  //         </Button>
  //       </Box>
  //     </Card>
  //   );
}

export default StockInput;
