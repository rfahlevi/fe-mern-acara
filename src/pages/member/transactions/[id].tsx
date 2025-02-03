import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Member/Transaction/DetailTransaction";

const DashboardMemberPage = () => {
  return (
    <DashboardLayout
      title="DetailTransaction"
      description="Information for spesific transaction"
      type="member"
    >
      <DetailTransaction />
    </DashboardLayout>
  );
};
export default DashboardMemberPage;
