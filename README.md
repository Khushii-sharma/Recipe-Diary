#  Recipe Diary

A premium, responsive recipe discovery platform built with **Next.js**. RecipeDiary combines a high-end UI with seamless state management to provide users with a "Cookbook" experience, allowing them to discover, save, and manage recipes with ease.

---

## Features

### **Smart Search Engine**
  - **Global Search Context:** Accessible from anywhere in the app via a sleek Navbar integration.
  - **Dynamic Overlay:** Features a backdrop blur effect and "click-outside" logic to focus the user experience during search.
  - **URL Synchronization:** Search queries are synced with the URL for easy sharing and browser navigation.

### **Digital Cookbook (Saved Recipes)**
  - **Protected Access:** The Saved Recipes page is a **Protected Route**; unauthenticated users are automatically prompted to log in via a modal.
  - **Persistent Storage:** Uses localStorage with a **Hydration Guard** to prevent SSR mismatches and ensure your favorites are there when you return.
  - **Batch Actions:** Includes a "Clear All" feature with a safety confirmation toggle to manage your collection quickly.

### **Premium Login Experience**
  - **Mobile-First Auth:** Optimized for Indian mobile numbers with a 4-digit random OTP simulation.
  - **Intelligent Inputs:** OTP fields feature auto-focus shifting (forward on type, backward on backspace) and "Enter" key submission support.
  - **Responsive UI:** Adaptive design that acts as a standard modal on desktop and a "Bottom Sheet" on mobile devices.

### **Rich Content Discovery**
  - **Detailed Pages:** View full ingredients list, step-by-step instructions, and embedded YouTube tutorials.
  - **Animated UI:** Smooth transitions and staggered grid animations for a polished, high-end feel.


---

## Tech Stack

- **Next.js (App Router):**	Framework, Routing, and SSR/CSR optimization
- **React Context API:**	Global state for Auth, Search, and Saved Recipes
- **Tailwind CSS:**	Utility-first styling and responsive layouts
- **TheMealDB API:**	External data source for 500+ global recipes
- **Lucide React:**	Consistent, high-quality iconography
- **React Toastify:**	Real-time feedback for OTP and action confirmations


---

##  How to Run Locally

### Install dependencies
```bash
npm install
```

### Start development server
```bash
npm run dev
```

App runs at: `http://localhost:3000`

## Future Improvements
- **Real Auth:** Integration with Firebase or NextAuth.js.
- **Advanced Filtering:** Filter by dietary restrictions (Vegan, Gluten-Free) or prep time.
- **Meal Planner:** A calendar view to drag and drop saved recipes into a weekly plan.
- **Share to Social:** One-click sharing of recipe cards to WhatsApp or Instagram.


### Author
Khushi | sharmakhushi1501@gmail.com
