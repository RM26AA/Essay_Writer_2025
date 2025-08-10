# Academic Essay & Report Writer

A web-based application that uses Google's **Gemini AI** (`gemini-2.0-flash`) to generate academic essays or reports up to **3,000 words**. Users can define the subject, writing style, and additional details, and optionally include references. The generated content can be downloaded as a **Word (.docx)** file styled in Arial for a professional look.

## ✨ Features

- **Subject Title & Writing Style** — Choose between academic, university, college, etc.
- **Word Count Control** — Adjustable from 0–3000 words.
- **About & Extra Details** — Add background information and special instructions.
- **Include References** — Optional checkbox for AI to generate citations/references.
- **Human-like Writing** — AI is prompted to produce natural, less robotic content.
- **Download as Word Document** — Automatically formatted in Arial font.
- **Responsive Design** — Works across desktop and mobile browsers.

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript
- **API:** Google Gemini AI (`gemini-2.0-flash`)
- **Styling:** Tailwind CSS
- **Document Generation:** `docx` npm package

## 🚀 Getting Started

1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/essay-writer.git
cd essay-writer
```

2. Install Dependencies
```
npm install
```

3. Add Your Gemini API Key
Create a .env file in the root directory:
```
VITE_GEMINI_API_KEY=your_api_key_here
```

4. Run the Development Server
```
npm run dev
```

5. Build for Production
```
npm run build
```

## 📄 Usage

- Enter the Subject Title and select the Writing Style.
- Adjust the Word Count slider (0–3000 words).
- Provide About information and any Extra Details.
- Tick Include References if needed.
- Click Generate Essay to get AI-generated content.
- Download the result as a Word (.docx) file.

## 🔑 API Reference
The app uses the Google Generative Language API with the gemini-2.0-flash:generateContent model.
Example request:

```
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" \
  -H "Content-Type: application/json" \
  -H "X-goog-api-key: YOUR_API_KEY" \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          { "text": "Explain how AI works in a few words" }
        ]
      }
    ]
  }'
```

## 📜 License
This project is licensed under the MIT License — see the LICENSE file for details.

# Lovable project

## Project info

**URL**: https://lovable.dev/projects/27bf45db-3b5c-40bf-8385-788550b4fe7a

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/27bf45db-3b5c-40bf-8385-788550b4fe7a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/27bf45db-3b5c-40bf-8385-788550b4fe7a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
