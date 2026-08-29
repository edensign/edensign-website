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
  Chip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import API from '../../../apis';

const categories = ["All", "Salon Growth", "Technical Skills", "Product Guides", "Marketing"];

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
        // Transform the database row into the format expected by the component
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
    <Box sx={{ minHeight: '100vh', background: 'var(--es-background)', pt: '100px', pb: '80px' }}>
      <style>{`
        .video-card:hover .play-overlay { opacity: 1; transform: scale(1); }
        .video-card:hover .thumbnail-img { transform: scale(1.05); }
      `}</style>

      {/* Hero Section */}
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2, px: 2, py: 0.5, borderRadius: '100px', background: 'var(--es-surface-container)', border: '1px solid rgba(213, 195, 184, 0.5)' }}>
              <SchoolOutlinedIcon sx={{ fontSize: 18, color: 'var(--es-primary)' }} />
              <Typography sx={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--es-primary)' }}>
                Expert Learning
              </Typography>
            </Box>
            <Typography variant="h1" sx={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 600,
              fontSize: { xs: '36px', md: '56px' },
              color: 'var(--es-espresso)',
              mb: 3,
              letterSpacing: '-0.02em'
            }}>
              EdenSign Academy
            </Typography>
            <Typography variant="body1" sx={{
              fontFamily: 'Inter',
              color: 'var(--es-on-surface-variant)',
              fontSize: '18px',
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.6,
              opacity: 0.85
            }}>
              Master the art of salon excellence with our exclusive collection of professional guides, technical tutorials, and business growth strategies.
            </Typography>
          </Box>
        </motion.div>

        {/* Filters */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: { xs: 'flex-start', sm: 'center' }, 
          flexWrap: { xs: 'nowrap', sm: 'wrap' }, 
          gap: 1.5, 
          mb: 6,
          overflowX: { xs: 'auto', sm: 'visible' },
          pb: { xs: 2, sm: 0 },
          mx: { xs: -2, sm: 0 },
          px: { xs: 2, sm: 0 },
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          '& > div': { flexShrink: 0 }
        }}>
          {categories.map((cat, i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Chip
                label={cat}
                onClick={() => setSelectedCategory(cat)}
                sx={{
                  fontFamily: 'Inter',
                  px: 2,
                  py: 2.5,
                  fontSize: { xs: '13px', sm: '14px' },
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  background: selectedCategory === cat ? 'linear-gradient(135deg, #c7956c 0%, #7f5532 100%)' : '#ffffff',
                  color: selectedCategory === cat ? '#ffffff' : 'var(--es-espresso)',
                  border: '1px solid',
                  borderColor: selectedCategory === cat ? 'transparent' : 'rgba(213, 195, 184, 0.6)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    background: selectedCategory === cat ? 'linear-gradient(135deg, #c7956c 0%, #7f5532 100%)' : 'var(--es-surface-container)',
                    borderColor: 'var(--es-primary)',
                    transform: 'translateY(-2px)'
                  }
                }}
              />
            </motion.div>
          ))}
        </Box>

        {/* Video Grid */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <Typography sx={{ fontFamily: 'Inter', color: 'var(--es-primary)', fontWeight: 600 }}>Loading exclusive content...</Typography>
          </Box>
        ) : filteredVideos.length > 0 ? (
          <Grid container spacing={4}>
            <AnimatePresence mode="popLayout">
              {filteredVideos.map((video, index) => (
                <Grid item xs={12} sm={6} md={4} key={video.id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card className="video-card" sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 8px 30px rgba(127, 85, 50, 0.04)',
                      border: '1px solid rgba(213, 195, 184, 0.5)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: '0 15px 40px rgba(127, 85, 50, 0.08)',
                        transform: 'translateY(-8px)',
                        borderColor: 'var(--es-primary)'
                      }
                    }} onClick={() => setOpenVideo(video)}>
                      {/* Thumbnail Section */}
                      <Box sx={{ position: 'relative', pt: '56.25%', overflow: 'hidden' }}>
                        <CardMedia
                          className="thumbnail-img"
                          component="img"
                          image={video.thumbnail_url || `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                          alt={video.title}
                          loading="lazy"
                          decoding="async"
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                          }}
                        />
                        {/* Play Overlay */}
                        <Box
                          className="play-overlay"
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(26,10,0,0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0.6,
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <Box sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.95)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                          }}>
                            <PlayArrowIcon sx={{ fontSize: 32, color: '#c7956c', ml: 0.5 }} />
                          </Box>
                        </Box>                        {/* Duration Tag */}
                        <Box sx={{
                          position: 'absolute',
                          bottom: 12,
                          right: 12,
                          background: 'rgba(31,27,24,0.85)',
                          color: '#fff',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '4px',
                          fontFamily: 'Inter',
                          fontSize: '11px',
                          fontWeight: 600,
                          backdropFilter: 'blur(4px)'
                        }}>
                          {video.duration}
                        </Box>
                      </Box>
  
                      {/* Content Section */}
                      <CardContent sx={{ p: 3, flexGrow: 1 }}>
                        <Typography sx={{
                          fontFamily: 'Inter',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: 'var(--es-primary)',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          mb: 1
                        }}>
                          {video.category}
                        </Typography>
                        <Typography gutterBottom variant="h5" sx={{
                          fontFamily: 'Playfair Display',
                          fontWeight: 600,
                          color: 'var(--es-espresso)',
                          mb: 1.5,
                          lineHeight: 1.3
                        }}>
                          {video.title}
                        </Typography>
                        <Typography sx={{
                          fontFamily: 'Inter',
                          color: 'var(--es-on-surface-variant)',
                          fontSize: '14px',
                          lineHeight: 1.6,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          opacity: 0.85
                        }}>
                          {video.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </AnimatePresence>
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography sx={{ fontFamily: 'Playfair Display', fontSize: '24px', color: 'var(--es-espresso)' }}>
              No videos found in this category yet.
            </Typography>
            <Typography sx={{ fontFamily: 'Inter', color: 'var(--es-on-surface-variant)', mt: 1 }}>
              Stay tuned! We are constantly adding new lessons.
            </Typography>
          </Box>
        )}

        {/* Channel CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{
            mt: 12,
            p: { xs: 4, md: 6 },
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #c7956c 0%, #7f5532 100%)',
            color: '#fff',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(127,85,50,0.15)'
          }}>
            {/* Background Accent */}
            <YouTubeIcon sx={{
              position: 'absolute',
              right: -40,
              bottom: -40,
              fontSize: 240,
              color: 'rgba(255,255,255,0.03)',
              transform: 'rotate(-15deg)'
            }} />

            <Typography variant="h3" sx={{
              fontFamily: 'Playfair Display',
              fontWeight: 600,
              mb: 2,
              position: 'relative'
            }}>
              Subscribe to EdenSign TV
            </Typography>
            <Typography sx={{
              fontFamily: 'Inter',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '16px',
              maxWidth: '600px',
              mx: 'auto',
              mb: 4,
              lineHeight: 1.6,
              position: 'relative'
            }}>
              Don't miss out on weekly technical workshops and exclusive salon business tips from industry leaders.
            </Typography>
            <Button
              variant="contained"
              startIcon={<YouTubeIcon />}
              onClick={() => window.open('https://youtube.com', '_blank')}
              sx={{
                background: '#ff0000',
                color: '#fff',
                px: 4,
                py: 1.5,
                borderRadius: '100px',
                fontFamily: 'Inter',
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '14px',
                boxShadow: '0 8px 24px rgba(255,0,0,0.3)',
                '&:hover': {
                  background: '#d40000',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 30px rgba(255,0,0,0.45)'
                }
              }}
            >
              Subscribe Now
            </Button>
          </Box>
        </motion.div>
      </Container>

      {/* Video Modal */}
      <Dialog
        fullScreen={isMobile}
        maxWidth="lg"
        fullWidth
        open={!!openVideo}
        onClose={handleCloseVideo}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : '16px',
            bgcolor: '#000',
            overflow: 'hidden'
          }
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', pt: '56.25%' }}>
          <IconButton
            onClick={handleCloseVideo}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: '#fff',
              background: 'rgba(0,0,0,0.5)',
              '&:hover': { background: 'rgba(0,0,0,0.8)' },
              zIndex: 10
            }}
          >
            <CloseIcon />
          </IconButton>
          {openVideo && (
            <iframe
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              src={`https://www.youtube.com/embed/${openVideo.id}?autoplay=1`}
              title={openVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </Box>
        {!isMobile && (
          <DialogContent sx={{ bgcolor: 'var(--es-background)', p: 4 }}>
            <Typography variant="h5" sx={{ fontFamily: 'Playfair Display', fontWeight: 600, color: 'var(--es-espresso)', mb: 1 }}>
              {openVideo?.title}
            </Typography>
            <Typography sx={{ fontFamily: 'Inter', color: 'var(--es-on-surface-variant)', lineHeight: 1.6 }}>
              {openVideo?.description}
            </Typography>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
};

export default Academy;
