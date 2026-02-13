# 🚀 High-Performance Store Management UI

A cutting-edge, enterprise-level Frontend application built with **Next.js 15**. This project showcases modern web development patterns, focusing on extreme performance, sleek neon aesthetics, and advanced server-side synchronization.

---

## 💻 Frontend Engineering Mastery

This project is a deep dive into the **Next.js 15 App Router** architecture, prioritizing User Experience (UX) and Developer Experience (DX).

### ⚡ Next.js 15 & Server-Side Excellence
* **React Server Components (RSC):** Utilized for data-heavy views to minimize client-side JavaScript execution, ensuring near-instant Page Speed scores.
* **Server Actions:** Implemented for all data mutations, enabling a "JS-optional" approach for core functionalities and simplifying state management.
* **Async Request APIs:** Early adoption of Next.js 15's new asynchronous APIs (e.g., `await cookies()`) for optimized dynamic rendering and session handling.

### 🛡️ Advanced Routing & Security
* **Edge-Level Middleware:** Implemented a centralized security layer that intercepts requests at the Edge. This ensures route protection and role-based access control (RBAC) before the browser even starts rendering the page.
* **Secure Token Handling:** Engineered a secure flow to handle JWTs via **HttpOnly Cookies**, providing a stateless yet highly secure authentication experience that is immune to XSS token theft.

### 🚀 Data Flow & UI Optimization
* **On-Demand Cache Revalidation:** Leveraged **Tag-based Caching** (`revalidateTag`). The UI remains lightning-fast by serving cached data, only fetching fresh content when specific data mutations occur.
* **Neon-Dark Design System:** A custom-built UI using **Tailwind CSS**. Features include:
    * **Glassmorphism:** Sophisticated `backdrop-blur` effects for a modern feel.
    * **Visual Alarms:** Pulsing neon CSS animations for low-credit employee alerts.
    * **Atomic Components:** A modular, reusable component library designed for scalability.

---

## 🛠 Tech Stack

| Feature | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router) |
| **Styling** | Tailwind CSS |
| **Icons** | Custom SVGs |
| **Data Fetching** | Fetch API with Server-side Caching |
| **State Management** | Server-side Tag Revalidation |

---

## 🎨 Professional UI Features
* **Smart Dashboard:** Real-time data visualization of stores and personnel.
* **Wallet Management:** An intuitive interface for credit management with conditional rendering based on balance thresholds (< 10,000 credit alerts).
* **Responsive Architecture:** Fully optimized for Mobile, Tablet, and Ultra-wide displays.
* **Optimistic UI:** (Optional: If you added it) Immediate UI feedback during actions for a "no-latency" feel.

---

## 📸 Screenshots
<p align="center">
  <img src="assets/Screenshot 2026-02-13 153433.png" alt="TanPay Dashboard Preview" width="800">
</p>
<p align="center">
  <img src="assets/Screenshot 2026-02-13 153433.png" alt="TanPay Dashboard Preview" width="800">
</p>
<p align="center">
  <img src="assets/Screenshot 2026-02-13 153526.png" alt="TanPay Dashboard Preview" width="800">
</p>
<p align="center">
  <img src="assets/Screenshot 2026-02-13 153918.png" alt="TanPay Dashboard Preview" width="800">
</p>
<p align="center">
  <img src="assets/Screenshot 2026-02-13 153627.png" alt="TanPay Dashboard Preview" width="800">
</p>
<p align="center">
  <img src="assets/Screenshot 2026-02-13 205112.png" alt="TanPay Dashboard Preview" width="800">
</p>


## ⚙️ Development Setup

To run the frontend in a standalone environment:

```bash
# Install dependencies
npm install

# Set up environment variables (.env.local)
echo "NEXT_PUBLIC_API_URL=your_api_endpoint" > .env.local

# Run the development server
npm run dev
