# Faculty Workdesk — Setup Guide

About 15 minutes. It works like your Research Group Logbook: a single web page on GitHub Pages, backed by a Google Sheet in your Drive.

```
Browser (index.html)  ⇄  Google Apps Script web app  ⇄  Google Sheet in your Drive
```

> **Try it first, no setup needed:** open `index.html` straight from your computer (double-click it). It runs in **local mode**: the data stays in that browser. Use **Load sample data** on the dashboard to look around. Then download a backup, connect the backend below, and restore the backup.

---

## Part 1: The Google Sheet backend

1. Go to **sheets.new** and name the sheet `Faculty Workdesk — Data`.
2. **Extensions → Apps Script**. Delete the placeholder code, paste in the whole of `backend/Code.gs`, and click **Save**.
3. Near the top of the script, change these two values:
   ```js
   const APP_KEY   = 'change-this-to-your-own-random-string';  // any long random text
   const SETUP_KEY = 'change-this-setup-key';                   // you type this once, on first launch
   ```
   Optionally set `APP_URL` to your published address (Part 3). The reminder emails will then show an **Open Workdesk** button.
4. **Deploy → New deployment →** click the gear icon → **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** and authorise. Google will warn that the app is unverified, because it is your own script: choose **Advanced → Go to … (unsafe) → Allow**.
5. Copy the **Web app URL**. It must end in `/exec`.

✅ **Check:** paste the URL into a browser tab. You should see `{"ok":true,"app":"faculty-workdesk"}`.

### Turn on reminders and nightly backup (once)

In the Apps Script editor, choose **setUpTriggers** from the function dropdown and click **Run**. This installs:

- **Morning digest**: an hourly check that sends one email at the hour you pick in *Settings → Reminders & email*, and only when there is something to report. If you change the hour in the app, it takes effect from the next hour; you don't need to touch Apps Script again.
- **Nightly backup**: a dated JSON copy of everything goes to the Drive folder **Faculty Workdesk backups** around 2 am. Copies are kept for 45 days.

To check that email works, run **testDigest**.

---

## Part 2: Connect the app

Open `index.html` in a text editor. Near the top of the `<script>` section, set:

```js
const DATA_API_URL = 'https://script.google.com/macros/s/AKfycb…/exec';
const APP_KEY = 'the same value as in Code.gs';
```

The `SETUP_KEY` is **not** in this file. It stays in Code.gs only.

---

## Part 3: Publish

**GitHub Pages:** create a new repository and upload `index.html`, `manifest.json`, `sw.js` and the `icons/` folder. Then go to **Settings → Pages → Deploy from branch → main / root**. Your link will look like `https://<you>.github.io/<repo>/`.

**First launch:** the app asks for your name, department, reminder email, the **setup key** and a **PIN** (6 or more digits). After that, only the PIN is needed. Tick *Keep me signed in* on your own phone and laptop.

**Install on a phone:** open the link in Chrome (Android) and choose **Install app**, or in Safari (iPhone) choose **Share → Add to Home Screen**.

---

## How your data is protected

- Every data request carries a hash of your PIN. The backend compares it with the copy held in **Script Properties**, which is neither in the sheet nor in the web page. Knowing the URL and `APP_KEY` (both visible in the page source) is therefore **not** enough to read your data.
- After 8 wrong PINs in 15 minutes, sign-in is locked for 15 minutes.
- **Forgot your PIN?** Run **resetPin** in the Apps Script editor, then open the app. It will ask for the setup key and a new PIN. Your data is not touched.
- This is a personal productivity tool. Do not store anything that needs institutional-grade protection, such as student health records or confidential evaluation results.

---

## How saving works

- Each change is sent as a single record ("add/update this diary entry"), never as a whole list. Editing on your phone and your laptop at the same time cannot overwrite the other device's work. If the same record is edited on both, the later edit wins.
- Changes wait in a queue on the device and retry automatically until the sheet confirms them, so a dropped connection loses nothing. The status at the top shows *All changes saved* or *N changes waiting to sync*.
- Long lists are split across several cells automatically. A Google Sheets cell holds at most 50,000 characters, which a few years of work-diary entries would otherwise exceed.
- **Restore** in Settings writes a *before-restore* snapshot to Drive first.

---

## Updating later

- **index.html**: change `app-build` (and `app-version` if you like) in the `<head>`, then upload. Open copies will show *A newer version is available*.
- **Code.gs**: after editing, choose **Deploy → Manage deployments → ✎ → Version: New version → Deploy**. The URL stays the same.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| "Unauthorized (APP_KEY mismatch)" | `APP_KEY` differs between Code.gs and index.html, or Code.gs was edited without a new deployment version |
| "Change SETUP_KEY in Code.gs…" | You left the default setup key. Change it and redeploy |
| Couldn't reach the backend | The URL doesn't end in `/exec`, or the deployment access isn't *Anyone* |
| No morning email | `setUpTriggers` was never run; no email set in Settings → Profile; the daily digest is switched off; or there was nothing to report that day (run `testDigest` to check) |
| Timetable shows no classes | The date is outside the semester's start/end, after its *last teaching day*, a holiday, or covered by a schedule entry marked *regular classes suspended* |
| Day order looks wrong | Check holidays and suspended days. A circular such as "Saturday follows Day 3" goes in as a schedule entry using *This day follows timetable of* |
