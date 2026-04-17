To start project

1. create .env file based on .env.example (content of .env was sent in email)

2. docker compose up
- start postgres server container
- migrate database
- start nestjs

3. http://localhost:3000/swagger (to call GET AND PUT request)
  
Additional infos:
- commits were merged into main using Pull Requests
- github action checked all the branches (ts, eslint, prettier, test)