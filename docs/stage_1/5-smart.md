# Portfolio Project - Card Vault
> Key Features & SMART Goals

## Table of Contents
- 1 [Type of Application](#1-type-of-application)  
- 2 [Key Features and SMART Objectives](#2-key-features-and-smart-objectives)

---

## 1 Type of Application
- **Web and mobile-responsive application**
- Features a responsive design for both desktop and mobile browsers.
- Integrates multiple public TCG APIs for real-time card data.
- Includes ML/AI-powered card recognition to simplify adding cards via the camera.

---

## 2 Key Features and SMART Objectives
- **Multi-Franchise Collection Tracking**
    - **Specific:** Users can add, remove, and organize cards from multiple TCGs.
    - **Measurable:** Support at least 2 major TCG franchises in MVP.
    - **Achievable:** APIs exist for the targeted franchises, team skills cover integration.
    - **Relevant:** Solves the core problem of managing multiple collections.
    - **Time-Bound:** Implemented and tested within the MVP phase.
---
- **Card Recognition via ML/AI**
    - **Specific:** Users can scan cards with their camera to automatically detect and add them to their collection.
    - **Measurable:** Accurately recognize cards with >90% accuracy.
    - **Achievable:** Existing ML/AI models will be refactored and integrated for multi-franchise support.
    - **Relevant:** Reduces manual entry, saving time for collectors and improving user experience.
    - **Time-Bound:** Functional and tested by MVP delivery.
---
- **Card Search, Filter, and Analytics**
    - **Specific:** Users can search by card name, set, rarity, type, or price with advanced filtering and sorting options.
    - **Measurable:** Search response time < 1s, support pagination (20 items per page), multiple filter combinations.
    - **Achievable:** Backend can handle queries with existing database structure, Redis caching for performance.
    - **Relevant:** Enhances usability and collection insights.
    - **Time-Bound:** Functional by MVP delivery.
---
- **Collection Management**
    - **Specific:** Users can manage their collection with quantity tracking, condition (M, NM, LP, MP, HP), purchase price, and notes.
    - **Measurable:** Support CRUD operations, calculate total collection value, track unique cards vs total quantity.
    - **Achievable:** PostgreSQL database with proper indexing, RESTful API endpoints.
    - **Relevant:** Core functionality for collection tracking.
    - **Time-Bound:** Implemented and tested within MVP phase.
---
- **Statistics Dashboard**
    - **Specific:** Users can view collection statistics including total cards, total value, distribution by rarity (pie chart), distribution by set (bar chart), and distribution by price.
    - **Measurable:** Real-time statistics calculation, visual charts using Recharts library.
    - **Achievable:** Backend aggregation queries, frontend visualization components.
    - **Relevant:** Provides insights into collection composition and value.
    - **Time-Bound:** Functional by MVP delivery.
---
- **Authentication & Security**
    - **Specific:** Users can create accounts, login securely with JWT tokens, and maintain persistent sessions.
    - **Measurable:** Secure password hashing (bcrypt), JWT token expiration (1 hour), refresh token support.
    - **Achievable:** FastAPI security utilities, PostgreSQL user storage.
    - **Relevant:** Ensures user data privacy and collection persistence.
    - **Time-Bound:** Implemented and tested within MVP phase.

---
