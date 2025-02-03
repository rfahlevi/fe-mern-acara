import AuthLayout from "@/components/layouts/AuthLayout";
import Payment from "@/components/views/Payment";
import authServices from "@/services/auth.service";

const PaymentPage = () => {
  return (
    <AuthLayout title="Acara | Payment">
      <Payment />
    </AuthLayout>
  );
};

export default PaymentPage;
