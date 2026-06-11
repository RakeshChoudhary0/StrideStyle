"use client";

import React, { useState } from "react";
import HeroCategoryNav from "./components/HeroCategoryNav";
import FeaturesCard from "./components/FeaturesCard";

const Features = () => {
  const [activeTab, setActiveTab] = useState("MEN TEE");
  return (
    <div>
      <HeroCategoryNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <FeaturesCard activeTab={activeTab} />
    </div>
  );
};

export default Features;
