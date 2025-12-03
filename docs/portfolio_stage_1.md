# Portfolio Project (Card Vault)
## Team Formation, Brainstorming, and MVP

---

### 1. Team Formation & Roles Definition
#### Team structure
Everyone has their own area of expertise, but as a team, anyone can spontaneously work on a stack they are not usually responsible for.

#### Team members & roles
- **[Franck Spadotto](https://github.com/Franck-dev-hub)** as ML/AI Developer & Tech Lead
  - **Role:** Develops machine learning components and guides the team technically.
  - **Impact:** Ensures AI/ML implementation and provides leadership in architecture, coding practices, and overall technical decisions.

- **[Haitu Nguyen](https://github.com/N-Haitu31)** as Frontend Developer
  - **Role:** Designs and implements the user interface and user experience.
  - **Impact:** Creates a user-friendly and visually appealing interface, bridging the gap between users and backend functionality.

- **[Jeremy Laurens](https://github.com/JeremyLrs)** as Backend Developer
  - **Role:** Implements server-side logic, database management, and API integration.
  - **Impact:** Ensures the backend is robust, efficient, and scalable, enabling smooth data flow and connecting seamlessly with the ML/AI components.

#### Collaboration Norms
- **Communication:** ![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?&logo=discord&logoColor=white)
- **Code Version Control:** ![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)
- **Project Management:** ![GitHub Projects](https://img.shields.io/badge/GitHub-Projects-gray?logo=github&logoColor=white&labelColor=%23121011)
- **Team Norms:**
  - Frequent standup via discord
  - Code reviews mandatory for each push on branch feat/dev
  - Shared responsibility: everyone can help across stacks
  - Weekly milestone planning and retrospective

---

### 2. Brainstorming and Idea Evaluation
#### Step 1: Research and Idea Generation
##### Individual Research
Each team member analysed:
- Existing TCG collection apps (Magic, Pokemon, etc ...)
- Strengths and weaknesses of current platforms
- Missing features across apps
- Available public APIs for cards datasets.
- ML/AI features usid in card recognition apps.

##### Group Brainstorming
**Mind Mapping**
We visualy explored:
- User needs (tracking, scanning, sharing, etc ...)
- Multi-TCG data sources
- UX patterns from existing apps
- Potential additions: statistics, decks, value tracking

**SCAMPER Framework**
  - **Substitute:** Multiple apps -> one universal app.
  - **Combine:** Merge best features (collection, recognition, price display).
  - **Adapt:** Adapt existing apps features (search, filter, track value) for multiple TCGs.
  - **Modify:** Improve UI/UX to make multi-TCG workflow seamless.
  - **Put to another use:** Use public APIs for multi franchises coverage.
  - **Eliminate:** Remove redundancy caused by managing separate apps for each TCG.
  - **Reverse:** Explore collections by value, rarity, edition rather than TCG only
 
**“How Might We” Questions** 
  - How might we unify all TCG collections in a single interface?
  - How might we combine the best features of existing apps while keeping it simple and user friendly ?
  - How might we provide seamless access to multiple franchises through public APIs?
 
--- 
 
#### Step 2: Idea Evaluation 
- **Evaluation Criteria:** 
  - Feasibility: Can the team integrate multiple APIs and handle different data formats ?
  - Potential Impact: Will it significantly improve the experience for multi TCG collectors ?
  - Technical Alignment: Do the app’s requirements match the team’s skills (frontend, backend, ML/AI) ?
  - Scalability: Can the platform support adding more TCG franchises in the future ?

- **Project Idea:** Multi TCG Collection App
  - **Description:** A unified digital platform that allows collectors to track, manage, and explore multiple TCG collections in one place. The app combines the best features of existing apps while supporting multiple franchises through public APIs.
  - **ML/AI Feature:** Integrates card recognition via the camera to automatically identify cards and add them to the user’s collection. The feature already exists in some apps, but it will be recoded and adapted to work with multiple franchises.
  - **Feasibility:** High. APIs exist, team skills cover frontend, backend, and ML/AI integration.
  - **Challenges & Risks:** Integrating multiple APIs with varying formats, maintaining performance for large collections, recoding the ML/AI recognition feature to work across different card designs, and providing a smooth user experience.
  - **Potential Impact:** High. Reduces friction for collectors managing multiple TCGs, automates card input via camera recognition, and creates a central hub for card tracking and exploration.

---

### 3. Summary of the selected MVP
#### Potential impact
The current TCG ecosystem forces collectors to use multiple apps, one per franchise (Magic, Pokemon, Yu-Gi-Oh! etc...).
- **Reason for Selection:**
  - High relevance to the needs of collectors managing multiple TCG franchises.
  - Combines the best features of existing apps in a single platform.
  - Feasible with the current team’s skills (frontend, backend, ML/AI integration).
  - High potential impact for users by reducing friction, improving collection management, and automating card identification.

#### Problem it solves
- Collectors must manually enter cards or switch between several apps.
- Multi-TCG collectors have no centralized, unified tool.
- Camera scanning features exist but only for single franchises.
- Managing large collections across different systems is time-consuming.

#### Proposed solution
A **web based, mobile responsive application** that provides:
- **Multi franchise support** using public APIs
- **Universal card collection management**
- **ML/AI card recognition** to scan cards via camera
- **Search, filter, analytics, and export tools**
- **A unified hub for all TCG collections**

#### Why This MVP?
- Aligns perfectly with team expertise (frontend, backend, ML/AI).
- Presents a realistic but meaningful challenge.
- High value for real TCG communities.
- Provides a foundation that can easily grow into a scalable full product.

---

### 4. Detailed MVP documentation
#### MVP Selection
The team agreed unanimously that the Multi TCG Collection App had:
- The highest user value
- Strong feasibility
- Clear technical structure
- Meaningful ML/AI integration

#### MVP Breakdown
##### Core Problem
Collectors manage multiple TCGs but must rely on separate apps and manual input.

#### MVP Solution
- Web/mobile web app
- Multi API support
- ML/AI card recognition
- Unified collection management 

#### Target Users
- Card collectors
- Competitive players
- Hobbyists
- Investors and resellers

---

### 5. Key Features & SMART Goals
#### Type of Application
- **Web and mobile-responsive application**
- Features a responsive design for both desktop and mobile browsers.
- Integrates multiple public TCG APIs for real-time card data.
- Includes ML/AI-powered card recognition to simplify adding cards via the camera.

#### Key Features and SMART Objectives
- **Multi-Franchise Collection Tracking**
  - **Specific:** Users can add, remove, and organize cards from multiple TCGs.
  - **Measurable:** Support at least 2 major TCG franchises in MVP.
  - **Achievable:** APIs exist for the targeted franchises, team skills cover integration.
  - **Relevant:** Solves the core problem of managing multiple collections.
  - **Time-Bound:** Implemented and tested within the MVP phase.

- **Card Recognition via ML/AI**
  - **Specific:** Users can scan cards with their camera to automatically detect and add them to their collection.
  - **Measurable:** Accurately recognize cards with >90% accuracy.
  - **Achievable:** Existing ML/AI models will be refactored and integrated for multi-franchise support.
  - **Relevant:** Reduces manual entry, saving time for collectors and improving user experience.
  - **Time-Bound:** Functional and tested by MVP delivery.

- **Card Search, Filter, and Analytics**
  - **Specific:** Users can search by card name, rarity, or franchise.
  - **Measurable:** Provide filtering.
  - **Achievable:** Backend can handle queries with existing database structure.
  - **Relevant:** Enhances usability and collection insights
  - **Time-Bound:** Functional by MVP delivery.

- **Collection Export / Sharing**
  - **Specific:** Users can export their collection data or share with friends.
  - **Measurable:** Export to CSV or JSON format, share via link or email.
  - **Achievable:** Standard web libraries available for file generation.
  - **Relevant:** Encourages community interaction and flexibility.
  - **Time-Bound:** Available by end of MVP development.

---

### 6. Scope definition
#### In scope
  - Web app (desktop & mobile).
  - Supports 2 major TCG franchises.
  - CRUD collection features.
  - Advanced collection features (filter, export, deck, inventory).
  - ML/AI card scanning.
  - Basic market analytics (card price, inventory value).
  - API integration for real-time card data.

#### Out of scope
  - Native mobile app.
  - Social features (friends, chat).
  - Advanced price tracking or historical graphs
  - Trading system
  - Additional franchises beyond MVP
  - Financial support

---

### 7. Risks and Challenges
| Risk | Mitigation |
|------|------------|
| Inexperience with some APIs | Training sessions, shared documentation, pair programming |
| API data inconsistency | Data normalization layer on backend |
| ML/AI accuracy issues | Retraining, dataset expansion, fallback manual input |
| Performance drops on large collections | DB optimization, caching, lazy loading |
