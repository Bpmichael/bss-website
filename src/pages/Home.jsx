import React from "react";
import { useI18n } from "../lib/i18n.jsx";

import Hero from "../components/Hero.jsx";
import SchoolAdmission from "../components/SchoolAdmission.jsx";
import JobCenter from "../components/JobCenter.jsx";
import Internship from "../components/Internship.jsx";
import About from "../components/About.jsx";

export default function Home() {
  const { t } = useI18n();

  return (
    <>
      <Hero />
      <SchoolAdmission />
      <JobCenter />
      <Internship />
      <About />
    </>
  );
}
