# 🐾  Personal Finance Manager - Take Control of Your Finances! 🐾

![Cute Cat with Calculator](https://placekitten.com/400/300)

##  👋 Welcome!

This project is a web application designed to simplify your personal finance management.  If you're tired of messy receipts and struggling to keep track of your budget, you've come to the right place!  I built this tool to make managing your finances easier and more intuitive.

## ✨ Key Features

This website is packed with features to help you stay on top of your money:

*   **🧾 AI-Powered Receipt Scanner:**  Say goodbye to manual data entry!  Simply upload a photo of your receipt, and our intelligent AI will automatically extract all the important details (merchant, date, amount, categories).  This feature saves you time and eliminates errors.
*   **📧 Automated Monthly Budget Reports & Smart Alerts:**  Receive a detailed summary of your spending directly in your inbox at the end of each month.  Plus, you'll get a friendly email notification if you're approaching 90% of your set budget, helping you stay proactive about your financial goals.
*   **🔒 Secure User Authentication:**  Your financial data is sensitive, and security is my top priority.  This website uses **Clerk** for robust and reliable user authentication, ensuring your information is protected and your experience is safe.
*   **📊 Clear and Intuitive Dashboard:**  Get a visual overview of your financial situation.  The dashboard will provide summaries of your spending, budget progress, and receipt history in an easy-to-understand format.

## 🛠️ Technologies Used

This project was built using a modern and powerful web development stack:

*   **Frontend:**
    *   **React:**  A popular JavaScript library for building user interfaces.  React makes the website interactive, dynamic, and user-friendly.
    *   **Next.js:**  A React framework that enables features like server-side rendering and routing, making the application fast and performant.
    *   **Tailwind CSS:**  A utility-first CSS framework that allows for rapid and consistent styling, giving the website a clean and modern look.
    *   **Shadcn UI:**  A collection of reusable UI components built with Radix UI and Tailwind CSS, ensuring a polished and accessible user interface.

*   **Backend & Database:**
    *   **Supabase:** A powerful open-source Firebase alternative. Supabase provides a complete backend-as-a-service solution, including a **PostgreSQL database**, **authentication**, **storage**, and more.  It simplifies backend development and allows you to focus on building the frontend features.
    *   **Prisma:**  While Supabase provides the database, Prisma is still used as a modern database toolkit to interact with the PostgreSQL database in a type-safe and efficient way within the Next.js application.

*   **Authentication:**
    *   **Clerk:**  A powerful authentication and user management platform that handles user sign-up, sign-in, and security, allowing me to focus on building the core features of the finance manager.

## 🚀 Getting Started

Ready to run this project yourself? Here's a quick guide:

1.  **Clone the Repository:**

    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd [YOUR_PROJECT_DIRECTORY]
    ```

2.  **Install Dependencies:**

    ```bash
    npm install  # or yarn install or pnpm install
    ```

3.  **Set up Environment Variables:**

    *   You'll need to configure environment variables for Clerk authentication and **Supabase**.
    *   First, **create a project on [Supabase](https://supabase.com/)** and obtain your **Supabase URL** and **Supabase API key (anon key)** from your project settings.
    *   Refer to the `.env.example` file in the project for the required variables and create a `.env.local` file to store your actual secrets.  You will need to add variables for your Supabase URL and Anon Key.
    *   **Important:** Never commit your `.env.local` file to version control!

4.  **Database Setup (Supabase):**

    *   Since you are using Supabase, the database is already set up in your Supabase project!
    *   However, you may need to run Prisma migrations to create the database schema within your Supabase PostgreSQL database if the schema is not automatically synced or if you have made schema changes. Run Prisma migrations:

        ```bash
        npx prisma migrate dev
        ```
        This command will connect to your Supabase database using the connection details from your environment variables and apply the necessary schema migrations.

5.  **Run the Development Server:**

    ```bash
    npm run dev # or yarn dev or pnpm dev
    ```

6.  **Open in Your Browser:**

    *   Visit `http://localhost:3000` in your web browser to see the application running.

                                 Made with ❤️ by Deepanjan Pati
