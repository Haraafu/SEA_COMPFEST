# SEA Salon Application
## Overview
SEA Salon is a web application for managing salon services, reservations, and customer reviews. The application has separate functionalities for customers and admins. Customers can book reservations and leave reviews, while admins can manage services offered by the salon.## Technologies Used
- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB (using Mongoose for ODM)
- Authentication: bcrypt for password hashing
- Axios for HTTP requests

## Setup Instructions

1. Open `server.js` and change `uri` to your MongoDB URL.
2. Install all dependencies:

    ```bash
    npm install
    ```

3. Start the backend server in the `SEA-Salon_BE` folder:

    ```bash
    npm start
    ```

4. Start the frontend development server in the `SEA-Salon` folder:

    ```bash
    npm run dev
    ```

The application should now be running at [http://localhost:3000](http://localhost:3000).


### Seeding Admin User
To create the hardcoded admin user (already created), run the following script in the `SEA-Salon_BE` folder:

```bash
cd scripts
node admin.js
```

### API Endpoints
- Auth
  - POST /api/auth/login: User login
- User
  - POST /api/users: User registration
- Reservation
    - GET /api/reservations: Get all reservations
    - POST /api/reservations: Create a new reservation
- Review
    - GET /api/reviews: Get all reviews
    - POST /api/reviews: Create a new review
- Service
    - GET /api/services: Get all services
    - POST /api/services: Add a new service
### Frontend Components
- Home.jsx: Main page with sign in and sign up modals
- AdminDashboard.jsx: Admin dashboard for managing - services
- Review.jsx: Component for leaving and viewing reviews

### Backend Components
#### Models
- Reservation.js: Defines the schema for reservations, including fields for the user's name, phone number, service type, date, and time.
- Review.js: Defines the schema for reviews, including fields for the reviewer's name, rating, and comment.
- Service.js: Defines the schema for services, including the service name and duration.
- User.js: Defines the schema for users, including fields for full name, email, phone number, password (hashed), and role (customer or admin).

#### Routes
- auth.js: Handles user authentication routes, including login.
- reservation.js: Handles reservation routes, including creating and retrieving reservations.
- review.js: Handles review routes, including creating and retrieving reviews.
- service.js: Handles service routes, including adding and retrieving services.
- user.js: Handles user routes, including user registration and retrieval.

### Adding New Services
Admins can log in and navigate to the admin dashboard to add new services.