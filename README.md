# SEA Salon

## Setup Instructions

### Environment Variables

Create a `.env` file in the `SEA-Salon_BE` directory with the following content:

```
PORT=3000
MONGO_URI=your_mongo_uri
SECRET_KEY=your_secret_key
```

Replace `your_mongo_uri` with your MongoDB connection string and `your_secret_key` with a secret key for your application.

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/sea-salon.git
    cd sea-salon
    ```

2. **Install all dependencies:**
    ```bash
    npm install
    ```

### Running the Application

1. **Backend:**
    - Change the MongoDB URI in `server.js` to your MongoDB URL.
    - Start the backend server:
    ```bash
    cd SEA-Salon_BE
    npm start
    ```

2. **Frontend:**
    - Start the frontend development server:
    ```bash
    cd SEA-Salon
    npm run dev
    ```

The application should now be running at `http://localhost:3000`.

### Seeding Admin User

To create the hardcoded admin user (Thomas N), run the following script:

```bash
cd SEA-Salon_BE
node scripts/admin.js
```

### Project Structure

```
/sea-salon
├── SEA-Salon
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
├── SEA-Salon_BE
│   ├── models
│   │   ├── Reservation.js
│   │   ├── Review.js
│   │   ├── Service.js
│   │   └── User.js
│   ├── routes
│   │   ├── auth.js
│   │   ├── reservation.js
│   │   ├── review.js
│   │   ├── service.js
│   │   └── user.js
│   ├── scripts
│   │   └── admin.js
│   ├── server.js
│   └── .env
├── .gitignore
├── package.json
├── README.md
└── yarn.lock
```

### API Endpoints

- **Auth**
  - `POST /api/auth/login`: User login

- **User**
  - `POST /api/users`: User registration

- **Reservation**
  - `GET /api/reservations`: Get all reservations
  - `POST /api/reservations`: Create a new reservation

- **Review**
  - `GET /api/reviews`: Get all reviews
  - `POST /api/reviews`: Create a new review

- **Service**
  - `GET /api/services`: Get all services
  - `POST /api/services`: Add a new service

### Frontend Components

- **Home.jsx**: Main page with sign in and sign up modals
- **AdminDashboard.jsx**: Admin dashboard for managing services
- **Review.jsx**: Component for leaving and viewing reviews

### Adding New Services

Admins can log in and navigate to the admin dashboard to add new services. The newly added services will be available for customers when making reservations.
