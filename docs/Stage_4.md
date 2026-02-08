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
| Week | Assignment | Area     | Result                                    |
|------|------------|----------|-------------------------------------------|
| 1    | Jérémy     | Backend  | Proxy setup                               |
| 1    | Haitu      | Frontend | Taillwind, Daisyui and Lucide React setup |
| 1    | Franck     | ML       | First model setup                         |
|      |            |          |                                           |
| 2    | Jérémy     | Backend  | Send Pokemon informations in routes       |
| 2    | Haitu      | Frontend | Account pages                             |
| 2    | Franck     | ML       | Use Hugging Face streaming                |
|      |            |          |                                           |
| 3    | Jérémy     | Backend  | Manage search route                       |
| 3    | Haitu      | Frontend | Create all pages                          |
| 3    | Franck     | Docs     | Create full working figma model           |
|      |            |          |                                           |
| 4    | Jérémy     | Backend  |                                           |
| 4    | Haitu      | Frontend |                                           |
| 4    | Franck     | ML       |                                           |
|      |            |          |                                           |
| 5    | Jérémy     | Backend  |                                           |
| 5    | Haitu      | Frontend |                                           |
| 5    | Franck     | ML       |                                           |
|      |            |          |                                           |
| 6    | Jérémy     | Backend  |                                           |
| 6    | Haitu      | Frontend |                                           |
| 6    | Franck     | ML       |                                           |
|      |            |          |                                           |
| 7    | Jérémy     | Backend  |                                           |
| 7    | Haitu      | Frontend |                                           |
| 7    | Franck     | ML       |                                           |
|      |            |          |                                           |
| 8    | Jérémy     | Backend  |                                           |
| 8    | Haitu      | Frontend |                                           |
| 8    | Franck     | ML       |                                           |

## 2 Retrospectives
> What worked well during the sprint?
> What challenges did we face?
> What changes can we make to improve the next sprint?

| Week | Assignment | Area     | What worked                 | Challenges                              | Changes                                      |
|------|------------|----------|-----------------------------|-----------------------------------------|----------------------------------------------|
| 1    | Jérémy     | Backend  | Proxy setup                 | Connect front and back together         | Standardise API endpoints                    |
| 1    | Haitu      | Frontend | Create interface            | Complete install and configuration      | Initial routing/navigation                   |
| 1    | Franck     | ML       | Model is working            | Manage heavy data                       | Optimise the data pipeline                   |
|      |            |          |                             |                                         |                                              |
| 2    | Jérémy     | Backend  | Fetch set & card data       | Send the correct data                   | Normelise cards data                         |
| 2    | Haitu      | Frontend | Display form correctly      | search how use framework                | Create other menu pages                      |
| 2    | Franck     | ML       | Streaming is working        | Send and receive streaming data         | Connect to frontend                          |
|      |            |          |                             |                                         |                                              |
| 3    | Jérémy     | Backend  | Manage multi license search | Create a single logic for multi license | Think better about file structure            |
| 3    | Haitu      | Frontend | Create pages                | Connect back & front to display data    | Enhance design & prepare for back connection |
| 3    | Franck     | Docs     | Full figma working model    | Learn new software                      | Work on ML                                   |
|      |            |          |                             |                                         |                                              |
| 4    | Jérémy     | Backend  |                             |                                         |                                              |
| 4    | Haitu      | Frontend |                             |                                         |                                              |
| 4    | Franck     | ML       |                             |                                         |                                              |
|      |            |          |                             |                                         |                                              |
| 5    | Jérémy     | Backend  |                             |                                         |                                              |
| 5    | Haitu      | Frontend |                             |                                         |                                              |
| 5    | Franck     | ML       |                             |                                         |                                              |
|      |            |          |                             |                                         |                                              |
| 6    | Jérémy     | Backend  |                             |                                         |                                              |
| 6    | Haitu      | Frontend |                             |                                         |                                              |
| 6    | Franck     | ML       |                             |                                         |                                              |
|      |            |          |                             |                                         |                                              |
| 7    | Jérémy     | Backend  |                             |                                         |                                              |
| 7    | Haitu      | Frontend |                             |                                         |                                              |
| 7    | Franck     | ML       |                             |                                         |                                              |
|      |            |          |                             |                                         |                                              |
| 8    | Jérémy     | Backend  |                             |                                         |                                              |
| 8    | Haitu      | Frontend |                             |                                         |                                              |
| 8    | Franck     | ML       |                             |                                         |                                              |

## 3 Sprint planning
> Sprint plan with prioritized tasks, deadlines, and responsibilities for all team members.

| Week | Assignment | Area     | Feature                                  | SCM Review      | QA                                                                    |
|------|------------|----------|------------------------------------------|-----------------|-----------------------------------------------------------------------|
| 1    | Jérémy     | Backend  | Setup proxy                              | feat/proxy      | Verify that requests pass from the Proxy to the API without error     |
| 1    | Haitu      | Frontend | Tools setup                              | feat/menu       | Check for errors during compilation                                   |
| 1    | Franck     | ML       | Initialisation of a ml model             | feat/ml         | Check that the model loads into memory and responds to a simple query |
|      |            |          |                                          |                 |                                                                       |
| 2    | Jérémy     | Backend  | Setup variables for menu and profil      | feat/route      | Test the endpoints with Postman to validate the JSON format           |
| 2    | Jérémy     | Backend  | Display filter for cards in search route | feat/search     | Verify that the filters return the correct card IDs                   |
| 2    | Haitu      | Frontend | Display menu                             | feat/menu       | Check the visual rendering and responsiveness on mobile/desktop       |
| 2    | Haitu      | Frontend | Display profil                           | feat/profil     | Check the visual rendering and responsiveness on mobile/desktop       |
| 2    | Haitu      | Frontend | Display filter for cards in search route | feat/search     | Check that clicking on a filter updates the gallery display           |
| 2    | Franck     | ML       | Enhance model data usage                 | feat/ml         | Measure latency and monitor RAM/VRAM to manage large data sets        |
|      |            |          |                                          |                 |                                                                       |
| 3    | Jérémy     | Backend  | Finalise data resitution                 | feat/apiService | Check the data is correctly restitued                                 |
| 3    | Jérémy     | Backend  | Start auth logic                         | feat/auth       | Check JWT and bcrypt usage                                            |
| 3    | Haitu      | Frontend | Implement statistics                     | feat/stats      | Check display working                                                 |
| 3    | Haitu      | Frontend | Implement scan                           | feat/scan       | Check display working                                                 |
| 3    | Haitu      | Frontend | Implement vault                          | feat/vault      | Check display working                                                 |
| 3    | Haitu      | Frontend | Implement research                       | feat/research   | Check display working                                                 |
| 3    | Haitu      | Frontend | Implement parameters                     | feat/parameters | Check display working                                                 |
| 3    | Haitu      | Frontend | Implement profil                         | feat/profilAuth | Check display working                                                 |
| 3    | Franck     | Docs     | Create full working figma model          | N/A             | N/A                                                                   |
|      |            |          |                                          |                 |                                                                       |
| 4    | Jérémy     | Backend  | Finish auth logic                        | feat/auth       | Test encryption & login / logout working well                         |
| 4    | Haitu      | Frontend | Manage scan route                        | feat/scan       | Check camera autorisation & photo is taken                            |
| 4    | Franck     | ML       | Use user photo then delete it            | feat/ml         | Check that the photo is usable                                        |
| 4    | Franck     | ML       | Send best match in a route               | feat/ml         | Check that the json is usable in frontend                             |
|      |            |          |                                          |                 |                                                                       |
| 5    | Jérémy     | Backend  |                                          |                 |                                                                       |
| 5    | Haitu      | Frontend |                                          |                 |                                                                       |
| 5    | Franck     | ML       |                                          |                 |                                                                       |
|      |            |          |                                          |                 |                                                                       |
| 6    | Jérémy     | Backend  |                                          |                 |                                                                       |
| 6    | Haitu      | Frontend |                                          |                 |                                                                       |
| 6    | Franck     | ML       |                                          |                 |                                                                       |
|      |            |          |                                          |                 |                                                                       |
| 7    | Jérémy     | Backend  |                                          |                 |                                                                       |
| 7    | Haitu      | Frontend |                                          |                 |                                                                       |
| 7    | Franck     | ML       |                                          |                 |                                                                       |
|      |            |          |                                          |                 |                                                                       |
| 8    | Jérémy     | Backend  |                                          |                 |                                                                       |
| 8    | Haitu      | Frontend |                                          |                 |                                                                       |
| 8    | Franck     | ML       |                                          |                 |                                                                       |

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
| Week | Area      | Bug found | Bug resolved | Ratio |
|------|-----------|-----------|--------------|-------|
| 1    | Backend   | 1         | 1            | 1     |
| 1    | Frontend  | 1         | 1            | 1     |
| 1    | ML        | 2         | 2            | 1     |
|      |           |           |              |       |
| 2    | Backend   | 2         | 2            | 1     |
| 2    | Frontend  | 2         | 1            | 0.5   |
| 2    | ML        | 3         | 3            | 1     |
|      |           |           |              |       |
| 3    | Backend   | 1         | 1            | 1     |
| 3    | Frontend  | 2         | 3            | 1.3   |
| 3    | ML        | 0         | 0            | 1     |
|      |           |           |              |       |
| 4    | Backend   |           |              |       |
| 4    | Frontend  |           |              |       |
| 4    | ML        |           |              |       |
|      |           |           |              |       |
| 5    | Backend   |           |              |       |
| 5    | Frontend  |           |              |       |
| 5    | ML        |           |              |       |
|      |           |           |              |       |
| 6    | Backend   |           |              |       |
| 6    | Frontend  |           |              |       |
| 6    | ML        |           |              |       |
|      |           |           |              |       |
| 7    | Backend   |           |              |       |
| 7    | Frontend  |           |              |       |
| 7    | ML        |           |              |       |
|      |           |           |              |       |
| 8    | Backend   |           |              |       |
| 8    | Frontend  |           |              |       |
| 8    | ML        |           |              |       |

## 6 Testing evidence and results
| Week | Area    | Test                                     | Result          |
|------|---------|------------------------------------------|-----------------|
| 1    | ML      | Find from a dataset image                | 100% confidence |
| 1    | ML      | Find from real photo                     | 72% confidence  |
|      |         |                                          |                 |
| 2    | Backend | GET localhost/api/search/pokemon         | responses 200   |
| 2    | Backend | GET localhost/api/search/pokemon/base1/1 | responses 200   |
| 2    | ML      | Find from real photo                     | 82% confidence  |
|      |         |                                          |                 |
| 3    | Backend | GET localhost/api/search/magic           | responses 200   |
| 3    | Backend | GET localhost/api/search/magic/khm/esika | responses 200   |
|      |         |                                          |                 |
| 4    | Frontend| ThemeContext: default theme, toggle, localStorage persistence, data-theme attribute    | 5/5 passed      |
| 4    | Frontend| ThemeToggle: render, aria-label accessibility, click toggle | 3/3 passed |
| 4    | Frontend| ProtectedRoute: render when authenticated, loading state | 2/2 passed |
| 4    | Frontend| FooterNav: 5 navigation links (dashboard, statistics, scan, vault, search) | 6/6 passed |

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

