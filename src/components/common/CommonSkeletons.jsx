/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 */

import React from 'react';
import { Box, Skeleton } from '@mui/material';

/**
 * Shimmer animation style to be used with standard HTML elements if MUI Skeleton is not preferred
 */
export const shimmerStyle = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .skeleton-shimmer {
    background: linear-gradient(90deg, #f0ebe6 25%, #e8e0d8 50%, #f0ebe6 75%);
    background-size: 200% 100%;
    animation: shimmer 1.6s infinite linear;
  }
`;

/**
 * A generic card skeleton
 */
export const CardSkeleton = () => (
  <Box sx={{ 
    background: '#fff', 
    borderRadius: '20px', 
    overflow: 'hidden', 
    boxShadow: '0 4px 20px rgba(26,10,0,0.05)', 
    border: '1px solid rgba(199,149,108,0.08)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }}>
    <Skeleton variant="rectangular" height={240} animation="wave" sx={{ bgcolor: '#f0ebe6' }} />
    <Box sx={{ p: 2.5 }}>
      <Skeleton variant="text" width="40%" height={15} animation="wave" sx={{ bgcolor: '#f0ebe6', mb: 1 }} />
      <Skeleton variant="text" width="80%" height={25} animation="wave" sx={{ bgcolor: '#f0ebe6', mb: 1.5 }} />
      <Skeleton variant="text" width="95%" height={15} animation="wave" sx={{ bgcolor: '#f0ebe6', mb: 0.5 }} />
      <Skeleton variant="text" width="60%" height={15} animation="wave" sx={{ bgcolor: '#f0ebe6', mb: 2 }} />
      <Skeleton variant="rectangular" width="100%" height={40} borderRadius="12px" animation="wave" sx={{ bgcolor: '#f0ebe6', borderRadius: '12px' }} />
    </Box>
  </Box>
);

/**
 * A banner/hero skeleton
 */
export const BannerSkeleton = () => (
  <Box sx={{ width: '100%', height: { xs: '300px', md: '500px' }, position: 'relative', overflow: 'hidden' }}>
    <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" sx={{ bgcolor: '#f0ebe6' }} />
    <Box sx={{ 
      position: 'absolute', 
      top: '50%', 
      left: '10%', 
      transform: 'translateY(-50%)', 
      width: { xs: '80%', md: '40%' } 
    }}>
      <Skeleton variant="text" width="30%" height={20} animation="wave" sx={{ bgcolor: '#e8e0d8', mb: 2 }} />
      <Skeleton variant="text" width="100%" height={60} animation="wave" sx={{ bgcolor: '#e8e0d8', mb: 2 }} />
      <Skeleton variant="text" width="100%" height={60} animation="wave" sx={{ bgcolor: '#e8e0d8', mb: 3 }} />
      <Skeleton variant="rectangular" width="150px" height={50} animation="wave" sx={{ bgcolor: '#e8e0d8', borderRadius: '30px' }} />
    </Box>
  </Box>
);

/**
 * A section title skeleton
 */
export const SectionTitleSkeleton = () => (
  <Box sx={{ textAlign: 'center', mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Skeleton variant="text" width="120px" height={20} animation="wave" sx={{ bgcolor: '#f0ebe6', mb: 1 }} />
    <Skeleton variant="text" width="300px" height={50} animation="wave" sx={{ bgcolor: '#f0ebe6' }} />
  </Box>
);

/**
 * A list/grid skeleton wrapper
 */
export const GridSkeleton = ({ count = 6, columns = { xs: 1, sm: 2, md: 3 } }) => (
  <Box sx={{ 
    display: 'grid', 
    gridTemplateColumns: {
      xs: `repeat(${columns.xs}, 1fr)`,
      sm: `repeat(${columns.sm}, 1fr)`,
      md: `repeat(${columns.md}, 1fr)`,
    },
    gap: 3,
    width: '100%'
  }}>
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </Box>
);
