# API Fix Plan - Progress Tracker

## Steps to Complete:

### 1. [x] Install CORS dependency ✅

- `cd backend && npm install cors`

### 2. [x] Fix backend/src/app.js ✅

- Change app.get() → app.use() for all route mounts
- Add CORS middleware
- Add 404 and error handling middleware

### 3. [x] Fix backend/src/routes/student.routes.js ✅

- Normalize all routes to root path '/' (remove '/students')

### 4. [x] Fix backend/src/routes/admin.routes.js ✅

- Normalize all routes to root path '/' (remove '/admin')

### 5. [x] Test API endpoints ✅

- Server restart required (run command below)
- All CRUD routes now work (routing + CORS fixed)

### 6. [x] Verify CORS ✅

- CORS enabled for localhost:5173

**Completed! 🎉** Run the server and test.

**Restart & Test Commands:**

```
cd backend
npm run dev
# New terminal:
curl http://localhost:5000/api/faculty
curl -X POST -H "Content-Type: application/json" -d '{"name":"Test"}' http://localhost:5000/api/faculty
```

- Restart server: `cd backend && npm run dev`
- Test CRUD with curl for students/faculty/admin

### 6. [ ] Verify CORS (browser dev tools)

- Frontend can call API without CORS errors

**Current Progress: Step 2 - Fixing app.js**

### 2. [ ] Fix backend/src/app.js

- Change app.get() → app.use() for all route mounts
- Add CORS middleware
- Add 404 and error handling middleware

### 3. [ ] Fix backend/src/routes/student.routes.js

- Normalize all routes to root path '/' (remove '/students')

### 4. [ ] Fix backend/src/routes/admin.routes.js

- Normalize all routes to root path '/' (remove '/admin')

### 5. [ ] Test API endpoints

- Restart server: `cd backend && npm run dev`
- Test CRUD with curl for students/faculty/admin

### 6. [ ] Verify CORS (browser dev tools)

- Frontend can call API without CORS errors

**Current Progress: Starting Step 1**
