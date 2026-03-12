/**
 * Default code snippets for each supported language.
 * Demonstrates syntax highlighting for 7 languages (5+ as claimed on resume).
 */

export type SupportedLanguage =
  | "typescript"
  | "javascript"
  | "python"
  | "html"
  | "css"
  | "json"
  | "markdown";

export interface LanguageConfig {
  id: SupportedLanguage;
  label: string;
  extension: string;
  defaultCode: string;
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    id: "typescript",
    label: "TypeScript (TSX)",
    extension: ".tsx",
    defaultCode: `import React from 'react';
import { Button } from 'react-bootstrap';

interface Props {
  title: string;
  count: number;
  onIncrement: () => void;
}

const Counter: React.FC<Props> = ({ title, count, onIncrement }) => {
  return (
    <div className="counter">
      <h2>{title}</h2>
      <p>Count: {count}</p>
      <Button variant="primary" onClick={onIncrement}>
        Increment
      </Button>
    </div>
  );
};

export default Counter;
`,
  },
  {
    id: "javascript",
    label: "JavaScript",
    extension: ".js",
    defaultCode: `// Async data fetching with error handling
async function fetchUsers(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const users = await response.json();
    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
}

// Array manipulation with modern JS
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenSquares = numbers
  .filter(n => n % 2 === 0)
  .map(n => n ** 2);

console.log('Even squares:', evenSquares);
`,
  },
  {
    id: "python",
    label: "Python",
    extension: ".py",
    defaultCode: `from dataclasses import dataclass
from typing import List, Optional
import asyncio

@dataclass
class User:
    """Represents a user in the system."""
    id: int
    name: str
    email: str
    role: str = "viewer"

class UserService:
    def __init__(self):
        self._users: List[User] = []

    def add_user(self, user: User) -> None:
        self._users.append(user)

    def find_by_email(self, email: str) -> Optional[User]:
        return next(
            (u for u in self._users if u.email == email),
            None
        )

    @property
    def admin_count(self) -> int:
        return sum(1 for u in self._users if u.role == "admin")

async def main():
    service = UserService()
    service.add_user(User(1, "Alice", "alice@example.com", "admin"))
    service.add_user(User(2, "Bob", "bob@example.com"))
    print(f"Admins: {service.admin_count}")

if __name__ == "__main__":
    asyncio.run(main())
`,
  },
  {
    id: "html",
    label: "HTML",
    extension: ".html",
    defaultCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Modern Landing Page</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header class="hero">
    <nav class="navbar">
      <a href="/" class="logo">MyApp</a>
      <ul class="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
    <div class="hero-content">
      <h1>Build Something Amazing</h1>
      <p>Start your next project with our powerful tools.</p>
      <button class="cta-button">Get Started</button>
    </div>
  </header>

  <section id="features" class="features-grid">
    <article class="feature-card">
      <h3>Fast</h3>
      <p>Lightning-fast performance out of the box.</p>
    </article>
    <article class="feature-card">
      <h3>Secure</h3>
      <p>Enterprise-grade security built in.</p>
    </article>
  </section>

  <script src="app.js" type="module"></script>
</body>
</html>
`,
  },
  {
    id: "css",
    label: "CSS",
    extension: ".css",
    defaultCode: `/* Modern CSS with custom properties and animations */
:root {
  --primary: #6366f1;
  --primary-hover: #4f46e5;
  --bg-dark: #0f172a;
  --text-light: #f8fafc;
  --radius: 12px;
  --shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.hero {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--bg-dark), #1e293b);
  color: var(--text-light);
  display: flex;
  flex-direction: column;
}

.cta-button {
  padding: 14px 32px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow);
}

.cta-button:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-card {
  animation: fadeInUp 0.6s ease-out forwards;
  border-radius: var(--radius);
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
`,
  },
  {
    id: "json",
    label: "JSON",
    extension: ".json",
    defaultCode: `{
  "name": "my-awesome-app",
  "version": "2.0.0",
  "description": "A modern web application with full type support",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest",
    "lint": "eslint . --ext .ts,.tsx"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@chakra-ui/react": "^3.0.0"
  },
  "devDependencies": {
    "typescript": "^5.9.0",
    "vite": "^7.0.0",
    "@types/react": "^19.0.0"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
`,
  },
  {
    id: "markdown",
    label: "Markdown",
    extension: ".md",
    defaultCode: `# Project Documentation

## Getting Started

This project uses **React 19** with **TypeScript** for type-safe development.

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation

\`\`\`bash
npm install
npm run dev
\`\`\`

## Architecture

| Layer      | Technology    | Purpose           |
|------------|---------------|-------------------|
| Frontend   | React + TS    | UI Components     |
| Editor     | Monaco        | Code Editing      |
| Types      | ATA           | Auto Type Fetch   |

## API Reference

### \`configureATA(callback)\`

Sets up automatic type acquisition:

- **callback**: \`(code: string, path: string) => void\`
- Returns: ATA trigger function

> **Note**: Types are fetched from unpkg.com automatically.

---

*Built with ❤️ using Monaco Editor*
`,
  },
];

/**
 * Get default code for a given language
 */
export function getDefaultCode(language: SupportedLanguage): string {
  const config = SUPPORTED_LANGUAGES.find((l) => l.id === language);
  return config?.defaultCode ?? "// Select a language to get started\n";
}

/**
 * Get the Monaco-compatible language ID
 */
export function getMonacoLanguage(language: SupportedLanguage): string {
  // Monaco uses 'typescript' for both .ts and .tsx
  if (language === "typescript") return "typescript";
  return language;
}

/**
 * Get file extension for the virtual file path
 */
export function getFileExtension(language: SupportedLanguage): string {
  const config = SUPPORTED_LANGUAGES.find((l) => l.id === language);
  return config?.extension ?? ".ts";
}
