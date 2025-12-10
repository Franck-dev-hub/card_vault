# Portfolio Project - Card Vault

> Risks and Challenges

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
