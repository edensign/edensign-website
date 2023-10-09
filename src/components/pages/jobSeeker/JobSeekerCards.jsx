import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { Box, Chip, Grid, Rating, Card, CardContent, CardActions, Button, Divider } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import BlurOnIcon from '@mui/icons-material/BlurOn';
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
import customer from "../../assets/customer-resiz.jpg";

const ENV = import.meta.env;

const JobSeekerCards = ({ skills, selectedSkill, selectedGender, selectedExperience }) => {

    const [jobSeekerDetail, setjobSeekerDetail] = useState({
        listData: [],
        loading: false,
        page: 0,
        totalResults: 0
    });

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);


    useEffect(() => {
        API.JobSeekerAPI.getJobSeekerDetail(jobSeekerDetail.page, ENV.VITE_JOB_SEEKER_SIZE, selectedSkill, selectedGender, selectedExperience)
            .then(response => {
                if (response.status === "Success") {
                    if (response.data) {
                        response.data.forEach(resp => {
                            resp.skills = getSkillsByName(resp.skills);
                        })
                    }
                    setjobSeekerDetail({
                        ...jobSeekerDetail,
                        listData: response.data,
                        totalResults: response.data[0].result_count
                    });
                    console.log("Job detail response=>", response.data);
                } else {
                    setjobSeekerDetail({ listData: [], loading: false });
                }
            })
            .catch(error => {
                setjobSeekerDetail({ listData: [], loading: false });
                throw error;
            });
    }, [skills, selectedSkill, selectedGender, selectedExperience]);



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


    function getSkillsByName(dataObj) {
        const objId = dataObj?.split(",");
        if (objId) {
            return skills.filter(skill => objId.includes(skill.id.toString()));
        }
    };

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
        console.log("more data", jobSeekerDetail.loading)
        setjobSeekerDetail({
            ...jobSeekerDetail,
            ...jobSeekerDetail.page + 1,
            loading: true
        });

        API.JobSeekerAPI.getJobSeekerDetail(jobSeekerDetail.page + 1, ENV.VITE_JOB_SEEKER_SIZE, selectedSkill, selectedGender, selectedExperience)
            .then(response => {
                if (response.status === "Success") {

                    if (response?.data) {
                        response.data.forEach(resp => {
                            resp.skills = getSkillsByName(resp.skills);
                        })
                        setjobSeekerDetail({
                            ...jobSeekerDetail,
                            listData: jobSeekerDetail.listData.concat(response.data),
                            loading: false
                        });
                        console.log("Job detail response=>", response.data);
                    }
                } else {
                    setjobSeekerDetail({ listData: [], loading: false });
                }
            })
            .catch(error => {
                setjobSeekerDetail({ listData: [], loading: false });
                throw error;
            });
    };
    console.log("jobList=>", jobSeekerDetail)


    return (

        <InfiniteScroll
            id="job-grid-container"
            dataLength={jobSeekerDetail?.listData?.length}
            next={fetchMoreData}
            hasMore={jobSeekerDetail?.listData?.length !== jobSeekerDetail?.totalResults}
            loader={jobSeekerDetail.loading ? <Loader /> : null}
        >
            <Box margin="30px 20px">
                <Grid container sx={{ minHeight: "100vh", width: "100%", marginLeft: "auto" }}>
                    {
                        jobSeekerDetail.listData.length ? jobSeekerDetail.listData.map((seeker, index) => (
                            <Grid item xs={12} md={6} lg={6} key={index} className={`job-grid-item`} sx={{
                                padding: "30px", opacity: "0", transform: "translateY(30px)", visibility: "visible",
                                WebkitBackfaceVisibility: "hidden", transition: "all 0.3s ease-in-out", height: "560px"
                            }}>
                                <Card sx={{
                                    width: "100%", height: "90%", display: "flex", color: "#ffffff", position: "relative",
                                    boxShadow: "4px 4px 9px #043927", borderRadius: "12px"
                                }}>
                                    <Box width="35%" backgroundColor="#1fa78f" display="flex" flexDirection="column" alignItems="flex-end" justifyContent="space-between">
                                        <h4 style={{ fontFamily: "Dancing Script, cursive", fontWeight: "600", fontSize: "28px", letterSpacing: "0.01em", textTransform: "capitalize", margin: "12px" }}>
                                            <BlurOnIcon sx={{ verticalAlign: "text-top", margin: "4px 2px", fontSize: "28px" }} />
                                            edensign.
                                        </h4>

                                        <div style={{ width: "74%" }}>
                                            <AppsIcon sx={{ fontSize: "28px", margin: "0 -5px -10.5px -2px" }} />
                                            <AppsIcon sx={{ fontSize: "28px", margin: "0 -5px -10.5px -1.3px" }} />
                                            <AppsIcon sx={{ fontSize: "28px", margin: "0 -5px -10.5px -1.3px" }} />
                                            <div style={{ marginTop: "-2px" }}>
                                                <AppsIcon sx={{ fontSize: "28px", margin: "0 -5px -10.5px -2px" }} />
                                                <AppsIcon sx={{ fontSize: "28px", margin: "0 -5px -10.5px -1.3px" }} />
                                                <AppsIcon sx={{ fontSize: "28px", margin: "0 -5px -10.5px -1.3px" }} />
                                            </div>
                                            <div style={{ marginTop: "-2px" }}>
                                                <AppsIcon sx={{ fontSize: "28px", margin: "0 -5px -10.5px -2px" }} />
                                                <AppsIcon sx={{ fontSize: "28px", margin: "0 -5px -10.5px -1.3px" }} />
                                                <AppsIcon sx={{ fontSize: "28px", margin: "0 -5px -10.5px -1.3px" }} />
                                            </div>
                                        </div>

                                        <Box width="100%">
                                            <p style={{ margin: "6px 0" }}>
                                                <EmailOutlinedIcon sx={{ verticalAlign: "bottom", margin: "0 8px 0 10px", fontSize: "14px" }} />
                                                <span style={{ fontWeight: "300", fontSize: "11px", letterSpacing: "0.05em" }}>
                                                    {seeker.email.toLowerCase()} </span>
                                            </p>
                                            <p style={{ margin: "6px 0" }}>
                                                <PermContactCalendarOutlinedIcon sx={{ verticalAlign: "bottom", margin: "0 8px 0 10px", fontSize: "14px" }} />
                                                <span style={{ fontWeight: "300", fontSize: "11px", letterSpacing: "0.05em" }}>
                                                    {seeker.contact_no} </span>
                                            </p>
                                            <p style={{ display: "flex", alignItems: "center", margin: "6px 0 12px 0" }}>
                                                <LocationOnOutlinedIcon sx={{ verticalAlign: "bottom", margin: "0 8px 0 10px", fontSize: "14px" }} />
                                                <span style={{ fontWeight: "300", fontSize: "11px", letterSpacing: "0.05em", textTransform: "capitalize" }}>
                                                    {`${seeker.street}  ${getCityByName(seeker.city)}`}<br />
                                                    <span style={{ margin: "0", fontWeight: "300", fontSize: "11px", letterSpacing: "0.05em", textTransform: "capitalize" }}>
                                                        {`${getStateByName(seeker.state)} - ${seeker.zipcode}`} </span>
                                                </span>
                                            </p>
                                        </Box>
                                    </Box>

                                    <Box width="65%" backgroundColor="#ffffff">
                                        <div style={{
                                            color: "rgb(207, 207, 207)", float: "right", position: "absolute",
                                            right: "-20px", top: "-4px"
                                        }}>
                                            <AppsIcon sx={{ fontSize: "28px", margin: "0 -5px -10.5px -2px" }} />
                                            <AppsIcon sx={{ fontSize: "28px", margin: "0 -5px -10.5px -1.3px" }} />
                                            <AppsIcon sx={{ fontSize: "28px", margin: "0 -5px -10.5px -1.3px" }} />
                                            <div style={{ marginTop: "-2px" }}>
                                                <AppsIcon sx={{ fontSize: "28px", margin: "0 -5px -10.5px -2px" }} />
                                                <AppsIcon sx={{ fontSize: "28px", margin: "0 -5px -10.5px -1.3px" }} />
                                                <AppsIcon sx={{ fontSize: "28px", margin: "0 -5px -10.5px -1.3px" }} />
                                            </div>
                                        </div>

                                        <div style={{
                                            height: "60%", width: "78%", display: "flex", alignItems: "center",
                                            position: "absolute", top: "17%", left: "18.6%"
                                        }}>
                                            <div style={{ height: "100%", width: "180px" }}>
                                                <img src={customer} title="I LOVE EDensiGN" alt="Not Found"
                                                    style={{ height: "100%", width: "100%", objectFit: "cover", borderRadius: "12px" }}
                                                />
                                            </div>
                                            <h4 style={{ color: "#1fa78f", width: "56%", fontWeight: "600", fontSize: "22px", letterSpacing: "0.15em", textTransform: "capitalize", margin: "12px" }}>
                                                I am <br /> <span style={{ color: "#5b6579" }}>{seeker.name}</span>
                                                <p style={{ margin: "6px 0", fontWeight: "300", fontSize: "12px", letterSpacing: "0.05em", textTransform: "capitalize" }}>
                                                    {`${seeker.age} years - ${seeker.gender.charAt(0).toUpperCase() + seeker.gender.slice(1)}`} </p>
                                                <p style={{ color: "#000000", fontWeight: "300", fontSize: "11px", letterSpacing: "0.05em", textTransform: "capitalize" }}>
                                                    {seeker.description} </p>
                                                <Button variant='contained' onClick={() => downloadResumeFromAzure(seeker.resume)}
                                                    sx={{
                                                        fontFamily: "Inter, sans-serif", backgroundColor: "#1fa78f",
                                                        "&:hover": { backgroundColor: "#5b6579" }
                                                    }}
                                                >
                                                    Download CV
                                                    <span style={{ paddingLeft: "10px" }}>
                                                        <ArticleOutlinedIcon sx={{
                                                            fontSize: "16px", verticalAlign: "text-top", filter: "drop-shadow(2px 4px 6px rgba(31, 167, 143, 0.5))"
                                                        }} />
                                                        <FileDownloadIcon sx={{
                                                            fontSize: "11px", position: "absolute", right: "15px", bottom: "4px"
                                                        }} />
                                                    </span>
                                                </Button>
                                            </h4>
                                        </div>

                                        <div style={{
                                            height: "103px", border: "1px solid black", width: "65%", color: "black",
                                            position: "absolute", bottom: "0"
                                        }}>
                                            Skills: {seeker.skills.map((skill, index) => (
                                                <span
                                                    style={{ fontWeight: "300", fontSize: "12px", letterSpacing: "0.05em", textTransform: "capitalize", margin: 'auto 5px' }}
                                                    key={index} >{skill.name}</span>
                                            ))}
                                        </div>
                                    </Box>
                                </Card>
                            </Grid>
                        ))
                            : null
                    }
                </Grid>
            </Box>
        </InfiniteScroll >
    )
}

export default JobSeekerCards;
