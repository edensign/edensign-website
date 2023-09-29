import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { Box, Chip, Grid, Rating, Card, CardContent, CardActions, Button, Divider } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import StarIcon from '@mui/icons-material/Star';
import InfiniteScroll from 'react-infinite-scroll-component';

import API from '../../../apis';
import { downloadResumeFromAzure } from '../../azure/AzureStorageConnection';

// l380- epson printer- blinking lights - how to reset it
{/* <InfiniteScroll
    dataLength={this.state.articles.length}
    next={this.fetchMoreData}
    hasMore={this.state.articles.length !== this.state.totalResults}
    loader={<Spinner />}
    endMessage={<p style={{ textAlign: 'center', }}><b> You Have Reached The End Of The Document..</b></p>}
></InfiniteScroll> */}


const JobSeekerCards = () => {

    const [jobSeekerList, setJobSeekerList] = useState({
        listData: [],
        loading: true,
        page: 1,
        totalResults: 0
    });

    // const [page, setPage] = useState(1);
    // const [totalResults, setTotalResults] = useState(0);
    const ENV = import.meta.env;

    useEffect(() => {
        API.JobSeekerAPI.getJobSeekerList()
            .then(response => {
                if (response.status === "Success") {
                    setJobSeekerList({
                        ...jobSeekerList,
                        listData: response.data.rows,
                        loading: false
                    });
                    console.log("Job detail response=>", response.data);
                } else {
                    setJobSeekerList({ listData: [], loading: false });
                }
            })
            .catch(error => {
                setJobSeekerList({ listData: [], loading: false });
                throw error;
            });
    }, []);
    console.log(jobSeekerList)


    //   fetchMoreData = async () => {
    //     let nextPage = `https://newsapi.org/v2/top-headlines?country=${this.coun}&category=${this.props.cat}&apiKey=${this.apiKey}&page=${this.state.page + 1}`;
    //     this.setState({ page: this.state.page + 1, });

    //     let response = await fetch(nextPage);
    //     let data = await response.json();

    //     this.setState({
    //       articles: this.state.articles.concat(data.articles),
    //       totalResults: data.totalResults,
    //     })
    //   }


    return (
        <div margin="30px 20px">
            <Grid container sx={{ minHeight: "100vh", width: "100%", marginLeft: "auto" }}>
                {
                    jobSeekerList.listData.length ? jobSeekerList.listData.map((seeker, index) => (
                        <Grid item xs={6} md={6} lg={6} key={index} sx={{ padding: "50px" }}>
                            <Card sx={{ width: "100%", height: 520, boxShadow: "4px 4px 9px #043927" }}>
                                <div height="120px" display="flex" alignItems="center" backgroundColor="hsl(0,0%,95%)">
                                    <img
                                        src=""
                                        title=""
                                        alt="Not Found"
                                    />
                                    <h4 style={{ fontWeight: "600", fontSize: "22px", letterSpacing: "0.2em", textTransform: "uppercase", margin: "12px 22px" }}>
                                        {seeker.name}
                                        <span style={{ fontWeight: "300", fontSize: "12px", letterSpacing: "0.05em", textTransform: "capitalize" }}> {seeker.age + "years"} </span>
                                        <p style={{ fontWeight: "300", fontSize: "12px", letterSpacing: "0.05em", textTransform: "capitalize" }}> {"from " + seeker.street + "," + seeker.city} </p>
                                    </h4>
                                </div>
                                <Divider fullWidth />

                                <CardContent>
                                    <CardActions sx={{ alignItems: "center" }}>
                                        <Button type="button" variant='outlined' color='info'>
                                            email
                                        </Button>
                                        <Button type="button" variant='outlined' color='info'>
                                            contact number
                                        </Button>
                                        <span style={{ width: "50%" }}>
                                            <article onClick={() => downloadResumeFromAzure(seeker.resume)} style={{
                                                fontWeight: "400", fontSize: "13px", float: "right", color: "rgb(2, 136, 209)",
                                                position: "relative", letterSpacing: "0.015em", textTransform: "capitalize", cursor: "pointer"
                                            }}>

                                                {/* <a href={`${pathToFile}${seeker.resume}`} download="topaa.docx" target='_blank'> */}
                                                <ArticleOutlinedIcon sx={{ fontSize: "32px", filter: "drop-shadow(2px 4px 6px rgba(76, 206, 172, 0.5))" }} />
                                                <FileDownloadIcon sx={{
                                                    fontSize: "22px", position: "absolute", left: "11px", bottom: "0", color: "rgb(76, 206, 172)"
                                                }} />
                                                <span style={{ verticalAlign: "super", marginLeft: "6px" }}>
                                                    Download Resume
                                                </span>

                                            </article>
                                        </span>
                                    </CardActions>

                                    <CardActions sx={{ alignItems: "center" }}>
                                        <span style={{ marginRight: "30px" }}>
                                            <SchoolIcon sx={{ verticalAlign: "bottom", margin: "0 12px", fontSize: "22px" }} />
                                            {seeker.qualification}
                                        </span>
                                        <span style={{ marginRight: "30px" }}>
                                            <WorkIcon sx={{ verticalAlign: "bottom", margin: "0 12px", fontSize: "22px" }} />
                                            {seeker.experience}
                                        </span>
                                    </CardActions>

                                    <p style={{ width: "60%", marginLeft: "12px", fontWeight: "400", fontSize: "13px", lineHeight: "20px", letterSpacing: "0.015em" }}>
                                        Interested in Full Time Jobs , Work Abroad with Any Shift, Morning Shift, Evening Shift
                                    </p>
                                    <p style={{ width: "60%", marginLeft: "12px", marginTop: "22px", fontWeight: "400", fontSize: "13px", lineHeight: "20px", letterSpacing: "0.015em", textTransform: "capitalize" }}>
                                        Skills: {seeker.skills}
                                    </p>
                                    <p style={{ width: "60%", marginLeft: "12px", marginTop: "16px", fontWeight: "400", fontSize: "13px", lineHeight: "20px", letterSpacing: "0.015em", textTransform: "capitalize" }}>
                                        Hobbies: {seeker.hobbies}
                                    </p>

                                    <CardActions sx={{ justifyContent: "space-around" }}>
                                        <Button size="small"> <Rating name="read-only" defaultValue={5} /> </Button>
                                        <span style={{ fontWeight: "300", fontSize: "14px", lineHeight: "22px", letterSpacing: "0.1em", textAlign: "center", padding: "0 30px" }}>1 value</span>
                                        <Link to={``} rel='noreferrer' style={{ textDecoration: "none" }}>
                                            Know More
                                        </Link>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                        : null
                }
            </Grid>
        </div >
    )
}

export default JobSeekerCards;
