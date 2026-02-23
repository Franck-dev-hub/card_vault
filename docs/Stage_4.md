# Portfolio Project - Card Vault
> MVP Development and Execution

## Table of content
- 1 [Sprint Reviews](#1-sprint-reviews)
- 2 [Retrospectives](#2-retrospectives)
- 3 [Sprint planning](#3-sprint-planning)
- 4 [Source repository](#4-source-repository)
- 5 [Bug tracking](#5-bug-tracking)
- 6 [Testing evidence and results](#6-testing-evidence-and-results)
- 7 [Production environment](#7-production-environment)

## 1 Sprint Reviews
> Summary of weekly deliverables and achieved outcomes

| Week | Assignment | Area     | Deliverable                                          | Outcome                                              |
|------|------------|----------|------------------------------------------------------|------------------------------------------------------|
| 1    | Jérémy     | Backend  | Proxy configuration                                  | Proxy successfully forwarding requests to backend    |
| 1    | Haitu      | Frontend | UI framework setup (Tailwind, DaisyUI, Lucide React) | UI toolchain operational                             |
| 1    | Franck     | ML       | Initial model setup                                  | Model loads and processes dataset images             |
|      |            |          |                                                      |                                                      |
| 2    | Jérémy     | Backend  | Pokémon API integration                              | API routes returning valid JSON data                 |
| 2    | Haitu      | Frontend | Account & profile pages                              | Basic navigation and layout implemented              |
| 2    | Franck     | ML       | Hugging Face streaming integration                   | Real-time streaming inference working                |
|      |            |          |                                                      |                                                      |
| 3    | Jérémy     | Backend  | Search route logic                                   | Multi-license search functional                      |
| 3    | Haitu      | Frontend | Create all pages                                     | All primary routes created                           |
| 3    | Franck     | Docs     | Figma prototype                                      | Complete UI/UX mockup delivered                      |
|      |            |          |                                                      |                                                      |
| 4    | Jérémy     | Backend  | Card data normalization                              | Unified data model across APIs                       |
| 4    | Haitu      | Frontend | Scan route integration                               | Camera capture integrated                            |
| 4    | Franck     | Backend  | ML response endpoint                                 | ML route returning JSON                              |
|      |            |          |                                                      |                                                      |
| 5    | Jérémy     | Backend  | Finish card data normalization                       | Unified data model across APIs                       |
| 5    | Haitu      | Frontend | Finish scan route integration                        | Working scan routes                                  |
| 5    | Franck     | Backend  | Authentification                                     | User can register login logout                       |
|      |            |          |                                                      |                                                      |
| 6    | Jérémy     | Backend  | Display cards in search                              | Magic cards data                                     |
| 6    | Haitu      | Frontend | Connect authentification and ml                      | User can connect and take a photo of a card          |
| 6    | Franck     | ML       | Finish to connect ml with back and front             | User can take a photo of a card and predict his card |
|      |            |          |                                                      |                                                      |
| 7    | Jérémy     | Backend  |                                                      |                                                      |
| 7    | Haitu      | Frontend |                                                      |                                                      |
| 7    | Franck     | ML       |                                                      |                                                      |
|      |            |          |                                                      |                                                      |
| 8    | Jérémy     | Backend  |                                                      |                                                      |
| 8    | Haitu      | Frontend |                                                      |                                                      |
| 8    | Franck     | ML       |                                                      |                                                      |

## 2 Retrospectives
> What worked well during the sprint?
> What challenges did we face?
> What changes can we make to improve the next sprint?

| Week | Assignment | Area     | What worked                           | Challenges                           | Improvements                       |
|------|------------|----------|---------------------------------------|--------------------------------------|------------------------------------|
| 1    | Jérémy     | Backend  | Proxy configuration completed quickly | Backend / frontend connection issues | Standardise API endpoints          |
| 1    | Haitu      | Frontend | UI foundation implemented             | Framework configuration complexity   | Define routing early               |
| 1    | Franck     | ML       | Model inference successful            | Large dataset memory usage           | Optimise data pipeline             |
|      |            |          |                                       |                                      |                                    |
| 2    | Jérémy     | Backend  | Card & set data fetched correctly     | Send correct data                    | Normelize cards data               |
| 2    | Haitu      | Frontend | Forms rendering correctly             | Learning new UI framework            | Improve component modularity       |
| 2    | Franck     | ML       | Streaming performance improved        | HuggingFace integration              | Create unified ML endpoint         |
|      |            |          |                                       |                                      |                                    |
| 3    | Jérémy     | Backend  | Multi-license search implemented      | Complex route logic                  | Refactor folder structure          |
| 3    | Haitu      | Frontend | Page structure completed              | Connection between back & front      | Improve API mocking                |
| 3    | Franck     | Docs     | Full figma prototype                  | Learning design tooling              | Work on ML                         |
|      |            |          |                                       |                                      |                                    |
| 4    | Jérémy     | Backend  | Data normalization stable             | Parsing external APIs                | Improve validation using Pydantic  |
| 4    | Haitu      | Frontend | Camera integration working            | Learning Ngrok integration           | Move to production API             |
| 4    | Franck     | ML       | Faster inference & JSON export        | Multi-service FastAPI sessions       | Help Jérémy on the backend         |
|      |            |          |                                       |                                      |                                    |
| 5    | Jérémy     | Backend  | Display magic datas                   | Parsing magic data                   | Display the right data             |
| 5    | Haitu      | Frontend | Finish camera integration             | Create / use API requests            | Make tests for login and search    |
| 5    | Franck     | Backend  | Login is working                      | Manage postgres and redis            | Connect front back and ml for scan |
|      |            |          |                                       |                                      |                                    |
| 6    | Jérémy     | Backend  | Display correct data despite license  | Universalise data                    | Think more about need before       |
| 6    | Haitu      | Frontend | Authentification + backend connection | Use and parse routes                 | Improve CSS                        |
| 6    | Franck     | ML       | Connection between back and front     | Create 2 fastAPI logics              | Deploy app                         |
|      |            |          |                                       |                                      |                                    |
| 7    | Jérémy     | Backend  |                                       |                                      |                                    |
| 7    | Haitu      | Frontend |                                       |                                      |                                    |
| 7    | Franck     | ML       |                                       |                                      |                                    |
|      |            |          |                                       |                                      |                                    |
| 8    | Jérémy     | Backend  |                                       |                                      |                                    |
| 8    | Haitu      | Frontend |                                       |                                      |                                    |
| 8    | Franck     | ML       |                                       |                                      |                                    |

## 3 Sprint planning
> Sprint plan with prioritized tasks, deadlines, and responsibilities for all team members.

| Week | Member | Area            | Feature                                        | Branch                | QA Validation                                                  |
|------|--------|-----------------|------------------------------------------------|-----------------------|----------------------------------------------------------------|
| 1    | Jérémy | Backend         | Proxy setup                                    | feat/proxy            | Verify successful request forwarding from proxy to backend API |
| 1    | Haitu  | Frontend        | UI toolchain setup (Tailwind, DaisyUI, Lucide) | feat/menu             | Ensure project compiles without errors                         |
| 1    | Franck | ML              | Model initialization                           | feat/ml               | Validate model loads and returns prediction for sample input   |
|      |        |                 |                                                |                       |                                                                |
| 2    | Jérémy | Backend         | Menu & profile route variables                 | feat/route            | Validate JSON format using Postman                             |
| 2    | Jérémy | Backend         | Search filters implementation                  | feat/search           | Confirm filters return correct card IDs                        |
| 2    | Haitu  | Frontend        | Menu UI rendering                              | feat/menu             | Verify responsive rendering (desktop/mobile)                   |
| 2    | Haitu  | Frontend        | Profile page rendering                         | feat/profile          | Validate layout and navigation                                 |
| 2    | Haitu  | Frontend        | Filter integration in search page              | feat/search           | Confirm filter interaction updates gallery dynamically         |
| 2    | Franck | ML              | Model optimization & memory handling           | feat/ml               | Monitor latency and RAM/VRAM usage                             |
|      |        |                 |                                                |                       |                                                                |
| 3    | Jérémy | Backend         | API data restitution finalization              | feat/apiService       | Validate consistent response structure                         |
| 3    | Jérémy | Backend         | Authentication logic (JWT + bcrypt)            | feat/auth             | Validate password hashing and token generation                 |
| 3    | Haitu  | Frontend        | Statistics page                                | feat/stats            | Verify correct rendering and data display                      |
| 3    | Haitu  | Frontend        | Scan page UI                                   | feat/scan             | Validate route rendering                                       |
| 3    | Haitu  | Frontend        | Vault page                                     | feat/vault            | Verify state management and layout                             |
| 3    | Haitu  | Frontend        | Search page                                    | feat/research         | Validate search interaction                                    |
| 3    | Haitu  | Frontend        | Parameters/settings page                       | feat/parameters       | Validate form interactions                                     |
| 3    | Haitu  | Frontend        | Authenticated profile page                     | feat/profilAuth       | Confirm protected route behavior                               |
| 3    | Franck | Documentation   | Complete Figma prototype                       | N/A                   | UI flows validated against implementation                      |
|      |        |                 |                                                |                       |                                                                |
| 4    | Jérémy | Backend         | Final authentication integration               | feat/auth             | Validate login, logout, encryption & token verification        |
| 4    | Haitu  | Frontend        | Scan route camera integration                  | feat/scan             | Verify camera permission, photo capture & preview              |
| 4    | Franck | ML              | User photo processing pipeline                 | feat/ml               | Validate image preprocessing and deletion after inference      |
| 4    | Franck | ML              | ML prediction endpoint                         | feat/ml               | Confirm JSON response matches frontend schema                  |
|      |        |                 |                                                |                       |                                                                |
| 5    | Jérémy | Backend         | API data normalization completion              | feat/normalizedCard   | Ensure consistent schema across multiple APIs                  |
| 5    | Haitu  | Frontend        | Photo upload to ML endpoint                    | feat/scan             | Validate image transmission and response handling              |
| 5    | Franck | Backend         | Authentication refinement                      | feat/profilAuth       | Validate cookie/session behavior                               |
|      |        |                 |                                                |                       |                                                                |
| 6    | Jérémy | Backend         | Finalise search routes                         | feat/standardisedData | Ensure data is displaying right                                |
| 6    | Haitu  | Frontend        | Finalise scan and login implementation         | feat/profilAuth       | Validate register login logout and delete account              |
| 6    | Franck | ML              | Connect front back and ml for scan             | feat/ml               | Validate routes calls                                          |
|      |        |                 |                                                |                       |                                                                |
| 7    | Jérémy | Backend         | Create database for user's collection          | feat/userCollection   | Validate database creation and modification                    |
| 7    | Haitu  | Frontend        | Update CSS to fit figma                        | feat/cdd              | Verify CSS fir figma                                           |
| 7    | Franck | Backend + CI/CD | Deploy app + help backend                      | main + dev            | Deployment work                                                |
|      |        |                 |                                                |                       |                                                                |
| 8    | Jérémy | Backend         |                                                |                       |                                                                |
| 8    | Haitu  | Frontend        |                                                |                       |                                                                |
| 8    | Franck | ML              |                                                |                       |                                                                |

## 4 Source repository
### Repo
https://github.com/Franck-dev-hub/card_vault

### Repo structure
| Folder      | Description            |
|-------------|------------------------|
| backend/    | Backend logic          |
| frontend/   | Frontend logic         |
| ml-service/ | Machine learning model |
| proxy/      | Proxy logic            |

### Branching
`main` - Main production branch
`dev` - Main development branch
`feature/*` - Active feature development
`fix/*` - Bug fix branch
`hotfix/*` - Bug fix on production branch

## 5 Bug tracking
| Week | Area      | Bug found | Bug resolved | Resolution Rate |
|------|-----------|-----------|--------------|-----------------|
| 1    | Backend   | 2         | 1            | 50%             |
| 1    | Frontend  | 1         | 1            | 100%            |
| 1    | ML        | 2         | 2            | 100%            |
|      |           |           |              |                 |
| 2    | Backend   | 2         | 2            | 100%            |
| 2    | Frontend  | 2         | 1            | 50%             |
| 2    | ML        | 3         | 3            | 100%            |
|      |           |           |              |                 |
| 3    | Backend   | 1         | 1            | 100%            |
| 3    | Frontend  | 2         | 3            | 150%            |
| 3    | ML        | 0         | 0            | 100%            |
|      |           |           |              |                 |
| 4    | Backend   | 0         | 1            | 200%            |
| 4    | Frontend  | 2         | 1            | 50%             |
| 4    | ML        | 0         | 0            | 100%            |
|      |           |           |              |                 |
| 5    | Backend   | 1         | 0            | 0%              |
| 5    | Frontend  | 0         | 1            | 200%            |
| 5    | ML        | 0         | 0            | 0%              |
|      |           |           |              |                 |
| 6    | Backend   | 0         | 0            | 100%            |
| 6    | Frontend  | 1         | 1            | 100%            |
| 6    | ML        | 1         | 0            | 0%              |
|      |           |           |              |                 |
| 7    | Backend   |           |              |                 |
| 7    | Frontend  |           |              |                 |
| 7    | ML        |           |              |                 |
|      |           |           |              |                 |
| 8    | Backend   |           |              |                 |
| 8    | Frontend  |           |              |                 |
| 8    | ML        |           |              |                 |

## 6 Testing evidence and results
### Backend
| Endpoint                        | Status  | Description                          |
|---------------------------------|---------|--------------------------------------|
| GET /api/health                 | 200 OK  | Check backend is running             |
|                                 |         |                                      |
| GET /api/dashboard              | 200 OK  | Get page data                        |
| GET /api/scan                   | 200 OK  | Get page data                        |
| GET /api/search                 | 200 OK  | Get page data                        |
| GET /api/stats                  | 200 OK  | Get page data                        |
| GET /api/vault                  | 200 OK  | Get page data                        |
|                                 |         |                                      |
| GET /api/search/pokemon         | 200 OK  | Get license data                     |
| GET /api/search/pokemon/base1   | 200 OK  | Get pokemon extension data           |
| GET /api/search/pokemon/base1/1 | 200 OK  | Get pokemon card data                |
| GET /api/search/magic           | 200 OK  | Get license data                     |
| GET /api/search/magic/khm       | 200 OK  | Get magic extension data             |
| GET /api/search/magic/khm/esika | 200 OK  | Get magic card data                  |
|                                 |         |                                      |
| GET /api/register               | 200 OK  | Get page data                        |
| POST /api/register              | 201 OK  | Post a new user                      |
| POST /api/register              | 409 NOK | Username or email already registered |
|                                 |         |                                      |
| GET /api/login                  | 200 OK  | Get page data                        |
| POST /api/login                 | 201 OK  | User login                           |
| POST /api/login                 | 200 OK  | User token refreshed                 |
| POST /api/login                 | 401 NOK | Invalid credentials                  |
| POST /api/login                 | 500 NOK | Error creating session               |
|                                 |         |                                      |
| GET /api/logout                 | 200 OK  | Get page data                        |
| POST /api/logout                | 200 OK  | Logout successful                    |
| POST /api/logout                | 400 NOK | No session found                     |
| POST /api/logout                | 500 NOK | Error deleting session               |
|                                 |         |                                      |
| GET /api/delete_account         | 200 OK  | Get page data                        |
| POST /api/delete_account        | 200 OK  | User deleted successfully            |
| POST /api/delete_account        | 401 NOK | Invalid credentials                  |
| POST /api/delete_account        | 404 NOK | User email not found                 |

### Frontend
| Component      | Result     |
|----------------|------------|
| ThemeContext   | 5/5 passed |
| ThemeToggle    | 3/3 passed |
| ProtectedRoute | 2/2 passed |
| FooterNav      | 6/6 passed |

### Machine learning
#### Model performance
| Week | Test                           | Result          | Time  |
|------|--------------------------------|-----------------|-------|
| 1    | Dataset image recognition      | 100% confidence | 15m   |
| 1    | Real-world photo recognition   | 72% confidence  | 15s   |
| 2    | Real-world photo recognition   | 82% confidence  | 8s    |
| 4    | Real-world photo recognition   | 85% confidence  | 225ms |

#### API response
| Endpoint                    | Status  | Description         |
|-----------------------------|---------|---------------------|
| GET /ml/app/api/v1/health   | 200 OK  | Check ml is running |
|                             |         |                     |
| GET /ml/app/api/v1/predict  | 200 OK  | Get page data       |
| POST /ml/app/api/v1/predict | 200 OK  |                     |

## 7 Production environment
### Backend
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=fff)
![JWT](https://img.shields.io/badge/JWT-black?logo=json-web-tokens&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009485.svg?logo=fastapi&logoColor=white)  
![Pytest](https://img.shields.io/badge/Pytest-fff?logo=pytest&logoColor=000)
![Pydantic](https://img.shields.io/badge/Pydantic-E92063?logo=Pydantic&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white)

### Frontend
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)
![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=fff)  
![CSS](https://img.shields.io/badge/CSS-639?logo=css&logoColor=fff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?logo=daisyui&logoColor=fff)

### Machine learning
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=fff)  
![NumPy](https://img.shields.io/badge/NumPy-4DABCF?logo=numpy&logoColor=fff)
![Pandas](https://img.shields.io/badge/Pandas-150458?logo=pandas&logoColor=fff)
![Matplotlib](https://custom-icon-badges.demolab.com/badge/Matplotlib-71D291?logo=matplotlib&logoColor=fff)  
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?logo=tensorflow&logoColor=fff)
![PyTorch](https://img.shields.io/badge/PyTorch-ee4c2c?logo=pytorch&logoColor=white)
![Scikit-learn](https://img.shields.io/badge/-scikit--learn-%23F7931E?logo=scikit-learn&logoColor=white)
![Hugging Face](https://img.shields.io/badge/Hugging%20Face-FFD21E?logo=huggingface&logoColor=000)

### Database
![Redis](https://img.shields.io/badge/Redis-%23DD0031.svg?logo=redis&logoColor=white)
![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white)

### DevOps
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)
![Docker Compose](https://img.shields.io/badge/Docker-Compose-gray?logo=docker&logoColor=fff&labelColor=2496ED)  
![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff)
![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)  
![Proxy](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white)  
![Railway](https://img.shields.io/badge/Railway-0b0d0e?logo=railway&logoColor=white)
![Ko-fi](https://img.shields.io/badge/Ko--fi-FF5E5B?logo=ko-fi&logoColor=white)

