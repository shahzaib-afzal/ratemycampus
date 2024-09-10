type Bindings = {
  RMC_BUCKET: R2Bucket;
  R2_DEV: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  BREVO_API: string;
  TEMPLATE_ID: number;
  VERIFICATION_ROUTE: string;
  SUPER_USER: string;
  RESET_PASSWORD_ROUTE: string;
  RESET_TEMPLATE: number;
};

type Variables = {
  userInfo: {
    id: number;
    email: string;
    fullName: string;
    exp: number;
  };
};
