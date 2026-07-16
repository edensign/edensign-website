/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import InfiniteScroll from 'react-infinite-scroll-component';

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import API from '../../../apis';
import "./style.css";
import Brands from "../../common/Brands";
import Newsletter from "../../common/Newsletter";

const CATEGORIES = ["All", "Hair", "Skin", "Bridal", "Spa", "Nails"];

const SORTS = [
  { id: "recommended", label: "Recommended" },
  { id: "rating", label: "Top rated" },
  { id: "price-asc", label: "Price · low to high" },
  { id: "price-desc", label: "Price · high to low" },
];

const PAGE_SIZE = 6;

const SalonCardSkeleton = () => (
  <div style={{
    background: '#fff',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(26,10,0,0.06)',
  }}>
    <div style={{ height: '280px', background: 'linear-gradient(90deg, #f0ebe6 25%, #e8e0d8 50%, #f0ebe6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite' }} />
    <div style={{ padding: '24px' }}>
      <div style={{ height: '20px', borderRadius: '8px', background: 'linear-gradient(90deg, #f0ebe6 25%, #e8e0d8 50%, #f0ebe6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite', marginBottom: '12px', width: '70%' }} />
      <div style={{ height: '14px', borderRadius: '6px', background: 'linear-gradient(90deg, #f0ebe6 25%, #e8e0d8 50%, #f0ebe6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite', width: '45%' }} />
    </div>
  </div>
);

const Salon = () => {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("recommended");
  const [minRating, setMinRating] = useState(0);

  const [rawSalons, setRawSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Fetch salons on mount
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    API.SalonAPI.getSalonList(
      [],
      null,
      null,
      null,
      null,
      null
    )
      .then(res => {
        if (isMounted) {
          if (res.status === 'Success' && Array.isArray(res.data)) {
            setRawSalons(res.data);
          } else {
            setRawSalons([]);
          }
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("Failed to fetch salons:", err);
        if (isMounted) {
          setRawSalons([]);
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, []);

  // Client side filters
  const filtered = useMemo(() => {
    let list = rawSalons.map(s => {
      // derive categories dynamically based on type/tag/description
      const tagLower = (s.landmark + ' ' + s.street + ' ' + s.name + ' ' + (s.description || '')).toLowerCase();
      let derivedCat = "Hair";
      if (tagLower.includes("skin") || tagLower.includes("facial") || tagLower.includes("wellness")) {
        derivedCat = "Skin";
      } else if (tagLower.includes("bridal") || tagLower.includes("editorial")) {
        derivedCat = "Bridal";
      } else if (tagLower.includes("spa") || tagLower.includes("massage") || tagLower.includes("therapy")) {
        derivedCat = "Spa";
      } else if (tagLower.includes("nail") || tagLower.includes("manicure") || tagLower.includes("pedicure")) {
        derivedCat = "Nails";
      }

      return {
        ...s,
        derivedCat,
        mappedRating: s.rating ? parseFloat(s.rating) : 4.5,
        mappedPrice: s.booking_fee ? parseFloat(s.booking_fee) : 100,
        priceLabel: s.booking_fee ? `Booking Fee ₹${s.booking_fee}` : "from ₹100",
        distanceLabel: s.distance !== undefined && s.distance !== null ? `${parseFloat(s.distance).toFixed(1)} km` : null
      };
    });

    // 1. Category filter
    if (cat !== "All") {
      list = list.filter(s => s.derivedCat === cat);
    }

    // 2. Rating filter
    if (minRating > 0) {
      list = list.filter(s => s.mappedRating >= minRating);
    }

    // 3. Search query filter (with phonetic normalization for v/w interchangeable letters)
    if (q.trim()) {
      const needle = q.toLowerCase().trim().replace(/w/g, 'v');
      list = list.filter(s => 
        s.name.toLowerCase().replace(/w/g, 'v').includes(needle) ||
        (s.landmark || '').toLowerCase().replace(/w/g, 'v').includes(needle) ||
        (s.street || '').toLowerCase().replace(/w/g, 'v').includes(needle) ||
        s.derivedCat.toLowerCase().replace(/w/g, 'v').includes(needle)
      );
    }

    // 4. Sort filter
    switch (sort) {
      case "rating":
        list = [...list].sort((a, b) => b.mappedRating - a.mappedRating);
        break;
      case "price-asc":
        list = [...list].sort((a, b) => a.mappedPrice - b.mappedPrice);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.mappedPrice - a.mappedPrice);
        break;
      default:
        // Recommended: Featured first, then by distance if available
        list = [...list].sort((a, b) => {
          if (a.is_featured && !b.is_featured) return -1;
          if (!a.is_featured && b.is_featured) return 1;
          if (a.distance !== undefined && b.distance !== undefined && a.distance !== null && b.distance !== null) {
            return parseFloat(a.distance) - parseFloat(b.distance);
          }
          return 0;
        });
    }

    return list;
  }, [rawSalons, q, cat, sort, minRating]);

  const loadMore = () => {
    setVisibleCount(prev => prev + PAGE_SIZE);
  };

  const visibleSalons = filtered.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-cream text-charcoal" style={{ backgroundColor: 'var(--es-cream)', color: 'var(--es-charcoal)' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ padding: '80px 5% 60px 5%', background: 'linear-gradient(to bottom, var(--es-cream-deep) 0%, var(--es-cream) 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-emerald-eden mb-6" style={{ color: 'var(--es-emerald)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: '24px' }}>
            <span style={{ width: '32px', height: '1px', background: 'var(--es-emerald)' }} /> The Directory
          </div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight max-w-4xl" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(38px, 6vw, 64px)', fontWeight: 600, lineHeight: 1.1, color: 'var(--es-charcoal)', margin: 0 }}>
            A curated atlas of the world&apos;s most exquisite <em className="italic text-emerald-eden" style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--es-emerald)' }}>salons</em>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-charcoal-soft" style={{ marginTop: '24px', maxWidth: '640px', fontSize: '15px', color: 'var(--es-charcoal-60)', lineHeight: 1.7 }}>
            Every studio on Eden Sign is invited, vetted, and reviewed by our editors — so you can book a sanctuary, not just an appointment.
          </p>

          {/* Search bar */}
          <div style={{
            marginTop: '40px',
            borderRadius: '24px',
            background: '#ffffff',
            boxShadow: 'var(--es-shadow-md)',
            border: '1px solid rgba(26, 21, 18, 0.05)',
            padding: '12px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', borderRadius: '16px', background: 'rgba(26,21,18,0.02)', minWidth: '260px' }}>
              <SearchIcon sx={{ color: 'var(--es-emerald)', fontSize: 20 }} />
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                placeholder="Search salons, cities, rituals…"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  color: 'var(--es-charcoal)',
                }}
              />
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', borderRadius: '16px', background: 'rgba(26,21,18,0.02)', minWidth: '220px' }}>
              <LocationOnOutlinedIcon sx={{ color: 'var(--es-emerald)', fontSize: 20 }} />
              <span style={{ fontSize: '14px', color: 'var(--es-charcoal-60)', fontFamily: 'var(--font-sans)' }}>
                All locations
              </span>
            </div>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--es-charcoal-60)', fontFamily: 'var(--font-sans)' }}>
            <span><strong style={{ color: 'var(--es-charcoal)' }}>{filtered.length}</strong> curated salons</span>
            <span>·</span>
            <span><strong style={{ color: 'var(--es-charcoal)' }}>Global directory</strong></span>
            <span>·</span>
            <span><strong style={{ color: 'var(--es-charcoal)' }}>100%</strong> editor-verified</span>
          </div>
        </div>
      </section>

      {/* Sticky Filters Header */}
      <section style={{
        position: 'sticky',
        top: '64px',
        zIndex: 99,
        background: 'rgba(251, 247, 242, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(26, 21, 18, 0.06)',
        padding: '14px 5%',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {CATEGORIES.map((c) => {
              const active = c === cat;
              return (
                <button
                  key={c}
                  onClick={() => {
                    setCat(c);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  style={{
                    whiteSpace: 'nowrap',
                    padding: '8px 18px',
                    borderRadius: '100px',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-sans)',
                    border: '1px solid rgba(26, 21, 18, 0.1)',
                    cursor: 'pointer',
                    background: active ? 'var(--es-charcoal)' : '#ffffff',
                    color: active ? 'var(--es-cream)' : 'var(--es-charcoal-60)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Right Selects */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--es-charcoal-60)', fontFamily: 'var(--font-sans)' }}>
              <span>Rating:</span>
              <select
                value={minRating}
                onChange={(e) => {
                  setMinRating(Number(e.target.value));
                  setVisibleCount(PAGE_SIZE);
                }}
                style={{
                  borderRadius: '100px',
                  border: '1px solid rgba(26, 21, 18, 0.1)',
                  background: '#ffffff',
                  padding: '6px 12px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none',
                  color: 'var(--es-charcoal)',
                }}
              >
                <option value={0}>Any</option>
                <option value={4.5}>4.5★ & above</option>
                <option value={4.8}>4.8★ & above</option>
                <option value={5.0}>5.0★</option>
              </select>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--es-charcoal-60)', fontFamily: 'var(--font-sans)' }}>
              <span>Sort:</span>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                style={{
                  borderRadius: '100px',
                  border: '1px solid rgba(26, 21, 18, 0.1)',
                  background: '#ffffff',
                  padding: '6px 12px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none',
                  color: 'var(--es-charcoal)',
                }}
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      {/* Main Grid section */}
      <section style={{ padding: '72px 5% 100px 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 600, color: 'var(--es-charcoal)', margin: 0 }}>
            {filtered.length} sanctuar{filtered.length === 1 ? "y" : "ies"}
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--es-charcoal-60)', marginTop: '4px', margin: '4px 0 0 0' }}>Handpicked beauty spaces for you.</p>
        </div>

        {!loading && filtered.length > 0 ? (
          <InfiniteScroll
            dataLength={visibleSalons.length}
            next={loadMore}
            hasMore={visibleSalons.length < filtered.length}
            loader={
              <div
                className="es-salon-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '28px',
                  marginTop: '28px',
                }}
              >
                {Array.from({ length: 3 }, (_, i) => (
                  <SalonCardSkeleton key={`more-${i}`} />
                ))}
              </div>
            }
            endMessage={
              <div style={{ textAlign: 'center', marginTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '48px', height: '2px', background: 'linear-gradient(90deg, transparent, var(--es-emerald), transparent)' }} />
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--es-charcoal-60)', margin: 0 }}>
                  You&apos;ve seen all {filtered.length} sanctuaries
                </p>
              </div>
            }
          >
            <div
              className="es-salon-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '28px',
              }}
            >
              {visibleSalons.map((s, index) => (
                <article
                  key={s.salon_code || s.id || index}
                  style={{ animationDelay: `${index * 60}ms` }}
                  className="group animate-fade-up rounded-[2rem] bg-white border border-charcoal/5 overflow-hidden hover:shadow-[0_30px_80px_-40px_rgba(26,21,18,0.4)] transition-all duration-500 hover:-translate-y-1"
                >
                  <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
                    <img
                      src={s.front_image || s.banner_image || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                      alt={s.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                      className="group-hover:scale-105"
                      loading="lazy"
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,21,18,0.6) 0%, transparent 60%)' }} />
                    {s.is_featured && (
                      <span style={{ position: 'absolute', top: '16px', left: '16px', borderRadius: '100px', background: 'rgba(251, 247, 242, 0.95)', backdropFilter: 'blur(8px)', px: '12px', padding: '4px 12px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--es-emerald)', fontWeight: 600 }}>
                        Editor&apos;s Pick
                      </span>
                    )}
                    <span style={{ position: 'absolute', top: '16px', right: '16px', borderRadius: '100px', background: 'rgba(26,21,18,0.7)', color: 'var(--es-cream)', px: '12px', padding: '4px 12px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <StarIcon sx={{ fontSize: 13, color: '#F59E0B' }} /> {s.mappedRating.toFixed(1)}
                    </span>
                    <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', color: '#ffffff' }}>
                      <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.22em', opacity: 0.8 }}>{s.derivedCat}</div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 500, margin: '4px 0 0 0', lineHeight: 1.2 }}>{s.name}</h3>
                    </div>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--es-charcoal-60)', fontFamily: 'var(--font-sans)' }}>
                      <LocationOnOutlinedIcon sx={{ fontSize: 15, color: 'var(--es-emerald)' }} />
                      <span>{s.landmark || s.area || 'Address'}, {s.city_name || 'City'}</span>
                      {s.distanceLabel && (
                        <strong style={{ color: 'var(--es-emerald)', marginLeft: '4px' }}>
                          ({s.distanceLabel} away)
                        </strong>
                      )}
                    </div>
                    <p style={{ marginTop: '12px', fontSize: '14.5px', color: 'var(--es-charcoal)', margin: '12px 0 0 0', fontFamily: 'var(--font-sans)' }}>
                      {s.tag || 'Luxury Salon & Spa Experience'}
                    </p>
                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--es-charcoal-60)' }}>Rituals</div>
                        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--es-charcoal)', fontWeight: 500 }}>{s.priceLabel}</div>
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--es-charcoal-60)', fontFamily: 'var(--font-sans)' }}>Verified Reviews</span>
                    </div>
                    <Link
                      to={`/salon/detail/${s.salon_code}`}
                      className="es-book-btn"
                      style={{
                        marginTop: '20px',
                        width: '100%',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        textDecoration: 'none',
                        boxSizing: 'border-box'
                      }}
                    >
                      View salon <ArrowForwardIcon sx={{ fontSize: 14 }} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </InfiniteScroll>
        ) : loading ? (
          <div
            className="es-salon-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '28px',
            }}
          >
            {Array.from({ length: 6 }, (_, i) => <SalonCardSkeleton key={i} />)}
          </div>
        ) : (
          <div style={{ borderRadius: '32px', border: '1px solid rgba(26,21,18,0.1)', background: '#ffffff', padding: '64px 24px', textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: '24px', background: 'rgba(15,93,78,0.08)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <ContentCutOutlinedIcon sx={{ fontSize: 36, color: 'var(--es-emerald)' }} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--es-charcoal)', margin: '0 0 8px 0' }}>No salons match your search</h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14.5px', color: 'var(--es-charcoal-60)', margin: 0 }}>Try widening your filters or exploring a different category.</p>
          </div>
        )}
      </section>

      {/* Editorial CTA */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 96px auto', padding: '0 5%' }}>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '40px', background: 'var(--es-emerald)', color: 'var(--es-cream)', padding: '64px 48px' }}>
          <div style={{ position: 'absolute', right: '-80px', top: '-80px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.08)', filter: 'blur(40px)' }} />
          <div style={{ position: 'relative', maxWidth: '640px' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.28em', color: 'rgba(255,255,255,0.6)', marginBottom: '16px', fontWeight: 600 }}>For Salon Owners</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 600, color: 'var(--es-cream)', margin: '0 0 16px 0', lineHeight: 1.2 }}>
              Join the Eden Sign atlas.
            </h3>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', margin: '0 0 32px 0', lineHeight: 1.7 }}>
              We invite ateliers, studios and sanctuaries that share our craft. Apply for a curated listing and reach a discerning clientele across the world.
            </p>
            <a
              href="/#franchise"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '100px',
                background: 'var(--es-cream)',
                color: 'var(--es-emerald)',
                padding: '12px 28px',
                fontSize: '13.5px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--es-cream)')}
            >
              Request an invitation <ArrowForwardIcon sx={{ fontSize: 14 }} />
            </a>
          </div>
        </div>
      </section>

      <Brands />
      <Newsletter />
    </div>
  );
};

export default Salon;
