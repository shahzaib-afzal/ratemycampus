type Bindings = {
  RMC_BUCKET: R2Bucket;
  R2_DEV: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  BREVO_API: string;
  TEMPLATE_ID: number;
  VERIFICATION_ROUTE: string;
  SUPER_USER: string;
};

type Variables = {
  userInfo: {
    email: string;
    firstName: string;
    lastName: string;
    exp: number;
  };
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
  rating?: string;
  topField: string;
  status: string;
  campuses: string;
  mainCampus: string;
  logo: File;
  coverPhoto: File;
}
