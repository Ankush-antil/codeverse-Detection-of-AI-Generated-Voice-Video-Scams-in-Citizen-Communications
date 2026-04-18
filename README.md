<div align="center">

# 🛡️ AI-RAKSHAK
### Detection of AI-Generated Voice and Video Scams in Citizen Communication

**Team Codeverse** | Ankush · Bhumika · Kritika · Atul

[![React Native](https://img.shields.io/badge/React%20Native-Expo%2054-61DAFB?style=flat-square&logo=react)](https://expo.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://mongodb.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Bitmind AI](https://img.shields.io/badge/Bitmind-AI%20Detection-FF6B35?style=flat-square)](https://bitmind.ai)

> *"Protect Yourself from AI Scams — Real-time, Multi-Modal, Built for Bharat."*

</div>

---

## 📋 Table of Contents

1. [Problem Statement & Objective](#-problem-statement--objective)
2. [Gap Analysis](#-gap-analysis)
3. [System Architecture & Workflow](#-system-architecture--workflow)
4. [Technology Stack](#-technology-stack)
5. [Setup & Execution Steps](#-setup--execution-steps)
6. [App Screens & Features](#-app-screens--features)
7. [Future Scope & Limitations](#-future-scope--limitations)

---

## 🚨 Problem Statement & Objective

### The Problem

Deepfake voice and video technology has advanced to the point where AI-generated scam content is **indistinguishable from real** to the average person. This creates serious risks across multiple domains:

| Scam Type | Description | Real-World Impact |
|-----------|-------------|-------------------|
| **Family Emergency Scam** | AI clones voice of son/daughter, calls parents demanding urgent money for hospital/accident | Emotional trauma + financial loss |
| **Official Impersonation** | Fake CBI/police officer deepfake video calls forcing victims to transfer money under threat of arrest | ₹40 lakh lost per incident (Rajasthan, 2024) |
| **Bank Fraud Calls** | AI voice mimicking bank executives to extract OTPs and drain accounts | Growing at 300% year-on-year |
| **Public Figure Deepfakes** | Viral fake videos of politicians and celebrities spreading misinformation via WhatsApp/social media | Mass public deception |

### Key Statistics
- 🇮🇳 India lost **₹1,750 crore** to cyber fraud in 2023 alone
- 📈 Deepfake incidents increased **3,000%** globally since 2019
- 🧠 Humans correctly identify deepfakes only **47% of the time** (MIT Research)
- ⚠️ Existing detection tools require **technical expertise** — inaccessible to ordinary citizens

### Objective

AI-RAKSHAK is a **real-time, multi-modal mobile application** that:
- Detects AI-generated voice in suspicious calls using **Bitmind AI audio analysis**
- Detects deepfake videos using **Bitmind AI frame-level detection** + smart metadata fingerprinting
- Protects vulnerable and elderly users through a family monitoring circle
- Works **offline** using local smart scan when internet is unavailable
- Logs all threats and allows users to block senders or report to Cyber Cell

---

## 🔍 Gap Analysis

### Current Solutions vs. AI-RAKSHAK

| Feature | Existing Tools | AI-RAKSHAK |
|---------|---------------|------------|
| **Real-Time Detection** | ❌ Post-call analysis only | ✅ Detection during/after call |
| **Multi-Modal Analysis** | ❌ Separate audio OR video tools | ✅ Audio + Video unified in one app |
| **Citizen Accessibility** | ❌ Requires technical expertise | ✅ One-tap interface, no expertise needed |
| **Indian Language Support** | ❌ English-centric | ✅ Multi-language i18n infrastructure |
| **Cost** | ❌ Enterprise/paid licensing | ✅ Free for all citizens |
| **Behavioral Pattern Detection** | ❌ Not available | ✅ Psychological scam pattern detection planned |
| **Family Protection** | ❌ Not available | ✅ Family Circle with mobile-based monitoring |
| **Offline Capability** | ❌ Requires internet always | ✅ Smart Metadata Scan works offline |
| **Threat Action System** | ❌ Only shows result | ✅ Block sender + Report to Cyber Cell |
| **Explainable Results** | ❌ Black box verdict | ✅ Detailed reason-by-reason breakdown |

### Critical Gaps in the Market (Addressed by AI-RAKSHAK)

1. **No Unified System** — Audio + video + context never combined in one platform. AI-RAKSHAK solves this.
2. **Not Citizen Accessible** — Complex tools require technical expertise. AI-RAKSHAK is built for Tier 2/3 city users.
3. **No Offline Fallback** — All existing tools require API access. AI-RAKSHAK has a local Smart Metadata Scan.
4. **No Family Safety Net** — Nobody built protection for elderly relatives. AI-RAKSHAK's Family Circle does this.

---

## 🏗️ System Architecture & Workflow

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        INPUT LAYER                          │
│         Suspicious Call Recording / Video Upload            │
└──────────────────────┬──────────────────────────────────────┘
                       │
         ┌─────────────▼─────────────┐
         │      PROCESSING LAYER     │
         │  (Runs simultaneously)    │
         └─────────────┬─────────────┘
                       │
    ┌──────────────────┼──────────────────┐
    │                  │                  │
┌───▼────┐      ┌──────▼──────┐   ┌──────▼──────┐
│ AUDIO  │      │    VIDEO    │   │  METADATA   │
│ ENGINE │      │   ENGINE    │   │   ENGINE    │
│        │      │             │   │             │
│ expo-av│      │ Bitmind AI  │   │ Filename    │
│ record │      │detect-video │   │ Bitrate     │
│        │      │  endpoint   │   │ Duration    │
│Bitmind │      │    +        │   │ Resolution  │
│ Audio  │      │VideoThumb   │   │ File format │
│detect- │      │ extraction  │   │ 30+ keyword │
│ image  │      │             │   │ patterns    │
│ API    │      │  Fallback:  │   │             │
│        │      │  SmartScan  │   │             │
└───┬────┘      └──────┬──────┘   └──────┬──────┘
    │                  │                  │
    └──────────────────▼──────────────────┘
                       │
         ┌─────────────▼─────────────┐
         │       FUSION LAYER        │
         │  Weighted Risk Score      │
         │       (0 – 100%)          │
         └─────────────┬─────────────┘
                       │
         ┌─────────────▼─────────────┐
         │       OUTPUT LAYER        │
         │  ✅ REAL                  │
         │  ⚠️  SUSPICIOUS           │
         │  🚨 DEEPFAKE DETECTED     │
         └─────────────┬─────────────┘
                       │
         ┌─────────────▼─────────────┐
         │      ACTION LAYER         │
         │  • Log to Redux store     │
         │  • Show on Alerts screen  │
         │  • Block sender           │
         │  • Report to Cyber Cell   │
         │  • Notify Family Circle   │
         └───────────────────────────┘
```

### Voice Analysis Workflow

```
Record Audio (expo-av HIGH_QUALITY)
   → Stop & save audio file (.m4a)
   → Upload via multipart FormData to:
       POST https://api.bitmind.ai/detect-image
       Authorization: Bearer <BITMIND_API_KEY>
       field: image (audio/m4a file)
   → Response: { isAI: boolean, confidence: float }
   → Compute: type = AI | HUMAN, confidence = 0–100%
   → If API fails / timeout (30s) → Smart Audio Scan fallback
       • File size heuristic (< 5 KB → suspicious)
   → If AI → Show ThreatActionModal (Block / Report)
   → Log result to Redux (type, confidence, timestamp)
```

### Video Analysis Workflow

```
Select/Record Video (expo-image-picker)
   → File size check (> 10 MB → skip API, use SmartScan)
   → Run in parallel:
       ┌─────────────────────────────────────────────┐
       │ Bitmind AI API Path:                        │
       │  POST https://api.bitmind.ai/detect-video   │
       │  Authorization: Bearer <BITMIND_API_KEY>    │
       │  FormData fields:                           │
       │    video  → video file (video/mp4)          │
       │    endTime → "10"  (first 10 seconds only)  │
       │    fps     → "1"   (1 frame per second)     │
       │  Timeout: 120 seconds                       │
       │  Response: { isAI, confidence, similarity } │
       └─────────────────────────────────────────────┘
       ┌─────────────────────────────────────────────┐
       │ Smart Metadata Scan Path (offline):         │
       │  1. Filename keyword check                  │
       │     (deepfake, faceswap, GAN,               │
       │      runway, sora, heygen etc.)             │
       │  2. File extension (.webm/.gif flag)        │
       │  3. Bitrate proxy calculation               │
       │  4. Duration heuristics (< 5s flag)         │
       │  5. Aspect ratio anomaly detection          │
       └─────────────────────────────────────────────┘
   → API success → merge Bitmind result + metadata flags
   → API fail / file too large → use Smart Scan only
   → Show verdict + detailed reason list
   → Log to Redux store
```

### Bitmind AI API Reference

| Endpoint | Method | Purpose | Field Name | Timeout |
|----------|--------|---------|------------|---------|
| `https://api.bitmind.ai/detect-image` | POST | Audio deepfake detection | `image` (audio/m4a) | 30s |
| `https://api.bitmind.ai/detect-video` | POST | Video deepfake detection | `video` (video/mp4) | 120s |

**Authentication:** `Authorization: Bearer <your_api_key>`

**Response format:**
```json
{ "isAI": true, "confidence": 0.87 }
```

### Backend Architecture

```
Client (React Native App)
        │
        ▼
Node.js + Express Server (PORT 5000)
        │
        ├── POST /api/auth/register  → Create user
        ├── POST /api/auth/login     → Authenticate user
        └── GET  /                   → Health check
        │
        ▼
MongoDB Atlas (Mongoose ODM)
    └── Users Collection
```

---

## 🛠️ Technology Stack

### Frontend (Mobile App)

| Technology | Version | Purpose |
|-----------|---------|---------| 
| **React Native** | 0.81.5 | Cross-platform mobile framework |
| **Expo** | ~54.0.33 | Build toolchain & native APIs |
| **TypeScript** | ~5.9.2 | Type-safe development |
| **Redux Toolkit** | ^2.11.2 | Global state management (scans, alerts, family) |
| **React Navigation** | ^7.x | Stack + Bottom Tab navigation |
| **React Native Paper** | ^5.15.0 | Material Design UI components |
| **expo-av** | ^16.0.8 | Audio recording for call analysis |
| **expo-image-picker** | ~17.0.10 | Video upload + camera recording |
| **expo-file-system** | legacy | Base64 / file info encoding for API upload |
| **i18next + react-i18next** | ^25.x | Multi-language support |
| **@expo/vector-icons** | ^15.1.1 | MaterialCommunityIcons UI icons |

### Backend (Server)

| Technology | Version | Purpose |
|-----------|---------|---------| 
| **Node.js** | LTS | JavaScript runtime |
| **Express.js** | ^4.x | REST API framework |
| **MongoDB** | Atlas Cloud | Database for user storage |
| **Mongoose** | ^8.x | MongoDB ODM |
| **dotenv** | ^16.x | Environment variable management |
| **cors** | ^2.x | Cross-origin request handling |

### AI / ML Layer

| Technology | Purpose |
|-----------|---------|
| **Bitmind AI — `detect-video`** | Frame-level video deepfake detection (primary, cloud-based) |
| **Bitmind AI — `detect-image`** | Audio deepfake detection via image/audio endpoint (primary, cloud-based) |
| **Smart Metadata Scan** | Offline heuristic-based video analysis engine (fallback) |
| **Smart Audio Scan** | File-size heuristic audio analysis (fallback when Bitmind is unavailable) |

> **Previous:** HuggingFace `prithivMLmods/Deepfake-Detection-Model` — **replaced by Bitmind AI in v2.0**

---

## ⚙️ Setup & Execution Steps

### Prerequisites

Before starting, make sure you have installed:
- [Node.js](https://nodejs.org/) (v18 or newer)
- [Git](https://git-scm.com/)
- **Expo Go** app on your Android/iOS device (from Play Store / App Store)
- A [MongoDB Atlas](https://mongodb.com/atlas) account (free tier works)
- A **Bitmind AI** API key — get one from [bitmind.ai](https://bitmind.ai)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/AI-RAKSHAK.git
cd AI-RAKSHAK
```

---

### Step 2 — Frontend Environment Setup

Create a `.env` file in the **root** of the project:

```env
EXPO_PUBLIC_BITMIND_API_KEY=your_bitmind_api_key_here
```

> ⚠️ **Important:** This project uses **Bitmind AI** for deepfake detection (not HuggingFace).
> Get your Bitmind API key from: https://bitmind.ai
>
> The key format is: `bitmind-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:xxxxxxxx`

---

### Step 3 — Install Frontend Dependencies

```bash
npm install
```

---

### Step 4 — Configure API Base URL

Find your PC's local IP address:
- **Windows:** Run `ipconfig` → look for **IPv4 Address** (e.g., `192.168.1.5`)
- **Mac/Linux:** Run `ifconfig` → look for `inet` under `en0`

Open `src/services/api.ts` and update the `BASE_URL`:

```typescript
const BASE_URL = Platform.select({
  android: 'http://192.168.1.X:5000',  // ← replace X with your actual IP
  ios:     'http://192.168.1.X:5000',
  default: 'http://192.168.1.X:5000',
});
```

> ⚠️ Your phone and PC **must be on the same Wi-Fi network**.

---

### Step 5 — Backend Server Setup

Open a **new terminal window** and run:

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```env
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ai-rakshak?retryWrites=true&w=majority
PORT=5000
```

> Replace with your actual MongoDB Atlas connection string.

Start the backend server:

```bash
node index.js
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

> 💡 **Note:** The app works in offline mode even without the server. Only user registration/login requires the backend.

---

### Step 6 — Run the App

In the **root project folder** (not `server/`), run:

```bash
npx expo start --clear
```

A QR code will appear in your terminal.

**To run on your phone:**
1. Open **Expo Go** on your Android/iOS device
2. Scan the QR code
3. The app will load on your device

**To run on Android emulator:**
```bash
npm run android
```

**To run on iOS simulator (Mac only):**
```bash
npm run ios
```

---

### Step 7 — Windows Firewall (If Connection Fails)

If the app can't connect to the backend, allow port 5000 through Windows Firewall:

1. Open **Windows Defender Firewall** → Advanced Settings
2. Click **Inbound Rules** → **New Rule**
3. Select **Port** → **TCP** → enter `5000`
4. Allow the connection → Apply

---

### Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `Network Request Failed` | Phone can't reach server | Check IP in `api.ts`, same Wi-Fi, firewall |
| `MongoDB connection error` | Wrong connection string | Check `server/.env` DATABASE_URL |
| `Bitmind API 401 Unauthorized` | Wrong or missing API key | Check `EXPO_PUBLIC_BITMIND_API_KEY` in root `.env` |
| `Bitmind API timeout (video)` | Large video / slow network | Use a shorter video (< 30s) or wait — app falls back to Smart Scan |
| `Bitmind API timeout (audio)` | Slow network | Wait 30s — app auto-falls back to Smart Audio Scan |
| `File too large (video)` | Video file > 10 MB | App auto-switches to Smart Metadata Scan |
| `Red screen on startup` | Dependency issue | Run `npm install` again, clear cache with `npx expo start --clear` |
| `Expo Go version mismatch` | Old Expo Go app | Update Expo Go from Play Store / App Store |

---

## 📱 App Screens & Features

| Screen | File | Features |
|--------|------|---------|
| **Splash** | `SplashScreen.tsx` | Branded loading screen |
| **Onboarding** | `OnboardingScreen.tsx` | App introduction slides |
| **Language Selection** | `LanguageSelectionScreen.tsx` | Choose app language (i18n) |
| **Register** | `RegisterScreen.tsx` | User registration → MongoDB |
| **Home** | `HomeScreen.tsx` | Shield status, scan counter, quick actions |
| **Call Analysis** | `CallAnalysisScreen.tsx` | Record audio → Bitmind AI `detect-image` → verdict |
| **Video Analysis** | `VideoAnalysisScreen.tsx` | Upload/record video → Bitmind AI `detect-video` + Smart Scan |
| **Alerts** | `AlertsScreen.tsx` | Full log of all past scan results |
| **Family Protection** | `FamilyProtectionScreen.tsx` | Add/remove family members by mobile number |
| **Settings** | `SettingsScreen.tsx` | App preferences and configuration |

---

## 🔭 Future Scope & Limitations

### 🚀 Future Scope

| Phase | Timeline | Feature |
|-------|----------|---------| 
| **Phase 2** | 3 months | UPI payment fraud detection + OTP scam alerts |
| **Phase 3** | 6 months | Telecom/ISP API integration for network-level call screening |
| **Phase 4** | 12 months | Government API integration with national helplines (CERT-In, Cyber Cell) |
| **Phase 5** | 18 months | Blockchain content verification + decentralized authenticity ledger |
| **Phase 6** | 24 months | Real deepfake ML model trained on Indian voice datasets |
| **Phase 7** | 24 months | Support for 22 Indian languages + regional dialect detection |
| **Long-term** | — | Embed directly into telecom network layer (with ISP partnerships) |
| **Long-term** | — | Live call interception analysis (requires telecom license) |

### ⚠️ Current Limitations

| Limitation | Description | Planned Fix |
|-----------|-------------|-------------|
| **Audio analysis uses image endpoint** | Bitmind's `detect-image` endpoint is used for audio analysis as a proxy; a dedicated audio endpoint would be more accurate | Use a purpose-built audio deepfake API or train own LSTM/CNN model |
| **Video file size cap** | Bitmind direct upload is limited to 10 MB; larger files fall back to Smart Scan | Use chunked upload or server-side proxy to handle large files |
| **No live call interception** | App analyzes recorded clips, not true live call streams | Requires OS-level permissions and potentially telecom partnerships |
| **Smart Scan is metadata-based** | Offline fallback uses file properties, not pixel-level neural analysis | Integrate on-device ViT/CNN model for frame-level deepfake detection |
| **Single backend route** | Server currently only handles auth (`/api/auth/`) | Expand with scan logging, threat reporting, and family notification APIs |
| **No push notifications** | Threat alerts are only visible inside the app | Integrate Expo Notifications for real-time alerts |
| **English UI only (partially)** | i18n infrastructure is ready but full translations are incomplete | Complete Hindi and regional language translations |
| **No iOS-specific build** | App is tested primarily on Android via Expo Go | Configure EAS build for iOS TestFlight distribution |

---

## 📁 Project Structure

```
AI-RAKSHAK/
├── src/
│   ├── screens/          # All 10 app screens
│   ├── components/       # Reusable UI components (ThreatActionModal, OfflineIndicator)
│   ├── store/            # Redux slices (settings, logs, family)
│   ├── services/         # API service (api.ts)
│   ├── i18n/             # Multi-language support
│   ├── navigation/       # Stack + Tab navigator
│   └── theme/            # App theme config
├── server/
│   ├── index.js          # Express server entry point
│   ├── routes/
│   │   └── auth.js       # Authentication routes
│   ├── models/           # Mongoose models
│   └── .env              # Server environment variables
├── assets/               # Images and icons
├── .env                  # Frontend env (EXPO_PUBLIC_BITMIND_API_KEY)
├── App.tsx               # Root app component
├── app.json              # Expo config
├── eas.json              # EAS build config
├── render.yaml           # Cloud deployment config
└── README.md             # This file
```

---

## 🔑 Environment Variables Summary

| File | Variable | Description |
|------|----------|-------------|
| `.env` (root) | `EXPO_PUBLIC_BITMIND_API_KEY` | Bitmind AI API key for audio & video deepfake detection |
| `server/.env` | `DATABASE_URL` | MongoDB Atlas connection string |
| `server/.env` | `PORT` | Backend server port (default: 5000) |

---

## 🤝 Contributing

This project was built for a competition by Team Codeverse. For questions or collaboration:
- Ankush · Bhumika · Kritika · Atul

---

<div align="center">

**Built with ❤️ to protect every Indian citizen from AI-powered scams**

*AI-RAKSHAK — Real-Time Deepfake Detection for Bharat*

**v2.0 — Now powered by Bitmind AI**

</div>