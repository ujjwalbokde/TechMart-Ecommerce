# 🛍️ TechMart — E-commerce Product Catalog

A **Next.js 15 full-stack e-commerce application** demonstrating multiple rendering strategies:  
**SSG**, **ISR**, **SSR**, **CSR**, and **Hybrid Rendering** — all in one project.

**👤 Author:** Ujjwal Bokde  
**📅 Date:** October 28, 2025  

---

## 🚀 Installation & Setup

<details>
<summary><b>📦 View Setup Instructions</b></summary>

### 🧰 Prerequisites
- **Node.js ≥ 18.17.0**
- **npm** or **yarn** package manager

### ⚙️ Steps to Run Locally
```bash
# 1️⃣ Clone the repository
git clone <your-repository-url>

# 2️⃣ Navigate to the project directory
cd ecommerce-app

# 3️⃣ Install dependencies
npm install

# 4️⃣ Run the development server
npm run dev

```
### Then open your browser at 👉 http://localhost:3000

### 🏗️ Build for Production
npm run build
npm start

---


### 🧩 Project Structure

<details>
<summary><b>🗂️ Expand to view file layout</b></summary>

ecommerce-app/
├── app/
│   ├── layout.js               # Root layout
│   ├── page.js                 # Home (SSG)
│   ├── products/[slug]/        # Product detail (ISR)
│   ├── dashboard/              # Inventory dashboard (SSR)
│   ├── admin/                  # Admin panel (CSR)
│   ├── recommendations/        # Recommendations (Hybrid)
│   └── api/products/           # API routes
├── components/
│   ├── ProductCard.js
│   ├── SearchBar.js
│   └── AddToWishlist.js
├── data/
│   └── products.json           # Local JSON database
├── tailwind.config.js
└── package.json


</details>


### ⚙️ Rendering Strategies Explained
| Page	| Rendering Type	| Implementation	| Reason |
|-------|----------------|-----------------|--------|
| /	| SSG (Static Site Generation)	| Pre-rendered at build time	| Fast, SEO-friendly, ideal for static product lists |
| /products/[slug]	| ISR (60s)	| export const revalidate = 60	| Updates every 60s for fresh inventory/pricing |
| /dashboard	| SSR (Server Side Rendering)	| export const dynamic = 'force-dynamic'	| Real-time, accurate inventory stats |
| /admin	| CSR (Client Side Rendering)	| 'use client' + useEffect()	| Interactive admin page, no SEO need |
| /recommendations	| Hybrid	| Mix of Server + Client components	| Best of both — fast data, dynamic interactivity |

### 🗃️ Database Setup

This project uses a local JSON file as its database.

📘 View database info
📍 Location

data/products.json

✅ No setup required

It’s pre-included and ready to use.

📄 Data Model
{
  "id": "1",
  "name": "MacBook Air M3",
  "slug": "macbook-air-m3",
  "description": "Lightweight laptop with Apple Silicon",
  "price": 1249,
  "category": "laptops",
  "inventory": 15,
  "lastUpdated": "2025-10-28T10:00:00Z"
}


### 🔗 API Routes
Method	    Endpoint	                Description	
GET	    /api/products	        Fetch all products	
GET	    /api/products/[slug]	Fetch single product	
POST	    /api/products	        Add a product	
PUT	    /api/products/[id]	    Update a product	


### 🌍 Deployment Notes

* 🧭 Live Demo: https://tech-mart-ecommerce.vercel.app/ 

Works on Deployment	Not Supported on Deployment
✅ Home page	❌ Admin Add/Edit
✅ Product details	❌ POST /api/products
✅ Recommendations	
✅ All GET routes	

🧾 Reason: Vercel hosting disallows fs.writeFile() on serverless runtime.
💡 Fix: Use a real database (e.g., MongoDB, Supabase, or PostgreSQL) for production.

### 🧠 Technologies Used
Stack	    Tools
Frontend	Next.js 15, React 18.3.1
Styling	    Tailwind CSS
Language	JavaScript (ES6+)
Database	Local JSON file
Deployment	Vercel


### 📘 Viewing the Project Report (p.pdf)

To read the full project report:

Locate the file p.pdf in the project root.

Open it in any PDF viewer (e.g., Adobe Acrobat, Chrome, or Edge).

It includes architecture, flow diagrams, and screenshots of the project.

✅ Assignment Checklist
Requirement	Status
Home Page (SSG)	✅
Product Page (ISR, 60s)	✅
Dashboard (SSR)	✅
Admin Panel (CSR)	✅
Recommendations (Hybrid)	✅
API Routes (GET, POST, PUT)	✅
JSON Database	✅
Rendering Explanation	✅
Responsive Design	✅
Deployed on Vercel	✅
💖 Built with Passion using Next.js & Tailwind CSS

© 2025 Ujjwal Bokde
