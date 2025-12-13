# Portfolio Project - Card Vault
## Table of Contents
- 1 [Team](#1-team)
  - 1.1 [Team structure](#11-team-structure)
  - 1.2[Team members & roles](#12-team-members--roles)
  - 1.3 [Collaboration Norms](#13-collaboration-norms)
- 2 [Idea](#2-idea)
  - 2.1 [Research and Idea Generation](#21-research-and-idea-generation)
    - 2.1.1 [Individual Research](#211-individual-research)
    - 2.1.2 [Group Brainstorming](#212-group-brainstorming)
  - 2.2 [Idea Evaluation](#22-idea-evaluation)
  - 2.3 [TCG Franchise & API Selection](#23-tcg-franchise--api-selection)
- 3 [MVP](#3-mvp)
  - 3.1 [Potential impact](#31-potential-impact)
  - 3.2 [Problem it solves](#32-problem-it-solves)
  - 3.3 [Proposed solution](#33-proposed-solution)
  - 3.4 [Why This MVP?](#34-why-this-mvp-)
  - 3.5 [User Stories](#35-user-stories)
- 4 [MVP Detailed](#4-mvp-detailed)
  - 4.1 [MVP Selection](#41-mvp-selection)
  - 4.2 [MVP Breakdown](#42-mvp-breakdown)
    - 4.2.1 [Core Problem](#421-core-problem)
    - 4.2.2 [MVP Solution](#422-mvp-solution)
    - 4.2.3 [Target Users](#423-target-users)
- 5 [SMART](#5-smart)
  - 5.1 [Type of Application](#51-type-of-application)
  - 5.2 [Key Features and SMART Objectives](#52-key-features-and-smart-objectives)
- 6 [Scope](#6-scope)
  - 6.1 [In scope](#61-in-scope)
  - 6.2 [Out of scope](#62-out-of-scope)
    - 6.2.1 [Future improvement](#621-future-improvement)
    - 6.2.2 [Completely Out Of Scope](#622-completely-out-of-scope)
- 7 [Risks](#7-risks)
---

## 1 Team
### 1.1 Team structure
Everyone has their own area of expertise, but as a team, anyone can spontaneously work on a stack they are not usually responsible for.

---

### 1.2 Team members & roles
- **[Franck Spadotto](https://github.com/Franck-dev-hub)** as ML/AI Developer & Tech Lead
    - **Role:** Develops machine learning components and guides the team technically.
    - **Impact:** Ensures AI/ML implementation and provides leadership in architecture, coding practices, and overall technical decisions.

- **[Haitu Nguyen](https://github.com/N-Haitu31)** as Frontend Developer
    - **Role:** Designs and implements the user interface and user experience.
    - **Impact:** Creates a user-friendly and visually appealing interface, bridging the gap between users and backend functionality.

- **[Jeremy Laurens](https://github.com/JeremyLrs)** as Backend Developer & UI/UX Lead
    - **Role:** Implements server-side logic, database management, API integration and guide the team to ensure UI/UX design.
    - **Impact:** Ensures the backend is robust, efficient, and scalable, enabling smooth data flow and connecting seamlessly with the ML/AI components.

---

### 1.3 Collaboration Norms
- **Communication:** ![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?&logo=discord&logoColor=white)![Notion](https://img.shields.io/badge/Notion-000?logo=notion&logoColor=fff)
- **Code Version Control:** ![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)
- **Project Management:** ![GitHub Projects](https://img.shields.io/badge/GitHub-Projects-gray?logo=github&logoColor=white&labelColor=%23121011)
- **Team Norms:**
    - Frequent standup via discord
    - Code reviews mandatory for each push on branch feat/dev
    - Shared responsibility: everyone can help across stacks
    - Weekly milestone planning and retrospective

---

## 2 Idea
### 2.1 Research and Idea Generation
#### 2.1.1 Individual Research
Each team member analysed:
- Existing TCG collection apps (Magic, Pokémon, etc ...)
- Strengths and weaknesses of current platforms
- Missing features across apps
- Available public APIs for cards datasets.
- ML/AI features in card recognition apps.

---

#### 2.1.2 Group Brainstorming
**Mind Mapping**
We visually explored:
- User needs (tracking, scanning, sharing, etc ...)
- Multi-TCG data sources
- UX patterns from existing apps
- Potential additions: statistics, decks, value tracking
---
**SCAMPER Framework**
- **Substitute:** Multiple apps -> one universal app.
- **Combine:** Merge best features (collection, recognition, price display).
- **Adapt:** Adapt existing apps features (search, filter, track value) for multiple TCGs.
- **Modify:** Improve UI/UX to make multi-TCG workflow seamless.
- **Put to another use:** Use public APIs for multi franchises coverage.
- **Eliminate:** Remove redundancy caused by managing separate apps for each TCG.
- **Reverse:** Explore collections by value, rarity, edition rather than TCG only
---
**“How Might We” Questions**
- How might we unify all TCG collections in a single interface?
- How might we combine the best features of existing apps while keeping it simple and user-friendly ?
- How might we provide seamless access to multiple franchises through public APIs?

--- 

### 2.2 Idea Evaluation
- **Evaluation Criteria:**
  - Feasibility: Can the team integrate multiple APIs and handle different data formats ?
  - Potential Impact: Will it significantly improve the experience for multi TCG collectors ?
  - Technical Alignment: Do the app's requirements match the team's skills (frontend, backend, ML/AI) ?
  - Scalability: Can the platform support adding more TCG franchises in the future ?

- **Project Idea:** Multi TCG Collection App
  - **Description:** A unified digital platform that allows collectors to track, manage, and explore multiple TCG collections in one place. The app combines the best features of existing apps while supporting multiple franchises through public APIs.
  - **ML/AI Feature:** Integrates card recognition via the camera to automatically identify cards and add them to the user's collection. The feature already exists in some apps, but it will be recoded and adapted to work with multiple franchises.
  - **Feasibility:** High. APIs exist, team skills cover frontend, backend, and ML/AI integration.
  - **Challenges & Risks:** Integrating multiple APIs with varying formats, maintaining performance for large collections, recoding the ML/AI recognition feature to work across different card designs, and providing a smooth user experience.
  - **Potential Impact:** High. Reduces friction for collectors managing multiple TCGs, automates card input via camera recognition, and creates a central hub for card tracking and exploration.

---

### 2.3 TCG Franchise & API Selection
After evaluating available APIs, the team selected the following franchises and their corresponding APIs:

| Game                 | Primary API         | Status      | Documentation                   |
|----------------------|---------------------|-------------|---------------------------------|
| Pokémon TCG          | TCGdex              | Selected    | https://www.tcgdex.net/docs     |
| Pokémon TCG          | PokéAPI             | Alternative | https://pokeapi.co/docs/v2      |
| Magic: The Gathering | Scryfall            | Selected    | https://scryfall.com/docs/api   |
| Magic: The Gathering | MTG Developers      | Alternative | https://magicthegathering.io    |

**Selection Rationale:**
- **TCGdex (Pokémon TCG):** Comprehensive card database with high-quality images, multi-language support, RESTful API with clear documentation, and active maintenance.
- **Scryfall (Magic: The Gathering):** Most complete MTG card database, advanced search capabilities, high-quality card images, and excellent documentation with strong community support.

Both APIs are free to use and provide card images essential for ML/AI recognition training.

---

## 3 MVP
### 3.1 Potential impact
The current TCG ecosystem forces collectors to use multiple apps, one per franchise (Magic, Pokémon, Yu-Gi-Oh! etc...).
- **Reason for Selection:**
  - High relevance to the needs of collectors managing multiple TCG franchises.
  - Combines the best features of existing apps in a single platform.
  - Feasible with the current team’s skills (frontend, backend, ML/AI integration).
  - High potential impact for users by reducing friction, improving collection management, and automating card identification.

---

### 3.2 Problem it solves
- Collectors must manually enter cards or switch between several apps.
- Multi-TCG collectors have no centralized, unified tool.
- Camera scanning features exist but only for single franchises.
- Managing large collections across different systems is time-consuming.

---

### 3.3 Proposed solution
- **web based, mobile responsive application** that provides:
- **Multi franchise support** using public APIs
- **Universal card collection management**
- **ML/AI card recognition** to scan cards via camera
- **Search, filter, analytics, and export tools**
- **A unified hub for all TCG collections**

---

### 3.4 Why This MVP ?
- Aligns perfectly with team expertise (frontend, backend, ML/AI).
- Presents a realistic but meaningful challenge.
- High value for real TCG communities.
- Provides a foundation that can easily grow into a scalable full product.

---

### 3.5 User Stories
**Core Features (MVP):**
1. **As a collector**, I want to scan a Pokémon or Magic card with my phone camera so that it is automatically identified and added to my collection
2. **As a collector**, I want to search for cards by name, set, or rarity so that I can verify if I already own them
3. **As a collector**, I want to view my total card count and estimated collection value so that I can track my collection's growth
4. **As a collector**, I want to mark cards as "wanted" so that I know which ones I'm actively looking for
5. **As a new user**, I want to create a secure account so that my collection is saved across all my devices

**Future Enhancements (Post-MVP):**
- **As a collector**, I want to export my collection to CSV so that I can share it with other collectors
- **As a collector**, I want to filter and sort my cards by edition, rarity, or value so that I can organize my collection efficiently
- **As a collector**, I want to add duplicate counts for each card so that I can track how many copies I own

---

## 4 MVP Detailed
### 4.1 MVP Selection
The team agreed unanimously that the Multi TCG Collection App had:
- The highest user value
- Strong feasibility
- Clear technical structure
- Meaningful ML/AI integration

---

### 4.2 MVP Breakdown
#### 4.2.1 Core Problem
Collectors manage multiple TCGs but must rely on separate apps and manual input.

---

#### 4.2.2 MVP Solution
- Web/mobile web app
- Multi API support
- ML/AI card recognition
- Unified collection management

---

#### 4.2.3 Target Users
- Card collectors
- Competitive players
- Hobbyists
- Investors and resellers

---

## 5 SMART
### 5.1 Type of Application
- **Web and mobile-responsive application**
- Features a responsive design for both desktop and mobile browsers.
- Integrates multiple public TCG APIs for real-time card data.
- Includes ML/AI-powered card recognition to simplify adding cards via the camera.

---

### 5.2 Key Features and SMART Objectives
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

## 6 Scope
### 6.1 In scope
**Base Feature - V1.0 MVP**
- Account
  - Create an account
  - Log in to your account
  - Log out from your account
- Card Display
  - Browse available licences
  - Browse their related extensions
  - Browse all cards within an extension
  - View detailed information for each card
- Collection
  - Add a card to your collection
  - Add a card variant to your collection
  - Remove a card from your collection
  - Scan a card to add it to your collection

---

### 6.2 Out of scope
#### 6.2.1 Future improvement
**V1.1 - AI update**
- Add bulk card scanning

---

**V1.2 - Card details update**
- Display card prices
- Change card language
- Update card condition (Near Mint, Mint, Excellent, Good, Light Played, Played, Poor)

---

**V1.3 - Value update**
- Edit a card’s purchase price
- Display collection value
- Display licence value
- Display extension value

---

**V1.4 - Stats, research & community update**
- Stats
  - Add global statistics to the homepage
  - Add collection-level statistics to collection pages
  - Add extension-specific statistics to extension pages
- Research (filters & sorting)
  - Improve filtering and sorting for Collections
  - Improve filtering and sorting for Extensions
  - Improve filtering and sorting for Cards
- Community
  - Launch a community Discord server
  - Add a Discord support link
  - Set up a donation link for financial support

---

**V1.5 - Inventory & deck update**
- Inventory
  - Create an inventory
  - Delete an inventory
  - Add cards to an inventory
  - Remove cards from an inventory
  - Enable filtering and sorting within the inventory
- Deck
  - Create a deck
  - Delete a deck
  - Add cards to a deck
  - Remove cards from a deck
  - Enable filtering and sorting within decks

---

**V1.6 - Vue and collection update**
- Vue
  - Change collection vue (rows or grid)
  - Change extension vue (rows or grid)
  - Change cards vue (rows or grid)
  - Implement dark mode
- Account
  - Delete the account (this feature will never be use, but just in case ...)
  - Change pseudo
  - Change currency
  - Change password
  - Change web app language

---

**V1.7 - Progression update**
- Add themes (base color template)
- Display collection progression
- Display licence progression
- Display extension progression

---

**V1.8 - Multi-select update**
- Personalised theme (full color customisation with a main & second color)
- Inventory :
  - Multi-select to add a card
  - Multi-select to delete a card
  - Multi-select to move a card
- Deck :
  - Multi-select to add a card
  - Multi-select to delete a card
  - Multi-select to move a card

---

**V1.9 - Import / export update**
- Import :
  - Full user datas
  - A collection
  - An inventory
  - A deck
- Export :
  - Full user datas
  - A collection
  - An inventory
  - A deck

---

**V1.10 - Auth update**
- Google connexion / synchronisation
- Recover a forgotten password
- TOTP connexion

---

**V1.11 - Friends update**
- Add a friend
- Delete a friend
- Compare stats with friends

---

**V1.12 - Game update**
- Push notifications
- Gamification (badges)

---

## 6.2.2 Completely Out of Scope
- Real money transactions
- Real-time chat

---

## 7 Risks
| Risk                                     | Probability | Impact | Mitigation                                                               |
|------------------------------------------|-------------|--------|--------------------------------------------------------------------------|
| ML/AI accuracy issues                    | Medium      | High   | Retraining, dataset expansion, data augmentation, fallback manual input  |
| API data inconsistency                   | Low         | Medium | Data normalization layer on backend, caching strategy, retry logic       |
| Inexperience with some APIs              | Medium      | Medium | Training sessions, shared documentation, pair programming                |
| Performance drops on large collections   | Low         | Medium | DB optimization, caching (Redis), lazy loading, proper indexing          |
| Frontend/Backend desync                  | Medium      | High   | Clear API contracts (OpenAPI/Swagger), integration tests                 |
| Timeline overrun                         | Medium      | High   | Strict MVP prioritization, daily standups, burndown chart tracking       |
| Team member absence                      | Low         | High   | Continuous documentation, pair programming, code reviews                 |
| ML deployment complexity                 | Medium      | Medium | Early testing on production-like environment, containerization (Docker)  |
| API rate limiting                        | Low         | Medium | Redis caching, request batching, rate limit handling                     |
| Database performance                     | Low         | Medium | Essential indexes on key queries, query optimization, monitoring         |

---

