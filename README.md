# 🏷️ Scalable Next.js E-Commerce Platform

An enterprise-grade, high-performance clothing storefront built with **Next.js (App Router)**. This repository is architected using a **Feature-Driven (Screaming) Architecture** to ensure perfect separation of concerns, rapid development scalability, and elite SEO optimization out of the box.

---

## 🏛️ Project Directory Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── global.css
│   ├── Product/[productSlug]
│   │   └── page.tsx
│   ├── Shop/
│   │   ├── page.tsx
│   │   └── inventory/
│   │       └── page.tsx
│
├── features/
│   ├── LandingPage/
│   │   ├── components/
│   │   ├── sections/
│   │   └── data/
│   │
│   ├── Shop/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│
├── components/
│   └── ui/
└── Extras/
    ├── assets/
    ├── hooks/
    ├── providers/
    └── utils/                      # Pure helper computations (formatCurrency, string merges)
```

---
