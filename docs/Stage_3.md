# Portfolio Project - Card Vault
> Technical Documentation

## Table of Contents
- 1 [User stories and Mockups](#1-user-stories-and-mockup)
  - 1.1 [User stories](#11-user-stories)
  - 1.2 [Mockup](#2-mockup)
- 2 [Design System Architecture](#2-design-system-architecture)
- 3 [Components Classes and Database Design](#3-components-classes-and-database-design)
  - 3.1 [Component and class descriptions](#31-component-and-class-descriptions)
  - 3.2 [Database design](#32-database-design)
- 4 [Sequence diagram](#4-sequence-diagram)
  - 4.1 [Login](#41-login)
  - 4.2 [Add a card to collection](#42-add-a-card-to-collection)
  - 4.3 [Scan a card](#43-scan-a-card)
- 5 [API](#5-api)
  - 5.1 [External APIs](#51-external-apis)
  - 5.2 [Internal APIs](#52-internal-apis)
- 6 [SCM and QA](#6-scm-and-qa)
  - 6.1 [SCM](#61-scm)
  - 6.2 [QA](#62-qa)

---
## 1 User stories and Mockups
### 1.1 User stories
**Must Have (essential for MVP)**
- As a collector, I want to sign up and log in so that I can save my card collection.
- As a collector, I want to scan a Pokémon or Magic card using my phone’s camera so that it is automatically identified and added to my collection.
- As a collector, I want to search for cards by name, set, or rarity in order to check whether I already own them.
- As a collector, I want to view the total number of cards and the estimated value of my collection so that I can track its growth.

**Should Have (important, but not critical for MVP)**
- As a user, I want to be able to delete my account.
- As a user, I want to manage my profile so that I can change my email address and password.

**Could Have (nice to have, future)**
- As a user, I want to be able to change the theme of my application with different colors.
- As a user, I want to be able to export or import a file of my collection.
- As a user, I want to be able to change my profile picture. 

**Won’t Have (excluded for MVP)**
- As a user, I want to have a badge system in order to get a global overview of my progress.
- As a user, I want to add friends so that I can exchange and discuss the same topics.
### 1.2 Mockup

/// add here ///

## 2 Design System Architecture

<p align="center">
  <img src="/docs/Diagram_architecture.jpg" width="1200" />
</p>

## 3 Components Classes and Database Design
### 3.1 Component and class descriptions
#### 3.1.1 Front-end Components (React)
| Component / Page | Type.        | Purpose                                                                                                                                     | 
| ---------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| /                | Page         | Home page with display of general statistics visualization, including license display, extensions, and access to the profile, search.       |
| /scan            | Page         | Access to the search page, single-card scan, and multi-page scan.                                                                           |
| /scan/scan_card  | Page         | Displays what the camera sees to scan a card.                                                                                               |
| /scan/builk_scan | Page         | Displays filters to pre-record information across multiple cards.                                                                           |
| /search          | Page         | Displays the different filters for searching a card.                                                                                        |
| /stats           | Page         | Displays global statistics, including card, license, franchise, and related stats.                                                          |
| /profile <br>    | Page         | Displays user information.                                                                                                                  |
| /settings        | Page         | Displays the necessary elements: profile, Discord, terms of service, logout, etc.                                                           |
| /recognition     | Page         | Displays the scanned cards with an approve button, a reject button, and the match percentage between the real card and the AI’s suggestion. |
| /cards/{id}      | Page         | Displays the information of a card picture, name, licence, extension.                                                                       |
| /vault           | Page         | Display the collection                                                                                                                      |
| /auth/login      | Page         | User login with email and password.                                                                                                         |
| /auth/register   | Page         | User registration (create account).                                                                                                         |
| `header`         | UI Component | Access to the profile and search pages.                                                                                                     |
| `menu`           | UI Component | Smartphone menu                                                                                                                             |

#### 3.1.2 Back-end Classes (Python + FastAPI)

/// add here ///

#### 3.1.3 Relational Database
```mermaid
    erDiagram
    User {
        UUID id PK
        String email UK
        String username UK
        String password_hash
        Datetime created_at
        Datetime updated_at
    }

    Card {
        UUID id PK 
        Int api_id UK
        String licence
        String illustrator
        String image_url
        String name
        String rarity
        String variant
        String set_name
        String condition
        Int set_id
        Int card_number
        Datetime bougth_at
    }

    UserCollection {
        UUID id PK
        UUID user_id FK
        Int card_id FK
        Int quantity
        Datetime updated_at
    }

    RecognitionLog {
        UUID id PK
        UUID user_collection FK
        String uploaded_image_path
        String model_predictions
        Datetime created_at
        Bool feedback
    }

    User ||--o{ UserCollection : "has"
    UserCollection ||--o{ RecognitionLog : "creates"
    Card ||--o{ UserCollection : "in"

```

### 3.2 Database design

/// add here ///

## 4 Sequence diagram
### 4.1 Login
```mermaid
---
config:
  theme: redux-color
  look: handDrawn
---
sequenceDiagram
  participant User
  participant Frontend
  participant Backend
  participant Database
        
  User->>Frontend: Enter mail + password
  Frontend->>Backend: Send login request
  Backend->>Database: Check user credentials
  Database-->>Backend: User found
  Backend-->>Frontend: Return JWT token
  Frontend-->>User: User logged in
```
### 4.2 Add a card to collection
```mermaid
---
config:
  theme: redux-color
  look: handDrawn
---
sequenceDiagram
  participant User
  participant Frontend
  participant Backend
  participant Database
        
  User->>Frontend: Open search page
  Frontend->>Backend: Request a card
  Backend->>Database: Fetch a card
  Database-->>Backend: Return a card
  Backend-->>Frontend: Send card information
  Frontend-->>User: Display card informations
  User->>Frontend: Click on "+1"
  Frontend->>Backend: Send add-to-collection request
  Backend->>Database: Update collection
  Database-->>Backend: Collection updated
  Backend-->>Frontend: Return updated collection
  Frontend-->>User: Show card's count
```
### 4.3 Scan a card
```mermaid
---
config:
  theme: redux-color
  look: handDrawn
---
sequenceDiagram
participant User
participant Frontend
participant Backend
participant MLModel as ML Model<br/>(Siamese Network)
participant Database
participant Cache as Redis

User->>Frontend: Capture photo of card
Frontend->>Backend: Send image
Backend->>MLModel: Extract query embedding
MLModel-->>Backend: Query embedding vector

Backend->>Cache: Fetch cache
Cache-->>Backend: Pre-computed embeddings

Backend->>Backend: Compute similarity<br/>(cosine distance)
Backend->>Backend: Sort by confidence score
Backend->>Database: Fetch top 3 card details
Database-->>Backend: Card metadata

Backend-->>Frontend: Return ranked results<br/>{card, confidence}
Frontend-->>User: Display top matches<br/>with confidence %

User->>Frontend: Select matching card
Frontend->>Backend: Send selection
Backend->>Database: Add to collection
Database-->>Backend: Updated count
Backend-->>Frontend: Success response
Frontend-->>User: Show "Added +1"
```
## 5 API
### 5.1 External APIs

/// add here ///

### 5.2 Internal APIs

/// add here ///

## 6 SCM and QA
### 6.1 SCM

/// add here ///

### 6.2 QA

/// add here ///
