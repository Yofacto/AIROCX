# AIROCX - Animation IP Website with Admin Dashboard

## Overview
Full-stack AIROCX (formerly LUMIQ) Studios website with CMS-style admin dashboard for managing characters, showcase content, and merchandise.

## Features

### Main Website (`/`)
- ✅ Hero section with animated SVG character and glow effects
- ✅ 4 Interactive characters (Blobby, Ferno, Aqui, Zolt) with modal details
- ✅ Parallax character carousel with 3 layers
- ✅ Content showcase with filters (All/Videos/Images/BTS)
- ✅ YouTube video lightbox integration
- ✅ Merch store with 8 products and cart functionality
- ✅ Corporate partnerships section
- ✅ Contact form
- ✅ Smooth scroll reveal animations
- ✅ Fully responsive design
- ✅ All content dynamically loaded from MongoDB

### Admin Dashboard (`/admin`)
- ✅ Password-protected access
- ✅ Three management tabs:
  - **Characters**: Add/Edit/Delete characters
  - **Showcase**: Manage videos and images
  - **Merch**: Manage store products
- ✅ Visual forms for editing
- ✅ Direct SVG code editing
- ✅ Image URL swapping capability
- ✅ Live data updates

## Tech Stack

### Backend
- **Framework**: FastAPI
- **Database**: MongoDB
- **Authentication**: JWT tokens
- **Password Hashing**: bcrypt

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **Styling**: Custom CSS (extracted from original HTML)
- **Fonts**: Space Grotesk, Playfair Display

## Project Structure

```
/app/
├── backend/
│   ├── server.py          # FastAPI application with all routes
│   ├── requirements.txt   # Python dependencies
│   └── .env               # MongoDB URL, admin password, JWT secret
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
│   ├── package.json       # Node dependencies
│   └── .env               # Backend URL
└── memory/
    └── test_credentials.md # Admin credentials
```

## API Endpoints

### Public
- `GET /api/health` - Health check
- `GET /api/characters` - Get all characters
- `GET /api/showcase` - Get all showcase items
- `GET /api/merch` - Get all merch items

### Admin (requires JWT token)
- `POST /api/auth/login` - Login with password
- `POST|PUT|DELETE /api/characters/{id}` - Manage characters
- `POST|PUT|DELETE /api/showcase/{id}` - Manage showcase
- `POST|PUT|DELETE /api/merch/{id}` - Manage merch

## Database Collections

### Characters
```json
{
  "name": "Blobby",
  "role": "The Dreamer",
  "desc": "Short description",
  "bio": "Full biography",
  "episodes": "24",
  "fans": "1.2M",
  "power": "Dreamweaving",
  "color": "linear-gradient(135deg,#c084fc,#6c5ce7)",
  "svg": "<svg>...</svg>",
  "image": "optional_image_url"
}
```

### Showcase Items
```json
{
  "type": "video|image",
  "cat": "video|image|bts",
  "title": "Season 1 Trailer",
  "desc": "Description",
  "ytId": "YouTube_ID",
  "color": "#6c5ce7",
  "image": "optional_image_url",
  "large": false
}
```

### Merch Items
```json
{
  "name": "Blobby Plush Toy",
  "cat": "Collectibles",
  "price": 34.99,
  "color": "#c084fc",
  "emoji": "🧸",
  "image": "optional_image_url"
}
```

## Environment Variables

### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017/airocx
ADMIN_PASSWORD=AIROCXIP06
JWT_SECRET=airocx-super-secret-key-2025
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

## Services

All services run via supervisor:
```bash
supervisorctl status
```

- `mongodb` - MongoDB database (port 27017)
- `backend` - FastAPI server (port 8001)
- `frontend` - React dev server (port 3000)

## Access Points

- **Main Website**: `http://localhost:3000/`
- **Admin Login**: `http://localhost:3000/admin`
- **API**: `http://localhost:8001/api/`

## Admin Usage

1. Navigate to `/admin`
2. Enter password: `AIROCXIP06`
3. Select tab (Characters | Showcase | Merch)
4. Click "Edit" on any item to modify
5. Click "+ Add" to create new items
6. Changes are saved immediately to MongoDB

## Brand Migration

All instances of "LUMIQ" have been replaced with "AIROCX":
- Brand name in navigation
- Email addresses (hello@airocx.studio)
- Phone number suffix (555-AIROCX)
- Product names (AIROCX Hoodie, AIROCX Enamel Pin Set)
- Copyright notices (AIROCX Studios)

## Data Pre-Seeded

- ✅ 4 Characters with full bios and stats
- ✅ 8 Showcase items (videos and images)
- ✅ 8 Merch products across categories

All data is fully editable through the admin dashboard.
