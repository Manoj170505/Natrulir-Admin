# Natrulir-Admin 🌿

Administrative operations and management portal for **Natrulir** living microgreens e-commerce.

## 🚀 Features

- **Operations Dashboard**: Real-time sales metrics, revenue analytics, and order status breakdown (`Pending`, `Processing`, `Order Picked`, `Denied`, `Delivered`).
- **Order Management & Quick Dispatch**:
  - Filter orders by status and search by customer name, phone, or order ID.
  - **1-Click Actions**: Update order status directly to **`Order Picked`** or **`Denied`**.
  - Detailed invoice view with customer shipping information and ordered product breakdown.
- **Product & Inventory Management**:
  - Add new microgreen products with live preview cards and photo presets.
  - Edit prices, stock availability, nutritional badges, taste profiles, and harvest cycles.
  - Low stock alerts and delete protection.
- **Unified Design Theme**: Styled in the same organic aesthetic with Tailwind CSS and Lucide React.

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS + PostCSS
- **Icons**: Lucide React
- **API Integration**: REST endpoints connected to MongoDB Atlas via Express & Prisma

## 🏃 Running Locally

```bash
# Install dependencies
npm install

# Start Admin Portal
npm run dev -- --port 5174
```
