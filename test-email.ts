import { sendBookingConfirmation } from './src/lib/email';

async function test() {
  console.log("Starting email test...");
  const result = await sendBookingConfirmation("bhosalevikaas10@gmail.com", {
    customerName: "Test User",
    confirmationCode: "W2C-123456",
    vehicleName: "Toyota Camry",
    pickupDate: "2026-07-01 10:00 AM",
    dropoffDate: "2026-07-05 10:00 AM",
    pickupLocation: "Airport",
    dropoffLocation: "Airport",
    totalPrice: "₹4,500.00"
  });
  console.log("Email sent result:", result);
}

test().catch(console.error);
