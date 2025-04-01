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

function StatCardNewsList({id, source, title, analysis, link, sentiment, content, published_date}) {
    const theme = useTheme();
    const navigate = useNavigate();
    const formattedDate = new Date(published_date).toLocaleDateString('en-US');

    const sentimentColor = sentiment === "Positive" ? "success"
        : sentiment === "Negative" ? "error" : "warning";

    const trimmedSummary = content.length > 100 ? content.slice(0, 200) + "..." : content;

    return (
        <Card variant="outlined" sx={{height: "100%", flexGrow: 1, padding: "20px"}}>
            <CardContent>
                {/*<Typography component="h4" variant="subtitle1" gutterBottom>*/}
                {/*    {source}*/}
                {/*</Typography>*/}

                <Stack
                    direction="column"
                    sx={{justifyContent: "space-between", flexGrow: "1", gap: 1}}
                >
                    <Stack>
                        <Stack
                            direction="row"
                            sx={{justifyContent: "space-between", alignItems: "center"}}
                        >
                            <Typography variant="h5" component="p">
                                {title}
                            </Typography>
                        </Stack>

                        {/* date + Sentiment  */}
                        <Stack direction="row" justifyContent="space-between" spacing={0} sx={{ marginTop: "5px", marginBottom: "0px" }}>
                            <Typography variant="content" sx={{ color: "#666" }}>
                                Published on {formattedDate}
                            </Typography>
                            <Chip label={sentiment} color={sentimentColor} size="small" />
                        </Stack>

                        {/* Summary (100자 이하) */}
                        <Typography variant="body2" sx={{ color: "#333", marginTop: "5px"}}>
                            {trimmedSummary}
                        </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Link href={link}>Link to original news</Link>
                        <Button variant="outlined" onClick={() => navigate(`/dashboard/news/${id}`)}>See Details</Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

StatCardNewsList.propTypes = {
    id: PropTypes.number.isRequired,
    // source: PropTypes.string.isRequired, // news source
    title: PropTypes.string.isRequired,
    percentChange: PropTypes.string,
    link: PropTypes.string
};

export default StatCardNewsList;
