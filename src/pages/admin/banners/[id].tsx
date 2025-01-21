import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailBanner from "@/components/views/Admin/Banner/DetailBanner";
import React from "react";

const AdminDetailBannerPage = () => {
  return (
    <DashboardLayout
      title="Detail Banner"
      description="Manage information for this banner"
      type="admin"
    >
      <DetailBanner />
    </DashboardLayout>
  );
};

export default AdminDetailBannerPage;
