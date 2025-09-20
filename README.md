# 📸 Image Finder - A React Image Gallery

A simple and elegant image gallery application built with React, Vite, and Tailwind CSS. It utilizes the Pexels API to allow users to search for high-quality photos, view them in a responsive grid, and download them with a single click.

## live demo
https://imagesearchfake.netlify.app/

## ✨ Features

-   **Dynamic Search:** Find images on any topic with a clean search interface.
-   **Infinite Scroll:** Use the 'Load More' button to seamlessly browse more photos.
-   **One-Click Download:** Easily download original-quality images directly.
-   **Responsive Design:** A beautiful and functional layout on desktops, tablets, and mobile devices.
-   **User Feedback:** Integrated toast notifications for a smooth and informative user experience.
-   **Sleek Animations:** Subtle loading and entry animations powered by `Animate.css` for a modern feel.

---

## 🛠️ Technologies Used

-   **Framework:** React (Vite)
-   **Styling:** Tailwind CSS
-   **API Calls:** Axios
-   **Icons:** Remix Icon
-   **Animations:** Animate.css
-   **Notifications:** React Toastify
-   **Image Source:** Pexels API

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm, yarn, or pnpm

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/imagefinder.git](https://github.com/your-username/imagefinder.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd imagefinder
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    -   You need an API key from [Pexels](https://www.pexels.com/api/). It's free!
    -   Create a new file named `.env` in the root of your project.
    -   Add your Pexels API key to the `.env` file like this:

    ```env
    VITE_PEXELS_API_KEY=YOUR_PEXELS_API_KEY_HERE
    ```

5.  **Update the API Key usage in the code:**
    -   Open `src/App.js`.
    -   Find the line: `const API_KEY = 
    -   Replace it with the following line to use your environment variable securely:
    ```javascript
    const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
    ```

6.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application should now be running on `http://localhost:5173` (or another port if 5173 is busy).

---

## 📜 Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in development mode.
-   `npm run build`: Builds the app for production.
-   `npm run preview`: Serves the production build locally for preview.
-   `npm run lint`: Lints the project files.

---

## 👨‍💻 Author
Pavan Birari
Frontend Developer | MERN Stack Devloper
