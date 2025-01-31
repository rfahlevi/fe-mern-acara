import LandingPageLayaout from "@/components/layouts/LandingPageLayout";
import Event from "@/components/views/Event";
import React from "react";

const EventPage = () => {
  return (
    <LandingPageLayaout title="Acara | Event">
      <Event />
    </LandingPageLayaout>
  );
};

export default EventPage;
