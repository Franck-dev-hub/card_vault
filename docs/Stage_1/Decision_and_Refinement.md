```md
# Portfolio Project
## Team Formation, Brainstorming, and MVP
### MVP
#### Step 1: Selecting the MVP
After team discussions and evaluation of potential project ideas, we selected the **Multi-TCG Collection App** as our MVP.
- **Reason for Selection:**
  - High relevance to the needs of collectors managing multiple TCG franchises.
  - Combines the best features of existing apps in a single platform.
  - Feasible with the current team’s skills (frontend, backend, ML/AI integration).
  - High potential impact for users by reducing friction, improving collection management, and automating card identification.

#### Step 2: Refining the Idea
##### Problem Statement
Collectors of trading card games (TCGs) often need to use multiple apps to manage collections from different franchises, leading to fragmented experiences and duplicated effort.
Manually entering cards is time-consuming, and tracking multiple franchises across different apps is inefficient.

##### Solution
A unified digital platform where users can track, manage, and explore all their TCG collections in one place.
The app leverages public APIs for real-time card data and integrates ML/AI card recognition via the camera to automatically identify and add cards to the user’s collection.

##### Target Audience / Users
- TCG collectors who play multiple franchises.
- Hobbyists and competitive players looking for an organized, efficient collection tracking tool.
- Community members interested in trading, deck building, and market insights.

##### Type of Application
- **Web and mobile-responsive application**
- Features a responsive design for both desktop and mobile browsers.
- Integrates multiple public TCG APIs for real-time card data.
- Includes ML/AI-powered card recognition to simplify adding cards via the camera.

##### Key Features and SMART Objectives
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

##### Project Scope
- **In-Scope:**
  - Web application supporting at least 2 franchises.
  - Core collection management features (add, remove, search, filter, export).
  - Advanced collection management (deck, inventory).
  - Core market analytics (card price, inventory value, base statistics).
  - Integration with public APIs for real-time card data.
  - ML/AI-powered card recognition via camera.

- **Out-of-Scope:**
  - Native mobile app version.
  - Social (friend list, chat).
  - Advanced market analytics (price tracking, advanced statistics).
  - Trading functionalities.
  - Price monitoring
  - More franchises
  - Financial support

##### Identified Risks and Challenges
| Risk | Mitigation |
|------|------------|
| Team members may lack experience with some TCG APIs | Assign learning sessions and tutorials early; split API integration tasks among team members. |
| API data formats may differ or change | Implement a flexible backend data mapping layer to normalize inputs. |
| ML/AI model may not recognize all cards accurately | Retrain/refactor existing models; test extensively across multiple franchises; fallback to manual card input. |
| Large collections could affect performance | Optimize database queries and frontend rendering; implement lazy loading where necessary. |
```
