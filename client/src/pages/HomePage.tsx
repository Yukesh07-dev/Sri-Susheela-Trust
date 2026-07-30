import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Hero } from '../sections/Hero';
import { AboutSection } from '../sections/About';
import { MissionSection } from '../sections/Mission';
import { VisionSection } from '../sections/Vision';
import { ActivitiesSection } from '../sections/Activities';
import { ImpactStatisticsSection } from '../sections/ImpactStatistics';
import { GallerySection } from '../sections/Gallery';
import { TimelineSection } from '../sections/TimelineSection';
import { TestimonialsSection } from '../sections/Testimonials';
import { PartnersSection } from '../sections/Partners';
import { ContactSection } from '../sections/Contact';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <MissionSection />
      <VisionSection />
      <ActivitiesSection />
      <ImpactStatisticsSection />
      <GallerySection />
      <TimelineSection />
      <TestimonialsSection />
      <PartnersSection />
      <ContactSection />
    </>
  );
};
