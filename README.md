# AI-RAKSHAK: Scam Detection App

This is a comprehensive React Native (Expo) app designed to detect AI-generated voice and video scams. Follow the full instructions below to run this project on any system.

## Setup Instructions

### 1. Prerequisites
Make sure you have installed the following on your PC/Mac:
- [Node.js](https://nodejs.org/en/) (v16 or newer recommended)
- Git
- Expo Go app on your physical smartphone (available on Android Play Store / iOS App Store)

### 2. Frontend App Setup
1. Open a terminal or Command Prompt.
2. Clone the repository and navigate into the folder.
3. Install frontend dependencies:
   ```bash
   npm install
   ```
4. Find your PC's local IP Address (e.g., Run `ipconfig` on Windows taking the IPv4 Address).
5. Open `src/services/api.ts` and update `BASE_URL` with your exact PC IP address so the mobile app can reach the backend:
   ```typescript
   const BASE_URL = Platform.select({
     android: 'http://192.168.1.X:5000', // replace with your IP
     ios: 'http://192.168.1.X:5000',
     default: 'http://192.168.1.X:5000',
   });
   ```

### 3. Backend Server Setup (For Database Storage)
**Important:** If you skip this, user data will not store in the database, but the app will STILL work in offline fallback mode!
1. Open a *new* terminal window.
2. Navigate into the `server` directory:
   ```bash
   cd server
   ```
3. Install backend dependencies:
   ```bash
   npm install
   ```
4. Make sure your `server/.env` file has your valid MongoDB Connection string:
   ```env
   DATABASE_URL=mongodb+srv://<username>:<password>@cluster0...
   PORT=5000
   ```
5. Start the Node.js backend server:
   ```bash
   node index.js
   ```
   *You should see a message saying "MongoDB connected successfully" and "Server running".*

### 4. Running the App on an Android/iOS Device
1. Ensure your PC and Smartphone are connected to the **SAME Wi-Fi Network**. (If you use a mobile hotspot, Windows Firewall might block the connection—ensure port 5000 is open or disable the firewall temporarily).
2. Start the Expo server in the project root folder:
   ```bash
   npx expo start --clear
   ```
3. A QR code will appear in your terminal. 
4. Open the **Expo Go** app on your phone.
5. Scan the QR code.
6. The app should load natively on your device. When you register, the data should now successfully sync with your MongoDB Atlas database via the backend server!

## Troubleshooting Network Issues
* **Red Screen Error:** We have added a 5-second timeout in the latest commit to prevent infinite loading.
* **Network Request Failed:** This always means the app couldn't reach your server. Check these three things:
  - Your phone and laptop **MUST** be on the same WiFi.
  - The IP address in `src/services/api.ts` must exactly match your PC's IP (`ipconfig`).
  - Windows Defender / Firewall is not blocking port 5000. Under Windows Firewall, allow inbound connections for port 5000.