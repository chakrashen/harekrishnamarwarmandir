# AGENTS.md — Gupt Govardhan Dham Website

You are an expert Hindu temple website developer.
Stack: HTML + CSS + JS + Supabase backend for donor database.

## Rules:
- Always use saffron/gold color theme
- Donation section is the MOST important — optimize for conversions
- Mobile-first responsive design always
- Save a SUMMARY.md after every session
- Build one feature at a time, never all at once

---

### ⚙️ STEP 2 — USE PLANNING MODE, NOT FAST MODE

Antigravity has two conversation modes — Fast (for quick tasks) and Planning (for complex tasks where the agent creates a plan you can approve before it starts building). 

For building your donation website — **ALWAYS use Planning Mode.** Let the agent show you the plan first, you approve, then it builds.

---

### ⚙️ STEP 3 — ADD THE RIGHT MCP SERVERS

Without MCP, the AI is smart but blind — it can see code in open files but knows nothing about your database, cloud logs, or issue tracker. With MCP, you give the AI a USB cable to plug directly into your tools. 

Here are the **exact MCPs to add** for your donation website:

---

#### 🥇 MUST HAVE — Add These First

**1. Supabase MCP** *(Your Donor Database Backend)*
```
WHY: Store all donor records — name, amount, seva type, 
     email, phone, city, country, payment status
HOW: Antigravity → three dots → MCP Servers → Add Server
     Search "Supabase" → Install → Add your project URL + key
```

**2. File System MCP** *(Save extracted content + generate components)*
```
WHY: Lets the agent read/write local files directly so it can
     save extracted website content, create reusable components,
     and scaffold pages automatically.
HOW: Antigravity → three dots → MCP Servers → Add Server
     Search "File System" → Install
     Allow workspace folder access to this project directory
```

**3. Firecrawl MCP** *(Scrape harekrishnamarwar.org fully)*
```
WHY: Automatically crawl the entire temple website
     and pull ALL text, images, links in one go
HOW: Get free API key at firecrawl.dev
     Add to mcp_config.json
COST: Free tier available
```

**4. Context7 MCP** *(Always get latest docs)*
```
WHY: Gives agent up-to-date documentation for any
     library or framework you're using
HOW: Search "Context7" in MCP Store → Install
     No API key needed
```

---

#### 🥈 ADD NEXT — Power Ups

**5. Playwright MCP** *(Browser automation)*
```
WHY: Agent can open a real browser, test your website,
     fill donation forms, check if everything works
HOW: Search "Playwright" in MCP Store → Install
```

**6. n8n MCP** *(Automation workflows)*
```
WHY: Build automation in plain English —
     "When someone donates, send them a WhatsApp + email"
HOW: Install n8n → connect via MCP
```

**7. Vercel MCP** *(Deploy your website instantly)*
```
WHY: Agent builds AND deploys your website live
     in one single command
HOW: Search "Vercel" in MCP Store → Install
```

---

### ⚙️ STEP 4 — THE SUMMARY.MD TRICK 🔥

After completing each coding session, ask Gemini to generate a `SUMMARY.md` of the conversation. Save this summary and reuse it for future sessions without repeating the entire process. Start new tasks using the saved SUMMARY as context. 

This means your agent **never forgets** what was built before. At the start of every new session just say:
```
Read SUMMARY.md and continue building the donation website
```

---

### ⚙️ STEP 5 — USE RUBE MCP (The Game Changer)

Rube MCP plugs into Antigravity once and instantly unlocks dozens of dev tools — it acts as a router that dynamically loads tools when needed without overloading your context window. You configure it once and it handles connections to GitHub, Supabase, Notion, Gmail automatically. 

Instead of adding 10 different MCPs manually, Rube handles them all through one connection. Get it at **rube.dev**.

---

### ⚙️ STEP 6 — BUILD FEATURE BY FEATURE, NOT ALL AT ONCE

Avoid asking the agent to build all features in a single run. If you have more than 5 features, begin with the first one and move step by step. 

For your temple website, build in this order:
```
Session 1 → Hero + Nav + Daily Timings
Session 2 → About + Timeline
Session 3 → Donation section + Forms
Session 4 → Events + Gallery
Session 5 → Visitor Info + Contact
Session 6 → Supabase donor backend
Session 7 → Email automation via n8n
Session 8 → Deploy on Vercel
```

---

### ⚙️ STEP 7 — USE THE @ CONTEXT TRICK

In Antigravity's chat, use @ to include more context such as files, directories, or MCP servers, and use / to refer to saved workflows (saved prompts). 

So when building, type things like:
```
@AGENTS.md @SUMMARY.md Build the donation section 
using the seva options from @research.pdf
```
