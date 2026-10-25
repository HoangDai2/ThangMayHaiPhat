"use client";

import React from "react";
import { ServiceHero } from "../components/services/ServiceHero";
import { ContactHub } from "../components/services/ContactHub";
import { MaintenancePillars } from "../components/services/MaintenancePillars";
import { MaintenanceProcess } from "../components/services/MaintenanceProcess";
import { EmergencyBanner } from "../components/services/EmergencyBanner";
import { ServiceFaq } from "../components/services/ServiceFaq";

export default function ServicesPage() {
  return (
    <div className="bg-white flex flex-col min-h-screen text-slate-800 antialiased selection:bg-[#285c9a] selection:text-white">
      {/* 1. Service Hero Header with Systematic Breadcrumb & Technical Telemetry */}
      <ServiceHero />

      {/* 2. Service Subsystem 1: Technical Consultation Hub & Quick Survey Quotation Form */}
      <ContactHub />

      {/* 3. Service Subsystem 2: Warranty & Periodic Maintenance (3 Golden Pillars) */}
      <MaintenancePillars />

      {/* 4. Standard 4-Step Mechanical Maintenance Timeline */}
      <MaintenanceProcess />

      {/* 5. 24/7 Rapid Response & Emergency Rescue SLA Banner */}
      <EmergencyBanner />

      {/* 6. Technical FAQ & Engineering Insights */}
      <ServiceFaq />
    </div>
  );
}
