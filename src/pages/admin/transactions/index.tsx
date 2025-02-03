import DashboardLayout from "@/components/layouts/DashboardLayout";
import Transaction from "@/components/views/Admin/Transaction";

const DashboardAdminPage = () => {
  return (
    <DashboardLayout
      title="Transaction"
      description="Admin transaction"
      type="admin"
    >
      <Transaction />
    </DashboardLayout>
  );
};
export default DashboardAdminPage;
