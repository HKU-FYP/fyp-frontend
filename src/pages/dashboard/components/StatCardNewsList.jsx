import * as React from "react";
import PropTypes from "prop-types";
import {useTheme} from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";

function StatCardNewsList({id, title, link, sentiment, published_date, highlight, one_sentence_summary, user_stock_id}) {
    const theme = useTheme();
    const navigate = useNavigate();
    const formattedDate = new Date(published_date).toLocaleString('en-US');
    // const highlight = sentiment === "Highly Positive" || sentiment === "Highly Negative";

    const sentimentColorMap = {
        "Highly Positive": { bg: "#1b5e20", text: "#ffffff" },
        "Positive":        { bg: "#4caf50", text: "#ffffff" },
        "Neutral":         { bg: "#e5cb74", text: "#000000" },
        "Negative":        { bg: "#ff9800", text: "#000000" },
        "Highly Negative": { bg: "#d32f2f", text: "#ffffff" },
    };
    const { bg, text } = sentimentColorMap[sentiment] || { bg: "#e0e0e0", text: "#000" };


    return (
        <Card variant="outlined"
              sx={{
                  height: "100%",
                  flexGrow: 1,
                  padding: "20px",
                  backgroundColor: highlight
                      ? (sentiment === "Highly Positive"
                          ? "#e8f5e9"
                          : sentiment === "Highly Negative"
                              ? "#ffebee"
                              : undefined)
                      : undefined
              }}>
            <CardContent>
                <Stack
                    direction="column"
                    sx={{justifyContent: "space-between", flexGrow: "1", gap: 1}}
                >
                    <Stack>
                        <Stack
                            direction="row"
                            sx={{justifyContent: "space-between", alignItems: "center"}}
                        >
                            <Typography variant="h6" component="p">
                                {title}
                            </Typography>
                        </Stack>

                        {/* date + Sentiment  */}
                        <Stack direction="row" justifyContent="space-between" spacing={0} sx={{ marginTop: "5px", marginBottom: "0px" }}>
                            <Typography variant="caption" sx={{ color: "#666" }}>
                                Published on {formattedDate}
                            </Typography>
                            <Chip
                                label={
                                    <span style={{ color: text, fontWeight: 500 }}>
                                  {sentiment}
                                </span>
                                }
                                size="small"
                                sx={{
                                    backgroundColor: bg,
                                }}
                            />
                        </Stack>
                        {/* Summary */}
                        <Typography variant="subtitle2" sx={{ color: "#333", marginTop: "5px"}}>
                            {one_sentence_summary}
                        </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center" marginTop="-5px" marginBottom="-5px">
                        <Link href={link}>Link to original news</Link>
                        <Button variant="outlined" onClick={() => navigate(`/dashboard/news/${user_stock_id}/${id}`)}>See Details</Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

StatCardNewsList.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    sentiment: PropTypes.string.isRequired,
    published_date: PropTypes.string.isRequired,
    highlight: PropTypes.bool,
    one_sentence_summary: PropTypes.string.isRequired,
    user_stock_id: PropTypes.number.isRequired
};

export default StatCardNewsList;
