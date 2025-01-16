import DashboardLayout from "@/components/layouts/DashboardLayout";
import Event from "@/components/views/Admin/Event";
import React from "react";

const AdminEventPage = () => {
  return (
    <DashboardLayout
      title="Event"
      description="List of all events, create new and manage existing ones"
      type="admin"
    >
      <Event />
    </DashboardLayout>
  );
};

export default AdminEventPage;
