# ResolveHub Backend

This backend provides a MongoDB-backed API for managing complaint history.

## Setup

1. cd backend
2. npm install
3. Create a `.env` file with:
   ```
   MONGODB_URI=mongodb://127.0.0.1:27017/resolvehub
   PORT=4000
   ```
4. Start MongoDB locally, or use Docker Compose from the project root:
   ```bash
   docker compose up -d
   ```
5. Start the backend:
   ```bash
   npm run dev
   ```

## Notes

- If MongoDB is not available, the backend will still start and use in-memory complaint storage until the database reconnects.
- The `resolvehub` database will be created automatically when MongoDB is available.

## API Endpoints

- GET /api/complaints
- POST /api/complaints
- PATCH /api/complaints/:id/status
- GET /api/health

## Quick start (recommended)

1. From the `backend` folder, copy the example env:

```bash
cp .env.example .env
```

2. Start MongoDB using Docker Compose:

```bash
docker compose up -d
```

3. Install deps and run the backend:

```bash
npm install
npm run dev
```

4. Verify the health endpoint:

```bash
curl http://localhost:4000/api/complaints
```

If Docker is not available, install MongoDB locally and set `MONGODB_URI` accordingly.
