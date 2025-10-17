# Unfolo: Find Your Unfollowers Securely

Unfolo is a tool dedicated to answering that age-old question: "Who unfollowed me on Instagram?"

By securely processing the data you download directly from Instagram (no third-party login required!), Unfolo provides a clear, categorized list of:

1. Unfollowers: People you follow who do not follow you back.
2. Fans: People who follow you who you do not follow back.

We prioritize the Unfollowers list to give you immediate insights into your follower consistency.

---

## Tech Stack

| Layer      | Technology        |
|------------|-------------------|
| Framework  | React (via Vite)  |
| Styling    | Tailwind CSS      |
| Deployment | Vercel            |

---

## Privacy & Security — The Unfolo Promise

Traditional unfollower apps require you to enter your Instagram credentials, compromising your security. Unfolo is different.

- No Instagram Login: We never ask for your Instagram password or access tokens.
- Official Data Only: We only process the encrypted ZIP file you download directly from Instagram.
- On-Device Processing: Crucially, your data is processed entirely within your browser or on your local machine. Your follower lists are never uploaded to our servers.

---

## How It Works (The Core Logic)

The process is simple and relies on comparing the two primary lists from your downloaded data:

1. followers.json: The list of accounts following you.
2. following.json: The list of accounts you are following.

| Category     | Logic                                                                    |
|--------------|--------------------------------------------------------------------------|
| Unfollowers  | Accounts in the following.json list BUT NOT in the followers.json list.  |
| Fans         | Accounts in the followers.json list BUT NOT in the following.json list.  |

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/tongbadaju/unfolo.git
```

### 2. Navigate into the project directory
```bash
cd unfolo
```

### 3. Install dependencies
```bash
npm install
# or
yarn install
```

### 4. Start the development server
```bash
npm run dev
# or
yarn dev
```

The application will now be running on http://localhost:5173 (or similar).

---

## License

This project is licensed under the MIT License - see the See the [LICENSE](LICENSE) file for details.
