type Bindings = {
  RMC_BUCKET: R2Bucket;
  R2_DEV: string;
  DATABASE_URL: string;
};

interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profilePhoto?: File;
}
