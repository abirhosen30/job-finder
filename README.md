<div align="center">

# 💼 JobFinder

### Find Your Dream Job

A modern job finding platform with **search, filters, bookmarks, and dynamic job details** — built with Next.js and TypeScript.

<br />

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-2563eb?style=for-the-badge&logo=vercel&logoColor=white)](https://job-finder-iota-umber.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/abirhosen30/job-finder)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Pages & Routes](#-pages--routes)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Author](#-author)

---

## 🚀 About the Project

**JobFinder** helps job seekers discover their next opportunity quickly. Browse popular categories, explore featured listings, narrow results with powerful filters, open a detailed page for any job, and save the ones you like for later.

The app is fully responsive and designed to feel fast, clean, and easy to use on any device.

🔗 **Live site:** [job-finder-iota-umber.vercel.app](https://job-finder-iota-umber.vercel.app)

---

## ✨ Features

- 🔍 **Smart Search** — search jobs by title or keyword right from the home page
- 🗂️ **Popular Categories** — jump straight into Frontend, Backend, UI/UX, or Data Science roles
- ⭐ **Featured Jobs** — highlighted openings with company, location, salary range, and job type
- 🎛️ **Advanced Filters** — filter by job type, category, and location
- ↕️ **Flexible Sorting** — sort by newest, salary (high to low), or salary (low to high)
- 📄 **Dynamic Job Details** — every job has its own details page (`/jobs/[id]`)
- 🔖 **Saved Jobs** — bookmark jobs and revisit them anytime on the Saved page
- 📱 **Responsive Design** — works smoothly on mobile, tablet, and desktop

### Supported Job Types

| Type | Description |
| --- | --- |
| 🕘 Full Time | Standard full-time positions |
| 🕐 Part Time | Flexible, reduced-hour roles |
| 🎓 Internship | Entry-level and learning opportunities |
| 🏠 Remote | Work from anywhere |

---

## 🛠️ Tech Stack

| Category | Technology |
| --- | --- |
| **Framework** | [Next.js](https://nextjs.org) (App Router) |
| **Library** | [React](https://react.dev) |
| **Language** | [TypeScript](https://www.typescriptlang.org) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) |
| **Linting** | [ESLint](https://eslint.org) |
| **Fonts** | [Geist](https://vercel.com/font) via `next/font` |
| **Deployment** | [Vercel](https://vercel.com) |

---

## 🧭 Pages & Routes

| Route | Description |
| --- | --- |
| `/` | Home — hero search, popular categories, featured jobs |
| `/jobs` | Browse all jobs with search, filters, and sorting |
| `/jobs/[id]` | Detailed view of a single job |
| `/saved` | Your bookmarked jobs |

---

## 📁 Project Structure

```bash
job-finder/
├── public/               # Static assets
├── src/                  # Application source (pages, components, data)
├── .gitignore
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies & scripts
├── postcss.config.mjs    # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md
```

---

## ⚡ Getting Started

Follow these steps to run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org) 18.18 or later
- npm, yarn, pnpm, or bun

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/abirhosen30/job-finder.git
cd job-finder
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
npm run dev
```

**4. Open the app**

Visit [http://localhost:3000](http://localhost:3000) in your browser. The page auto-updates as you edit files.

---

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production build |
| `npm run lint` | Check code with ESLint |

---

## 🌐 Deployment

This project is deployed on **Vercel**. To deploy your own copy:

1. Push the repository to your GitHub account
2. Import it on [Vercel](https://vercel.com/new)
3. Click **Deploy** — Vercel detects Next.js automatically

See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more options.

---

## 🗺️ Roadmap

- [ ] User authentication (sign up / log in)
- [ ] Employer dashboard to post and manage jobs
- [ ] Job application tracking
- [ ] Database integration for real job listings
- [ ] Email alerts for new matching jobs
- [ ] Dark mode

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Abir Hosen**

- GitHub: [@abirhosen30](https://github.com/abirhosen30)

---

<div align="center">

⭐ If you like this project, please give it a star — it really helps!

Made with ❤️ using Next.js

</div>
