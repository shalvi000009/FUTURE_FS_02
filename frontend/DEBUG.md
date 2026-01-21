# Debugging Guide - React App Not Showing Output

## Step 1: Check if Dev Server is Running
Open a new terminal and run:
```bash
cd frontend
npm run dev
```

You should see output like:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## Step 2: Open Browser
Go to: **http://localhost:5173**

## Step 3: Check Browser Console
Press F12 to open Developer Tools and check:
- Console tab for errors (red messages)
- Network tab to see if files are loading

## Step 4: Common Issues

### Issue 1: Port Already in Use
If port 5173 is busy, kill the process:
```bash
# Windows PowerShell
Get-Process -Name node | Stop-Process
```

### Issue 2: Dependencies Not Installed
```bash
cd frontend
npm install
```

### Issue 3: Cache Issues
```bash
cd frontend
rm -rf node_modules/.vite
npm run dev
```

## Step 4: Check for Import Errors
Look for errors like:
- "Cannot find module"
- "Unexpected token"
- "Failed to resolve"

## Step 5: Verify Files Exist
Make sure these files exist:
- frontend/src/main.jsx
- frontend/src/App.jsx
- frontend/index.html
- frontend/src/components/ErrorBoundary.jsx

