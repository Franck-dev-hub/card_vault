# Portfolio Project - Card Vault
> Result & lessons learned

## Table of content
- 1 [Result summary](#1-result-summary)
  - 1.1 [Project completion](#11-project-completion)
    - 1.1.1 [Completion criteria](#111-completion-criteria)
    - 1.1.2 [Outstanding items](#112-outstanding-items)
  - 1.2 [Project closure](#12-project-closure)
    - 1.2.1 [Deliverables](#121-deliverables)
    - 1.2.2 [Documentation](#122-documentation)
- 2 [Lessons learned section](#2-lessons-learned-section)
- 3 [Team retrospective](#3-team-retrospective)
  - 3.1 [Tools used](#31-tools-used)
  - 3.2 [What worked](#32-what-worked)
  - 3.3 [What didn't work](#33-what-didnt-work)

## 1 Result summary
> Summary of final result.

### 1.1 Project completion
> This section identifies the criteria to complete the project and any outstanding items which still need to be undertaken even though the project may be ready for completion.

#### 1.1.1 Completion criteria

| Category          | Criteria                                                 | Achieved |
|-------------------|----------------------------------------------------------|----------|
| Core objective    | User account management : register / login / logout      | Yes      |
| Core objective    | Multi-TCG database : browse licenses, extensions & cards | Yes      |
| Core objective    | Collection management : add / remove cards & variants    | Yes      |
| Core objective    | ML Integration : card recognition via camera scan        | Yes      |
| Bonus objective   | Real time card market price display                      | Yes      |
| Benefit           | Card identification using machine learning               | Yes      |
| Benefit           | Access at least 2 TCGs licenses                          | Yes      |
| Deliverable       | Full source code & technical documentation               | Yes      |
| Deliverable       | Operational machine learning pipeline                    | Yes      |
| Deliverable       | Functional mobile first responsive web app               | Yes      |
| Deliverable bonus | Infra : local server deployment & API security           | Yes      |

#### 1.1.2 Outstanding items

| Item     | Action                                                                                              |
|----------|-----------------------------------------------------------------------------------------------------|
| Activity | Multilingual support : implementation of app & cards traduction                                     |
| Activity | Advanced sorting : filter by rarity, set, market value ...                                          |
| Activity | Display user statistics                                                                             |
| Risk     | Sensitive Data : move sensitive tokens from localStorage to HttpOnly Cookies to prevent XSS         |
| Risk     | Password Policy : align with ANSSI guidelines (12+ characters, special signs) to enhance security   |
| Issue    | Machine learning : model is trained on the entire Pokémon dataset and a subset of the Magic dataset |

### 1.2 Project closure
> This section includes the handover of deliverables and documentation.

#### 1.2.1 Deliverables

| Deliverable             | Location                              |
|-------------------------|---------------------------------------|
| Source code             | Github                                |
| Technical documentation | Github in `docs` folder               |
| User manual             | Github in `docs` folder + `README.md` |
| ML model & pipeline     | Github in `ml_service` folder         |
| Deployment              | Local server                          |

#### 1.2.2 Documentation
> Please refer to the `docs` folder and `README.md` for the complete documentation, including suppliers, resources, and communication details.

## 2 Lessons learned section
> Report on lessons learned during the project

| Win or issue | What appened                                   | Impact                                 | Changes for future projects                                     | Action                                                           |
|--------------|------------------------------------------------|----------------------------------------|-----------------------------------------------------------------|------------------------------------------------------------------|
| Win          | Integration of ML model for card scanning      | UX improvement                         | Start data collection earlier to balance all TCG data           | Deepen ML knowledge                                              |
| Issue        | Used localStorage for sensitive session tokens | High vulnerability to XSS attacks      | Use HttpOnly cookies for token storage from the start           | Added session security upgrade to the project roadmap in backlog |
| Win          | Full app deployment on local server            | App souverainity                       | Improve ease of deployment                                      | Create CI/CD pipeline                                            |
| Issue        | Complexity of TCG data                         | Initial database schema was too simple | Conduct a deeper Domain Driven Design (DDD) phase before coding | Implemented a more flexible relational schema for card variants  |

## 3 Team retrospective
### 3.1 Tools used
- Communication : Discord
- Project versioning : GitHub
- Project management : Agile methodology with a Markdown file for task management

### 3.2 What worked
- Regular agile sprints with clear goals and deliverables
- Effective use of GitHub for version control and documentation
- Successful integration of machine learning for card recognition

### 3.3 What didn't work
- Merge conflicts due to multiple branches and parallel development
- Initial underestimation of the complexity of TCG data modeling
- Security oversight due to lak of experience with web security best practices
