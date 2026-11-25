# Registration Form — React + Vite

A clean, fully responsive registration form built with **React 18** and **Vite 6**. Frontend-only, no backend required, ready to deploy to **Vercel** in one click.

---

## ✨ Features

| Feature | Detail |
|---|---|
| **11 fields** | Full Name, First Name, Last Name, Email, Phone, Username, Password, Confirm Password, Date of Birth, Gender, Address |
| **Field validation** | Real-time (on blur) + full check on submit |
| **Show / Hide password** | Toggle buttons on both password fields |
| **Password strength meter** | Weak → Fair → Good → Strong |
| **Reset** | Clears all fields and errors |
| **Submit** | Shows a success screen with the registrant's name |
| **Autofill-ready** | All inputs have semantic `id`, `name`, and `autocomplete` attributes |
| **Accessible** | ARIA roles, `aria-invalid`, `aria-describedby`, `role="alert"` |
| **Responsive** | Mobile-first CSS; two-column → single-column on small screens |

---

## 🚀 Local Development

### Prerequisites

- **Node.js** ≥ 18 — [nodejs.org](https://nodejs.org)
- **npm** ≥ 9 (bundled with Node)

### Install & Run

```bash
# 1. Clone or download the project
git clone <your-repo-url>
cd demo_website

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app opens at **http://localhost:5173** (or the next available port).

### Other Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production → `dist/` |
| `npm run preview` | Preview the production build locally |

---

## 🌐 Vercel Deployment

### Option A — Vercel CLI (recommended)

```bash
# Install Vercel CLI globally (once)
npm install -g vercel

# Deploy from the project root
vercel

# Follow the prompts:
#   Set Up and Deploy? → Y
#   Which scope? → your team/personal
#   Link to existing project? → N
#   Project name? → registration-form (or anything)
#   In which directory is your code? → ./
#   Override build settings? → N

# Production deploy
vercel --prod
```

### Option B — GitHub Import (zero-config)

1. Push this folder to a **GitHub repository**.
2. Go to [vercel.com/new](https://vercel.com/new) → **Import** the repository.
3. Vercel auto-detects **Vite** — no settings need to change.
4. Click **Deploy**. Done!

> [!NOTE]
> The included `vercel.json` configures the static build output directory and handles SPA routing — no extra config needed.

---

## 📂 Project Structure

```
demo_website/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── RegistrationForm.jsx   # Main form component
│   │   └── RegistrationForm.css   # Component styles
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css                  # Global styles & CSS variables
├── index.html
├── vite.config.js
├── vercel.json                    # Vercel deployment config
├── package.json
├── .gitignore
└── README.md
```

---

## 🔒 Validation Rules

| Field | Rules |
|---|---|
| Full Name | Required, min 3 characters |
| First / Last Name | Required, letters/spaces/hyphens/apostrophes only |
| Email | Required, valid email format |
| Phone | Required, 7–20 digits (supports `+`, spaces, dashes, parens) |
| Username | Required, 3–20 characters, `a-z A-Z 0-9 _` only |
| Password | Required, 8+ chars, 1 uppercase, 1 number, 1 special character |
| Confirm Password | Required, must match Password |
| Date of Birth | Required, age must be 13–120 |
| Gender | Required, one of the listed options |
| Address | Required, min 10 characters |

---

## 🛠 Tech Stack

- **React 18** — UI library
- **Vite 6** — build tool & dev server
- **Plain CSS** — no framework, fully custom
- **HTML5 semantics** — `fieldset`, `legend`, `label`, ARIA attributes

---

## 📄 License

MIT — free to use and modify.
