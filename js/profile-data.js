/**
 * ==========================================================================
 * PRINCIPAL PORTFOLIO DATA STORE
 * Principal: Varsha Phukane
 * Theme: Harvard Academic + Executive Leadership + Human Storytelling
 * ==========================================================================
 */

const PRINCIPAL_DATA = {
    // 01 — HERO & IDENTITY
    identity: {
        name: "Varsha Phukane",
        title: "Principal | Educational Leader | Mentor",
        roles: ["Principal", "Educational Leader", "Mentor"],
        oneLinePhilosophy: "Building schools where every learner is seen, challenged and inspired.",
        heroPortrait: "assets/images/varsha_phukane_headshot.jpg",
        currentInstitution: "School Leadership",
        badges: ["Educational Leader", "Academic Excellence", "Child-Centric Pedagogy"]
    },

    // 02 — BEYOND THE TITLE
    beyondTitle: {
        heading: "Beyond the Principal’s Office",
        supportingLine: "A school leader is more than a designation.",
        narrative: "A school is not just an administrative building; it is a living community where young minds are nurtured, teachers are empowered, and possibilities are opened. Leadership in education is an act of stewardship—guiding people with empathy, conviction, and an enduring faith in human potential.",
        portrait: "assets/images/varsha_phukane_candid.jpg",
        portraitCaption: "Varsha Phukane — Principal, Educational Leader & Mentor",
        cards: [
            {
                role: "EDUCATOR",
                subtitle: "Teaching & Academic Experience",
                description: "Years of teaching and academic experience. Transforming classrooms into vibrant spaces of inquiry, discovery, and student voice.",
                icon: "book-open"
            },
            {
                role: "LEADER",
                subtitle: "School Leadership",
                description: "Institutional development and school leadership. Cultivating a high-trust culture that combines intellectual rigor with compassionate care.",
                icon: "compass"
            },
            {
                role: "MENTOR",
                subtitle: "Empowering People",
                description: "Supporting students and empowering teachers. Providing continuous feedback, intellectual safety, and inspiration to help others lead.",
                icon: "heart-handshake"
            },
            {
                role: "LEARNER",
                subtitle: "Professional Growth",
                description: "Continuous professional growth and learning. Actively adopting modern pedagogy, whole-child methodologies, and forward-looking curriculum.",
                icon: "sparkles"
            }
        ]
    },

    // 03 — MY JOURNEY | FROM CLASSROOM TO LEADERSHIP
    journey: {
        heading: "From Classroom to Leadership",
        subheading: "A purposeful progression dedicated to academic excellence, faculty growth, and cultural impact.",
        milestones: [
            {
                year: "2010",
                position: "Teaching Journey",
                institution: "[Institution]",
                achievement: "Started the journey of transforming classrooms into learning communities.",
                context: "Nurtured foundational student engagement, created hands-on conceptual modules, and fostered deep inquiry."
            },
            {
                year: "2015",
                position: "Academic Leadership",
                institution: "[Institution]",
                achievement: "Led academic planning and teacher collaboration.",
                context: "Coordinated interdisciplinary curriculum development, instituted teacher peer-learning, and elevated learning standards."
            },
            {
                year: "2020",
                position: "School Leadership",
                institution: "[Institution]",
                achievement: "Worked towards building a stronger academic and cultural ecosystem.",
                context: "Directed academic systems, strengthened parent-school trust, and integrated progressive wellbeing frameworks."
            },
            {
                year: "TODAY",
                position: "Principal",
                institution: "[Current School]",
                achievement: "Leading with purpose, empathy and a vision for the future.",
                context: "Guiding institutional strategy, faculty empowerment, and whole-child development for future-ready graduates."
            }
        ]
    },

    // 04 — LEADERSHIP PHILOSOPHY
    philosophy: {
        heading: "Leadership Philosophy",
        quote: "What I believe",
        pillars: [
            {
                num: "01",
                title: "STUDENTS FIRST",
                statement: "Every decision ultimately impacts student growth.",
                description: "Every institutional policy, academic schedule, and resource allocation must pass one guiding test: Does this genuinely benefit our students' intellectual, emotional, and moral flourishing?"
            },
            {
                num: "02",
                title: "TEACHERS EMPOWERED",
                statement: "Strong schools are built by empowered teachers.",
                description: "A school cannot rise beyond the quality and dedication of its educators. When teachers are entrusted with autonomy, continuous support, and respect, brilliance unfolds in every lesson."
            },
            {
                num: "03",
                title: "LEARNING CULTURE",
                statement: "Education goes beyond examination results.",
                description: "While high academic scores are essential, true education builds resilience, critical thinking, ethical grounding, and the courage to question and explore."
            },
            {
                num: "04",
                title: "COMMUNITY",
                statement: "A school succeeds when students, teachers and parents move together.",
                description: "Education is a shared social commitment. When school, home, and community align with mutual trust, every student finds the stability and encouragement needed to soar."
            }
        ]
    },

    // 05 — IMPACT | NUMBERS TELL THE STORY
    impact: {
        heading: "Impact That Can Be Seen.",
        subheading: "Measurable milestones of educational stewardship across students, teachers, and institutions.",
        stats: [
            {
                value: 8500,
                suffix: "+",
                label: "Students Impacted",
                description: "Nurtured across formative academic years"
            },
            {
                value: 700,
                suffix: "+",
                label: "Teachers Mentored",
                description: "Empowered toward master pedagogy and leadership"
            },
            {
                value: 20,
                suffix: "+",
                label: "Years in Education",
                description: "Dedicated to transformative academic stewardship"
            },
            {
                value: 33,
                suffix: "+",
                label: "Years of Experience",
                description: "Distinguished professional career in educational administration"
            }
        ],
        areas: [
            "Academic Excellence",
            "Teacher Development",
            "Student Wellbeing",
            "Technology Integration",
            "Parent Engagement",
            "School Culture"
        ]
    },

    // 06 — SIGNATURE INITIATIVES
    initiatives: {
        heading: "Signature Initiatives",
        subheading: "Strategic institutional programs engineered for sustainable educational transformation.",
        cards: [
            {
                id: "academic-transformation",
                cardNum: "CARD 01",
                title: "Academic Transformation",
                summary: "Curriculum innovation, assessment systems and improved learning outcomes.",
                image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
                challenge: "Rote-heavy testing was diminishing conceptual understanding and analytical confidence among students.",
                action: "Redesigned curricular pacing, integrated diagnostic self-assessment rubrics, and introduced thematic inquiry projects.",
                result: "Substantial increase in higher-order thinking skills, improved board examination performance, and elevated student enthusiasm."
            },
            {
                id: "teacher-development",
                cardNum: "CARD 02",
                title: "Teacher Development",
                summary: "Professional development, mentoring and collaborative learning.",
                image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
                challenge: "Infrequent one-off workshops did not lead to lasting changes in day-to-day classroom delivery.",
                action: "Established a structured peer-mentorship program with scheduled co-planning, lesson observations, and pedagogical discussions.",
                result: "Strengthened faculty camaraderie, boosted instructional confidence, and cultivated emerging teacher leaders."
            },
            {
                id: "digital-school",
                cardNum: "CARD 03",
                title: "Digital School",
                summary: "Technology-enabled teaching, administration and communication.",
                image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800",
                challenge: "Scattered communication channels caused confusion for parents and administrative overload for educators.",
                action: "Adopted a streamlined, user-friendly digital system for academic tracking, attendance, and transparent parent updates.",
                result: "Saved teachers valuable hours each week for one-on-one student mentoring and fostered prompt, transparent parent engagement."
            },
            {
                id: "student-development",
                cardNum: "CARD 04",
                title: "Student Development",
                summary: "Leadership, sports, arts, wellbeing and experiential learning.",
                image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
                challenge: "Unbalanced academic pressure led to adolescent stress and reduced participation in athletics and arts.",
                action: "Structured a balanced daily schedule with mandatory outdoor play, creative arts modules, and student leadership councils.",
                result: "Noticeably higher student morale, active inter-school sports participation, and well-rounded personality development."
            },
            {
                id: "community-connect",
                cardNum: "CARD 05",
                title: "Community Connect",
                summary: "Parents, alumni and community partnerships.",
                image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
                challenge: "Parent interaction was often limited to disciplinary notices and end-of-term report card sessions.",
                action: "Created open dialogue sessions, parent workshops, and an active alumni interaction channel for student career guidance.",
                result: "Built an enduring environment of collaborative trust, proactive volunteering, and community goodwill."
            }
        ]
    },

    // 07 — LIFE @ SCHOOL
    lifeAtSchool: {
        heading: "A School is a Living Community.",
        subheading: "Unscripted, genuine photographs celebrating the daily energy, warmth, and joy of learning.",
        gallery: [
            {
                category: "Classroom",
                title: "Inquiry in Action",
                image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=900",
                caption: "Classroom interactions where questioning is welcomed and understanding is built collaboratively."
            },
            {
                category: "Morning Assembly",
                title: "Morning Gathering & Reflection",
                image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=900",
                caption: "Unifying the school in collective purpose, moral values, and positive daily intentions."
            },
            {
                category: "Teacher Interaction",
                title: "Faculty Mentoring & Co-Planning",
                image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=900",
                caption: "Teachers exchanging pedagogical ideas and reviewing student progress collaboratively."
            },
            {
                category: "Student Projects",
                title: "Science & Innovation Showcases",
                image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=900",
                caption: "Translating textbook theories into tangible models, inventions, and creative problem solving."
            },
            {
                category: "Events",
                title: "Cultural Galas & Public Speaking",
                image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&q=80&w=900",
                caption: "Giving young individuals the poise, confidence, and voice to express themselves."
            },
            {
                category: "Sports",
                title: "Track, Tenacity & Team Spirit",
                image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=900",
                caption: "Building stamina, resilience, and gracious sportsmanship under open skies."
            },
            {
                category: "Trips",
                title: "Outdoor & Nature Explorations",
                image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=900",
                caption: "Classrooms without walls: students observing environmental ecology firsthand."
            },
            {
                category: "Celebrations",
                title: "Graduation & Milestones",
                image: "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?auto=format&fit=crop&q=80&w=900",
                caption: "Celebrating students stepping into the world with integrity, knowledge, and confidence."
            },
            {
                category: "Principal with Students",
                title: "Listening & Mentoring Conversations",
                image: "assets/images/varsha_phukane_candid.jpg",
                caption: "Connecting warmly with students to listen to their aspirations and encourage their dreams."
            }
        ]
    },

    // 08 — BEYOND SCHOOL
    beyondSchool: {
        heading: "The Human Side",
        subheading: "Personal, intellectual, and cultural facets that inform thoughtful leadership.",
        cards: [
            {
                category: "READING",
                title: "Educational and personal interests.",
                icon: "book",
                image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
                description: "Consistent reader of literature on educational reform, emotional intelligence, leadership philosophies, and child development.",
                highlights: [
                    "Pedagogical innovation and learning paradigms",
                    "Leadership, organizational culture, and mentorship",
                    "Philosophy, history, and holistic development"
                ]
            },
            {
                category: "SPEAKING",
                title: "Seminars, workshops and conferences.",
                icon: "mic",
                image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800",
                description: "Invited speaker and panelist sharing experiences on school leadership, teacher motivation, and progressive assessment.",
                highlights: [
                    "Nurturing Whole-Child Growth in Secondary Schools",
                    "Effective Teacher Collaboration and Mentoring",
                    "Creating Joyful and Purposeful Learning Spaces"
                ]
            },
            {
                category: "PERSONAL PHILOSOPHY",
                title: "Short thoughts about education and life.",
                icon: "feather",
                image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
                description: "Grounding leadership in presence, patience, and empathetic listening.",
                highlights: [
                    "Being present in hallways and listening actively to teachers and students",
                    "Upholding patience as the bedrock of character formation",
                    "Leading by example through quiet consistency and warmth"
                ]
            },
            {
                category: "TRAVEL & EXPLORATION",
                title: "Places, experiences and observations.",
                icon: "globe",
                image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800",
                description: "Gaining diverse perspectives through travel, observing community learning systems, and appreciating heritage.",
                highlights: [
                    "Observing innovative school campuses and classroom architectures",
                    "Cultural appreciation and community heritage engagement",
                    "Learning from diverse pedagogical practices across regions"
                ]
            },
            {
                category: "RECOGNITION",
                title: "Awards, certifications and achievements.",
                icon: "award",
                image: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&q=80&w=800",
                description: "Certifications and recognitions honoring years of dedicated service in school education and administration.",
                highlights: [
                    "Certifications in School Leadership & Academic Governance",
                    "Institutional Excellence in Student Mentorship",
                    "Commitment to Holistic Learning Citations"
                ]
            }
        ]
    },

    // 09 — THE PRINCIPAL'S VOICE
    thoughts: {
        heading: "The Principal’s Voice",
        subheading: "Reflections on pedagogy, school culture, and the evolving purpose of education.",
        articles: [
            {
                id: "what-makes-a-great-teacher",
                title: "What Makes a Great Teacher?",
                date: "2024",
                readTime: "3 min read",
                description: "Content mastery is vital, but true greatness begins when a teacher makes every learner feel safe, understood, and capable of understanding.",
                content: `
### What Makes a Great Teacher?
*By Varsha Phukane, Principal*

Across years of classroom observation, one truth stands out: great educators do not simply deliver a subject; they inspire the human being in front of them.

#### 1. Intellectual Generosity & Patience
A master teacher never makes a student feel small for not knowing an answer. Instead, they patiently scaffold concepts, celebrating thoughtful attempts and turning errors into stepping stones of comprehension.

#### 2. The Power of Intentional Listening
When a student hesitates, a great teacher does not rush to finish the sentence. They give the student room to think, reason, and articulate.

#### 3. Seeing the Quiet Student
True teaching excellence lies in observing the student in the quiet corner—the one who rarely raises a hand. A simple word of encouragement to that child can ignite a lifelong passion for learning.
                `
            },
            {
                id: "why-school-culture-matters",
                title: "Why School Culture Matters",
                date: "2024",
                readTime: "4 min read",
                description: "Curriculum is what you write in syllabus guidelines; culture is what students absorb when you think nobody is watching. You cannot mandate culture; you must embody it.",
                content: `
### Why School Culture Matters
*By Varsha Phukane, Principal*

Years after graduation, students may not recall specific formulas, but the **culture** of their school will stay with them for life.

#### Culture is the Living Curriculum
- How do teachers speak with one another in the staffroom?
- Are errors treated with gentle correction or harsh judgment?
- Are kindness and integrity celebrated as deeply as academic ranks?

These daily interactions form the real spirit of an institution.
                `
            },
            {
                id: "preparing-students-for-uncertain-world",
                title: "Preparing Students for an Uncertain World",
                date: "2024",
                readTime: "4 min read",
                description: "When information is infinite and algorithms compute in seconds, our schools must cultivate what makes us deeply human: empathy, critical thinking, and moral courage.",
                content: `
### Preparing Students for an Uncertain World
*By Varsha Phukane, Principal*

The classic schooling paradigm was designed for an age where facts were scarce. Today, facts are at our fingertips.

#### Nurturing Core Human Capabilities
To prepare students for tomorrow, schools must prioritize:
1. **Critical Thinking:** Asking why, questioning source reliability, and thinking independently.
2. **Resilience:** Rising from setbacks with poise and determination.
3. **Compassionate Empathy:** Collaborating with respect and understanding across differences.
                `
            },
            {
                id: "technology-vs-human-connection",
                title: "Technology vs Human Connection",
                date: "2024",
                readTime: "3 min read",
                description: "Digital tools are fantastic aids for modern schooling, but they should always serve human connection, never replace it.",
                content: `
### Technology vs Human Connection
*By Varsha Phukane, Principal*

Technology can automate attendance, deliver interactive graphics, and streamline tests. 

However, no screen can replace the warm smile of an educator who looks into a student's eyes and says: *"I believe in you. You can do this."*
                `
            },
            {
                id: "what-parents-should-expect-from-a-school",
                title: "What Parents Should Expect From a School",
                date: "2024",
                readTime: "4 min read",
                description: "Beyond infrastructure and board percentages: what genuinely matters when entrusting an institution with your child's youth.",
                content: `
### What Parents Should Expect From a School
*By Varsha Phukane, Principal*

When choosing a school, parents naturally check facilities and exam ranks. But three questions matter even more:
1. **Does the school support the child who is finding learning difficult?**
2. **Is there genuine warmth and happiness in the corridors?**
3. **Does the school focus on character and ethics as strongly as marks?**
                `
            }
        ]
    },

    // 10 — FINAL SIGNATURE
    signature: {
        quote: "Education is not about filling minds. It is about opening possibilities.",
        name: "Varsha Phukane",
        title: "Principal | Educational Leader",
        portrait: "assets/images/varsha_phukane_avatar.jpg",
        email: "principal.varshaphukane@example.com",
        linkedin: "https://linkedin.com/in/varsha-phukane",
        schoolWebsite: "https://schoolwebsite.edu",
        copyrightYear: "2026"
    }
};

// Aliases for compatibility
PRINCIPAL_DATA.thePerson = PRINCIPAL_DATA.beyondTitle;
PRINCIPAL_DATA.photoStory = PRINCIPAL_DATA.lifeAtSchool.gallery;

if (typeof window !== 'undefined') {
    window.PRINCIPAL_DATA = PRINCIPAL_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PRINCIPAL_DATA;
}
