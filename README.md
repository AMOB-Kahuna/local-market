# LocalMarket

A platform connecting local businesses with customers in their area. Browse businesses by category, view ratings and reviews, and register your own business to reach more customers.

## Features

- **Browse Businesses**: Search and filter businesses by category
- **Ratings & Reviews**: View customer reviews and ratings for each business
- **Business Registration**: Register your business and manage your profile
- **Seller Dashboard**: Track your business, manage listings, and respond to reviews
- **User Authentication**: Secure signup and login with JWT tokens

## Tech Stack

### Frontend
- React + Vite
- React Router for navigation
- Tailwind CSS for styling
<!-- - Axios for API calls -->

### Backend
- Django REST Framework
- JWT Authentication (djangorestframework-simplejwt)
- SQLite (development) / PostgreSQL (production)
- CORS support

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirement.txt
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

### Frontend Setup

1. Navigate to client directory:
   ```bash
   cd client
   ```

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Running the Application

- Backend: `python manage.py runserver`
- Frontend: `npm run dev`

---
