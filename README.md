# 🏷️ Scalable Next.js E-Commerce Platform

An enterprise-grade, high-performance clothing storefront built with **Next.js (App Router)**. This repository is architected using a **Feature-Driven (Screaming) Architecture** to ensure perfect separation of concerns, rapid development scalability, and elite SEO optimization out of the box.

---

## 🏛️ Project Directory Structure

```text
src/
├── app/                            # 🌐 ROUTING & PAGE LAYER ONLY
│   ├── layout.tsx                  # Global root layout & font configurations
│   ├── page.tsx                    # Landing page -> Imports <LandingPageFeature/>
│   ├── global.css                  # Tailored utility styling directives
│   ├── shop/
│   │   └── page.tsx                # Storefront feed -> Imports <ShopFeature/>
│   ├── admin/                      # 🔐 ISOLATED ADMIN ROUTE WRAPPERS
│   │   ├── page.tsx                # Metrics dashboard layout
│   │   └── inventory/
│   │       └── page.tsx            # Inventory controller portal
│   └── api/                        # 🧠 BACKEND CONTROLLERS (Serverless Routes)
│       ├── products/route.ts       # REST endpoint handling product entities
│       └── checkout/route.ts       # Transactional gateway & webhook processor
│
├── features/                       # 🧩 DOMAIN BUSINESS LOGIC CORES
│   ├── LandingPage/
│   │   ├── components/             # Localized layout tokens (banners, promotional cards)
│   │   ├── sections/               # Macro sections (HeroSection, ArrivalsSection, DealsSection)
│   │   └── data/                   # Isolated static layout mock data arrays
│   │
│   ├── Shop/                       # 🛍️ CORE STOREFRONT DOMAIN MODULE
│   │   ├── components/             # ProductGrid, ProductCard, FilterSidebar components
│   │   ├── hooks/                  # Custom abstractions (useProductFilter, usePagination)
│   │   └── services/               # Dynamic abstract fetches pointing to /api/products
│   │
│   ├── Admin/                      # 📊 INDEPENDENT BACK-OFFICE OPERATIONS CONTROL
│   │   ├── components/             # Sidebar rails, SalesGraphs, ProductUploadForm inputs
│   │   ├── hooks/                  # Business flows managing mutation states
│   │   └── services/               # Asset ingestion pipelines (Multipart mutations to AWS S3)
│   │
│   └── Cart/                       # 🛒 ISOLATED CLIENT TRANSACTION STATE
│       ├── components/             # CartDrawer slider overlay, individual CartItems
│       └── store/                  # Distributed cache or atomic store configurations
│
├── components/                     # ⚛️ GLOBAL ATOMIC DESIGN TOKENS
│   └── ui/                         # Design system elements (Buttons, Dialogs, Input primitives)
│
└── Extras/                         # 🛠️ CROSS-CUTTING APPLICATION UTILITIES
    ├── assets/                     # Immutable SVGs, brand assets, static layouts
    ├── hooks/                      # Global viewport listeners (useMediaQuery, useClickOutside)
    ├── providers/                  # Application runtime providers (ThemeProvider, ReactQuery)
    └── utils/                      # Pure helper computations (formatCurrency, string merges)
```
