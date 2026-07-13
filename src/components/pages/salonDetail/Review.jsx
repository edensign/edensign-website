/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { TextField, CircularProgress } from "@mui/material";
import { useToast } from "../../common/Toast";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ExtensionIcon from '@mui/icons-material/Extension';
import GroupIcon from '@mui/icons-material/Group';
import TuneIcon from '@mui/icons-material/Tune';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import StarRating from "../../common/StarRating";
import API from '../../../apis';

/* ── Gold star renderer ── */
const StarRow = ({ count = 5 }) => (
  <div style={{ display: 'flex', gap: '4px' }}>
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < count ? 'var(--es-emerald)' : 'none'} stroke="var(--es-emerald)" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

/* ── Rating criterion row ── */
const RatingRow = ({ icon, label, value, onChange }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid rgba(15,93,78,0.08)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--es-emerald)' }}>
      {icon}
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '11px', fontWeight: 600,
        letterSpacing: '1.2px', textTransform: 'uppercase',
        color: 'var(--es-charcoal-60)',
      }}>
        {label}
      </span>
    </div>
    <StarRating name={label} value={value} onChange={onChange} />
  </div>
);

const Review = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [qualityOfService, setQualityOfService] = useState(0);
  const [facilities, setFacilities] = useState(0);
  const [staff, setStaff] = useState(0);
  const [flexibility, setFlexibility] = useState(0);
  const [valueOfMoney, setValueOfMoney] = useState(0);
  const [reason, setReason] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [hasDbReviews, setHasDbReviews] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const salonDetail = useSelector(state => state.salonDetail);
  const salonId = salonDetail?.salon?.id;

  const fetchReviews = async () => {
    if (!salonId) {
      setLoadingReviews(false);
      return;
    }
    setLoadingReviews(true);
    try {
      const response = await API.ReviewAPI.getReviewsBySalon(salonId);
      if (response && response.status === "Success" && response.data?.rows) {
        const rows = response.data.rows;
        if (rows.length > 0) {
          setHasDbReviews(true);
          const dynamicTestimonials = rows.map((r, index) => {
            const avgRating = Math.round(
              ((r.quality_of_service || 0) +
               (r.facilities || 0) +
               (r.staff || 0) +
               (r.flexibility || 0) +
               (r.value_of_money || 0)) / 5
            ) || 5;

            return {
              name: r.customer?.username || "Valued Client",
              role: "Verified Client",
              text: r.comments || r.reason || "Loved the luxury experience and premium service!",
              avatar: `https://salon-s3.s3.us-east-1.amazonaws.com/eden-website-image/header/photo${(index % 3) + 1}.jpg`,
              rating: avgRating,
            };
          });
          setTestimonials(dynamicTestimonials);
        } else {
          setHasDbReviews(false);
          setTestimonials([]);
        }
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [salonId]);

  useEffect(() => {
    setActiveSlide(0);
  }, [testimonials]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customer = API.CustomerAPI.getCustomer();
    if (!customer) {
      showToast("Please login to submit a review.", "warning", "Login", () => navigate("/login"));
      return;
    }

    if (qualityOfService === 0 && facilities === 0 && staff === 0 && flexibility === 0 && valueOfMoney === 0) {
      showToast("Please provide at least one rating", "warning");
      return;
    }
    if (!salonId) {
      showToast("Unable to identify salon. Please try again.", "error");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        salon_id: salonId,
        customer_id: customer.id,
        quality_of_service: qualityOfService,
        facilities,
        staff,
        flexibility,
        value_of_money: valueOfMoney,
        reason: reason || null,
        comments: comments || null,
      };

      const response = await API.ReviewAPI.submitReview(payload);

      if (response.status === "Success") {
        showToast("Thank you for your review!", "success");
        setQualityOfService(0); setFacilities(0); setStaff(0);
        setFlexibility(0); setValueOfMoney(0);
        setReason(""); setComments("");
        fetchReviews();
      } else {
        showToast(response.msg || "Failed to submit review", "error");
      }
    } catch (error) {
      showToast("An error occurred. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const prev = () => setActiveSlide(i => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActiveSlide(i => (i === testimonials.length - 1 ? 0 : i + 1));

  const t = testimonials[activeSlide] || {};

  const inputSx = {
    '& .MuiFilledInput-root': {
      background: 'rgba(15,93,78,0.05)',
      borderRadius: '10px',
      border: '1px solid rgba(15,93,78,0.2)',
      '&:hover': { background: 'rgba(15,93,78,0.09)' },
      '&.Mui-focused': { background: 'rgba(15,93,78,0.07)', borderColor: 'var(--es-emerald)' },
      '&::before, &::after': { display: 'none' },
    },
    '& .MuiInputLabel-filled': { color: 'var(--es-charcoal-60)', fontSize: '13px' },
    '& .MuiInputLabel-filled.Mui-focused': { color: 'var(--es-emerald-soft)' },
  };

  return (
    <section style={{ background: 'var(--es-cream)', padding: '96px 5%', position: 'relative', overflow: 'hidden' }}>
      {/* top rule */}
      <div style={{
        position: 'absolute', top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: 1, height: 64,
        background: 'linear-gradient(to bottom, transparent, var(--es-emerald))',
      }} />

      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600,
          letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--es-emerald-soft)',
          marginBottom: '16px',
        }}>
          <span style={{ width: 24, height: 1, background: 'var(--es-emerald)', display: 'inline-block' }} />
          Voices & Ratings
        </span>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
          fontWeight: 400, lineHeight: 1.1,
          letterSpacing: '-0.02em', color: 'var(--es-charcoal)',
          margin: 0,
        }}>
          Testimonials &amp; Reviews
        </h2>
      </div>

      {/* Two-column grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        alignItems: 'start',
      }}>

        {/* ── LEFT: Write a Review ── */}
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          border: '1px solid rgba(15,93,78,0.18)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
          padding: '24px 28px',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            marginBottom: '20px',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(15,93,78,0.15)',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--es-emerald), var(--es-emerald-soft))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.4rem', fontWeight: 500,
              color: 'var(--es-charcoal)', margin: 0, letterSpacing: '-0.01em',
            }}>
              Write a Review
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <RatingRow icon={<SentimentSatisfiedAltIcon sx={{ fontSize: 18 }} />}
              label="Quality of Service" value={qualityOfService} onChange={setQualityOfService} />
            <RatingRow icon={<ExtensionIcon sx={{ fontSize: 18 }} />}
              label="Facilities" value={facilities} onChange={setFacilities} />
            <RatingRow icon={<GroupIcon sx={{ fontSize: 18 }} />}
              label="Staff" value={staff} onChange={setStaff} />
            <RatingRow icon={<TuneIcon sx={{ fontSize: 18 }} />}
              label="Flexibility" value={flexibility} onChange={setFlexibility} />
            <RatingRow icon={<AttachMoneyIcon sx={{ fontSize: 18 }} />}
              label="Value of Money" value={valueOfMoney} onChange={setValueOfMoney} />

            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <TextField
                fullWidth variant="filled" type="text" name="reason"
                label="Main Reason For Your Rating"
                autoComplete="new-reason" value={reason}
                onChange={e => setReason(e.target.value)}
                sx={inputSx}
              />
              <TextField
                fullWidth variant="filled" type="text" name="comments"
                label="Your Comments"
                autoComplete="new-comments" value={comments}
                onChange={e => setComments(e.target.value)}
                multiline rows={2}
                sx={inputSx}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '20px',
                width: '100%',
                padding: '14px',
                background: loading ? 'var(--es-emerald-muted)' : 'linear-gradient(135deg, var(--es-emerald), var(--es-emerald-soft))',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px', fontWeight: 700,
                letterSpacing: '2.5px', textTransform: 'uppercase',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: '0 8px 24px rgba(15,93,78,0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              {loading ? <><CircularProgress size={16} sx={{ color: '#fff' }} /> Submitting...</> : 'Submit Review'}
            </button>
          </form>
        </div>

        {/* ── RIGHT: Testimonials ── */}
        <div style={{
          background: 'linear-gradient(135deg, var(--es-emerald) 0%, #0d463c 50%, #082d27 100%)',
          borderRadius: '24px',
          border: '1px solid rgba(15,93,78,0.15)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
          padding: '48px 40px',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '480px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          {/* Decorative glow */}
          <div style={{
            position: 'absolute', top: -80, right: -80,
            width: 300, height: 300, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(15,93,78,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: -80, left: -80,
            width: 200, height: 200, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(15,93,78,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Header */}
          <div>
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: '10px',
              fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase',
              color: 'var(--es-emerald-soft)', display: 'block', marginBottom: '12px',
            }}>
              — Client Experiences
            </span>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              fontWeight: 400, color: '#ffffff',
              lineHeight: 1.15, letterSpacing: '-0.02em',
              margin: 0,
            }}>
              Testimonials
            </h3>
          </div>

          {loadingReviews ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
              <CircularProgress size={30} sx={{ color: 'var(--es-emerald)' }} />
            </div>
          ) : !hasDbReviews ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              flex: 1,
              padding: '20px 10px',
              gap: '24px'
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'rgba(15,93,78,0.1)',
                border: '1px solid rgba(15,93,78,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(15,93,78,0.15)',
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--es-emerald)" strokeWidth="1.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                  fontWeight: 400, color: '#ffffff',
                  lineHeight: 1.2, margin: '0 0 12px 0',
                }}>
                  Be the First to Review
                </h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px', fontWeight: 300,
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.6, margin: 0,
                }}>
                  No ratings or reviews have been submitted for this salon yet. Share your experience and be the first user to submit a review and rating!
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--es-emerald)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontFamily: "'Inter', sans-serif",
                marginTop: '12px'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--es-emerald)" strokeWidth="2" style={{ transform: 'rotate(180deg)' }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                Use the form on the left
              </div>
            </div>
          ) : (
            <>
              {/* Quote mark */}
              <div style={{
                fontSize: '80px', lineHeight: 1,
                fontFamily: "'Cormorant Garamond', serif",
                color: 'rgba(15,93,78,0.25)',
                marginTop: '24px',
                userSelect: 'none',
              }}>
                "
              </div>

              {/* Testimonial content */}
              <div style={{ flex: 1, marginTop: '-24px' }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                  fontWeight: 300, lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.85)',
                  letterSpacing: '0.01em',
                  margin: '0 0 28px 0',
                  fontStyle: 'italic',
                  transition: 'opacity 0.3s ease',
                }}>
                  {t?.text}
                </p>

                {/* Author row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img
                    src={t?.avatar}
                    alt={t?.name}
                    loading="lazy"
                    style={{
                      width: 52, height: 52,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid rgba(15,93,78,0.5)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px', fontWeight: 600,
                      color: '#ffffff', letterSpacing: '0.02em',
                    }}>
                      {t?.name}
                    </div>
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '11px', fontWeight: 400,
                      color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em',
                      marginTop: '2px',
                    }}>
                      {t?.role}
                    </div>
                    <div style={{ marginTop: '4px' }}>
                      <StarRow count={t?.rating} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginTop: '32px',
              }}>
                {/* Dots */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      style={{
                        width: i === activeSlide ? 24 : 8,
                        height: 8,
                        borderRadius: 4,
                        background: i === activeSlide ? 'var(--es-emerald)' : 'rgba(255,255,255,0.2)',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'all 0.3s ease',
                      }}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  {[{ action: prev, label: '←' }, { action: next, label: '→' }].map(({ action, label }) => (
                    <button
                      key={label}
                      onClick={action}
                      aria-label={label === '←' ? 'Previous testimonial' : 'Next testimonial'}
                      style={{
                        width: 42, height: 42,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: '#fff',
                        fontSize: '18px',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.25s ease',
                        backdropFilter: 'blur(8px)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(15,93,78,0.25)';
                        e.currentTarget.style.borderColor = 'var(--es-emerald)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>


    </section>
  );
};

export default Review;
