/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */
import React, { useState, useEffect } from 'react'
import ProductPageTop from './ProductPageTop'
import ProductCategoriesAndCard from './ProductCategories';

import {
  SkeletonStyles,
  PageTopBannerSkeleton,
  ProductPageSkeleton,
} from '../../common/PageSkeletons';

/* ── Products page-level skeleton ── */
const ProductsLoadingSkeleton = () => (
  <>
    <SkeletonStyles />
    <PageTopBannerSkeleton height="72vh" />
    <ProductPageSkeleton />
  </>
);

function Product() {
  const [searchQuery, setSearchQuery] = useState('');
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
      <ProductPageTop searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ProductCategoriesAndCard searchQuery={searchQuery} />
    </>
  )
}

export default Product