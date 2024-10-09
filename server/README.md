# **Server - RateMyCampus**

## **Overview**

This directory contains the backend code for the RateMyCampus platform, built using Hono.js (a fast web framework for Cloudflare Workers). The backend is responsible for handling API requests, managing authentication, storing user data, and processing reviews.

## 🛠️ **Tech Stack**

- Hono.js (Backend framework for Cloudflare Workers)
- PostgreSQL (Database)
- Prisma (Database ORM)
- Cloudflare Workers (Serverless deployment)
- Cloudflare R2 (Object storage for images)
- Brevo (Email API service)
- BcryptJS (Password Encryption)

## 🚀 **Getting Started**

### **1. Install dependencies:**

Make sure you have Node.js and npm installed, then run:

`npm install`

### **2. Create a Cloudflare Workers account:**

- Sign up for an account on Cloudflare.
- Log in to your Cloudflare account using the Wrangler CLI:
  `npx wrangler login`

### **3. Set up environment variables:**

Copy wrangler.example.toml and .env.example to wrangler.toml and .env and add the secrets both files, full detail is given in both files, Add all the secrets like brevo api, template ids, R2 Bucket setup etc and then you are good to go

### **4. Run the development server:**

Start the wrangler development server:  
`npm run dev`

The api will be accessible at <http://localhost:8787>.

## 🖼️ **Deployment**

- Once you’ve completed the setup, deploy your backend to Cloudflare Workers:  
  `npm run deploy`
- The API will be live, and you can connect it to the frontend or use tools like Postman to test the endpoints
