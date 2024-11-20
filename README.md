# API Documentation

## Authentication Endpoints

### Register User
```
POST /api/auth/register
```
Request body:
```json
{
  "username": "string",
  "fullName": "string",
  "email": "string",
  "password": "string"
}
```
Response:
```json
{
  "message": "User registered successfully"
}
```

### Login
```
POST /api/auth/login
```
Request body:
```json
{
  "username": "string",
  "password": "string"
}
```
Response:
```json
{
  "token": "string"
}
```

## Profile Endpoints

### Get User Profile
```
GET /api/profile
```
Headers:
```
Authorization: JWT_TOKEN
```
Response:
```json
{
  "id": "number",
  "username": "string",
  "full_name": "string",
  "email": "string",
  "profile_picture": "string | null"
}
```

### Update Profile
```
PUT /api/profile
```
Headers:
```
Authorization: JWT_TOKEN
Content-Type: multipart/form-data
```
Request body:
```
username: string
profilePicture: File (optional)
```
Response:
```json
{
  "id": "number",
  "username": "string",
  "full_name": "string",
  "email": "string",
  "profile_picture": "string | null"
}
```

## Protected Route
```
GET /protected
```
Headers:
```
Authorization: JWT_TOKEN
```
Response:
```json
{
  "message": "This is a protected route",
  "user": {
    "id": "number"
  }
}
```
