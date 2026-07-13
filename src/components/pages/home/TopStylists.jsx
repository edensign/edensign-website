/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import API from '../../../apis';

const staticStylists = [
  {
    name: "Elena Vasquez",
    specialty: "Master Colorist",
    city: "New York",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    id: "elena-vasquez"
  },
  {
    name: "Rafael Marin",
    specialty: "Precision Barber",
    city: "Barcelona",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    id: "rafael-marin"
  },
  {
    name: "Priya Sharma",
    specialty: "Bridal Makeup Artist",
    city: "Mumbai",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    id: "priya-sharma"
  },
];

const TopStylists = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const navigate = useNavigate();
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    Promise.all([
      API.JobSeekerAPI.getJobSeekerDetail(0, 3, null, null, [0, 0], '', 'all'),
      API.CityAPI.getCities().catch(() => null),
      API.SkillAPI.getAll(false, 0, 100).catch(() => null)
    ])
      .then(([seekerRes, cityRes, skillRes]) => {
        if (!isMounted) return;

        if (seekerRes.status === 'Success' && Array.isArray(seekerRes.data) && seekerRes.data.length > 0) {
          const citiesMap = {};
          if (cityRes?.status === 'Success' && cityRes.data?.rows) {
            cityRes.data.rows.forEach(c => { citiesMap[c.id] = c.name; });
          }

          const skillsMap = {};
          if (skillRes?.status === 'Success' && skillRes.data?.rows) {
            skillRes.data.rows.forEach(s => { skillsMap[s.id] = s.name; });
          }

          const defaultPhotos = [
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop"
          ];

          const mapped = seekerRes.data.slice(0, 3).map((seeker, i) => {
            const skillNames = (seeker.skills || '').split(',').map(id => skillsMap[id.trim()]).filter(Boolean);
            const specialty = skillNames.length > 0 ? skillNames[0] : "Hair Stylist";

            return {
              name: seeker.name,
              specialty: specialty,
              city: citiesMap[seeker.city] || seeker.street || "New York",
              img: defaultPhotos[i % 3],
              id: seeker.id
            };
          });

          let combined = [...mapped];
          if (combined.length < 3) {
            const needed = 3 - combined.length;
            combined = [...combined, ...staticStylists.slice(0, needed)];
          }
          setStylists(combined.slice(0, 3));
        } else {
          setStylists(staticStylists);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch top stylists:", err);
        if (isMounted) {
          setStylists(staticStylists);
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, []);

  return (
    <section ref={ref} className="es-top-stylists-section">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          className="es-ecosystem-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          style={{ marginBottom: '64px' }}
        >
          <div className="es-ecosystem-header-inner">
            <span className="es-eyebrow">The Artisans</span>
            <h2 className="es-section-title" style={{ marginBottom: 0 }}>
              Book your specialist, <em>not just a chair.</em>
            </h2>
          </div>
        </motion.div>

        {/* Stylists Grid */}
        <div className="es-stylists-grid">
          {stylists.map((s, i) => (
            <motion.article
              key={s.name}
              className="es-stylist-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.15, ease: 'easeOut' }}
              style={{
                transform: inView && window.innerWidth > 900 && i === 1 ? 'translateY(48px)' : 'none',
              }}
            >
              <div className="es-stylist-img-wrap" style={{ cursor: 'pointer' }} onClick={() => navigate(`/job-seeker/${s.id}`)}>
                <img src={s.img} alt={s.name} className="es-stylist-img" loading="lazy" />
              </div>
              <div className="es-stylist-info">
                <div>
                  <p className="es-stylist-specialty">{s.specialty}</p>
                  <h3 className="es-stylist-name" style={{ cursor: 'pointer' }} onClick={() => navigate(`/job-seeker/${s.id}`)}>
                    {s.name}
                  </h3>
                  <p className="es-stylist-city">{s.city}</p>
                </div>
                <button
                  onClick={() => navigate(`/job-seeker/${s.id}`)}
                  className="es-stylist-arrow-btn"
                  aria-label={`View profile of ${s.name}`}
                >
                  <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopStylists;
