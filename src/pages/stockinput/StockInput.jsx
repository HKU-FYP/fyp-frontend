import { useEffect, useState, useContext } from "react";
import { Autocomplete, TextField, Button, Box } from "@mui/material";
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
  const [selectedStockLocal, setSelectedStockLocal] = useState(null);
  const { selectedStockGlobal, setSelectedStockGlobal } =
    useContext(GlobalContext);

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
    if (!selectedStockLocal) {
      alert("Please select a stock.");
      return;
    }

    axios
      .post(
        `http://localhost:8888/api/v1/users/stock`,
        {
          stock_info_id: selectedStockLocal.id,
        },
        {
          headers: getAuthHeaders(),
        }
      )
      .then((response) => {
        showAlert("Stock saved successfully!", "success");
        setSelectedStockGlobal(selectedStockLocal);
        setTimeout(() => navigate("/dashboard"), 1000);
      })
      .catch((error) => {
        showAlert(error.response.data.detail, "error");
      });
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              maxWidth: "800px",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
            }}
          >
            Enter stock you wish to track!
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Autocomplete
              options={stocks}
              getOptionLabel={(option) => `${option.ticker} (${option.name})`}
              onChange={(event, value) => setSelectedStockLocal(value)}
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  {option.ticker} ({option.name})
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Stock Ticker"
                  variant="outlined"
                />
              )}
              filterSelectedOptions
              isOptionEqualToValue={(option, value) =>
                option.ticker === value.ticker
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={(e) => handleSubmit(e)}
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
