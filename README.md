# 🌟**RateMyCampus**

Welcome to RateMyCampus – A comprehensive platform for students to review, rate, and interact with their university community. Built with a secure, scalable, and highly responsive full-stack architecture, this project is designed for a seamless user experience.

## 🚀 **Key Features**

- 🔐 **Secure User Authentication**
- 🏫 **University Reviews and Ratings**
- ⭐ **Interactive Comments & Media Attachments**
- 📸 **Image Uploads**
- 📱 **Responsive User Interface**

## 📂 **Project Structure**

This repository contains both the client and server code, each with their own environment configurations:

```bash
RateMyCampus/
├── client/                # Frontend code (React)
│   ├── .env               # Client-specific environment variables
│   └── src/               # Client source code
│
├── server/                # Backend code (Hono.js for serverless functions)
│   ├── .env               # Server-specific environment variables
│   ├── wrangler.toml      # Cloudflare Workers secrets
│   └── src/               # Server source code
│
└── README.md              # Project overview

```

## 🛠️ **Quick Start**

### **1. Prerequisites**

Ensure the following are installed:

- **Node.js** (v20.x or higher)
- **PostgreSQL** (a cloud provider like NeonTech or Aiven)
- **Prisma Accelerate** (or any Connection pooling service)
- **Wrangler CLI** (for Cloudflare Workers deployment)

### **2. Clone the Repository**

```bash
git clone https://github.com/shahzaib-afzal/ratemycampus.git
cd ratemycampus
```

### **3. Setup Environment Variables**

Each part of the project requires its own environment configuration:

#### **For Client**

1. Navigate to the client directory and set up the environment:

```bash
  cd client
  cp .env.example .env
```

2. Update the .env file with client-specific variables.

#### **For Server**

1. Navigate to the server directory and configure both .env and wrangler.toml:

```bash
  cd server
  cp .env.example .env
  cp wrangler.example.toml wrangler.toml
```

2. Update the .env and wrangler.toml with server-specific variables and secrets

### **4. Install Dependencies**

```bash
cd client
npm install
cd server
npm install
```

### **5. Running the Application**

You can run both the client and server simultaneously or in separate terminals.

#### **For Client (Frontend)**

```bash
cd client
npm run dev
```

#### **For Server (Backend)**

```bash
cd server
npx prisma migrate
npm run prisma:generate
npm run dev
```

### **6. Access the Application**

Once both the frontend and backend are running, visit the app at:

```bash
http://localhost:5173
```

## 💻**Tech Stack**

- Frontend: React.js, Recoil.js, Tailwind CSS
- Backend: Hono.js (serverless functions)
- Database: PostgreSQL
- ORM: Prisma
- Storage: Cloudflare R2 for images
- Authentication: JWT (JSON Web Tokens)
- Validation: Zod schema validation
- Email Service: Brevo

## 🌐 **Deployment**

This project is designed for cloud deployment with minimal configuration:

- Frontend: Cloudflare Pages
- Backend: Cloudflare Workers
- Database: PostgreSQL (NeonTech)

For detailed deployment steps, check the README files in the client and server directories.

## 📜 **Additional Information**

- For running the server locally with Cloudflare Workers, ensure that Wrangler CLI is installed and wrangler.toml and .env file is properly configured with secrets.
- The client and server directories have their own secrets and environment settings, ensuring modularity and security.
