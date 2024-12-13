# CourseMate API

CourseMate API is the backend service for the CourseMate application, providing user authentication, personalized course recommendations, and profile management features. Built with a focus on scalability and performance, this API ensures seamless integration with the mobile front-end and other services.

---

## Documentation
Access the full API documentation through Swagger:
- [Swagger Documentation](https://capstone-project-442014.et.r.appspot.com/api-docs/)

---

## Cloud Architecture
<p align="center">
  <img src="https://storage.googleapis.com/coursemate-imagestorage/logo-app/Coursemate-Architecture.png" style="width: 100%">
</p>

---

## Google Cloud Platform Services Pricing

| Service | Component | Quantity | Region | Total Price (USD) |
|---------|-----------|----------|--------|------------------|
| Vertex AI Model (Generative AI) | Gemini 1.5 Flash Text Input - Predictions | 266,145.83 | global | $0.00499 |
| Vertex AI Model (Generative AI) | Gemini 1.5 Flash Text Output - Predictions | 234,208.33 | global | $0.01757 |
| Chatbot (Cloud Run) | CPU Allocation Time (tier 2) | 37,500,000 | global | $1.26 |
| Chatbot (Cloud Run) | Memory Allocation Time (tier 2) | 18,750,000 | global | $0.06562 |
| Chatbot (Cloud Run) | Requests | 10,000,000 | global | $3.20 |
| Course Recommendation API (Cloud Run) | CPU Allocation Time (tier 2) | 37,500,000 | global | $1.26 |
| Course Recommendation API (Cloud Run) | Memory Allocation Time (tier 2) | 37,500,000 | global | $0.13125 |
| Course Recommendation API (Cloud Run) | Requests | 10,000,000 | global | $3.20 |
| coursemate-database (MySQL) (Cloud SQL) | Cloud SQL for MySQL: Zonal - Micro instance in Americas | 730.00 | us-central1 | $7.665 |
| coursemate-database (MySQL) (Cloud SQL) | Cloud SQL for MySQL: Zonal - Standard storage in Americas | 7,300.00 | us-central1 | $1.70 |
| Coursemate API Service (App Engine) | Frontend Instances Jakarta | 1.00 | asia-southeast2 | $0.00 |
| coursemate-imagestorage (Cloud Storage) | Standard Storage US Regional | 1.00 | us-east1 | $0.00 |
| course-recommendation-data-bucket (Cloud Storage) | Standard Storage US Regional | 1.00 | us-east1 | $0.00 |

**Total Estimated Cost: $18.50443/Month**

---


## Features

### Authentication & User Management
- **User Registration**: Create a new user account.
- **Login**: Authenticate user credentials.
- **Forgot/Reset Password**: Handle password recovery via OTP.

### Profile Management
- View and update user profiles.

### Favorites
- Add or remove courses from the favorites list.
- Retrieve a list of all favorite courses.

### Course Recommendations
- Get personalized course recommendations based on user preferences and learning styles.

---

## Directory Structure

```
project-root/
├── controllers/       # Request handlers for API endpoints
├── models/            # Database schemas and models
├── routes/            # API routes
├── config/            # Configuration files (e.g., database, environment)
├── db/                # Example of SQL Tables we use
├── utils/             # Handle generating otp number
├── server.js          # Main entry point of the API
└── README.md          # Documentation file
```

---

## API Endpoints

> [!NOTE]
> **Note**: Certain endpoints require a `<Bearer Token>` and specific permissions to access. Ensure you are authenticated and authorized to use these endpoints.

### **Authentication**
| Method | Endpoint              | Description             |
|--------|-----------------------|-------------------------|
| POST   | `/auth/register`      | Register a new user     |
| POST   | `/auth/login`         | User login              |
| POST   | `/auth/forgot-password` | Request password reset |
| POST   | `/auth/reset-password` | Reset password with OTP|

### **Profile**
| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/profile`            | Get user profile         |
| PUT    | `/profile`            | Update user profile      |

### **Favorites**
| Method | Endpoint              | Description                           |
|--------|-----------------------|---------------------------------------|
| POST   | `/favorites/toggle`   | Add or remove a course from favorites |
| GET    | `/favorites`          | Get all favorite courses              |

---

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- A MySQL database instance

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd project-root
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Configuration
1. Create a `.env` file in the root directory with the following variables:
   ```env
    DB_HOST=<your_db_host_here>
    DB_USER=<your_db_user_here>
    DB_PASSWORD=<your_db_password_here>
    DB_NAME=<your_db_name_here>
    JWT_SECRET=<your_jwt_secret_here>
    PORT=5000
    GOOGLE_CLOUD_PROJECT_ID=<your_google_cloud_project_id_here>
    GOOGLE_CLOUD_BUCKET_NAME=<your_bucket_name_here>
    EMAIL_USER=<your_email_here>
    EMAIL_PASS=<your_email_password_here>
   ```

2. Run database migrations (if applicable).

### Running the Server
Start the development server:
```bash
npm start
```
The API will be available at `http://localhost:5000`.

---

## Tech Stack
- **Backend Framework**: Node.js with Express
- **Database**: MySQL
- **Cloud Platform**: Google Cloud Platform (GCP)
  - App Engine for API hosting
  - Cloud SQL for database management
  - Cloud Storage for static assets
- **Authentication**: JWT (JSON Web Token)

---
