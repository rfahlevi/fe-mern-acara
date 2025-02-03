import DashboardLayout from "@/components/layouts/DashboardLayout";
import Transaction from "@/components/views/Member/Transaction";

const DashboardMemberPage = () => {
  return (
    <DashboardLayout
      title="Transaction"
      description="Member transaction"
      type="member"
    >
      <Transaction />
    </DashboardLayout>
  );
};
export default DashboardMemberPage;
