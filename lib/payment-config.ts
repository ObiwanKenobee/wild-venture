// Payment provider configuration
export const paymentConfig = {
  paypal: {
    clientId:
      process.env.PAYPAL_CLIENT_ID ||
      "ARZQ__plfO77HymSNkCFPFpAmYJ0rlAlJ0mnq58_qHy4W9K7adf2mJs12xrYEDn3IQWxBMSXJnFqmnei",
    clientSecret:
      process.env.PAYPAL_CLIENT_SECRET ||
      "EBvNxIzZVwak6PyIr7ywIzSeIMfU5PBsPpU0vwEhZgCzvQ5LTPJdigMVaWgR400fdFsGpIVnUK5jdPKO",
    environment: process.env.NODE_ENV === "production" ? "live" : "sandbox",
    baseUrl: process.env.NODE_ENV === "production" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com",
  },
  paystack: {
    publicKey: process.env.PAYSTACK_PUBLIC_KEY || "pk_live_6dcd0c152d43e1f2c0d004d6fdbe3e9fa1e67812",
    secretKey: process.env.PAYSTACK_SECRET_KEY || "sk_live_6dcd0c152d43e1f2c0d004d6fdbe3e9fa1e67812", // Note: You provided the public key twice, this should be the secret key
    baseUrl: "https://api.paystack.co",
  },
}

export const webhookSecrets = {
  paypal: process.env.PAYPAL_WEBHOOK_SECRET,
  paystack: process.env.PAYSTACK_WEBHOOK_SECRET,
}
