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
    email: string;
    fullName: string;
    exp: number;
  };
};

interface User {
  email: string;
  fullName: string;
  password: string;
  profilePhoto?: File;
}

interface University {
  name: string;
  fee: string;
  topField: string;
  status: string;
  campuses: string;
  mainCampus: string;
  logo: File;
  coverPhoto: File;
}

interface Post {
  content: string;
  universityId: number;
  userId: number;
  photo?: File;
}

interface Comment {
  comment: string;
  userId: number;
  postId: number;
}
