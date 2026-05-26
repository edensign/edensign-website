/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import InfiniteScroll from 'react-infinite-scroll-component';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';

import API from '../../../apis';
import Loader from '../../common/Loader';
import { downloadResumeFromAzure } from '../../azure/AzureStorageConnection';

import './InfiniteScroll.css';
import customer from '../../assets/customer-resiz.jpg';
import sadFaceImage from '../../assets/sad-face.svg';

const ENV = import.meta.env;

/* ── Skeleton ── */
const SeekCard_Skeleton = () => (
  <div style={{
    background: '#fff',
    borderRadius: '20px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(26,10,0,0.06)',
    display: 'flex',
    gap: '20px',
    border: '1px solid rgba(199,149,108,0.08)',
    overflow: 'hidden',
  }}>
    <div style={{ width: 80, height: 80, borderRadius: '16px', background: 'linear-gradient(90deg, #f0ebe6 25%, #e8e0d8 50%, #f0ebe6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite', flexShrink: 0 }} />
    <div style={{ flex: 1 }}>
      <div style={{ height: '18px', borderRadius: '6px', background: 'linear-gradient(90deg, #f0ebe6 25%, #e8e0d8 50%, #f0ebe6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite', marginBottom: '10px', width: '60%' }} />
      <div style={{ height: '13px', borderRadius: '5px', background: 'linear-gradient(90deg, #f0ebe6 25%, #e8e0d8 50%, #f0ebe6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite', marginBottom: '8px', width: '40%' }} />
      <div style={{ height: '13px', borderRadius: '5px', background: 'linear-gradient(90deg, #f0ebe6 25%, #e8e0d8 50%, #f0ebe6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite', width: '80%' }} />
    </div>
  </div>
);

/* ── Empty State ── */
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    style={{
      gridColumn: '1 / -1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '80px 24px',
      textAlign: 'center',
    }}
  >
    <img src={sadFaceImage} style={{ width: 100, height: 100, marginBottom: '20px', opacity: 0.5 }} alt="No results" />
    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: '#1a0f08', margin: '0 0 8px 0' }}>
      No Profiles Found
    </h3>
    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#9a8070', margin: 0, lineHeight: 1.7 }}>
      Try adjusting your filters to find more talent.
    </p>
  </motion.div>
);

/* ── Single seeker card ── */
const SeekerCard = ({ seeker, index, getCityByName, getStateByName }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 2) * 0.1, ease: 'easeOut' }}
      style={{
        background: '#fff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(26,10,0,0.06)',
        border: '1px solid rgba(199,149,108,0.1)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
      className="es-seeker-card"
    >
      {/* Card top accent */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #c7956c, #a8724d)' }} />

      <div style={{ display: 'flex', gap: 0 }}>
        {/* Left sidebar */}
        <div style={{
          width: '200px',
          flexShrink: 0,
          background: 'linear-gradient(180deg, #1a0a00 0%, #3d1e0a 100%)',
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '20px',
        }} className="es-seeker-sidebar">
          {/* Brand tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ContentCutOutlinedIcon sx={{ fontSize: 14, color: '#c7956c' }} />
            <span style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              fontSize: '14px',
              color: '#c7956c',
              letterSpacing: '0.05em',
            }}>edensign.</span>
          </div>

          {/* Photo */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '2px solid rgba(199,149,108,0.5)',
            margin: '0 auto',
          }}>
            <img
              src={customer}
              alt={seeker.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <EmailOutlinedIcon sx={{ fontSize: 12, color: '#c7956c', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.65)', wordBreak: 'break-all', lineHeight: 1.4 }}>
                {seeker.email?.toLowerCase()}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PermContactCalendarOutlinedIcon sx={{ fontSize: 12, color: '#c7956c', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.65)' }}>
                {seeker.contact_no}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <LocationOnOutlinedIcon sx={{ fontSize: 12, color: '#c7956c', flexShrink: 0, mt: '2px' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, textTransform: 'capitalize' }}>
                {seeker.street}<br />
                {getCityByName(seeker.city)}, {getStateByName(seeker.state)}
              </span>
            </div>
          </div>
        </div>

        {/* Right content */}
        <div style={{ flex: 1, padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Name & info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
              <div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#c7956c', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Looking for opportunities
                </span>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#1a0f08',
                  margin: '4px 0 0 0',
                  textTransform: 'capitalize',
                  lineHeight: 1.2,
                }}>
                  {seeker.name}
                </h3>
              </div>
              {/* Age | Gender badge */}
              <span style={{
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(199,149,108,0.08)',
                border: '1px solid rgba(199,149,108,0.2)',
                borderRadius: '100px',
                padding: '4px 12px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                color: '#a8724d',
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}>
                <PersonOutlineOutlinedIcon sx={{ fontSize: 12 }} />
                {seeker.age}y · {seeker.gender?.charAt(0).toUpperCase() + seeker.gender?.slice(1)}
              </span>
            </div>

            {/* Description */}
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: '#6b5749',
              margin: '0 0 20px 0',
              lineHeight: 1.7,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {seeker.description}
            </p>

            {/* Skills */}
            {seeker.skills?.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#9a8070',
                  display: 'block',
                  marginBottom: '8px',
                }}>Skills</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {seeker.skills.map((skill, i) => (
                    <span key={i} style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      fontWeight: 500,
                      color: '#a8724d',
                      background: 'rgba(199,149,108,0.1)',
                      border: '1px solid rgba(199,149,108,0.2)',
                      borderRadius: '100px',
                      padding: '4px 12px',
                      textTransform: 'capitalize',
                    }}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(199,149,108,0.1)', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => downloadResumeFromAzure(seeker.resume)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #1a0a00, #3d1e0a)',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '11px 20px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.05em',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 12px rgba(26,10,0,0.2)',
              }}
              className="es-cv-btn"
            >
              <ArticleOutlinedIcon sx={{ fontSize: 15 }} />
              View CV
              <FileDownloadIcon sx={{ fontSize: 13, opacity: 0.7 }} />
            </button>

            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              color: '#9a8070',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              <WorkOutlineOutlinedIcon sx={{ fontSize: 14 }} />
              Available for hire
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Main component ── */
const JobSeekerCards = ({ skills, selectedSkill, selectedGender, selectedExperience, searchQuery, refreshTrigger }) => {
  const [jobSeekerDetail, setjobSeekerDetail] = useState({
    listData: [],
    loading: false,
    page: 0,
    totalResults: 0
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    setInitialLoading(true);
    API.JobSeekerAPI.getJobSeekerDetail(
      ENV.VITE_JOB_SEEKER_PAGE,
      ENV.VITE_JOB_SEEKER_SIZE,
      selectedSkill,
      selectedGender,
      selectedExperience,
      searchQuery
    )
      .then(response => {
        if (response.status === 'Success') {
          if (response.data) {
            response.data.forEach(resp => {
              resp.skills = getSkillsByName(resp.skills);
            });
          }
          setjobSeekerDetail({
            ...jobSeekerDetail,
            listData: response.data,
            totalResults: response.data[0]?.result_count || 0
          });
        } else {
          setjobSeekerDetail({ listData: [], loading: false });
        }
        setInitialLoading(false);
      })
      .catch(error => {
        setjobSeekerDetail({ listData: [], loading: false });
        setInitialLoading(false);
        throw error;
      });
  }, [skills, selectedSkill, selectedGender, selectedExperience, searchQuery, refreshTrigger]);

  useEffect(() => {
    API.StateAPI.getStates()
      .then(data => { if (data?.status === 'Success') setStates(data.data.rows); })
      .catch(err => { throw err; });
  }, []);

  useEffect(() => {
    API.CityAPI.getCities()
      .then(data => { if (data?.status === 'Success') setCities(data.data.rows); })
      .catch(err => { throw err; });
  }, []);

  function getSkillsByName(dataObj) {
    const objId = dataObj?.split(',');
    if (objId) return skills.filter(skill => objId.includes(skill.id.toString()));
  }

  const getCityByName = (id) => {
    return cities.find(city => id === city.id)?.name || '';
  };

  const getStateByName = (id) => {
    return states.find(state => id === state.id)?.name || '';
  };

  const fetchMoreData = async () => {
    const nextPage = jobSeekerDetail.page + 1;
    setjobSeekerDetail({ ...jobSeekerDetail, page: nextPage, loading: true });
    API.JobSeekerAPI.getJobSeekerDetail(
      nextPage,
      ENV.VITE_JOB_SEEKER_SIZE,
      selectedSkill,
      selectedGender,
      selectedExperience,
      searchQuery
    )
      .then(response => {
        if (response.status === 'Success' && response?.data) {
          response.data.forEach(resp => { resp.skills = getSkillsByName(resp.skills); });
          setjobSeekerDetail({
            ...jobSeekerDetail,
            listData: jobSeekerDetail.listData.concat(response.data),
            loading: false
          });
        } else {
          setjobSeekerDetail({ listData: [], loading: false });
        }
      })
      .catch(error => {
        setjobSeekerDetail({ listData: [], loading: false });
        throw error;
      });
  };

  return (
    <>
      <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .es-seeker-card:hover { box-shadow: 0 16px 48px rgba(26,10,0,0.12) !important; transform: translateY(-4px) !important; }
        .es-cv-btn:hover { transform: translateY(-1px) !important; box-shadow: 0 6px 20px rgba(26,10,0,0.3) !important; }
        @media (max-width: 640px) {
          .es-seeker-sidebar { width: 120px !important; padding: 16px 12px !important; }
          .es-seeker-card { flex-direction: column !important; }
        }
      `}</style>

      <section style={{ background: '#f8fafc', padding: '60px 5% 100px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}
        >
          <div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c7956c', display: 'block', marginBottom: '8px' }}>
              Talent Pool
            </span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#1a0f08', margin: 0, lineHeight: 1.15 }}>
              Discover <em style={{ fontStyle: 'italic', color: '#c7956c' }}>Talent</em>
            </h2>
          </div>
          {!initialLoading && jobSeekerDetail.listData?.length > 0 && (
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9a8070', background: '#fff', border: '1px solid rgba(199,149,108,0.2)', padding: '8px 20px', borderRadius: '100px' }}>
              {jobSeekerDetail.totalResults} profiles found
            </span>
          )}
        </motion.div>

        {/* Cards */}
        {initialLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(540px, 1fr))', gap: '20px' }} className="es-seeker-grid">
            {Array.from({ length: 4 }, (_, i) => <SeekCard_Skeleton key={i} />)}
          </div>
        ) : jobSeekerDetail.listData?.length === 0 ? (
          <EmptyState />
        ) : (
          <InfiniteScroll
            id="job-grid-container"
            dataLength={jobSeekerDetail?.listData?.length}
            next={fetchMoreData}
            hasMore={jobSeekerDetail?.listData?.length !== jobSeekerDetail?.totalResults}
            loader={jobSeekerDetail.loading ? <Loader /> : null}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(540px, 1fr))', gap: '20px' }} className="es-seeker-grid">
              {jobSeekerDetail.listData.map((seeker, index) => (
                <SeekerCard
                  key={index}
                  seeker={seeker}
                  index={index}
                  getCityByName={getCityByName}
                  getStateByName={getStateByName}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </section>
    </>
  );
};

export default JobSeekerCards;
