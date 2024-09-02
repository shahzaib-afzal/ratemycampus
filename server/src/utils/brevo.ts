export const sendVerificationEmail = async (
  email: string,
  token: string,
  env: Bindings
) => {
  const verificationUrl = `${env.VERIFICATION_ROUTE}?token=${token}`;
  const emailData = {
    to: [{ email }],
    templateId: env.TEMPLATE_ID,
    params: {
      verificationUrl,
    },
  };
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": env.BREVO_API,
    },
    body: JSON.stringify(emailData),
  });
  if (!response.ok) {
    throw new Error("Failed to send email");
  }
};
