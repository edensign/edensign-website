/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */
import React, { useEffect, useState } from 'react';
import ProductPageTop from './ProductPageTop';
import ProductCategoriesAndCard from './ProductCategories';

import {
  SkeletonStyles,
  ProductPageSkeleton,
} from '../../common/PageSkeletons';

/* ── Products page-level skeleton ── */
const ProductsLoadingSkeleton = () => (
  <>
    <SkeletonStyles />
    {/* Minimal header skeleton to match new design */}
    <div style={{ background: 'var(--es-background)', padding: '120px 24px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div className="es-sk" style={{ height: '12px', width: '160px', borderRadius: '6px' }} />
      <div className="es-sk" style={{ height: '48px', width: '320px', borderRadius: '8px' }} />
      <div className="es-sk" style={{ height: '16px', width: '480px', borderRadius: '6px' }} />
    </div>
    <ProductPageSkeleton />
  </>
);

function Product() {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPageLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  if (!pageLoaded) {
    return <ProductsLoadingSkeleton />;
  }

  return (
    <>
      <SkeletonStyles />
      <ProductPageTop />
      <ProductCategoriesAndCard />
    </>
  )
}

export default Product