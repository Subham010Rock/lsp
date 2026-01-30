# Monaco Editor with Auto Type Acquisition (ATA)

A browser-based code editor providing **VSCode-like intelligent autocomplete** for TypeScript and React development, powered by Monaco Editor and TypeScript's Automatic Type Acquisition.

![Monaco Editor Screenshot](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue) ![Vite](https://img.shields.io/badge/Vite-7-purple)

## ✨ Features

- **Real-time Autocomplete** – Get intelligent suggestions as you type, just like VSCode
- **Automatic Type Acquisition** – Types for npm packages (React, MUI, Chakra UI, etc.) are fetched automatically when you import them
- **Zero Backend** – Everything runs in the browser using TypeScript's language services
- **Multi-library Support** – Works with React Bootstrap, Material UI, Chakra UI, and any npm package with TypeScript definitions

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🛠️ Tech Stack

| Technology          | Purpose                      |
| ------------------- | ---------------------------- |
| **React 19**        | UI Framework                 |
| **TypeScript 5.9**  | Type Safety                  |
| **Monaco Editor**   | Code Editor (same as VSCode) |
| **@typescript/ata** | Automatic Type Acquisition   |
| **Vite 7**          | Build Tool                   |

## 💡 How It Works

1. **Monaco Editor** – The same editor that powers VSCode runs in the browser
2. **TypeScript Language Services** – Provides type checking and autocomplete
3. **ATA (Automatic Type Acquisition)** – When you write `import { Button } from '@chakra-ui/react'`, ATA automatically downloads the type definitions from npm

## 📁 Project Structure

```
src/
├── App.tsx              # Main app with ATA integration
├── components/
│   └── CodeEditor.tsx   # Monaco Editor wrapper
└── utils/
    └── ata.ts           # ATA configuration
```

## 🌐 Live Demo

[View Live Demo](https://your-project.vercel.app) _(Add your deployed URL here)_

## 📄 License

MIT
