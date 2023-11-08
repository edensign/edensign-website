/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import React from "react";
import { useState , useEffect } from "react";

import API from '../../../apis';
import "./style.css";
import Brands from "../../common/Brands";
import FilterMenu from "../../common/FilterMenu";
import Newsletter from "../../common/Newsletter";
import SalonListCards from './SalonListCards';
import SalonPageTop from "./SalonPageTop";


const Salon = () => {
  //variable for showing selective filter menu fields
  const [showCategory, showGender, showUnisex] = [true, true, true];
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGender, setSelectedGender] = useState('');


  const handleFilterChange = (gender, filterSkills) => {
    gender ? setSelectedGender(gender) : '';
    if (filterSkills) {
      console.log(skills.filter(skill => filterSkills.includes(skill.name)));
      setSelectedSkill(skills
        .filter(skill => filterSkills.includes(skill.name))
        .map(skill => skill.id));
    }
  };


  return (
    <>
      <SalonPageTop />
      <FilterMenu showCategory={showCategory} showGender={showGender} showUnisex={showUnisex} onFilter={handleFilterChange} />
      <SalonListCards selectedCategory={selectedCategory} selectedGender={selectedGender} />
      <Newsletter />
      <Brands />
    </>
  );
}

export default Salon;
