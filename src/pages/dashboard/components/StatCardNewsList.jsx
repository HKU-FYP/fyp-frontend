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

function StatCardNewsList({id, source, title, analysis, link}) {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Card variant="outlined" sx={{height: "100%", flexGrow: 1}}>
            <CardContent>
                <Typography component="h4" variant="subtitle1" gutterBottom>
                    {source}
                </Typography>

                <Stack
                    direction="column"
                    sx={{justifyContent: "space-between", flexGrow: "1", gap: 1}}
                >
                    <Stack sx={{justifyContent: "space-between"}}>
                        <Stack
                            direction="row"
                            sx={{justifyContent: "space-between", alignItems: "center"}}
                        >
                            <Typography variant="h5" component="p">
                                {title}
                            </Typography>
                            {/*<Button variant="outlined" onClick={() => navigate(`/dashboard/news/${id}`)}>See Details</Button>*/}
                        </Stack>
                    </Stack>
                    <Typography variant={"subtitle2"} component={"p"}>
                        {analysis}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" spacing={2}>
                        <Link href={link}>Link to original news</Link>
                        <Button variant="outlined" onClick={() => navigate(`/dashboard/news/${id}`)}>See Details</Button>
                    </Stack>
                    {/*<Link href={link}>Link to original news</Link>*/}
                    {/*<Button variant="outlined" onClick={() => navigate(`/dashboard/news/${id}`)}>See Details</Button>*/}
                </Stack>
            </CardContent>
        </Card>
    );
}

StatCardNewsList.propTypes = {
    id: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    percentChange: PropTypes.string,
    link: PropTypes.string
};

export default StatCardNewsList;
