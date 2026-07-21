/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import API from '../../../apis';
import { useToast } from '../../common/Toast';

import './InfiniteScroll.css';
import customer from '../../assets/customer-resiz.jpg';
import sadFaceImage from '../../assets/sad-face.svg';
import seekerAvatar1 from '../../assets/seeker-avatar-1.png';
import seekerAvatar2 from '../../assets/seeker-avatar-2.png';
import seekerAvatar3 from '../../assets/seeker-avatar-3.png';
import { BRAND_COMPACT } from '../../../brand.js';


const SEEKER_AVATARS = [seekerAvatar1, seekerAvatar2, seekerAvatar3];


const getSeekerAvatar = (seeker, index) => {
  const idNum = parseInt(seeker?.id, 10);
  const idx = !isNaN(idNum) ? Math.abs(idNum) % SEEKER_AVATARS.length : (typeof index === 'number' ? Math.abs(index) % SEEKER_AVATARS.length : 0);
  return SEEKER_AVATARS[idx];
};

const ENV = import.meta.env;

/* ── Skeleton ── */
const SeekCard_Skeleton = () => (
  <div style={{
    background: '#fff',
    borderRadius: '2rem',
    border: '1px solid rgba(26,21,18,0.05)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  }}>
    <div style={{ width: '100%', aspectRatio: '16/11', background: 'linear-gradient(90deg, #f0ebe6 25%, #e8e0d8 50%, #f0ebe6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite' }} />
    <div style={{ padding: '24px' }}>
      <div style={{ height: '18px', borderRadius: '6px', background: 'linear-gradient(90deg, #f0ebe6 25%, #e8e0d8 50%, #f0ebe6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite', marginBottom: '10px', width: '60%' }} />
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
    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: 'var(--es-charcoal)', margin: '0 0 8px 0' }}>
      No Profiles Found
    </h3>
    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--es-charcoal-60)', margin: 0, lineHeight: 1.7 }}>
      Try adjusting your filters to find more talent.
    </p>
  </motion.div>
);

/* ── Single seeker card ── */
const SeekerCard = ({ seeker, index, getCityByName, getStateByName }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleViewCV = (resume) => {
    if (!resume) {
      showToast("No CV uploaded for this profile.", "warning");
      return;
    }
    if (resume.startsWith('http://') || resume.startsWith('https://')) {
      window.open(resume, '_blank');
    } else {
      const s3Url = `https://salon-s3.s3.us-east-1.amazonaws.com/job-seeker/${resume}`;
      window.open(s3Url, '_blank');
    }
  };

  const exp = (seeker.experience || '').trim();
  const expLabel = !exp || exp === 'fresher' || exp === '0'
    ? "Fresher"
    : exp.startsWith('trainer:')
      ? `${exp.substring(8)}y · Trainer`
      : `${exp} Years Exp`;

  // Get primary skill from skills array
  const primarySkill = seeker.skills && seeker.skills.length > 0 ? seeker.skills[0].name : 'Artisan';

  // Resolve city
  const cityName = seeker.city ? getCityByName(seeker.city) : '';
  const stateName = seeker.state ? getStateByName(seeker.state) : '';
  const locationLabel = cityName ? `${cityName}${stateName ? ', ' + stateName : ''}` : 'India';

  // Photo
  const fallbackImg = getSeekerAvatar(seeker, index);
  const S3_BASE = 'https://salon-s3.s3.us-east-1.amazonaws.com';
  const hasImage = !!seeker.photo;
  const profileImg = hasImage
    ? (seeker.photo.startsWith('http') ? seeker.photo : `${S3_BASE}/job-seeker/photo/${seeker.photo}`)
    : fallbackImg;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.05, ease: 'easeOut' }}
      className="group es-seeker-card-premium"
      style={{
        borderRadius: '2rem',
        background: '#ffffff',
        border: '1px solid rgba(26,21,18,0.05)',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
        transition: 'all 0.4s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={() => navigate(`/job-seeker/${seeker.id}`)}
    >
      {/* Top Image area */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/11', overflow: 'hidden' }}>
        <img
          src={profileImg}
          onError={(e) => { e.currentTarget.src = fallbackImg; }}
          alt={seeker.name}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
          className="es-seeker-img"
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(26,21,18,0.85) 0%, rgba(26,21,18,0.1) 70%, transparent 100%)',
        }} />

        {/* Brand Label */}
        <span style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          background: 'rgba(251, 247, 242, 0.95)',
          backdropFilter: 'blur(8px)',
          borderRadius: '100px',
          padding: '4px 12px',
          color: 'var(--es-emerald)',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase'
        }}>
          {BRAND_COMPACT.toUpperCase()}
        </span>

        {/* Availability Badge */}
        {seeker.available !== false && (
          <span style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'var(--es-emerald)',
            color: 'var(--es-cream)',
            borderRadius: '100px',
            padding: '4px 12px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--es-cream)',
              animation: 'pulse-dot 1.2s infinite'
            }} className="es-pulse-dot" />
            Available
          </span>
        )}

        {/* Text Info over Image */}
        <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', color: '#ffffff' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.85 }}>
            {primarySkill}
          </div>
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '24px',
            fontWeight: 500,
            lineHeight: 1.2,
            margin: '4px 0 0 0',
            textTransform: 'capitalize'
          }}>
            {seeker.name}
          </h3>
          <div style={{ fontSize: '12px', opacity: 0.85, marginTop: '4px' }}>
            {seeker.age}y · <span style={{ textTransform: 'capitalize' }}>{seeker.gender}</span> · {expLabel}
          </div>
        </div>
      </div>

      {/* Card Body area */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          color: 'var(--es-charcoal-60)',
          lineHeight: '1.6',
          margin: 0,
          fontStyle: 'italic',
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          "{seeker.description || 'Passionate about beauty rituals and salon artistry.'}"
        </p>

        {/* Contact details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--es-charcoal-60)' }}>
            <EmailOutlinedIcon sx={{ fontSize: 16, color: 'var(--es-emerald)' }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{seeker.email?.toLowerCase()}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--es-charcoal-60)' }}>
            <LocationOnOutlinedIcon sx={{ fontSize: 16, color: 'var(--es-emerald)' }} />
            <span>{locationLabel}</span>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
          <button
            onClick={(e) => { e.stopPropagation(); handleViewCV(seeker.resume); }}
            style={{
              flex: 1,
              borderRadius: '12px',
              border: '1px solid rgba(15, 93, 78, 0.15)',
              background: '#ffffff',
              color: 'var(--es-charcoal)',
              padding: '10px 0',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            className="es-cv-btn-premium"
          >
            View CV
          </button>
          <button
            onClick={() => navigate(`/job-seeker/${seeker.id}`)}
            style={{
              flex: 1,
              borderRadius: '12px',
              background: 'var(--es-charcoal)',
              color: '#ffffff',
              border: 'none',
              padding: '10px 0',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            className="es-profile-btn-premium"
          >
            View Profile
          </button>
        </div>
      </div>
    </motion.article>
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
  const [selectedType, setSelectedType] = useState('all');
  const [selectedGenderState, setSelectedGenderState] = useState('all');

  useEffect(() => {
    setInitialLoading(true);
    API.JobSeekerAPI.getJobSeekerDetail(
      ENV.VITE_JOB_SEEKER_PAGE,
      ENV.VITE_JOB_SEEKER_SIZE,
      selectedSkill,
      selectedGenderState !== 'all' ? selectedGenderState : selectedGender,
      selectedExperience,
      searchQuery,
      selectedType
    )
      .then(response => {
        if (response?.status === 'Success' && Array.isArray(response?.data)) {
          response.data.forEach(resp => {
            resp.skills = getSkillsByName(resp.skills);
          });
          setjobSeekerDetail({
            listData: response.data,
            totalResults: response.data[0]?.result_count || response.data.length || 0,
            page: 0,
            loading: false
          });
        } else {
          setjobSeekerDetail({ listData: [], totalResults: 0, page: 0, loading: false });
        }
        setInitialLoading(false);
      })
      .catch(error => {
        console.error("JobSeeker detail fetch error:", error);
        setjobSeekerDetail({ listData: [], totalResults: 0, page: 0, loading: false });
        setInitialLoading(false);
      });
  }, [skills, selectedSkill, selectedGender, selectedExperience, searchQuery, refreshTrigger, selectedType, selectedGenderState]);

  useEffect(() => {
    API.StateAPI.getStates()
      .then(data => { if (data?.status === 'Success' && data?.data?.rows) setStates(data.data.rows); })
      .catch(err => { console.error("Error loading states:", err); });
  }, []);

  useEffect(() => {
    API.CityAPI.getCities()
      .then(data => { if (data?.status === 'Success' && data?.data?.rows) setCities(data.data.rows); })
      .catch(err => { console.error("Error loading cities:", err); });
  }, []);

  function getSkillsByName(dataObj) {
    if (!dataObj || !skills || !Array.isArray(skills)) return [];
    const objId = typeof dataObj === 'string' ? dataObj.split(',') : Array.isArray(dataObj) ? dataObj : [];
    return skills.filter(skill => objId.includes(skill.id.toString()));
  }

  const getCityByName = (id) => {
    if (!id || !cities) return '';
    return cities.find(city => id === city.id)?.name || '';
  };

  const getStateByName = (id) => {
    if (!id || !states) return '';
    return states.find(state => id === state.id)?.name || '';
  };

  const fetchMoreData = async () => {
    const nextPage = jobSeekerDetail.page + 1;
    setjobSeekerDetail(prev => ({ ...prev, page: nextPage, loading: true }));
    API.JobSeekerAPI.getJobSeekerDetail(
      nextPage,
      ENV.VITE_JOB_SEEKER_SIZE,
      selectedSkill,
      selectedGenderState !== 'all' ? selectedGenderState : selectedGender,
      selectedExperience,
      searchQuery,
      selectedType
    )
      .then(response => {
        if (response?.status === 'Success' && Array.isArray(response?.data)) {
          response.data.forEach(resp => { resp.skills = getSkillsByName(resp.skills); });
          setjobSeekerDetail(prev => ({
            ...prev,
            listData: prev.listData.concat(response.data),
            loading: false
          }));
        } else {
          setjobSeekerDetail(prev => ({ ...prev, loading: false }));
        }
      })
      .catch(error => {
        console.error("Error fetching more job seekers:", error);
        setjobSeekerDetail(prev => ({ ...prev, loading: false }));
      });
  };

  return (
    <>
      <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }
        .es-seeker-card-premium:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(15, 93, 78, 0.08) !important;
          border-color: rgba(15, 93, 78, 0.15) !important;
        }
        .es-seeker-card-premium:hover .es-seeker-img {
          transform: scale(1.05);
        }
        .es-cv-btn-premium:hover {
          border-color: rgba(15, 93, 78, 0.3) !important;
          background: rgba(15, 93, 78, 0.02) !important;
        }
        .es-profile-btn-premium:hover {
          background: var(--es-emerald) !important;
        }
      `}</style>

      <section style={{ background: 'transparent', padding: '60px 5% 100px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}
        >
          <div>
            <span className="font-label-caps" style={{ fontSize: '11px', color: 'var(--es-emerald)', display: 'block', marginBottom: '8px' }}>
              Talent Pool
            </span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 600, color: 'var(--es-charcoal)', margin: 0, lineHeight: 1.15 }}>
              Discover <span style={{ fontStyle: 'italic', fontWeight: '400' }}>Talent</span>
            </h2>
          </div>
          {!initialLoading && jobSeekerDetail.listData?.length > 0 && (
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: 'var(--es-charcoal)', background: '#ffffff', border: '1px solid rgba(15, 93, 78, 0.15)', padding: '8px 20px', borderRadius: '100px' }}>
              {jobSeekerDetail.totalResults} profiles found
            </span>
          )}
        </motion.div>

        {/* Modern Premium Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            background: '#ffffff',
            border: '1px solid rgba(15, 93, 78, 0.15)',
            borderRadius: '12px',
            padding: '20px 24px',
            marginBottom: '32px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 15px 40px rgba(15, 93, 78, 0.05)',
          }}
        >
          {/* Left: Filter groups */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
            {/* Filter by Profile Type */}
            <div>
              <span className="font-label-caps" style={{
                fontSize: '10px',
                color: 'var(--es-charcoal-60)',
                opacity: 0.7,
                display: 'block',
                marginBottom: '8px'
              }}>Profile Type</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['all', 'fresher', 'experience', 'trainer'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      padding: '8px 16px',
                      borderRadius: '100px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      border: selectedType === type ? '1px solid transparent' : '1px solid rgba(15, 93, 78, 0.15)',
                      background: selectedType === type ? 'linear-gradient(135deg, var(--es-emerald) 0%, var(--es-emerald-soft) 100%)' : '#ffffff',
                      color: selectedType === type ? '#ffffff' : 'var(--es-charcoal)',
                      boxShadow: selectedType === type ? '0 4px 12px rgba(15, 93, 78, 0.15)' : 'none',
                    }}
                  >
                    {type === 'all' ? 'All Types' : type === 'experience' ? 'Experienced' : type}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Gender */}
            <div>
              <span className="font-label-caps" style={{
                fontSize: '10px',
                color: 'var(--es-charcoal-60)',
                opacity: 0.7,
                display: 'block',
                marginBottom: '8px'
              }}>Gender</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['all', 'male', 'female', 'other'].map((gen) => (
                  <button
                    key={gen}
                    onClick={() => setSelectedGenderState(gen)}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      padding: '8px 16px',
                      borderRadius: '100px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      border: selectedGenderState === gen ? '1px solid transparent' : '1px solid rgba(15, 93, 78, 0.15)',
                      background: selectedGenderState === gen ? 'linear-gradient(135deg, var(--es-emerald) 0%, var(--es-emerald-soft) 100%)' : '#ffffff',
                      color: selectedGenderState === gen ? '#ffffff' : 'var(--es-charcoal)',
                      boxShadow: selectedGenderState === gen ? '0 4px 12px rgba(15, 93, 78, 0.15)' : 'none',
                    }}
                  >
                    {gen === 'all' ? 'All Genders' : gen}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Reset Button */}
          {(selectedType !== 'all' || selectedGenderState !== 'all') && (
            <button
              onClick={() => {
                setSelectedType('all');
                setSelectedGenderState('all');
              }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: '#ff4d4d',
                background: 'rgba(255, 77, 77, 0.08)',
                border: '1px solid rgba(255, 77, 77, 0.2)',
                borderRadius: '100px',
                padding: '10px 20px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 77, 77, 0.15)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 77, 77, 0.08)' }}
            >
              Clear Filters
            </button>
          )}
        </motion.div>

        {/* Cards */}
        {initialLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }} className="es-seeker-grid">
            {Array.from({ length: 6 }, (_, i) => <SeekCard_Skeleton key={i} />)}
          </div>
        ) : jobSeekerDetail.listData?.length === 0 ? (
          <EmptyState />
        ) : (
          <InfiniteScroll
            id="job-grid-container"
            dataLength={jobSeekerDetail?.listData?.length}
            next={fetchMoreData}
            loader={jobSeekerDetail.loading ? <SeekCard_Skeleton /> : null}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }} className="es-seeker-grid">
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
