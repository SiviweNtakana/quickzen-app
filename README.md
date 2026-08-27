# AI Workplace Productivity Assistant

A modern, responsive web application that brings together essential workplace productivity tools into one integrated platform. Built with an iOS-inspired design language, the app helps professionals automate everyday tasks using AI — from drafting emails and summarising meeting notes to planning tasks, researching topics, and chatting with a workplace assistant.

This project was built with [Lovable](https://lovable.dev).

---

## Project Overview

The AI Workplace Productivity Assistant is a full-stack React application designed to streamline common professional workflows. It features a central dashboard with sidebar navigation, quick-action cards, and dedicated pages for each AI-powered tool. The interface is clean, pastel-themed, and fully responsive across desktop and mobile devices.

The platform uses a secure server-side AI integration to generate content, ensuring API keys and backend logic are never exposed to the browser.

---

## Features

### Core AI Tools

- **Smart Email Generator**  
  Draft professional emails instantly. Choose from tones such as Formal, Friendly, or Persuasive, then edit and copy the result.

- **Meeting Notes Summarizer**  
  Paste raw meeting notes or transcripts and receive a structured summary with key points, decisions, and action items.

- **AI Task Planner**  
  Enter a list of tasks and let the AI organise them into a prioritised daily or weekly plan.

- **AI Research Assistant**  
  Get structured research summaries, insights, and recommendations on any topic.

- **AI Chatbot**  
  Have an ongoing conversation with a workplace assistant that remembers the current session and suggests follow-up prompts.

### Platform Features

- **Central Dashboard** — Overview of the workspace with hero banner, quick actions, and recent activity.
- **Sidebar & Mobile Navigation** — Fixed sidebar on desktop, bottom navigation bar on mobile.
- **Editable AI Output** — All generated content can be reviewed, edited, copied, regenerated, or cleared.
- **Responsive Design** — iOS-inspired aesthetic with soft shadows, rounded corners, and pastel accents.
- **Responsible AI Disclaimers** — Settings page includes guidance on AI limitations and responsible use.

---

## Tools Used

- **Framework:** [TanStack Start](https://tanstack.com/start) — full-stack React framework with file-based routing and server functions.
- **Language:** TypeScript
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4 with custom theme tokens and CSS variables.
- **AI Backend:** Lovable AI Gateway (`ai.gateway.lovable.dev`) using `google/gemini-3.7-flash`.
- **Server Functions:** `createServerFn` from `@tanstack/react-start` for secure backend RPC.
- **Validation:** Zod for input validation.
- **Icons:** Lucide React
- **Build Tool:** Vite 7
- **Package Manager:** Bun (also compatible with npm)

---

## Setup Instructions

### Prerequisites

- Node.js (LTS recommended) or Bun installed
- A Lovable project with the AI Gateway enabled, or a valid `LOVABLE_API_KEY` environment variable

### 1. Clone the repository

```sh
git clone <this-repository-url>
cd <repository-name>
```

### 2. Install dependencies

Using Bun:

```sh
bun install
```

Or using npm:

```sh
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add your Lovable API key:

```sh
LOVABLE_API_KEY=your_lovable_api_key_here
```

This key is used server-side only by the AI functions in `src/lib/ai.functions.ts`.

### 4. Run the development server

Using Bun:

```sh
bun run dev
```

Or using npm:

```sh
npm run dev
```

The application will be available at `http://localhost:8080` by default.

### 5. Build for production

Using Bun:

```sh
bun run build
```

Or using npm:

```sh
npm run build
```

---

## Project Structure

```text
src/
  components/        # Shared UI components (AppLayout, AiOutput, etc.)
  hooks/             # Custom React hooks
  lib/               # Utility functions, feature config, and AI server functions
  routes/            # TanStack Start file-based routes
  styles.css         # Global theme and Tailwind configuration
  start.ts           # App start configuration
  server.ts          # Server entry configuration
public/              # Static assets
```

---

## Learn More

- [Lovable documentation](https://docs.lovable.dev)
- [TanStack Start documentation](https://tanstack.com/start/latest/docs/framework/react/overview)
- [Tailwind CSS documentation](https://tailwindcss.com/docs)
