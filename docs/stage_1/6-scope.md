# Portfolio Project - Card Vault
> Scope definition

## Table of Contents
- 1 [In scope](#1-in-scope-critical-features---must-have)
- 2 [Out of scope](#2-out-of-scope)

---

## 1 In scope (Critical Features - MUST HAVE)
**Search & Discovery**
- Search bar by card name
- Paginated list of all available cards
- Grid display (image, name, rarity, price)
- Filters: set, rarity, type, price
- Sorting: name, price, rarity

**Visual Recognition (ML)**
- Card detection via camera
- Top 3 matches with confidence scores
- "Confirm" button for direct collection addition
- "Feedback" button for continuous model improvement

**Collection Management**
- Support for 2 TCG franchises (Pokémon TCG, Magic: The Gathering)
- Manual or automatic addition (via recognition)
- Table/grid visualization
- Edit: quantity, condition, version, notes
- Supported conditions: M (Mint), NM (Near Mint), LP (Lightly Played), MP (Moderately Played), HP (Heavily Played)
- Versions: Holo, Reverse, Reverse Holo, Shiny
- Deletion with confirmation
- Total estimated value calculation

**Authentication**
- Account creation (email + password)
- Secure login (JWT)
- Persistent session
- Logout

**Statistics**
- Total card count
- Total estimated value
- Distribution by rarity (pie chart)
- Distribution by set (bar chart)
- Distribution by price (bar chart)

**Interface & UX**
- Responsive design (mobile, tablet, desktop)
- Intuitive navigation (Search / Collection / Recognition / Stats)
- Clear loading states
- Explicit error messages
- Dark mode

---

## 2 Out of scope
**Future Features (Post-MVP):**
- Collection export (CSV, PDF)
- Import from file
- Price history tracking
- User comparison features
- Wishlist functionality
- Forum/Social features
- Native applications (iOS/Android)
- Push notifications
- Integrated marketplace
- Professional card grading
- Multi-language support
- Financial support/donations

**Completely Out of Scope:**
- Real money transactions
- Real-time chat

---
