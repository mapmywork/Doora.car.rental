export interface WhatsAppOrderDetails {
  id: string;
  customerName: string;
  phone: string;
  vehicle: string;
  pickupDate: string | Date;
  dropDate: string | Date;
  pickupLocation?: string | null;
}

/**
 * Generates a wa.me link with a pre-filled confirmation message.
 */
export function generateWhatsAppConfirmationLink(order: WhatsAppOrderDetails): string {
  // Format dates cleanly
  const pickup = new Date(order.pickupDate).toLocaleDateString(undefined, {
    weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  const drop = new Date(order.dropDate).toLocaleDateString(undefined, {
    weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  // Construct message
  const message = `Hello ${order.customerName},\n\nYour booking with Way2Car is confirmed! 🎉\n\n*Booking ID:* ${order.id.slice(0, 8).toUpperCase()}\n*Vehicle:* ${order.vehicle}\n*Pickup:* ${pickup}\n*Dropoff:* ${drop}${order.pickupLocation ? `\n*Location:* ${order.pickupLocation}` : ''}\n\nThank you for choosing Way2Car! Drive safe.`;

  // Format phone number: remove non-digits
  let formattedPhone = order.phone.replace(/\D/g, "");
  // Assuming default country code is India (91) if 10 digits
  if (formattedPhone.length === 10) {
    formattedPhone = `91${formattedPhone}`;
  }

  // URL encode message
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}
