# AIROCX - Animation IP Website with Admin Dashboard

A full-stack animation studio website with a CMS-style admin dashboard for managing characters, showcase content, and merchandise.

## Features

### Main Website
- Hero section with animated SVG character and glow effects
- Interactive character profiles with modal details
- Parallax character carousel
- Content showcase with filters (All/Videos/Images/BTS)
- YouTube video lightbox integration
- Merch store with cart functionality
- Corporate partnerships section
- Contact form
- Smooth scroll reveal animations
- Fully responsive design
- Dynamic content loaded from MongoDB

### Admin Dashboard
- Password-protected access
- Three management tabs:
  - **Characters**: Add/Edit/Delete characters
  - **Showcase**: Manage videos and images
  - **Merch**: Manage store products
- Visual forms for editing
- Direct SVG code editing
- Image URL swapping capability
- Live data updates

## Tech Stack

### Backend
- **Framework**: FastAPI
- **Database**: MongoDB
- **Authentication**: JWT tokens
- **Password Hashing**: bcrypt

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **Styling**: Custom CSS
- **Fonts**: Space Grotesk, Playfair Display

## Project Structure

```
├── backend/
│   ├── server.py          # FastAPI application with all routes
│   ├── requirements.txt   # Python dependencies
│   └── .env               # Environment variables (not tracked)
├── frontend/
│   ├── public/
│   │   └── index.html     # HTML template
│   ├── src/
│   │   ├── index.js       # React entry point
│   │   ├── App.js         # Main router
│   │   ├── App.css        # All website styles
│   │   └── components/
│   │       ├── MainWebsite.js      # Public website
│   │       ├── AdminLogin.js       # Admin login page
│   │       ├── AdminDashboard.js   # Dashboard container
│   │       ├── CharactersTab.js    # Characters management
│   │       ├── ShowcaseTab.js      # Showcase management
│   │       └── MerchTab.js         # Merch management
│   └── package.json       # Node dependencies
└── memory/
    └── *.md               # Documentation guides
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- Python (v3.9+)
- MongoDB

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file with the following variables:
   ```
   MONGO_URL=mongodb://localhost:27017/airocx
   ADMIN_PASSWORD=<your-secure-password>
   JWT_SECRET=<your-secret-key>
   ```

5. Start the server:
   ```bash
   uvicorn server:app --reload --port 8001
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/characters` | Get all characters |
| GET | `/api/showcase` | Get all showcase items |
| GET | `/api/merch` | Get all merch items |

### Admin (requires JWT token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login with password |
| POST | `/api/characters` | Create character |
| PUT | `/api/characters/{id}` | Update character |
| DELETE | `/api/characters/{id}` | Delete character |
| POST | `/api/showcase` | Create showcase item |
| PUT | `/api/showcase/{id}` | Update showcase item |
| DELETE | `/api/showcase/{id}` | Delete showcase item |
| POST | `/api/merch` | Create merch item |
| PUT | `/api/merch/{id}` | Update merch item |
| DELETE | `/api/merch/{id}` | Delete merch item |

## Access Points

| Service | URL |
|---------|-----|
| Main Website | `http://localhost:3000/` |
| Admin Dashboard | `http://localhost:3000/admin` |
| API | `http://localhost:8001/api/` |

## License

This project is proprietary. All rights reserved.
