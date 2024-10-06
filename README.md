# LegalAI - AI-Powered Legal Document Analyzer
LegalAI is an advanced AI-powered platform designed to simplify and automate the analysis of legal documents. By leveraging cutting-edge large language models (LLMs), LegalAI helps users quickly review contracts, agreements, and other legal documents by summarizing them and identifying key clauses such as risks, liabilities, and payment terms. LegalAI is built using Next.js and integrates with MongoDB Atlas, PropelAuth for authentication, and AWS for hosting and deployment, managed via Terraform.

## Features
## 🚀 AI-Powered Document Summarization
Legal Document Summarization: Analyze large legal documents and get summarized insights with AI.
Key Clauses Identified:
Clarity and Accuracy of Terms
Liabilities and Risks
Termination Clauses
Payment Terms
Confidentiality and Intellectual Property
Dispute Resolution
Obligations and Responsibilities
Warranties and Guarantees
## 🔒 User Authentication (PropelAuth)
Google OAuth and Email Signups: Users can sign up using Google accounts or their email.
Secure and Fast Authentication: Powered by PropelAuth to ensure easy and secure logins.
## 📂 Document Upload & Management
Drag-and-Drop File Uploads: Upload legal documents effortlessly using Uploadthing.
No Page Limitations: Users can upload large legal documents without restrictions.
Dashboard View: Manage, view, and review previously uploaded legal documents from a user-friendly dashboard.
## 📊 Legal Solutions & Insights
Tailored Legal Solutions: After summarizing the document, the platform suggests actionable solutions and provides recommendations to address identified risks and concerns.
Benefits
## ✅ Speed & Accuracy
By automating legal document review, LegalAI drastically reduces the time needed to understand complex legal terms while maintaining a high level of accuracy.

## 💼 Cost-Effective
LegalAI helps reduce the need for expensive legal teams by providing users with quick insights into their documents, reducing legal costs.

## 🔐 Secure Document Management
Every user's document and data is securely managed with MongoDB Atlas and is associated with the authenticated user for streamlined management.

## ⚖️ Compliance & Risk Mitigation
By identifying key terms and potential risks, users are empowered to make faster decisions with more confidence, ensuring they are aware of any liabilities or obligations.

## Technologies Used
## 🖥 Frontend
Next.js: Framework used for building a dynamic, server-rendered React application.
React: For building interactive user interfaces.
Tailwind CSS: Provides a modern, utility-first approach to styling the application.
## 🔧 Backend
Node.js: Server-side runtime for handling API routes and managing the app's backend.
Large Language Models (LLMs): For analyzing and summarizing legal documents using AI.
## 🗂 Authentication
PropelAuth: Secure authentication system supporting Google OAuth and email-based signups.
## 📦 File Upload & Storage
Uploadthing: Handles file uploads and integrates with MongoDB for secure user data management.
## 🗄 Database
## MongoDB Atlas: A cloud-based NoSQL database to store user and document data efficiently.
☁️ Deployment & Hosting
## AWS (Amazon Web Services): Hosting infrastructure, ensuring scalability and reliability.
Terraform: Infrastructure as Code (IaC) tool used for automating AWS resource provisioning.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


