

const navItems = [["Home", "index.html"], ["About", "about.html"], ["Team", "team.html"], ["Services", "services.html"], ["Projects", "projects.html"], ["Contact", "contact.html"]];
const page = location.pathname.split("/").pop() || "index.html";
const pageAlias = { "team-member.html": "team.html", "project.html": "projects.html" };
const current = pageAlias[page] || page;
const waLink = (text) => `https://wa.me/${SITE.whatsapp}${text ? "?text=" + encodeURIComponent(text) : ""}`;
const socialIcons = { linkedin: "bi-linkedin", instagram: "bi-instagram", facebook: "bi-facebook", github: "bi-github" };
const socialHTML = Object.entries(SITE.social || {})
    .filter(([, url]) => url)
    .map(([k, url]) => `
        <a class="social-link"
           href="${url}"
           target="_blank"
           rel="noopener"
           aria-label="${k}">
           <i class="bi ${socialIcons[k] || ""}"></i>
        </a>
    `)
    .join("");

const header = `<header class="site-header"><nav class="navbar navbar-expand-lg container"><a class="navbar-brand" href="index.html">NZK<span>TECHS.</span></a><button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-label="Toggle navigation"><i class="bi bi-list fs-2"></i></button><div class="collapse navbar-collapse" id="mainNav"><ul class="navbar-nav ms-auto align-items-lg-center">${navItems.map(([n, u]) => `<li class="nav-item"><a class="nav-link ${current === u ? "active" : ""}" href="${u}">${n}</a></li>`).join("")}<li class="nav-item ms-lg-3"></i></a></li></ul></div></nav></header>`;

const footer = `<footer class="site-footer"><div class="container"><div class="row g-5"><div class="col-lg-4"><a class="navbar-brand text-white" href="index.html">NZK<span>TECHS.</span></a><p class="mt-3 pe-lg-5">A multidisciplinary digital team building thoughtful websites, software, AI-powered tools and mobile experiences for ambitious organisations.</p><div class="mt-4"><a class="social-link" href="${waLink()}" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="bi bi-whatsapp"></i></a>${socialHTML}</div></div><div class="col-6 col-lg-2"><div class="footer-title">Explore</div>${navItems.map(([n, u]) => `<p class="mb-2"><a href="${u}">${n}</a></p>`).join("")}</div><div class="col-6 col-lg-3"><div class="footer-title">Our work</div>${CATEGORIES.map(c => `<p class="mb-2"><a href="projects.html#${c.id}">${c.label}</a></p>`).join("")}<p class="mb-2"><a href="services.html">All services</a></p></div><div class="col-lg-3"><div class="footer-title">Start a conversation</div><p>Have a project or an idea you want to shape? Tell us what you're working on.</p><p class="mb-2"><i class="bi bi-whatsapp me-2"></i><a href="${waLink()}" target="_blank" rel="noopener">WhatsApp</a></p><p class="mb-2"><i class="bi bi-telephone me-2"></i><a href="tel:${SITE.phone}">${SITE.phone}</a></p><p class="mb-1"><i class="bi bi-geo-alt me-2"></i>Karachi &amp; Hyderabad, Pakistan</p><p class="mb-3"><i class="bi bi-globe2 me-2"></i>Working remotely worldwide</p><a class="text-white fw-bold" href="contact.html">Discuss your project <i class="bi bi-arrow-up-right"></i></a></div></div><div class="footer-bottom d-flex flex-column flex-md-row justify-content-between gap-2"><span>© <span id="year"></span> NZK Techs. All rights reserved.</span><span>Ideas · Engineering · Delivery</span></div></div></footer>`;

document.body.insertAdjacentHTML("afterbegin", `<div class="page-loader"><div class="loader-inner"><div class="loader-logo">NZK<span style="color:#a9876d">TECHS.</span></div><div class="loader-line"><span></span></div><div class="loader-caption">BUILDING WHAT'S NEXT</div></div></div>`);
document.body.insertAdjacentHTML("afterbegin", header);
document.body.insertAdjacentHTML("beforeend", footer);
document.body.insertAdjacentHTML("beforeend", `<button class="chat-launch" aria-label="Open NZK Techs chat" aria-expanded="false"><i class="bi bi-chat-dots"></i></button>
<div class="chat-box" role="dialog" aria-label="NZK Techs chat assistant">
  <div class="chat-head">
    <div class="d-flex align-items-center gap-2"><span class="chat-avatar"><i class="bi bi-stars"></i></span><div><strong>NZK Techs Assistant</strong><div class="chat-status"><span class="chat-dot"></span>Project support · Online</div></div></div>
    <div class="d-flex align-items-center gap-3"><button class="btn text-white p-0 chat-refresh" aria-label="Refresh conversation" title="Start a new conversation"><i class="bi bi-arrow-clockwise"></i></button><button class="btn text-white p-0 chat-close" aria-label="Close chat"><i class="bi bi-x-lg"></i></button></div>
  </div>
  <div class="chat-messages" aria-live="polite"></div>
  <div class="chat-chips"><button type="button" data-chip="menu"><i class="bi bi-grid me-1"></i>Menu</button><button type="button" data-chip="estimate"><i class="bi bi-calculator me-1"></i>Get an estimate</button><a href="tel:${SITE.phone}"><i class="bi bi-telephone me-1"></i>Call us</a></div>
  <form class="chat-input"><input aria-label="Message" placeholder="Write your message..." autocomplete="off" required><button class="btn btn-brand" aria-label="Send message"><i class="bi bi-send"></i></button></form>
</div>
<button class="back-top" aria-label="Back to top"><i class="bi bi-arrow-up"></i></button>`);
document.getElementById("year").textContent = new Date().getFullYear();

/* Loader */
const loader = document.querySelector(".page-loader");
window.addEventListener("load", () => setTimeout(() => loader.classList.add("hide"), 450));
setTimeout(() => loader.classList.add("hide"), 4000); // safety net if a CDN is slow

/* Header, back-to-top */
const headerEl = document.querySelector(".site-header"), topBtn = document.querySelector(".back-top");
const onScroll = () => { headerEl.classList.toggle("scrolled", scrollY > 20); topBtn.classList.toggle("show", scrollY > 500); };
window.addEventListener("scroll", onScroll); onScroll();
topBtn.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

/* Scroll reveal + counters (pages.js calls observeReveals() after rendering dynamic content) */
const revealObserver = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("show"); revealObserver.unobserve(e.target); } }), { threshold: .12 });
const counterObserver = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  counterObserver.unobserve(e.target);
  const el = e.target, end = parseInt(el.dataset.count, 10), suffix = el.dataset.suffix || "", pad = el.dataset.pad ? parseInt(el.dataset.pad, 10) : 0;
  const start = performance.now(), dur = 1400;
  const tick = now => { const t = Math.min((now - start) / dur, 1), v = Math.round(end * (1 - Math.pow(1 - t, 3))); el.textContent = String(v).padStart(pad, "0") + suffix; if (t < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}), { threshold: .4 });
window.observeReveals = (root = document) => {
  root.querySelectorAll(".reveal:not(.show)").forEach(el => revealObserver.observe(el));
  root.querySelectorAll("[data-count]").forEach(el => counterObserver.observe(el));
};
window.observeReveals();

/* ------------------------- WhatsApp floating button (left) ------------------------- */
document.body.insertAdjacentHTML("beforeend", `<a class="wa-float" href="${waLink("Hello NZK Techs, I'd like to discuss a project.")}" target="_blank" rel="noopener" aria-label="Chat with NZK Techs on WhatsApp" title="Chat on WhatsApp"><i class="bi bi-whatsapp"></i></a>`);

/* ------------------------- Chat assistant ------------------------- */
const chat = document.querySelector(".chat-box");
const chatMessages = document.querySelector(".chat-messages");
const chatInput = document.querySelector(".chat-input input");
const chatLaunch = document.querySelector(".chat-launch");
const escHtml = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));
const countIn = id => PROJECTS.filter(p => p.category === id).length;
const NAME_KEY = "nzkChatName";
let userName = "";
try { userName = sessionStorage.getItem(NAME_KEY) || ""; } catch (e) { }
let awaitingName = !userName;

/* Questions visitors can tap. {name} is replaced with the visitor's name.
   To add a question: copy one item, change q (button text), keys (words that trigger it) and a (answer). */
const CHAT_CATEGORIES = [
  {
    id: "services", label: "Our Services", icon: "bi-grid",
    intro: "Happy to explain, {name}. What would you like to know?",
    items: [
      {
        q: "What services do you offer?", keys: ["services", "service", "offer", "what do you do", "kya karte", "provide"],
        a: "We offer four main services, {name}: <a href=\"projects.html#website\">Website Development</a>, <a href=\"projects.html#software\">Software Development</a>, <a href=\"projects.html#mobile\">Mobile Applications</a> and <a href=\"projects.html#ai\">AI Applications</a>. The full list is on the <a href=\"services.html\">Services page</a>."
      },
      {
        q: "Which industries have you worked with?", keys: ["industry", "industries", "sector", "field", "domain"],
        a: "Our projects include education, retail point of sale, real estate investment, ride-hailing, wellness, storage operations and a bottled water brand, {name}. Browse them on the <a href=\"projects.html\">Projects page</a>."
      },
      {
        q: "Do you work with international clients?", keys: ["international", "abroad", "overseas", "uk client", "foreign", "outside pakistan", "usa", "dubai"],
        a: "Yes, {name}. We work remotely with clients in Pakistan and abroad, for example our <a href=\"project.html?id=pos-uk-client\">point of sale system for a UK client</a>."
      }
    ]
  },
  {
    id: "websites", label: "Websites", icon: "bi-window-stack",
    intro: "Sure, {name}! Common questions about websites:",
    items: [
      {
        q: "What kind of websites do you build?", keys: ["website", "web site", "web", "wordpress", "landing", "portfolio", "site banwani", "website banani"],
        a: "We build business, school, restaurant, travel and portfolio websites, plus WordPress sites. Every site is responsive, fast and easy to manage. See examples in <a href=\"projects.html#website\">Website Development</a>, {name}."
      },
      {
        q: "Can you build an online store?", keys: ["ecommerce", "e-commerce", "shopify", "online store", "shop", "store", "sell online"],
        a: "Yes, {name}. We build Shopify and e-commerce stores so you can show products and take orders online. Tell us what you sell on the <a href=\"contact.html\">Contact page</a>."
      },
      {
        q: "Will my website work on mobile?", keys: ["responsive", "mobile friendly", "mobile view", "phone par", "all devices"],
        a: "Yes, {name}. Every website we deliver is fully responsive and works smoothly on phones, tablets and desktops."
      },
      {
        q: "Will my website be fast and SEO-friendly?", keys: ["seo", "google ranking", "rank", "fast", "speed", "loading"],
        a: "We build fast, clean pages with proper titles and descriptions, which gives you a solid base for search engines, {name}. Ranking also depends on your content and competition, so nobody can honestly promise a #1 position."
      },
      {
        q: "Can I update the website myself?", keys: ["update myself", "edit myself", "admin panel", "manage content", "cms", "change content"],
        a: "Yes, {name}. We can add a simple admin panel so you can edit text and images without a developer. See our <a href=\"project.html?id=cms-platform\">CMS project</a>."
      },
      {
        q: "Can you redesign my existing website?", keys: ["redesign", "existing website", "old website", "revamp", "update my website", "purani website"],
        a: "Absolutely, {name}. We can redesign or improve an existing website and keep your content and brand. Send us the link through the <a href=\"contact.html\">Contact page</a>."
      }
    ]
  },
  {
    id: "mobile", label: "Mobile Apps", icon: "bi-phone",
    intro: "Great choice, {name}! Ask me about mobile apps:",
    items: [
      {
        q: "Do you build Android and iOS apps?", keys: ["mobile", "app", "flutter", "android", "ios", "iphone", "application", "mobile app", "app banwani"],
        a: "Yes, {name}. We build cross-platform iOS and Android apps with Flutter, so one app can run on both. See {mobileCount} mobile projects in <a href=\"projects.html#mobile\">Mobile Applications</a>."
      },
      {
        q: "What features can my app have?", keys: ["features", "payment", "maps", "chat", "notification", "login", "wallet"],
        a: "Common features include user login, payments, maps, chat and calling, notifications, dashboards and role-based access, {name}. Tell us your idea and we will suggest what fits."
      },
      {
        q: "Can the app connect to my existing system?", keys: ["api", "existing system", "connect", "integrate", "integration", "backend"],
        a: "In most cases yes, {name}. Our team builds and connects REST APIs and backends, so an app can work with your existing system or a new one."
      },
      {
        q: "Can you publish the app on the stores?", keys: ["play store", "app store", "publish", "google play", "upload app"],
        a: "We can guide you through preparing and publishing your app on Google Play and the App Store, {name}. Store accounts stay in your own name. <a href=\"contact.html\">Contact us</a> to discuss the steps."
      }
    ]
  },
  {
    id: "software", label: "Custom Software", icon: "bi-code-square",
    intro: "Happy to help, {name}. Questions about software:",
    items: [
      {
        q: "What business software can you develop?", keys: ["software", "management system", "dashboard", "portal", "erp", "system banwana"],
        a: "We develop management systems, dashboards, portals and ERP-style software with backend and API development, {name}. See <a href=\"projects.html#software\">Software Development</a> for examples."
      },
      {
        q: "Can you build a point of sale (POS) system?", keys: ["pos", "point of sale", "billing", "inventory", "stock", "retail"],
        a: "Yes, {name}. We built a <a href=\"project.html?id=pos-uk-client\">POS system for a UK client</a> covering sales, billing and stock. We can shape one around how your shop works."
      },
      {
        q: "Do you work with schools and universities?", keys: ["school", "academy", "college", "university", "education", "sms", "student"],
        a: "Yes, {name}. We support educational organisations with websites, portals and management systems, for example <a href=\"project.html?id=learners-academy\">Learners Academy</a> and its <a href=\"project.html?id=learners-academy-sms\">school management system</a>."
      },
      {
        q: "Can you improve software I already have?", keys: ["improve", "upgrade", "fix my software", "legacy", "modernize", "old software"],
        a: "Yes, {name}. We can review your current software, fix problems and add features or modernise it. Share the details on the <a href=\"contact.html\">Contact page</a> and we will suggest a next step."
      }
    ]
  },
  {
    id: "ai", label: "AI Solutions", icon: "bi-stars",
    intro: "Nice, {name}! Ask me about AI:",
    items: [
      {
        q: "What AI solutions do you offer?", keys: ["ai", "artificial intelligence", "automation", "chatbot", "machine learning", "smart"],
        a: "Our AI work covers AI-assisted features, smart chat experiences and workflow automation, {name}. See {aiCount} AI projects in <a href=\"projects.html#ai\">AI Applications</a>."
      },
      {
        q: "Can AI help my business?", keys: ["ai for business", "use ai", "add ai", "automate", "business ai"],
        a: "It can, {name}, especially for repetitive work like answering common questions or sorting information. First we need to understand your workflow, so <a href=\"contact.html\">tell us what takes most of your time</a>."
      },
      {
        q: "Can you help with final year (FYP) projects?", keys: ["fyp", "final year", "isra", "student project", "thesis", "academic"],
        a: "Yes, {name}. We have delivered AI and software projects for Isra University students and continue to support new ones. <a href=\"contact.html\">Tell us</a> about your project idea."
      }
    ]
  },
  {
    id: "process", label: "How We Work", icon: "bi-diagram-3",
    intro: "Here is how a project runs, {name}:",
    items: [
      {
        q: "What is your working process?", keys: ["process", "how it works", "steps", "workflow", "how do you work", "method"],
        a: "Four steps, {name}: <strong>Understand</strong> your goals, <strong>Define</strong> the plan and scope, <strong>Create</strong> the solution, then <strong>Deliver</strong> it. Details are on the <a href=\"services.html\">Services page</a>."
      },
      {
        q: "What do you need from me to start?", keys: ["need from me", "requirements", "what to prepare", "documents", "details needed"],
        a: "A short description of your business and the result you want is enough, {name}. It also helps to share examples you like, your logo or content if you have it, and your preferred timeline."
      },
      {
        q: "Will I see progress during the project?", keys: ["progress", "updates", "update me", "review", "feedback", "demo"],
        a: "Yes, {name}. We share progress so you can review and give feedback. How often is agreed with you at the start."
      },
      {
        q: "Can I request changes along the way?", keys: ["changes", "change request", "modify", "revisions", "revision", "edit later"],
        a: "Yes, {name}. Small changes are normal. Larger changes to the scope can affect time and cost, and we discuss that with you first."
      }
    ]
  },
  {
    id: "pricing", label: "Pricing & Timeline", icon: "bi-cash-coin",
    intro: "Of course, {name}. Here is how pricing and timelines work:",
    items: [
      {
        q: "How much will my project cost?", keys: ["price", "cost", "budget", "quotation", "quote", "charge", "rate", "fees", "qeemat", "kitna", "kharcha", "paisay", "paise"],
        a: "Cost depends on the features, scope, platform and timeline, {name}. Use <strong>Get a project estimate</strong> in the menu, or share your requirements on <a href=\"{wa}\" target=\"_blank\" rel=\"noopener\">WhatsApp</a>, and the team will discuss an estimate with you."
      },
      {
        q: "How long does a project take?", keys: ["how long", "timeline", "deadline", "delivery time", "duration", "kitne din", "kab tak", "time lagega"],
        a: "It depends on the size of the project, {name}. A simple website is much quicker than a custom system or mobile app. Once we understand your requirements, we share a realistic timeline."
      },
      {
        q: "How does payment work?", keys: ["payment", "pay", "advance", "installment", "invoice", "payment terms"],
        a: "Payment terms are discussed and agreed with you before work starts, {name}. Please <a href=\"contact.html\">contact us</a> with your project details to talk through the options."
      },
      {
        q: "How do we get started?", keys: ["start", "get started", "begin", "shuru"],
        a: "Just tell us what you need, {name}. Send a message on the <a href=\"contact.html\">Contact page</a> or <a href=\"{wa}\" target=\"_blank\" rel=\"noopener\">WhatsApp</a>, and we will suggest a sensible next step."
      }
    ]
  },
  {
    id: "team", label: "Our Team", icon: "bi-people",
    intro: "Glad you asked, {name}:",
    items: [
      {
        q: "Who is on your team?", keys: ["team", "who", "developer", "member", "haris", "rafi", "ahmed", "bilal", "ezzat", "nazar", "qasim", "founder", "engineer"],
        a: "Our team has {teamCount} specialists: {teamList}. Open the <a href=\"team.html\">Team page</a> to see each profile, {name}."
      },
      {
        q: "Who will work on my project?", keys: ["who will work", "assigned", "my project team"],
        a: "We choose the right specialists for your project, {name}, for example mobile, backend or frontend developers, with the team working together. You will know who to talk to from day one."
      },
      {
        q: "Where are you located?", keys: ["where", "location", "karachi", "hyderabad", "remote", "office", "based", "address", "kahan"],
        a: "We have teams in Karachi and Hyderabad, and we work remotely with clients across Pakistan and abroad, {name}."
      },
      {
        q: "Can I see your work?", keys: ["project", "portfolio", "work", "example", "previous", "case"],
        a: "Of course, {name}! Browse our work on the <a href=\"projects.html\">Projects page</a>: Website Development, Software Development, Mobile Applications and AI Applications."
      }
    ]
  },
  {
    id: "contact", label: "Contact & Support", icon: "bi-headset",
    intro: "Here is how to reach us, {name}:",
    items: [
      {
        q: "How can I contact you?", keys: ["whatsapp", "contact", "phone", "call", "reach", "email", "talk", "discuss", "number", "rabta", "baat"],
        a: "Message us on <a href=\"{wa}\" target=\"_blank\" rel=\"noopener\">WhatsApp</a>, call <a href=\"tel:{phone}\">{phone}</a>, or use the <a href=\"contact.html\">contact form</a>, {name}. WhatsApp is the fastest way."
      },
      {
        q: "Do you provide support after delivery?", keys: ["support", "maintenance", "after delivery", "after launch", "bug", "fix", "help after"],
        a: "Yes, {name}. We stay available after launch for fixes and improvements. Mention what you need on the <a href=\"contact.html\">Contact page</a> so the team can confirm the best option."
      },
      {
        q: "Will my idea be kept confidential?", keys: ["confidential", "nda", "privacy", "secret", "private idea", "idea safe"],
        a: "Your idea matters, {name}. Please mention confidentiality when you contact us, and the team can discuss terms such as an NDA before you share details."
      }
    ]
  }
];
const ALL_FAQ = CHAT_CATEGORIES.flatMap(c => c.items.map(it => ({ ...it, cat: c.id })));

function fill(text) {
  const team = TEAM.map(m => `<a href="team-member.html?id=${m.id}">${escHtml(m.name)}</a> (${escHtml(m.shortRole || m.role)})`).join(", ");
  return text.replaceAll("{name}", escHtml(userName)).replaceAll("{wa}", waLink()).replaceAll("{phone}", SITE.phone)
    .replaceAll("{mobileCount}", countIn("mobile")).replaceAll("{aiCount}", countIn("ai")).replaceAll("{teamCount}", TEAM.length).replaceAll("{teamList}", team);
}
function scrollChat() { chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: "smooth" }); }
function addChatMessage(message, type = "bot", html = false) {
  const item = document.createElement("div");
  item.className = `chat-msg ${type === "user" ? "user" : ""}`;
  if (html) item.innerHTML = message; else item.textContent = message;
  chatMessages.appendChild(item); scrollChat();
}
/* Bot reply with typing dots. Longer answers wait a little longer. */
function botSay(html, then, delay) {
  const wait = delay ?? Math.min(900, 350 + html.replace(/<[^>]+>/g, "").length * 3);
  const t = document.createElement("div"); t.className = "chat-msg chat-typing"; t.innerHTML = "<span></span><span></span><span></span>";
  chatMessages.appendChild(t); scrollChat();
  setTimeout(() => { t.remove(); addChatMessage(html, "bot", true); if (then) then(); }, wait);
}
/* Button list. Give an item `href` to make it a link instead of an action. */
function addButtons(list) {
  const wrap = document.createElement("div"); wrap.className = "chat-quick-questions" + (list.every(x => x.label.length <= 24) ? " wrap" : ""); // short labels sit side by side
  list.forEach(({ label, icon, onClick, href, kind }) => {
    const b = document.createElement(href ? "a" : "button");
    b.className = "chat-quick-btn" + (kind ? " " + kind : "");
    if (href) { b.href = href; if (href.startsWith("http")) { b.target = "_blank"; b.rel = "noopener"; } } else b.type = "button";
    b.innerHTML = (icon ? `<i class="bi ${icon} me-2"></i>` : "") + escHtml(label);
    if (!href) b.addEventListener("click", () => { wrap.querySelectorAll("button").forEach(x => x.disabled = true); onClick(); });
    wrap.appendChild(b);
  });
  chatMessages.appendChild(wrap); scrollChat();
}
const userSays = t => addChatMessage(t, "user");

/* Main menu: topics + estimate + talk to team */
function showCategories() {
  addButtons([
    ...CHAT_CATEGORIES.map(c => ({ label: c.label, icon: c.icon, onClick: () => { userSays(c.label); showCategory(c.id); } })),
    { label: "Get a project estimate", icon: "bi-calculator", kind: "primary", onClick: () => { userSays("Get a project estimate"); startEstimate(); } },
    { label: "Talk to our team", icon: "bi-whatsapp", kind: "whatsapp", href: waLink(`Hello NZK Techs, my name is ${userName}. I'd like to talk to your team.`) }
  ]);
}
function showCategory(id) {
  const c = CHAT_CATEGORIES.find(x => x.id === id);
  botSay(fill(c.intro), () => addButtons([
    ...c.items.map(it => ({ label: it.q, onClick: () => { userSays(it.q); answerItem(it); } })),
    { label: "Back to main menu", icon: "bi-arrow-left", onClick: () => { userSays("Main menu"); botSay(fill("Sure, {name}. What would you like to know about?"), showCategories); } }
  ]));
}
function answerItem(it) {
  botSay(fill(it.a), () => addButtons([
    { label: "More " + CHAT_CATEGORIES.find(c => c.id === it.cat).label.toLowerCase() + " questions", onClick: () => { userSays("More questions"); showCategory(it.cat); } },
    { label: "Get a project estimate", icon: "bi-calculator", onClick: () => { userSays("Get a project estimate"); startEstimate(); } },
    { label: "Main menu", icon: "bi-grid", onClick: () => { userSays("Main menu"); botSay(fill("Of course, {name}. Pick a topic:"), showCategories); } }
  ]));
}

/* Estimate flow: asks 2 questions, then sends the summary to WhatsApp */
function startEstimate() {
  const types = ["Website", "Mobile app", "Custom software", "AI solution", "Not sure yet"];
  const times = ["As soon as possible", "Within 1 month", "1 to 3 months", "Flexible"];
  botSay(fill("Happy to help, {name}. What would you like to build?"), () => addButtons(types.map(t => ({
    label: t, onClick: () => {
      userSays(t); botSay("And when do you need it?", () => addButtons(times.map(w => ({
        label: w, onClick: () => { userSays(w); finishEstimate(t, w); }
      }))));
    }
  }))));
}
function finishEstimate(type, when) {
  const text = `Hello NZK Techs, my name is ${userName}.\nI'd like an estimate for: ${type}\nTimeline: ${when}`;
  botSay(fill("Thank you, {name}. Send these details to our team on WhatsApp and we will discuss scope and cost with you. No obligation."), () => addButtons([
    { label: "Send on WhatsApp", icon: "bi-whatsapp", kind: "whatsapp", href: waLink(text) },
    { label: "Call " + SITE.phone, icon: "bi-telephone", href: "tel:" + SITE.phone },
    { label: "Main menu", icon: "bi-grid", onClick: () => { userSays("Main menu"); botSay(fill("Of course, {name}. Pick a topic:"), showCategories); } }
  ]));
}

/* Pulls just the person's name out of anything they type:
   "my name is ahmed", "i am Ahmed Raza", "mera naam ahmed hai", "ahmed hun", "call me ahmed" -> "Ahmed" / "Ahmed Raza" */
const NAME_FILLER = new Set(["hi", "hii", "hello", "helo", "hey", "salam", "salaam", "assalam", "assalamualaikum", "assalamoalaikum", "aoa", "o", "wa", "walaikum", "alaikum", "alaykum", "alaikom", "jee", "hy", "slam", "my", "name", "is", "its", "it's", "i", "am", "im", "i'm", "this", "mera", "meri", "mujhe", "mujhay", "mujhko", "naam", "nam", "main", "mai", "mein", "hai", "hain", "hy", "hu", "hun", "hoon", "ho", "he", "se", "called", "call", "me", "the", "a", "an", "please", "plz", "pls", "ji", "sir", "madam", "bhai", "yeh", "ye", "yehi", "kehte", "kehty", "keh", "log", "bulao", "bulaye", "bulayen", "you", "can", "say", "and", "from", "here", "aap", "apna", "apni", "abhi"]);
const NOT_A_NAME = new Set(["price", "pricing", "cost", "website", "web", "app", "apps", "help", "contact", "project", "projects", "services", "service", "team", "ai", "software", "mobile", "yes", "no", "ok", "okay", "test", "thanks", "thank", "what", "how", "why", "where", "who", "when", "info", "hello", "menu", "start", "bye", "quote"]);
function cleanName(raw) {
  const tokens = String(raw).toLowerCase()
    .replace(/[^\p{L}\s.'’-]/gu, " ")
    .split(/\s+/)
    .map(t => t.replace(/^[.'’-]+|[.'’-]+$/g, ""))
    .filter(Boolean)
    .filter(t => !NAME_FILLER.has(t));
  if (!tokens.length || tokens.length > 3) return "";
  if (tokens.some(t => t.length < 2 || t.length > 20 || NOT_A_NAME.has(t))) return "";
  return tokens.map(t => t.replace(/(^|[-'’])\p{L}/gu, m => m.toUpperCase())).join(" ");
}
function setName(n) { userName = n; awaitingName = false; try { sessionStorage.setItem(NAME_KEY, n); } catch (e) { } }
function resetChat() {
  chatMessages.innerHTML = ""; chatInput.value = "";
  try { sessionStorage.removeItem(NAME_KEY); } catch (e) { }
  userName = ""; awaitingName = true;
  addChatMessage("Hello! Welcome to NZK Techs. I'm here to help you explore our services, team and projects.");
addChatMessage("May I know your full name, please? You can simply enter your full name below.");
  chatInput.placeholder = "Type your name...";
}
function greetAfterName() {
  chatInput.placeholder = "Write your message...";
  botSay(fill("Nice to meet you, {name}! How can I help you today? Choose a topic below, or type your own question."), showCategories);
}
function matchFaq(q) {
  let best = null, score = 0;
  for (const it of ALL_FAQ) {
    let sc = 0;
    for (const k of it.keys) {
      const hit = k.length <= 3 ? new RegExp(`\\b${k}\\b`).test(q) : q.includes(k);
      if (hit) sc += k.length > 5 ? 2 : 1;
    }
    if (sc > score) { score = sc; best = it; }
  }
  return score ? best : null;
}
function handleChatQuestion(text) {
  userSays(text);
  if (awaitingName) {
    const n = cleanName(text);
    if (!n) { botSay("I couldn't pick up a name from that. Please type just your name, for example <strong>Ahmed</strong> or <strong>My name is Ahmed</strong>.", null, 300); return; }
    setName(n); greetAfterName(); return;
  }
  const q = text.toLowerCase();
  const nm = q.match(/(?:my name is|name is|i am called|i'm called|call me|mera naam(?: hai)?|mera nam|meri naam)\s+(.+)/);
  if (nm && cleanName(nm[1])) { setName(cleanName(nm[1])); botSay(fill("Got it, I'll call you {name} from now on. How can I help?"), showCategories); return; }
  if (/^(hi|hello|hey|salam|assalam|aoa|good (morning|evening|afternoon))\b/.test(q)) return botSay(fill("Hello again, {name}! What would you like to know?"), showCategories);
  if (/\b(thanks|thank you|shukriya|jazak)/.test(q)) return botSay(fill("You're most welcome, {name}! Is there anything else I can help you with?"), showCategories);
  if (/\b(bye|goodbye|allah hafiz|khuda hafiz)\b/.test(q)) return botSay(fill("Goodbye, {name}! Feel free to come back anytime. Have a great day!"));
  if (/\b(estimate|quotation|quote)\b/.test(q) && /\b(get|want|need|chahiye|send)\b/.test(q)) return startEstimate();
  const hit = matchFaq(q);
  if (hit) return answerItem(hit);
  botSay(fill(`Thanks for sharing that, {name}. I want to give you the right answer, so please pick a topic below, or send your question straight to our team on <a href="${waLink(`Hello NZK Techs, my name is ${userName}. ${text}`)}" target="_blank" rel="noopener">WhatsApp</a>.`), showCategories);
}

/* Open / close. On phones the chat fills the whole screen (see CSS). */
function setChat(open) {
  chat.classList.toggle("open", open);
  document.body.classList.toggle("chat-open", open);
  chatLaunch.setAttribute("aria-expanded", open);
  if (!open) return;
  if (!chatMessages.children.length) {
    if (awaitingName) resetChat(); else { addChatMessage(fill("Welcome back, {name}! How can I help you?")); showCategories(); }
  }
  if (matchMedia("(hover: hover)").matches) setTimeout(() => chatInput.focus(), 250); // no auto keyboard on phones
}
chatLaunch.onclick = () => setChat(!chat.classList.contains("open"));
document.querySelector(".chat-close").onclick = () => setChat(false);
document.querySelector(".chat-refresh").onclick = resetChat;
addEventListener("keydown", e => { if (e.key === "Escape" && chat.classList.contains("open")) setChat(false); });
/* Chips above the input */
document.querySelector(".chat-chips").addEventListener("click", e => {
  const b = e.target.closest("[data-chip]"); if (!b || awaitingName) return;
  if (b.dataset.chip === "menu") { userSays("Main menu"); botSay(fill("Sure, {name}. Pick a topic:"), showCategories); }
  if (b.dataset.chip === "estimate") { userSays("Get a project estimate"); startEstimate(); }
});
/* Keeps the chat above the phone keyboard */
if (window.visualViewport) {
  const fit = () => chat.style.setProperty("--chat-h", visualViewport.height + "px");
  visualViewport.addEventListener("resize", fit); fit();
}
document.querySelector(".chat-input").addEventListener("submit", e => {
  e.preventDefault(); const value = chatInput.value.trim(); if (!value) return;
  chatInput.value = ""; handleChatQuestion(value);
});

/* ------------------------- Toast (used by the contact form) ------------------------- */
function showToast(title, text) {
  let t = document.querySelector(".nzk-toast");
  if (!t) { t = document.createElement("div"); t.className = "nzk-toast"; t.setAttribute("role", "status"); document.body.append(t); }
  t.innerHTML = '<i class="bi bi-check-lg"></i><div><strong></strong><span></span></div>';
  t.querySelector("strong").textContent = title;
  t.querySelector("span").textContent = text;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove("show"), 4500);
}

/* ------------------------- Contact form (sends to the Node/Express/MongoDB API) ------------------------- */
// If the site is opened with VS Code Live Server (port 5500), the API runs on port 5000.
// When Express serves the site (http://localhost:5000) or in production, the same origin is used.
const API_BASE = ["5500", "5501"].includes(location.port) ? "http://localhost:5000" : "";

document.querySelectorAll("form[data-enquiry-form]").forEach(form => {
  const phone = form.elements.phone;
  const feedback = form.querySelector(".form-feedback");
  const button = form.querySelector("button[type=submit]");
  const label = button && button.querySelector(".btn-label");
  const setFeedback = (text, ok) => {
    if (!feedback) return;
    feedback.textContent = text;
    feedback.style.color = ok ? "#2f7d4f" : "#b3261e";
  };

  form.addEventListener("submit", async event => {
    event.preventDefault();

    const digits = (phone?.value.match(/\d/g) || []).length;
    if (phone) {
      phone.setCustomValidity(
        /^[0-9+\-()\s]{7,20}$/.test(phone.value.trim()) && digits >= 7
          ? ""
          : "Please enter a valid phone number."
      );
    }

    form.classList.add("was-validated");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());
    const wait = ms => new Promise(r => setTimeout(r, ms));
    const started = Date.now();
    let sent = false;

    // Loading state: spinner inside the button, form locked so nothing is sent twice.
    if (!button.querySelector(".btn-spinner")) {
      const sp = document.createElement("span");
      sp.className = "btn-spinner"; sp.setAttribute("aria-hidden", "true");
      button.prepend(sp);
    }
    button.disabled = true;
    button.classList.remove("is-done");
    button.classList.add("is-loading");
    button.setAttribute("aria-busy", "true");
    form.classList.add("is-sending");
    if (label) label.textContent = "Sending...";
    setFeedback("", true);

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      // Keep the loading state visible for at least ~1.1s so the visitor can see it working.
      await wait(Math.max(0, 1100 - (Date.now() - started)));
      if (res.ok && data.ok) {
        sent = true;
        setFeedback(data.message || "Thank you! Your message has been sent.", true);
        showToast("Message sent", "Thank you! Our team will contact you soon.");
        form.reset();
        form.classList.remove("was-validated");
      } else {
        const first = data.errors ? Object.values(data.errors)[0] : "";
        setFeedback(first || data.message || "Could not send your message. Please try again.", false);
      }
    } catch (err) {
      await wait(Math.max(0, 1100 - (Date.now() - started)));
      setFeedback("Could not reach the server. Please try again or message us on WhatsApp.", false);
    } finally {
      button.classList.remove("is-loading");
      button.removeAttribute("aria-busy");
      form.classList.remove("is-sending");
      if (sent) {
        button.classList.add("is-done");
        if (label) label.textContent = "Message sent";
        setTimeout(() => { button.classList.remove("is-done"); button.disabled = false; if (label) label.textContent = "Send message"; }, 3000);
      } else {
        button.disabled = false;
        if (label) label.textContent = "Send message";
      }
    }
  });

  phone?.addEventListener("input", () => phone.setCustomValidity(""));
});

/* ------------------------- Team size (kept in sync with data.js) ------------------------- */
(() => {
  const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
  document.querySelectorAll("[data-team-words]").forEach(el => { el.textContent = words[TEAM.length] || TEAM.length; });
  document.querySelectorAll("[data-team-count]").forEach(el => {
    el.dataset.count = TEAM.length;
    el.textContent = String(TEAM.length).padStart(parseInt(el.dataset.pad || 0, 10), "0");
  });
})();

/* ------------------------- Motion extras ------------------------- */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll progress bar + gentle parallax variable
  const bar = document.createElement("div"); bar.className = "scroll-progress"; bar.setAttribute("aria-hidden", "true");
  document.body.prepend(bar);
  let ticking = false;
  const update = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? Math.min(scrollY / h, 1) : 0})`;
    if (!reduce) document.documentElement.style.setProperty("--sy", Math.min(scrollY, 900));
    ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();

  // Staggered reveal: siblings inside the same row/grid appear one after another
  const stagger = (root = document) => {
    if (reduce) return;
    const groups = new Map();
    root.querySelectorAll(".reveal:not(.show):not([data-staggered])").forEach(el => {
      const key = el.parentElement; if (!groups.has(key)) groups.set(key, []); groups.get(key).push(el);
    });
    groups.forEach(list => list.forEach((el, i) => { el.dataset.staggered = "1"; if (i) el.style.transitionDelay = `${Math.min(i, 5) * 90}ms`; }));
  };
  const baseObserve = window.observeReveals;
  window.observeReveals = (root = document) => { stagger(root); baseObserve(root); };
  window.observeReveals();

  // Cursor spotlight on work cards (desktop pointers only)
  if (matchMedia("(hover: hover)").matches && !reduce) {
    document.addEventListener("pointermove", e => {
      const card = e.target.closest && e.target.closest(".work-card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    }, { passive: true });
  }
})();

/* ------------------------- Smooth motion (page change, headline, magnetic, tilt) ------------------------- */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hoverOk = matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (reduce) return;

  // 1) Page transition: fade out before opening another page
  const wipe = document.createElement("div"); wipe.className = "page-wipe"; wipe.setAttribute("aria-hidden", "true");
  document.body.appendChild(wipe);
  document.addEventListener("click", e => {
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const u = new URL(a.href, location.href);
    if (a.target === "_blank" || a.hasAttribute("download") || u.origin !== location.origin || u.protocol !== location.protocol) return;
    if (u.pathname === location.pathname && u.search === location.search) return; // same page / #hash
    e.preventDefault();
    document.body.classList.add("leaving");
    setTimeout(() => { location.href = a.href; }, 280);
  });
  addEventListener("pageshow", () => document.body.classList.remove("leaving")); // back button

  // 2) Headline words slide up one by one
  document.querySelectorAll(".hero h1, .page-hero h1").forEach(h => {
    let n = 0;
    const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(t => {
      const frag = document.createDocumentFragment();
      t.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
        const w = document.createElement("span"), i = document.createElement("span");
        w.className = "w"; i.textContent = part; i.style.transitionDelay = `${Math.min(n++, 14) * 55}ms`;
        w.appendChild(i); frag.appendChild(w);
      });
      t.replaceWith(frag);
    });
    h.classList.add("split");
    setTimeout(() => h.classList.add("words-in"), 650);
  });

  if (!hoverOk) return;

  // 3) Magnetic buttons: they lean slightly toward the cursor
  document.querySelectorAll(".btn-brand, .btn-outline-brand, .chat-launch, .wa-float").forEach(el => {
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      el.style.translate = `${(e.clientX - r.left - r.width / 2) * .18}px ${(e.clientY - r.top - r.height / 2) * .28}px`;
    });
    el.addEventListener("pointerleave", () => { el.style.translate = ""; });
  });

  // 4) Soft 3D tilt on cards (also works on cards added later by pages.js)
  const TILT = ".team-card, .project-card, .category-card";
  document.addEventListener("pointermove", e => {
    const c = e.target.closest && e.target.closest(TILT); if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - .5) * 6}deg`);
    c.style.setProperty("--rx", `${(.5 - (e.clientY - r.top) / r.height) * 6}deg`);
  }, { passive: true });
  document.addEventListener("pointerout", e => {
    const c = e.target.closest && e.target.closest(TILT);
    if (c && !c.contains(e.relatedTarget)) { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); }
  });
})();
