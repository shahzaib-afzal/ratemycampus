type Bindings = {
  RMC_BUCKET: R2Bucket;
  R2_DEV: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  BREVO_API: string;
  TEMPLATE_ID: number;
  VERIFICATION_ROUTE: string;
};

interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profilePhoto?: File;
}

interface University {
  name: string;
  fee: string;
  rating: string;
  topField: string;
  status: string;
  campuses: string;
  mainCampus: string;
  logo: File;
  coverPhoto: File;
}
