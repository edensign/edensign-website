import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { Box, Chip, Grid, Rating, Card, CardContent, CardActions, Button, Divider } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import InfiniteScroll from 'react-infinite-scroll-component';

import API from '../../../apis';
import Loader from "../../common/Loader";
import { downloadResumeFromAzure } from '../../azure/AzureStorageConnection';

import "./InfiniteScroll.css";

const ENV = import.meta.env;

const JobSeekerCards = ({ filterOpen, setFilterOpen }) => {

    const [jobSeekerList, setJobSeekerList] = useState({
        listData: [],
        loading: false,
        page: 0,
        totalResults: 0
    });

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        API.JobSeekerAPI.getJobSeekerList(jobSeekerList.page, ENV.VITE_JOB_SEEKER_SIZE)
            .then(response => {
                if (response.status === "Success") {
                    setJobSeekerList({
                        ...jobSeekerList,
                        listData: response.data,
                        totalResults: response.data[0].result_count
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


    useEffect(() => {
        const getAllStates = () => {
            API.StateAPI.getStates()
                .then(data => {
                    if (data?.status === 'Success') {
                        setStates(data.data.rows);
                    }
                })
                .catch(err => {
                    throw err;
                });
        }
        getAllStates();
    }, []);

    useEffect(() => {
        const getAllCities = () => {
            API.CityAPI.getCities()
                .then(data => {
                    if (data?.status === 'Success') {
                        setCities(data.data.rows);
                    }
                })
                .catch(err => {
                    throw err;
                });
        }
        getAllCities();
    }, []);


    const getCityByName = (id) => {
        let name;
        cities.filter(city => {
            if (id === city.id) {
                name = city.name;
            }
        });
        return name;
    };

    const getStateByName = (id) => {
        let name;
        states.filter(state => {
            if (id === state.id) {
                name = state.name;
            }
        });
        return name;
    };

    console.log(jobSeekerList);


    // Function to check if an element is in the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight + 260 || document.documentElement.clientHeight + 260) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Function to handle scroll event
    function onScroll() {
        const jobGridContainer = document.querySelector("#job-grid-container");
        const scroll = window.pageYOffset;

        if (jobGridContainer) {
            if (scroll > 80) {
                jobGridContainer.style.marginTop = "-150px";
            } else {
                jobGridContainer.style.marginTop = "150px";
            }
        }

        const items = document.querySelectorAll('.job-grid-item');
        items.forEach(item => {
            if (isElementInViewport(item)) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    };

    // Add a scroll event listener when the component mounts
    useEffect(() => {
        window.addEventListener('scroll', onScroll);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    // Call the onScroll function initially to handle items already in view
    // onScroll();


    //Infinite scroll involves using a combination of state management and event handling to load more data as the user scrolls down the page. 
    //& this is cleanly handled by infinite scroll library in react
    const fetchMoreData = async () => {
        console.log("more data", jobSeekerList.loading)
        setJobSeekerList({
            ...jobSeekerList,
            ...jobSeekerList.page + 1,
            loading: true
        });

        API.JobSeekerAPI.getJobSeekerList(jobSeekerList.page + 1, ENV.VITE_JOB_SEEKER_SIZE)
            .then(response => {
                if (response.status === "Success") {
                    setJobSeekerList({
                        ...jobSeekerList,
                        listData: jobSeekerList.listData.concat(response.data),
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
    };
    console.log("=>", jobSeekerList.loading)

    return (

        <InfiniteScroll
            id="job-grid-container"
            dataLength={jobSeekerList?.listData?.length}
            next={fetchMoreData}
            hasMore={jobSeekerList?.listData?.length !== jobSeekerList?.totalResults}
            loader={jobSeekerList.loading ? <Loader /> : null}
            // endMessage={<p style={{ textAlign: "center", fontSize: "13px", fontWeight: "600", lineHeight: "32px", letterSpacing: "1px", textTransform: "capitalize", marginBottom: "5%" }}> You Have Reached The End Of The Document..</p>}
        >
            <Box margin="30px 20px">
                <Grid container sx={{ minHeight: "100vh", width: "100%", marginLeft: "auto" }}>
                    {
                        jobSeekerList.listData.length ? jobSeekerList.listData.map((seeker, index) => (
                            <Grid item xs={6} md={6} lg={6} key={index} className={`job-grid-item`} sx={{
                                padding: "30px", opacity: "0", transform: "translateY(30px)", visibility: "visible",
                                WebkitBackfaceVisibility: "hidden", transition: "all 0.3s ease-in-out"
                            }}>
                                <Card sx={{ width: "100%", height: 380, boxShadow: "4px 4px 9px #043927" }}>
                                    <Box height="130px" width="100%" display="flex" alignItems="center" backgroundColor="hsl(0,0%,95%)">
                                        <img
                                            height="120"
                                            width="160"
                                            src=""
                                            title=""
                                            alt="Not Found"
                                        />
                                        <h4 style={{ fontWeight: "600", fontSize: "22px", letterSpacing: "0.2em", textTransform: "uppercase", margin: "12px" }}>
                                            {seeker.name}
                                            <p style={{ fontWeight: "300", fontSize: "12px", letterSpacing: "0.05em", textTransform: "capitalize" }}>
                                                {`${seeker.age} years - ${seeker.gender.charAt(0).toUpperCase()}`} </p>
                                        </h4>

                                        <Box sx={{ direction: "rtl", width: "48%" }}>
                                            <p>
                                                <EmailOutlinedIcon sx={{ verticalAlign: "bottom", margin: "0 12px", fontSize: "18px" }} />
                                                <span style={{ fontWeight: "300", fontSize: "12px", letterSpacing: "0.05em" }}>
                                                    {seeker.email.toLowerCase()} </span>
                                            </p>
                                            <p>
                                                <PermContactCalendarOutlinedIcon sx={{ verticalAlign: "bottom", margin: "0 12px", fontSize: "18px" }} />
                                                <span style={{ fontWeight: "300", fontSize: "12px", letterSpacing: "0.05em", textTransform: "capitalize" }}>
                                                    {seeker.contact_no} </span>
                                            </p>
                                            <p style={{ display: "flex", alignItems: "center" }}>
                                                <LocationOnOutlinedIcon sx={{ verticalAlign: "bottom", margin: "0 12px", fontSize: "18px" }} />
                                                <span style={{ fontWeight: "300", fontSize: "12px", letterSpacing: "0.05em", textTransform: "capitalize" }}>
                                                    {`${seeker.street}  ${getCityByName(seeker.city)}`}<br />
                                                    <span style={{ margin: "0", fontWeight: "300", fontSize: "12px", letterSpacing: "0.05em", textTransform: "capitalize" }}>
                                                        {`${getStateByName(seeker.state)} - ${seeker.zipcode}`} </span>
                                                </span>
                                            </p>
                                        </Box>
                                    </Box>
                                    <Divider />

                                    <CardContent>
                                        <CardActions sx={{ alignItems: "center" }}>
                                            <span style={{ marginRight: "30px" }}>
                                                <SchoolOutlinedIcon sx={{ verticalAlign: "bottom", margin: "0 12px", fontSize: "22px" }} />
                                                {seeker.qualification}
                                            </span>
                                            <span style={{ marginRight: "30px" }}>
                                                <WorkOutlineOutlinedIcon sx={{ verticalAlign: "bottom", margin: "0 12px", fontSize: "20px" }} />
                                                {seeker.experience}
                                            </span>
                                            <span style={{ width: "48%" }}>
                                                <article onClick={() => downloadResumeFromAzure(seeker.resume)} style={{
                                                    fontWeight: "400", fontSize: "13px", float: "right", color: seeker.gender.charAt(0).toUpperCase() === 'F' ? '#ff77ff' : "rgb(2, 136, 209)",
                                                    position: "relative", letterSpacing: "0.015em", textTransform: "capitalize", cursor: "pointer"
                                                }}>
                                                    <ArticleOutlinedIcon sx={{ fontSize: "26px", filter: seeker.gender.charAt(0).toUpperCase() === 'F' ? 'drop-shadow(2px 4px 6px rgba(255, 119, 255, 0.5)' : "drop-shadow(2px 4px 6px rgba(76, 206, 172, 0.5))" }} />
                                                    <FileDownloadIcon sx={{
                                                        fontSize: "16px", position: "absolute", left: "11px", bottom: "0", color: seeker.gender.charAt(0).toUpperCase() === 'F' ? '#ff77ff' : "rgb(76, 206, 172)"
                                                    }} />
                                                    <span style={{ verticalAlign: "super", marginLeft: "6px" }}>
                                                        Download Resume
                                                    </span>
                                                </article>
                                            </span>
                                        </CardActions>
                                        <p style={{ width: "60%", marginLeft: "12px", marginTop: "22px", fontWeight: "500", fontSize: "13px", lineHeight: "20px", letterSpacing: "0.015em", textTransform: "capitalize" }}>
                                            Skills: {seeker.skills}
                                        </p>
                                        <p style={{ width: "60%", marginLeft: "12px", fontWeight: "400", fontSize: "13px", lineHeight: "20px", letterSpacing: "0.015em" }}>
                                            Interested in Full Time Jobs , Work Abroad with Any Shift, Morning Shift, Evening Shift
                                        </p>
                                    </CardContent>
                                    <Divider />

                                    <Box sx={{ display: "flex", justifyContent: "space-between", backgroundColor: seeker.gender.charAt(0).toUpperCase() === 'F' ? 'rgba(255, 119, 255, 0.2)' : "rgba(76, 206, 172, 0.2)", padding: "16px" }}>
                                        <Button size="small"> <Rating name="read-only" defaultValue={5} /> </Button>
                                        <span style={{ fontWeight: "300", fontSize: "14px", lineHeight: "22px", letterSpacing: "0.1em", textAlign: "center", padding: "0 30px" }}>1 value</span>
                                        <Link to={``} rel='noreferrer' style={{ textDecoration: "none", color: seeker.gender.charAt(0).toUpperCase() === 'F' ? 'rgb(255, 119, 255)' : "rgb(76, 206, 172)" }}>
                                            Know More
                                        </Link>
                                    </Box>
                                </Card>
                            </Grid>
                        ))
                            : null
                    }
                </Grid>
            </Box>
        </InfiniteScroll>
    )
}

export default JobSeekerCards;
