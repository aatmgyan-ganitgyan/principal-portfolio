# 🌍 World-Class Principal Portfolio Website

> **“A Principal is not only an administrator — a Principal shapes people, culture and possibilities.”**

A bespoke, high-impact digital portfolio engineered specifically for educational leaders, principals, and academic visionaries. Designed with a **“Mixed Aura”** combining:
1. **Executive** (Deep midnight navy `#060B18`, slate charcoal, refined champagne gold accents `#C5A880`, authoritative framing)
2. **Academic** (Generous whitespace, editorial typography with *Playfair Display* & *Cormorant Garamond*, drop caps, Harvard-style paper layouts)
3. **Human** (Warm alabaster ivory backgrounds, candid storytelling, quotes on empathy, student/teacher mentorship moments)

---

## 🏛️ Architecture & Sections

The portfolio implements all 10 foundational sections requested in the specification:

| Section # | Title | Purpose & Design Essence |
|---|---|---|
| **01** | **HERO \| The Identity** | Full-bleed cinematic backdrop with dark portrait framing, subtle gold glow, Dr./Principal typography, core philosophy quote, badges, and primary action buttons (`My Journey`, `School Impact`, `Schedule Visit`). |
| **02** | **THE PERSON \| Beyond the Title** | Introduces the leader as a human being. Lead storytelling narrative, candid photo under unscripted school moments, and 4 narrative pillars: *The Educator, The Leader, The Mentor, The Learner*. |
| **03** | **MY JOURNEY \| From Classroom → Leadership** | Horizontal cinematic interactive timeline spanning 1998 to Present. Tracks: *Year → Position → Institution → 1-Line Achievement + Context*. |
| **04** | **LEADERSHIP PHILOSOPHY \| What I Believe** | Editorial spread featuring 4 core philosophical pillars: *01. Students First, 02. Teachers Empowered, 03. Learning Culture, 04. Community Synergy*. |
| **05** | **IMPACT \| Numbers Tell the Story** | Dynamic animated counters triggered on scroll: `2,850+` Students Impacted, `180+` Teachers Mentored, `25+` Years in Education, `42+` Institutional Initiatives, plus 6 interactive Area of Impact badges. |
| **06** | **SIGNATURE INITIATIVES** | 5 flagship case study cards (*Academic Transformation, Master Educator Fellowship, Digital Campus, Whole-Child Genesis, Community Connect*). Clicking any card opens a structured **Challenge → Action → Result** modal. |
| **07** | **LIFE @ SCHOOL \| Photo Story** | Instagram/editorial-style candid photo story (*Classroom, Assembly, Teachers, Projects, Sports, Arts, Trips, Celebrations, Candid Moments*) with category filtering and interactive full-screen Lightbox viewer. |
| **08** | **BEYOND SCHOOL \| The Human Side** | 5 multifaceted cards exploring life outside the desk: *Reading & Intellectual Inquiry, Keynotes & Speaking, Personal Philosophy, Travel & Comparative Global Schooling, Honors & Accolades*. |
| **09** | **THOUGHTS \| The Principal's Voice** | High-brow publication column ("The Principal's Note") with 5 short thought-leadership essays (2–5 min reads). Includes an interactive modal reader for distraction-free reading. |
| **10** | **FINAL \| The Signature & Connect** | Minimalist closing portrait, signature script, high-impact closing quote, and direct connection channels (Email, LinkedIn, School Portal, and an interactive Consultation/Appointment modal). |

---

## 🚀 How to Run

### Option 1: Direct Browser Launch
Simply double click `index.html` or open it with Chrome / Edge / Firefox / Safari. No build step or Node environment required.

### Option 2: Local HTTP Server (Python)
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

### Option 3: Local Server (Node / npx)
```bash
npx serve .
```

---

## ⚙️ How to Customize

All text, achievements, timeline entries, initiatives, photo stories, and articles are isolated in a single configuration file:

📁 **`js/profile-data.js`**

You can easily:
- Change the Principal's Name, salutation, credentials, and institutional affiliation.
- Replace Unsplash portrait and candid photograph links with personal high-res photos.
- Update timeline milestones, impact numbers, or case study narratives.
- Add or edit essays in `PRINCIPAL_DATA.thoughts`.

---

## 🎨 Technology Stack
- **HTML5 & CSS3** (Zero build-step friction, semantic markup)
- **Tailwind CSS** (via fast CDN configuration)
- **Lucide Icons** (Clean, modern SVG iconography)
- **Google Fonts** (*Playfair Display*, *Cormorant Garamond*, *Plus Jakarta Sans*, *Alex Brush*)
- **Vanilla JavaScript ES6+** (Smooth transitions, IntersectionObserver counters, photo lightbox, article reader)
