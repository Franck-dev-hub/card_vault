# Portfolio Project - Card Vault
> Technical Documentation

## Table of Contents
- 1 [User stories and Mockups](#1-user-stories-and-mockup)
  - 1.1 [User stories](#11-user-stories)
    - 1.1.1 [User story](#111-user-story)
    - 1.1.2 [MoSCoW](#112-moscow)
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
