# Portfolio Project - Card Vault
> Brainstorming and Idea Evaluation

## Table of Contents
- 1 [Research and Idea Generation](#1-research-and-idea-generation)
    - 1.1 [Individual Research](#11-individual-research)
    - 1.2 [Group Brainstorming](#12-group-brainstorming)
- 2 [Idea Evaluation](#2-idea-evaluation)
- 3 [TCG Franchise & API Selection](#3-tcg-franchise--api-selection)

---

## 1 Research and Idea Generation
### 1.1 Individual Research
Each team member analysed:
- Existing TCG collection apps (Magic, Pokémon, etc ...)
- Strengths and weaknesses of current platforms
- Missing features across apps
- Available public APIs for cards datasets.
- ML/AI features in card recognition apps.

### 1.2 Group Brainstorming
**Mind Mapping**
We visually explored:
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
- How might we combine the best features of existing apps while keeping it simple and user-friendly ?
- How might we provide seamless access to multiple franchises through public APIs?

--- 

## 2 Idea Evaluation
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

## 3 TCG Franchise & API Selection
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