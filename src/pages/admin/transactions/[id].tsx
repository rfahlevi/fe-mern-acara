import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Admin/Transaction/DetailTransaction";

const DashboardMemberPage = () => {
  return (
    <DashboardLayout
      title="DetailTransaction"
      description="Information for spesific transaction"
      type="admin"
    >
      <DetailTransaction />
    </DashboardLayout>
  );
};
export default DashboardMemberPage;
