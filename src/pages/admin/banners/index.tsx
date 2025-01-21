import DashboardLayout from "@/components/layouts/DashboardLayout";
import Banner from "@/components/views/Admin/Banner";
import React from "react";

const AdminBannerPage = () => {
  return (
    <DashboardLayout
      title="Banner"
      description="List of all banners, create new and manage existing ones"
      type="admin"
    >
      <Banner />
    </DashboardLayout>
  );
};

export default AdminBannerPage;
