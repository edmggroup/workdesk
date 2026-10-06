# Faculty Workdesk

A private web app for the day-to-day work of a university professor: the semester, teaching, exams, mentoring, research, projects and administration in one place, with a dashboard and automatic reminders. It is built in the same style as the Research Group Logbook: one HTML page, a Google Sheet as the database, and installable on phones.

## What it covers

| Area | What you can do |
|---|---|
| **Academic calendar** | Semesters (start day, end day, optional last teaching day), academic-schedule entries on specific dates (CIA, exams, fests, deadlines), and holidays. Holidays can be pasted in bulk. A schedule entry can suspend regular classes, or make a day follow another day's timetable |
| **Timetable** | Theory and lab slots, with batches for parallel labs. Works with **weekday** or **day-order** timetables (day order skips holidays automatically). Includes a weekly grid, a *This week* view with real dates, and clash detection |
| **Extra classes** | Extra, additional, remedial, make-up, substitution and bridge classes, added to the timetable for that date only |
| **Work diary** | Log each class: unit, topic, method, attendance and hours. The app knows which past classes are **still unlogged**. *Continue from last class* fills in the topic for you, and you can mark a class *Not held*. A printable diary with HoD/Dean signature lines, plus Excel export |
| **Courses & syllabus** | Unit-wise planned hours, with coverage worked out from the diary, plus average attendance and weekly load |
| **Exams** | Exam duties (invigilation, squad, QP setting, practical examiner…). Evaluations with script counts, a progress bar, and *scripts per day needed* to finish on time |
| **Mentoring** | Mentees (bulk paste from Excel), individual and group meetings, notes, agreed actions and follow-up dates. Flags mentees you haven't met in N days |
| **Research** | Plans with milestones; a publications pipeline from Idea to Published, with indexing and quartile; collaborations; conferences and workshops with abstract and registration deadlines; peer review and editorial roles; a researcher database (your IDs, an h-index and citation history with a trend line, and contacts) |
| **Projects & grants** | Agency, scheme, role, amount, status, milestones, progress log, next report or UC date, and a timeline (Gantt) |
| **Administration** | Responsibilities and in-charges, committees, meetings and minutes (create action items straight from a meeting), action items, and one-off or repeating reminders |
| **Dashboard** | Today's classes with one-click logging; items that need attention; the semester week and teaching days left; KPI tiles; the next 14 days; syllabus coverage; research pipeline; project progress against time elapsed |
| **Reminders** | Per category, on/off and how many days ahead. They show in the bell and on the dashboard, and arrive as a **morning email digest**, with a week preview on Mondays. The app and the email use the same code, so they always agree |
| **Data** | JSON backup and restore, everything exported to Excel, calendar export (.ics) for Google Calendar or Outlook, nightly Drive backups, and sample data you can remove in one click |

## Files

```
index.html        the whole app (UI + logic)
backend/Code.gs   Google Apps Script backend (database, PIN check, digest email, backups)
manifest.json, sw.js, icons/   make it installable on phones
SETUP.md          step-by-step deployment
```

See **SETUP.md** to deploy it. Until it is connected, the app runs in **local mode** (stored in the browser), so you can try it straight away.
