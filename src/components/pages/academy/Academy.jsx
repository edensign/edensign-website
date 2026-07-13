/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Dialog,
  DialogContent,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import API from '../../../apis';
import academyHeroImg from '../../assets/academy-hero.png';
import { BRAND_NAME, BRAND_ACADEMY, BRAND_YOUTUBE, BRAND_YOUTUBE_CHANNEL } from '../../../brand.js';

const categories = ["All", "Salon Growth", "Technical Skills", "Product Guides", "Marketing"];

const STATS = [
  { Icon: SchoolOutlinedIcon,      value: '50+',  label: 'Expert Lessons' },
  { Icon: GroupsOutlinedIcon,      value: '12K+', label: 'Professionals Trained' },
  { Icon: EmojiEventsOutlinedIcon, value: '5',    label: 'Learning Tracks' },
  { Icon: AutoStoriesOutlinedIcon, value: 'Free', label: 'Always Accessible' },
];

const Academy = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openVideo, setOpenVideo] = useState(null);
  const [academicVideos, setAcademicVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchAcademyCourses();
  }, []);

  const fetchAcademyCourses = async () => {
    try {
      setLoading(true);
      const response = await API.AcademyAPI.getPublicList();
      if (response.status === 200) {
        const formatted = response.data.map(v => ({
          id: v.youtube_link.split('v=')[1]?.split('&')[0] || v.youtube_link.split('/').pop(),
          title: v.title,
          description: v.description,
          category: v.category,
          duration: v.duration,
          thumbnail_url: v.thumbnail_url
        }));
        setAcademicVideos(formatted);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVideos = selectedCategory === "All"
    ? academicVideos
    : academicVideos.filter(v => v.category === selectedCategory);

  const handleCloseVideo = () => setOpenVideo(null);

  return (
    <Box sx={{ minHeight: '100vh', background: 'var(--es-cream)', pt: '80px' }}>
      <style>{`
        .video-card:hover .play-overlay { opacity: 1 !important; }
        .video-card:hover .thumbnail-img { transform: scale(1.07) !important; }
      `}</style>

      {/* ── HERO — split layout (same as About page) ── */}
      <section style={{
        position: 'relative',
        width: '100%',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'stretch',
        overflow: 'hidden',
        background: 'var(--es-cream)',
      }}>
        {/* Left — content */}
        <div style={{
          flex: '0 0 55%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '100px 60px 80px 7%',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Badge — left aligned, same as About */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <span style={{ display: 'inline-block', width: '32px', height: '1.5px', background: 'var(--es-emerald)' }} />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--es-emerald)',
              background: 'rgba(15,93,78,0.08)',
              padding: '5px 14px',
              borderRadius: '999px',
              border: '1px solid rgba(15,93,78,0.2)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <SchoolOutlinedIcon style={{ fontSize: 13 }} />
              Expert Learning
            </span>
          </div>

          {/* Headline — left aligned */}
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 4.5vw, 62px)',
            fontWeight: 700,
            lineHeight: 1.12,
            color: 'var(--es-charcoal)',
            margin: '0 0 4px 0',
            letterSpacing: '-0.01em',
          }}>
            {BRAND_NAME}
          </h1>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 4.5vw, 62px)',
            fontWeight: 700,
            lineHeight: 1.12,
            color: 'var(--es-emerald)',
            fontStyle: 'italic',
            margin: '0 0 20px 0',
            letterSpacing: '-0.01em',
          }}>
            Academy
          </h1>

          {/* Emerald divider — same as About */}
          <div style={{
            width: '56px', height: '2px',
            background: 'linear-gradient(90deg, var(--es-emerald) 0%, rgba(15,93,78,0.2) 100%)',
            marginBottom: '24px', borderRadius: '2px',
          }} />

          {/* Subtitle */}
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            lineHeight: 1.75,
            color: 'var(--es-charcoal-60)',
            margin: '0 0 40px 0',
            maxWidth: '460px',
          }}>
            Master the art of salon excellence with our exclusive collection of professional guides, technical tutorials, and business growth strategies.
          </p>

          {/* Stat pills row */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[
              { value: '50+', label: 'Lessons' },
              { value: '12K+', label: 'Trained' },
              { value: '5', label: 'Tracks' },
              { value: 'Free', label: 'Access' },
            ].map((s, i) => (
              <div key={i} style={{
                background: '#fff',
                border: '1px solid rgba(15,93,78,0.12)',
                borderRadius: '12px',
                padding: '12px 18px',
                textAlign: 'center',
                boxShadow: '0 2px 12px rgba(15,93,78,0.05)',
              }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 700, color: 'var(--es-charcoal)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--es-charcoal-60)', fontWeight: 500, marginTop: '4px', letterSpacing: '0.04em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — image panel (same as About) */}
        <div style={{ flex: '0 0 45%', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative emerald circles */}
          <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(15,93,78,0.07)', zIndex: 1, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(15,93,78,0.05)', zIndex: 1, pointerEvents: 'none' }} />

          <img
            src={academyHeroImg}
            alt={`${BRAND_ACADEMY} — Salon Learning`}
            loading="eager"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
          {/* Cream fade from left — same as About */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, var(--es-cream) 0%, transparent 18%)',
            zIndex: 2,
          }} />

          {/* Floating badge — same as About */}
          <div style={{
            position: 'absolute', bottom: '40px', left: '32px', zIndex: 3,
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '18px 24px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            border: '1px solid rgba(15,93,78,0.12)',
            display: 'flex', alignItems: 'center', gap: '16px',
          }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px',
              background: 'var(--es-emerald)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <SchoolOutlinedIcon style={{ fontSize: 22, color: '#fff' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '22px', color: 'var(--es-charcoal)', lineHeight: 1 }}>50+</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--es-charcoal-60)', fontWeight: 500, marginTop: '4px', letterSpacing: '0.04em' }}>Expert Lessons</div>
            </div>
          </div>
        </div>
      </section>

      {/* Emerald accent bar — same as About */}
      <div style={{ background: 'var(--es-emerald)', height: '3px', width: '100%' }} />




      {/* ── CONTENT ── */}
      <Container maxWidth="lg" sx={{ pt: 8, pb: 12 }}>

        {/* Category filters */}
        <Box sx={{
          display: 'flex',
          justifyContent: { xs: 'flex-start', sm: 'center' },
          flexWrap: { xs: 'nowrap', sm: 'wrap' },
          gap: 1.5,
          mb: 7,
          overflowX: { xs: 'auto', sm: 'visible' },
          pb: { xs: 2, sm: 0 },
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          '& > *': { flexShrink: 0 },
        }}>
          {categories.map((cat, i) => (
            <motion.div key={cat} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}>
              <Box
                onClick={() => setSelectedCategory(cat)}
                sx={{
                  px: 3, py: 1.2,
                  borderRadius: '999px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  background: selectedCategory === cat ? 'var(--es-emerald)' : '#fff',
                  color: selectedCategory === cat ? '#fff' : 'var(--es-charcoal)',
                  border: '1.5px solid',
                  borderColor: selectedCategory === cat ? 'var(--es-emerald)' : 'rgba(15,93,78,0.15)',
                  boxShadow: selectedCategory === cat ? '0 4px 16px rgba(15,93,78,0.25)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.02em',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    borderColor: 'var(--es-emerald)',
                    background: selectedCategory === cat ? 'var(--es-emerald)' : 'rgba(15,93,78,0.06)',
                  },
                }}
              >
                {cat}
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* Video Grid */}
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 12, gap: 2 }}>
            <Box sx={{
              width: '48px', height: '48px', borderRadius: '50%',
              border: '3px solid var(--es-emerald)', borderTopColor: 'transparent',
              animation: 'spin 0.8s linear infinite',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <Typography sx={{ fontFamily: 'Inter, sans-serif', color: 'var(--es-charcoal-60)', fontSize: '14px' }}>Loading exclusive content…</Typography>
          </Box>
        ) : filteredVideos.length > 0 ? (
          <Grid container spacing={3}>
            <AnimatePresence mode="popLayout">
              {filteredVideos.map((video, index) => (
                <Grid item xs={12} sm={6} md={4} key={video.id}>
                  <motion.div layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                    <Card
                      className="video-card"
                      onClick={() => setOpenVideo(video)}
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        background: '#fff',
                        boxShadow: '0 4px 20px rgba(15,93,78,0.05)',
                        border: '1px solid rgba(15,93,78,0.10)',
                        transition: 'all 0.35s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          boxShadow: '0 20px 50px rgba(15,93,78,0.12)',
                          transform: 'translateY(-8px)',
                          borderColor: 'rgba(15,93,78,0.30)',
                        }
                      }}
                    >
                      {/* Thumbnail */}
                      <Box sx={{ position: 'relative', pt: '56.25%', overflow: 'hidden', bgcolor: 'var(--es-cream)' }}>
                        <CardMedia
                          className="thumbnail-img"
                          component="img"
                          image={video.thumbnail_url || `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                          alt={video.title}
                          loading="lazy"
                          sx={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                          }}
                        />
                        {/* Play overlay */}
                        <Box className="play-overlay" sx={{
                          position: 'absolute', inset: 0,
                          background: 'rgba(15,93,78,0.35)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          opacity: 0, transition: 'opacity 0.3s ease',
                        }}>
                          <Box sx={{
                            width: 60, height: 60, borderRadius: '50%',
                            background: '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                          }}>
                            <PlayArrowIcon sx={{ fontSize: 32, color: 'var(--es-emerald)', ml: 0.5 }} />
                          </Box>
                        </Box>
                        {/* Category badge */}
                        <Box sx={{
                          position: 'absolute', top: 12, left: 12,
                          background: 'rgba(15,93,78,0.9)',
                          color: '#fff', px: 1.5, py: 0.4,
                          borderRadius: '999px',
                          fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700,
                          letterSpacing: '0.08em', textTransform: 'uppercase',
                          backdropFilter: 'blur(4px)',
                        }}>
                          {video.category}
                        </Box>
                        {/* Duration badge */}
                        {video.duration && (
                          <Box sx={{
                            position: 'absolute', bottom: 12, right: 12,
                            background: 'rgba(26,21,18,0.75)',
                            color: '#fff', px: 1.2, py: 0.3,
                            borderRadius: '6px',
                            fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600,
                            backdropFilter: 'blur(4px)',
                          }}>
                            {video.duration}
                          </Box>
                        )}
                      </Box>

                      {/* Content */}
                      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{
                          fontFamily: 'Playfair Display, serif',
                          fontWeight: 600, fontSize: '18px',
                          color: 'var(--es-charcoal)',
                          mb: 1.5, lineHeight: 1.35,
                        }}>
                          {video.title}
                        </Typography>
                        <Typography sx={{
                          fontFamily: 'Inter, sans-serif',
                          color: 'var(--es-charcoal-60)',
                          fontSize: '13.5px', lineHeight: 1.65,
                          flexGrow: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}>
                          {video.description}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 2.5, pt: 2, borderTop: '1px solid rgba(15,93,78,0.08)' }}>
                          <PlayArrowIcon sx={{ fontSize: 15, color: 'var(--es-emerald)' }} />
                          <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 700, color: 'var(--es-emerald)', letterSpacing: '0.04em' }}>
                            Watch Lesson
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </AnimatePresence>
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 14 }}>
            <Box sx={{ fontSize: '48px', mb: 2 }}>🎬</Box>
            <Typography sx={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', color: 'var(--es-charcoal)', mb: 1 }}>
              No videos found in this category yet.
            </Typography>
            <Typography sx={{ fontFamily: 'Inter, sans-serif', color: 'var(--es-charcoal-60)', fontSize: '15px' }}>
              Stay tuned — we're constantly adding new lessons!
            </Typography>
          </Box>
        )}

        {/* ── CTA Section — emerald bg (same pattern as About stats bar) ── */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <Box sx={{
            mt: 12,
            borderRadius: '24px',
            background: 'var(--es-emerald)',
            p: { xs: 5, md: 7 },
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(15,93,78,0.20)',
          }}>
            {/* Subtle white dot accent */}
            <Box sx={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
            <YouTubeIcon sx={{ position: 'absolute', right: -30, bottom: -30, fontSize: 200, color: 'rgba(255,255,255,0.06)', transform: 'rotate(-10deg)', pointerEvents: 'none' }} />

            <Box sx={{ position: 'relative', zIndex: 2 }}>
              {/* Label badge */}
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2.5, px: 2, py: 0.7, borderRadius: '999px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <YouTubeIcon sx={{ fontSize: 15, color: '#fff' }} />
                <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#fff' }}>
                  {BRAND_YOUTUBE_CHANNEL}
                </Typography>
              </Box>

              <Typography variant="h3" sx={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 700,
                fontSize: { xs: '26px', md: '38px' },
                color: '#fff',
                mb: 2, lineHeight: 1.2,
              }}>
                Subscribe to EdenSign TV
              </Typography>
              <Typography sx={{
                fontFamily: 'Inter, sans-serif',
                color: 'rgba(255,255,255,0.75)',
                fontSize: '15.5px',
                maxWidth: '520px',
                mx: 'auto',
                mb: 4.5, lineHeight: 1.75,
              }}>
                Don't miss out on weekly technical workshops and exclusive salon business tips from industry leaders.
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                {/* Red YT subscribe button */}
                <Button
                  variant="contained"
                  startIcon={<YouTubeIcon />}
                  onClick={() => window.open(BRAND_YOUTUBE, '_blank')}
                  sx={{
                    background: '#ff0000',
                    color: '#fff',
                    px: 4, py: 1.5,
                    borderRadius: '999px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: '14px',
                    boxShadow: '0 8px 24px rgba(255,0,0,0.35)',
                    '&:hover': { background: '#d40000', transform: 'translateY(-2px)', boxShadow: '0 12px 30px rgba(255,0,0,0.5)' }
                  }}
                >
                  Subscribe Now
                </Button>
                {/* White ghost button */}
                <Button
                  variant="outlined"
                  onClick={() => setSelectedCategory("All")}
                  sx={{
                    color: '#fff',
                    border: '1.5px solid rgba(255,255,255,0.4)',
                    px: 4, py: 1.5,
                    borderRadius: '999px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '14px',
                    '&:hover': { border: '1.5px solid #fff', background: 'rgba(255,255,255,0.12)', transform: 'translateY(-2px)' }
                  }}
                >
                  Browse All Lessons
                </Button>
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Container>

      {/* ── Video Modal ── */}
      <Dialog
        fullScreen={isMobile}
        maxWidth="lg"
        fullWidth
        open={!!openVideo}
        onClose={handleCloseVideo}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : '20px',
            bgcolor: '#000',
            overflow: 'hidden',
          }
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', pt: '56.25%' }}>
          <IconButton
            onClick={handleCloseVideo}
            sx={{
              position: 'absolute', top: 16, right: 16, zIndex: 10,
              color: '#fff',
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              '&:hover': { background: 'rgba(0,0,0,0.85)' }
            }}
          >
            <CloseIcon />
          </IconButton>
          {openVideo && (
            <iframe
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              src={`https://www.youtube.com/embed/${openVideo.id}?autoplay=1`}
              title={openVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </Box>
        {!isMobile && (
          <DialogContent sx={{ bgcolor: 'var(--es-cream)', p: 4 }}>
            <Box sx={{ mb: 0.5 }}>
              <Typography sx={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--es-emerald)', mb: 0.5 }}>
                {openVideo?.category}
              </Typography>
              <Typography variant="h5" sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, color: 'var(--es-charcoal)', mb: 1.5 }}>
                {openVideo?.title}
              </Typography>
              <Typography sx={{ fontFamily: 'Inter, sans-serif', color: 'var(--es-charcoal-60)', lineHeight: 1.7, fontSize: '14.5px' }}>
                {openVideo?.description}
              </Typography>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
};

export default Academy;
