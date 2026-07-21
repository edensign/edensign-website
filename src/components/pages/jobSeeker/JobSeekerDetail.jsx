/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import API from '../../../apis';
import { JobSeekerDetailSkeleton } from '../../common/PageSkeletons';
import customer from '../../assets/customer-resiz.jpg';
import seekerAvatar1 from '../../assets/seeker-avatar-1.png';
import seekerAvatar2 from '../../assets/seeker-avatar-2.png';
import seekerAvatar3 from '../../assets/seeker-avatar-3.png';

const SEEKER_AVATARS = [seekerAvatar1, seekerAvatar2, seekerAvatar3];

const getSeekerAvatar = (seeker) => {
  const idNum = parseInt(seeker?.id, 10);
  const idx = !isNaN(idNum) ? Math.abs(idNum) % SEEKER_AVATARS.length : 0;
  return SEEKER_AVATARS[idx];
};

const JobSeekerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [seeker, setSeeker] = useState(null);
  const [address, setAddress] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch states, cities, and skills for resolving references
        const [statesData, citiesData, skillsData] = await Promise.all([
          API.StateAPI.getStates().catch(() => ({ status: 'Failed' })),
          API.CityAPI.getCities().catch(() => ({ status: 'Failed' })),
          API.SkillAPI.getAll(false, 0, 100).catch(() => ({ status: 'Failed' }))
        ]);

        const loadedStates = statesData?.status === 'Success' ? statesData.data.rows : [];
        const loadedCities = citiesData?.status === 'Success' ? citiesData.data.rows : [];
        const loadedSkills = skillsData?.status === 'Success' ? skillsData.data.rows : [];

        setStates(loadedStates);
        setCities(loadedCities);
        setSkills(loadedSkills);

        // Fetch Job Seeker details
        const seekerResponse = await API.JobSeekerAPI.getById(id);
        if (seekerResponse.status === 'Success' && seekerResponse.data) {
          const seekerData = seekerResponse.data;

          // Map skills
          if (seekerData.skills) {
            const skillIds = seekerData.skills.split(',');
            seekerData.skillsList = loadedSkills.filter(skill => skillIds.includes(skill.id.toString()));
          } else {
            seekerData.skillsList = [];
          }

          setSeeker(seekerData);
        }

        // Fetch Job Seeker address details
        const addressResponse = await API.JobSeekerAPI.getAddress(id);
        if (addressResponse.status === 'Success' && addressResponse.data) {
          setAddress(addressResponse.data);
        }
      } catch (error) {
        console.error('Error fetching job seeker details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getCityName = (cityId) => {
    return cities.find(c => cityId === c.id)?.name || '';
  };

  const getStateName = (stateId) => {
    return states.find(s => stateId === s.id)?.name || '';
  };

  if (loading) {
    return <JobSeekerDetailSkeleton />;
  }

  if (!seeker) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '24px' }}>
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', color: 'var(--es-charcoal)', marginBottom: '12px' }}>Profile Not Found</h3>
        <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--es-charcoal-60)', marginBottom: '24px' }}>The requested Job Seeker profile could not be retrieved.</p>
        <button
          onClick={() => navigate('/job-seeker')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, var(--es-emerald) 0%, var(--es-emerald-soft) 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '12px 24px',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          <ArrowBackOutlinedIcon /> Back to Job Seekers
        </button>
      </div>
    );
  }

  // Parse experience column
  const renderExperienceBadge = () => {
    const exp = (seeker.experience || '').trim();
    if (!exp || exp === 'fresher' || exp === '0') {
      return (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(74, 222, 128, 0.08)',
          border: '1px solid rgba(74, 222, 128, 0.2)',
          borderRadius: '100px',
          padding: '6px 16px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          color: '#16a34a',
          fontWeight: 600,
        }}>
          Fresher
        </span>
      );
    } else if (exp.startsWith('trainer:')) {
      const timeToTrain = exp.substring(8);
      return (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(147, 51, 234, 0.08)',
          border: '1px solid rgba(147, 51, 234, 0.2)',
          borderRadius: '100px',
          padding: '6px 16px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          color: '#7c3aed',
          fontWeight: 600,
        }}>
          Trainer ({timeToTrain})
        </span>
      );
    } else {
      return (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(59, 130, 246, 0.08)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: '100px',
          padding: '6px 16px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          color: '#2563eb',
          fontWeight: 600,
        }}>
          {exp} Years Experience
        </span>
      );
    }
  };

  const isPdf = seeker.resume && seeker.resume.toLowerCase().endsWith('.pdf');
  const s3Url = seeker.resume
    ? (seeker.resume.startsWith('http') ? seeker.resume : `https://salon-s3.s3.us-east-1.amazonaws.com/job-seeker/${seeker.resume}`)
    : null;

  return (
    <>
      <style>{`
        .es-back-btn:hover {
          transform: translateX(-4px);
          background: rgba(15, 93, 78, 0.05) !important;
        }
        .es-action-btn:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 24px rgba(15, 93, 78, 0.3) !important;
        }
        .es-detail-card {
          box-shadow: 0 4px 30px rgba(26,10,0,0.04);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .es-detail-card:hover {
          box-shadow: 0 12px 40px rgba(26,10,0,0.08);
        }
        @media (max-width: 960px) {
          .es-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={{ background: 'var(--es-cream)', minHeight: '100vh', padding: '40px 5% 100px' }}>
        {/* Navigation & Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto 32px' }}>
          <button
            onClick={() => navigate('/job-seeker')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              color: 'var(--es-emerald)',
              border: '1px solid rgba(15, 93, 78, 0.15)',
              borderRadius: '30px',
              padding: '8px 20px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            className="es-back-btn"
          >
            <ArrowBackOutlinedIcon sx={{ fontSize: 16 }} /> Back to Talent Pool
          </button>
        </div>

        {/* Profile Details Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}
          className="es-detail-grid"
        >
          {/* Left Column: Basic Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Main Profile Card */}
            <div
              style={{
                background: '#fff',
                borderRadius: '24px',
                padding: '40px 32px',
                border: '1px solid rgba(15,93,78,0.15)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
              }}
              className="es-detail-card"
            >
              {/* Profile Top Color Strip Accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '8px', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', background: 'linear-gradient(90deg, var(--es-charcoal), var(--es-emerald))' }} />

              {/* Profile Image */}
              {(() => {
                const fallbackImg = getSeekerAvatar(seeker);
                const S3_BASE = 'https://salon-s3.s3.us-east-1.amazonaws.com';
                const hasImage = !!seeker.photo;
                const profileImg = hasImage
                  ? (seeker.photo.startsWith('http') ? seeker.photo : `${S3_BASE}/job-seeker/photo/${seeker.photo}`)
                  : fallbackImg;

                return (
                  <div style={{
                    width: '140px',
                    height: '140px',
                    borderRadius: '28px',
                    overflow: 'hidden',
                    border: '3px solid rgba(15,93,78,0.3)',
                    boxShadow: '0 8px 24px rgba(26,10,0,0.1)',
                    marginBottom: '20px',
                    marginTop: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <img
                      src={profileImg}
                      onError={(e) => { e.currentTarget.src = fallbackImg; }}
                      alt={seeker.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                );
              })()}

              {/* Title & Name */}
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--es-emerald)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Job Seeker Profile
              </span>
              <h1 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '32px',
                fontWeight: 700,
                color: 'var(--es-charcoal)',
                margin: '8px 0',
                textTransform: 'capitalize',
                lineHeight: 1.2
              }}>
                {seeker.name}
              </h1>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: 'var(--es-charcoal-60)', margin: '0 0 20px 0', fontWeight: 500 }}>
                {seeker.designation || 'Salon Professional'}
              </p>

              {/* Badges */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {renderExperienceBadge()}
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(15,93,78,0.08)',
                  border: '1px solid rgba(15,93,78,0.15)',
                  borderRadius: '100px',
                  padding: '6px 16px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: 'var(--es-emerald-soft)',
                  fontWeight: 600,
                }}>
                  <PersonOutlineOutlinedIcon sx={{ fontSize: 14 }} />
                  {seeker.age} Years Old · {seeker.gender?.charAt(0).toUpperCase() + seeker.gender?.slice(1)}
                </span>
              </div>
            </div>

            {/* About Me Section */}
            <div
              style={{
                background: '#fff',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid rgba(15,93,78,0.15)',
              }}
              className="es-detail-card"
            >
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: 'var(--es-charcoal)', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BadgeOutlinedIcon sx={{ color: 'var(--es-emerald)' }} /> About Profile
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'var(--es-charcoal-60)', margin: 0, lineHeight: 1.8 }}>
                {seeker.description || "No description provided for this profile. Please contact the seeker directly to learn more about their qualifications."}
              </p>
            </div>

            {/* Skills & Extras */}
            <div
              style={{
                background: '#fff',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid rgba(15,93,78,0.15)',
              }}
              className="es-detail-card"
            >
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: 'var(--es-charcoal)', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <WorkOutlineOutlinedIcon sx={{ color: 'var(--es-emerald)' }} /> Professional Skills
              </h3>
              {seeker.skillsList && seeker.skillsList.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {seeker.skillsList.map((skill, index) => (
                    <span key={index} style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'var(--es-emerald-soft)',
                      background: 'rgba(15,93,78,0.06)',
                      border: '1px solid rgba(15, 93, 78, 0.15)',
                      borderRadius: '100px',
                      padding: '6px 16px',
                      textTransform: 'capitalize'
                    }}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--es-charcoal-60)', margin: 0 }}>No specific skills highlighted.</p>
              )}

              {/* Extra Details (Hobbies & Qualification & Previous Employer) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px', borderTop: '1px solid rgba(15,93,78,0.1)', paddingTop: '24px' }}>
                <div>
                  <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', color: 'var(--es-charcoal)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <SchoolOutlinedIcon sx={{ color: 'var(--es-emerald)', fontSize: 18 }} /> Qualification
                  </h4>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--es-charcoal-60)', margin: 0, textTransform: 'capitalize', fontWeight: 500 }}>
                    {seeker.qualification}
                  </p>
                </div>
                {seeker.previous_employer && (
                  <div>
                    <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', color: 'var(--es-charcoal)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <WorkOutlineOutlinedIcon sx={{ color: 'var(--es-emerald)', fontSize: 18 }} /> Prev Employer
                    </h4>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--es-charcoal-60)', margin: 0, textTransform: 'capitalize', fontWeight: 500 }}>
                      {seeker.previous_employer}
                    </p>
                  </div>
                )}
                {seeker.hobbies && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', color: 'var(--es-charcoal)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <SportsEsportsOutlinedIcon sx={{ color: 'var(--es-emerald)', fontSize: 18 }} /> Hobbies & Interests
                    </h4>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--es-charcoal-60)', margin: 0 }}>
                      {seeker.hobbies}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Contact & CV Document Viewer */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Contact Details Card */}
            <div
              style={{
                background: '#fff',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid rgba(15,93,78,0.15)',
              }}
              className="es-detail-card"
            >
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: 'var(--es-charcoal)', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <PersonOutlineOutlinedIcon sx={{ color: 'var(--es-emerald)' }} /> Contact Details
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(15,93,78,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <EmailOutlinedIcon sx={{ color: 'var(--es-emerald-soft)', fontSize: 20 }} />
                  </div>
                  <div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--es-charcoal-60)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</span>
                    <a href={`mailto:${seeker.email}`} style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--es-charcoal)', fontWeight: 600, textDecoration: 'none' }}>
                      {seeker.email?.toLowerCase()}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(15,93,78,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <PhoneOutlinedIcon sx={{ color: 'var(--es-emerald-soft)', fontSize: 20 }} />
                  </div>
                  <div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--es-charcoal-60)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</span>
                    <a href={`tel:${seeker.contact_no}`} style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--es-charcoal)', fontWeight: 600, textDecoration: 'none' }}>
                      {seeker.contact_no}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(15,93,78,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: '2px' }}>
                    <LocationOnOutlinedIcon sx={{ color: 'var(--es-emerald-soft)', fontSize: 20 }} />
                  </div>
                  <div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--es-charcoal-60)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--es-charcoal)', fontWeight: 600, lineHeight: 1.5, textTransform: 'capitalize' }}>
                      {seeker.street && `${seeker.street}, `}
                      {seeker.city ? getCityName(seeker.city) : ''}
                      {seeker.state ? `, ${getStateName(seeker.state)}` : ''}
                      {address && address.postal_code && ` - ${address.postal_code}`}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(15,93,78,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <WorkOutlineOutlinedIcon sx={{ color: 'var(--es-emerald-soft)', fontSize: 20 }} />
                  </div>
                  <div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--es-charcoal-60)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preferred Job Location</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--es-charcoal)', fontWeight: 600, lineHeight: 1.5 }}>
                      {!seeker.job_location_preference || seeker.job_location_preference === 'anywhere'
                        ? 'Anywhere'
                        : seeker.job_location_preference === 'his_city'
                          ? `Only His City (${seeker.city ? getCityName(seeker.city) : 'Not Specified'})`
                          : seeker.job_location_preference === 'specific_state'
                            ? `Specific State (${seeker.pref_state_id ? getStateName(seeker.pref_state_id) : 'Not Specified'})`
                            : seeker.job_location_preference === 'specific_city'
                              ? `Specific City (${seeker.pref_city_id ? getCityName(seeker.pref_city_id) : 'Not Specified'}, ${seeker.pref_state_id ? getStateName(seeker.pref_state_id) : 'Not Specified'})`
                              : seeker.job_location_preference}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CV Viewer Card */}
            <div
              style={{
                background: '#fff',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid rgba(15,93,78,0.15)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
              className="es-detail-card"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifycontent: 'space-between' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: 'var(--es-charcoal)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ArticleOutlinedIcon sx={{ color: 'var(--es-emerald)' }} /> Resume / CV
                </h3>
                {s3Url && (
                  <button
                    onClick={() => window.open(s3Url, '_blank')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'linear-gradient(135deg, var(--es-emerald) 0%, var(--es-emerald-soft) 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 4px 10px rgba(15, 93, 78, 0.2)',
                      transition: 'all 0.2s ease',
                    }}
                    className="es-action-btn"
                  >
                    <FileDownloadIcon sx={{ fontSize: 14 }} /> Download
                  </button>
                )}
              </div>

              {s3Url ? (
                isPdf ? (
                  <div style={{ overflow: 'hidden', borderRadius: '16px', border: '1px solid rgba(15,93,78,0.15)', height: '550px' }}>
                    <iframe
                      src={`${s3Url}#toolbar=0&navpanes=0`}
                      width="100%"
                      height="100%"
                      style={{ border: 'none' }}
                      title="CV Resume Viewer"
                    />
                  </div>
                ) : (
                  <div style={{
                    padding: '60px 24px',
                    textAlign: 'center',
                    border: '1px dashed rgba(15, 93, 78, 0.3)',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(15, 93, 78, 0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <ArticleOutlinedIcon sx={{ fontSize: 64, color: 'var(--es-emerald)', opacity: 0.7 }} />
                    <div>
                      <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: 'var(--es-charcoal)', margin: '0 0 6px 0' }}>Resume File View</h4>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--es-charcoal-60)', margin: 0 }}>This CV file cannot be previewed directly in the browser.</p>
                    </div>
                    <button
                      onClick={() => window.open(s3Url, '_blank')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'linear-gradient(135deg, var(--es-emerald) 0%, var(--es-emerald-soft) 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '12px 24px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(15, 93, 78, 0.15)',
                        transition: 'all 0.2s ease',
                      }}
                      className="es-action-btn"
                    >
                      <FileDownloadIcon sx={{ fontSize: 16 }} /> Download Seeker CV
                    </button>
                  </div>
                )
              ) : (
                <div style={{
                  padding: '60px 24px',
                  textAlign: 'center',
                  border: '1px dashed rgba(15, 93, 78, 0.2)',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(15, 93, 78, 0.01)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <ArticleOutlinedIcon sx={{ fontSize: 48, color: 'var(--es-charcoal-60)', opacity: 0.4 }} />
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--es-charcoal-60)', margin: 0 }}>No resume uploaded for this job seeker.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default JobSeekerDetail;
