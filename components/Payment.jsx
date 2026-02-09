import CustomButton from "./CustomButton";

export default function Payment() {
  const openPaymentSheet = async () => {};
  return (
    <CustomButton
      title="Confirm Booking"
      className="mt-10"
      onPress={openPaymentSheet}
    />
  );
}
