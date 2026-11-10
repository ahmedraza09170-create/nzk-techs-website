
// ==================== HELPERS ====================

// Escape HTML to keep dynamic content safe.
const esc = value =>
  String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));

const $ = (selector, root = document) => root.querySelector(selector);

const catById = id => CATEGORIES.find(c => c.id === id);
const memberById = id => TEAM.find(m => m.id === id);
const projectById = id => PROJECTS.find(p => p.id === id);

const pageKey = document.body.dataset.page;


// ==================== TEAM COMPONENTS ====================

// Generate a team member avatar.
// When a photo exists the image fills the whole frame (no coloured background shows).
function avatar(member, className, extra = "") {
  const hasPhoto = !!member.photo;
  const eager = /leader|member-avatar/.test(className);
  const overlay = hasPhoto && /team-avatar/.test(className)
    ? `<span class="avatar-overlay" aria-hidden="true"><i class="bi bi-arrow-up-right"></i></span>`
    : "";
  return `
    <div class="${className}${hasPhoto ? " has-photo" : ""}"${hasPhoto ? ` style="--photo:url('${esc(member.photo)}')"` : ""}>
      ${hasPhoto ? `<div class="photo-blur" aria-hidden="true"></div>` : ""}
      ${hasPhoto
        ? `<img src="${esc(member.photo)}" alt="${esc(member.name)}" loading="${eager ? "eager" : "lazy"}" decoding="async">`
        : ""}
      ${hasPhoto ? "" : `<span>${esc(member.initials)}</span>`}
      ${overlay}
      ${extra}
    </div>
  `;
}

// Generate a team member card.
function teamCard(member, col = "col-sm-6 col-lg-4") {
  return `
    <div class="${col} reveal">
      <a href="team-member.html?id=${member.id}"
         class="text-reset"
         aria-label="View profile of ${esc(member.name)}">

        <article class="team-card">
          ${avatar(member, "team-avatar")}

          <div class="team-body">
            <div class="team-role">${esc(member.role)}</div>
            <h3 class="h4 mt-2">${esc(member.name)}</h3>

            ${member.experience ? `
              <div class="exp-badge">
                <i class="bi bi-award"></i>
                ${esc(member.experience)} experience
              </div>
            ` : ""}

            <p class="section-copy mb-3">${esc(member.tagline)}</p>

            <span class="card-link">
              View profile <i class="bi bi-arrow-up-right"></i>
            </span>
          </div>
        </article>
      </a>
    </div>
  `;
}


// ==================== PROJECT COMPONENTS ====================

// Generate project image or default cover.
function projectMedia(project) {
  if (project.image) {
    return `
      <div class="project-image-wrap">
        <img
          class="project-image"
          src="${esc(project.image)}"
          alt="${esc(project.title)}"
          loading="lazy"
        >
      </div>
    `;
  }

  return `
    <div class="project-image-wrap">
      <div class="project-cover cat-${project.category}">
        <div class="cover-frame ${project.category === "mobile" ? "phone" : ""}">
          <i class="bi ${project.icon}"></i>
        </div>

        <span class="cover-label">
          ${esc(project.platform || catById(project.category).label)}
        </span>
      </div>
    </div>
  `;
}

// Generate a project card.
function projectCard(project, col = "col-md-6 col-lg-4") {
  const category = catById(project.category);

  return `
    <div class="${col} reveal project-item" data-cat="${project.category}">
      <a href="project.html?id=${project.id}" class="text-reset">

        <article class="project-card">
          ${projectMedia(project)}

          <div class="project-body">
            <span class="project-tag">
              ${esc(category.label)} · ${esc(project.tags.slice(0, 2).join(" · "))}
            </span>

            <h3 class="h4 mt-2">${esc(project.title)}</h3>
            <p class="section-copy mb-3">${esc(project.summary)}</p>

            <span class="card-link">
              View project <i class="bi bi-arrow-up-right"></i>
            </span>
          </div>
        </article>

      </a>
    </div>
  `;
}


// ==================== SEO METADATA ====================

// Update page title and social descriptions.
function setMeta(title, description) {
  const fullTitle = `${title} | NZK Techs`;

  document.title = fullTitle;

  const update = (selector, value) => {
    const element = document.querySelector(selector);

    if (element && value) {
      element.setAttribute("content", value);
    }
  };

  update('meta[name="description"]', description);
  update('meta[property="og:title"]', fullTitle);
  update('meta[property="og:description"]', description);
  update('meta[name="twitter:title"]', fullTitle);
  update('meta[name="twitter:description"]', description);
}


// ==================== HOME PAGE ====================

// Generate a featured project card.
function workCard(project, index) {
  const category = catById(project.category);

  const media = project.image
    ? `
      <img
        class="work-img"
        src="${esc(project.image)}"
        alt="${esc(project.title)}"
        loading="lazy"
      >
    `
    : `
      <div class="project-cover work-cover cat-${project.category}">
        <div class="cover-frame ${project.category === "mobile" ? "phone" : ""}">
          <i class="bi ${project.icon}"></i>
        </div>
      </div>
    `;

  const chips = project.tags
    .slice(0, 3)
    .map(tag => `<span>${esc(tag)}</span>`)
    .join("");

  return `
    <div class="work-item work-${index + 1} reveal">
      <a
        class="work-card"
        href="project.html?id=${project.id}"
        aria-label="View project: ${esc(project.title)}"
      >

        <div class="work-media">${media}</div>
        <div class="work-shade"></div>
        <div class="work-glow"></div>

        <span class="work-cat">
          <i class="bi ${category.icon}"></i>
          ${esc(category.label)}
        </span>

        <span class="work-arrow">
          <i class="bi bi-arrow-up-right"></i>
        </span>

        <div class="work-info">
          <div class="work-tags">${chips}</div>

          <h3>${esc(project.title)}</h3>
          <p>${esc(project.summary)}</p>

          <span class="work-cta">
            View project <i class="bi bi-arrow-right"></i>
          </span>
        </div>

      </a>
    </div>
  `;
}

// Render Home page content.
function renderHome() {

  // Project categories.
  $("#homeCategories").innerHTML = CATEGORIES.map(category => {
    const count = PROJECTS.filter(
      project => project.category === category.id
    ).length;

    return `
      <div class="col-md-6 col-lg-3 reveal">
        <a href="projects.html#${category.id}" class="text-reset">

          <div class="category-card">
            <div class="service-icon">
              <i class="bi ${category.icon}"></i>
            </div>

            <h3 class="h5">${category.label}</h3>
            <p>${category.blurb}</p>

            <span class="card-link">
              ${count ? `${count} project${count > 1 ? "s" : ""}` : "Explore"}
              <i class="bi bi-arrow-up-right"></i>
            </span>
          </div>

        </a>
      </div>
    `;
  }).join("");


  // Featured team members.
  $("#homeTeam").innerHTML = HOME_TEAM
    .map(memberById)
    .filter(Boolean)
    .slice(0, 3)
    .map(member => teamCard(member, "col-md-6 col-lg-4"))
    .join("");


  // Featured projects.
  $("#homeProjects").innerHTML = HOME_PROJECTS
    .map(projectById)
    .filter(Boolean)
    .slice(0, 3)
    .map(workCard)
    .join("");
}


// ==================== TEAM PAGE ====================

// Render founder and remaining team members.
function renderTeam() {
  const leader = TEAM.find(member => member.leader) || TEAM[0];

  const members = TEAM.filter(member => member !== leader);

  if (!leader) return;

  $("#teamLeader").innerHTML = `
    <article class="founder reveal">

      <div class="founder-media">
        <div class="founder-frame">
          ${leader.photo
            ? `<img src="${esc(leader.photo)}" alt="${esc(leader.name)}, Founder of NZK Techs" loading="eager" decoding="async">`
            : `<div class="founder-initials">${esc(leader.initials)}</div>`}
        </div>
        <div class="founder-tag">
          <i class="bi bi-patch-check-fill"></i>
          <div>
            <strong>${esc(leader.name)}</strong>
            <small>Founder, NZK Technologies</small>
          </div>
        </div>
      </div>

      <div class="founder-content">
        <div class="eyebrow mb-3">FOUNDER &amp; TECHNOLOGY LEAD</div>
        <h3 class="founder-name">${esc(leader.name)}</h3>

        <p class="founder-lead">${esc(leader.tagline)}</p>
        <p class="section-copy mb-4">${esc(leader.bio[0])}</p>

        <div class="founder-sectors">
          <span><i class="bi bi-bank2"></i> Banking</span>
          <span><i class="bi bi-heart-pulse"></i> Healthcare</span>
          <span><i class="bi bi-mortarboard"></i> Education</span>
        </div>

        <div class="mb-4">
          ${leader.expertise.slice(0, 6).map(skill =>
            `<span class="pill">${esc(skill)}</span>`
          ).join("")}
        </div>

        <div class="d-flex flex-wrap gap-3">
          <a href="team-member.html?id=${leader.id}" class="btn btn-brand">
            View full profile <i class="bi bi-arrow-up-right ms-2"></i>
          </a>
          ${leader.linkedin ? `
            <a href="${esc(leader.linkedin)}" target="_blank" rel="noopener" class="btn btn-outline-brand">
              <i class="bi bi-linkedin me-2"></i>LinkedIn
            </a>` : ""}
        </div>
      </div>

    </article>
  `;

  $("#teamGrid").innerHTML = members
    .map(member => teamCard(member))
    .join("");
}


// ==================== TEAM MEMBER PROFILE ====================

// Render individual team member details.
function renderMember() {
  const id = new URLSearchParams(location.search).get("id");
  const member = memberById(id);
  const root = $("#memberRoot");

  // Handle invalid profile IDs.
  if (!member) {
    setMeta(
      "Team member not found",
      "This team member profile could not be found. Meet the full NZK Techs team."
    );

    root.innerHTML = `
      <section class="page-hero">
        <div class="container">
          <div class="eyebrow mb-3">Team</div>
          <h1 class="mb-4">We couldn't find that team member.</h1>
          <a class="btn btn-brand" href="team.html">Back to the team</a>
        </div>
      </section>
    `;

    return;
  }

  setMeta(
    `${member.name} — ${member.role}`,
    `${member.name}, ${member.role} at NZK Techs. ${member.tagline}`
  );

  // Find previous and next team members.
  const index = TEAM.findIndex(item => item.id === member.id);

  const previous = TEAM[(index - 1 + TEAM.length) % TEAM.length];
  const next = TEAM[(index + 1) % TEAM.length];


  // Profile information.
  const facts = [
    `<li><span>Position</span><strong>${esc(member.role)}</strong></li>`
  ];

  if (member.experience) {
    facts.push(`
      <li>
        <span>Experience</span>
        <strong>${esc(member.experience)}</strong>
      </li>
    `);
  }

  facts.push(`
    <li>
      <span>Team</span>
      <strong>NZK Techs</strong>
    </li>
  `);


  // Expertise section.
  const expertise = (member.expertise || []).length
    ? `
      <div class="mt-4 reveal">
        <h3 class="h6 skill-title">Expertise</h3>

        <div>
          ${member.expertise.map(skill =>
            `<span class="pill">${esc(skill)}</span>`
          ).join("")}
        </div>
      </div>
    `
    : "";


  // Build profile page.
  root.innerHTML = `
    <section class="page-hero">
      <div class="container">

        <div class="eyebrow mb-3">${esc(member.role)}</div>

        <h1 class="mb-4">${esc(member.name)}</h1>

        <p class="section-copy mb-4">
          ${esc(member.tagline)}
        </p>

        <div class="breadcrumb">
          <a href="index.html">Home</a>
          <span class="mx-2">/</span>
          <a href="team.html">Team</a>
          <span class="mx-2">/</span>
          ${esc(member.name)}
        </div>

      </div>
    </section>


    <section class="section-space">
      <div class="container">

        <div class="row g-5">

          <div class="col-lg-4 reveal">
            <div class="member-side">

              ${avatar(member, "member-avatar")}

              <ul class="fact-list">
                ${facts.join("")}
              </ul>

              <a class="btn btn-brand w-100" href="contact.html">
                Work with our team
                <i class="bi bi-arrow-up-right ms-2"></i>
              </a>

            </div>
          </div>


          <div class="col-lg-8">

            <div class="reveal">
              <div class="eyebrow mb-3">ABOUT</div>

              <h2 class="section-title mb-4">
                ${esc(member.name)}
              </h2>

              ${member.bio.map(paragraph =>
                `<p class="section-copy">${esc(paragraph)}</p>`
              ).join("")}
            </div>

            ${expertise}

          </div>

        </div>
      </div>
    </section>


    <section class="section-space">
      <div class="container">

        <div class="row g-4">

          <div class="col-md-6 reveal">
            <a href="team-member.html?id=${previous.id}" class="text-reset">
              <div class="member-nav">

                <span class="small text-secondary">
                  <i class="bi bi-arrow-left me-1"></i>
                  Previous
                </span>

                <strong>${esc(previous.name)}</strong>
                <span class="team-role">${esc(previous.role)}</span>

              </div>
            </a>
          </div>


          <div class="col-md-6 reveal">
            <a href="team-member.html?id=${next.id}" class="text-reset">
              <div class="member-nav text-md-end">

                <span class="small text-secondary">
                  Next
                  <i class="bi bi-arrow-right ms-1"></i>
                </span>

                <strong>${esc(next.name)}</strong>
                <span class="team-role">${esc(next.role)}</span>

              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  `;
}


// ==================== PROJECTS PAGE ====================

// Render project categories and filtering.
function renderProjects() {
  const tabs = $("#filterTabs");
  const grid = $("#projectGrid");
  const intro = $("#categoryIntro");

  const categoryIds = [
    "all",
    ...CATEGORIES.map(category => category.id)
  ];


  // Generate category filter buttons.
  tabs.innerHTML = [
    { id: "all", label: "All projects", icon: "bi-grid" },
    ...CATEGORIES
  ].map(category => {

    const count = category.id === "all"
      ? PROJECTS.length
      : PROJECTS.filter(
          project => project.category === category.id
        ).length;

    return `
      <button
        type="button"
        class="filter-btn"
        data-cat="${category.id}"
      >
        <i class="bi ${category.icon}"></i>
        ${category.label}
        <span class="count">${count}</span>
      </button>
    `;
  }).join("");


  // Display projects for the selected category.
  function showCategory(categoryId, updateHash = true) {

    if (!categoryIds.includes(categoryId)) {
      categoryId = "all";
    }

    tabs.querySelectorAll(".filter-btn").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.cat === categoryId
      );
    });

    const projects = categoryId === "all"
      ? PROJECTS
      : PROJECTS.filter(
          project => project.category === categoryId
        );

    const category = catById(categoryId);


    // Update category introduction.
    intro.innerHTML = category
      ? `
        <h2 class="h3">${category.label}</h2>
        <p class="section-copy mb-0">${category.blurb}</p>
      `
      : `
        <h2 class="h3">Everything we've built</h2>
        <p class="section-copy mb-0">
          Websites, software and mobile apps — choose a category above to filter.
        </p>
      `;


    // Display projects or an empty state.
    if (projects.length) {

      grid.innerHTML = projects
        .map(project => projectCard(project))
        .join("");

    } else {

      grid.innerHTML = `
        <div class="col-12">
          <div class="empty-state">

            <div class="service-icon mx-auto">
              <i class="bi ${category.icon}"></i>
            </div>

            <h3 class="h4">
              ${category.label} projects are coming soon
            </h3>

            <p class="section-copy mx-auto">
              We don't have a public ${category.label.toLowerCase()}
              project to show yet. If you have an idea, we'd be glad
              to discuss what's possible.
            </p>

            <a href="contact.html" class="btn btn-brand">
              Discuss your project
              <i class="bi bi-arrow-up-right ms-2"></i>
            </a>

          </div>
        </div>
      `;
    }

    window.observeReveals(grid);

    // Keep the URL category in sync.
    if (updateHash) {
      history.replaceState(
        null,
        "",
        categoryId === "all"
          ? location.pathname
          : `#${categoryId}`
      );
    }
  }


  // Handle category button clicks.
  tabs.addEventListener("click", event => {
    const button = event.target.closest(".filter-btn");

    if (button) {
      showCategory(button.dataset.cat);
    }
  });


  // Handle direct category links.
  window.addEventListener("hashchange", () => {
    showCategory(location.hash.slice(1), false);
  });

  showCategory(location.hash.slice(1), false);
}


// ==================== PROJECT DETAIL PAGE ====================

// Render individual project information.
function renderProject() {
  const id = new URLSearchParams(location.search).get("id");
  const project = projectById(id);
  const root = $("#projectRoot");


  // Handle invalid project IDs.
  if (!project) {
    setMeta("Project not found");

    root.innerHTML = `
      <section class="page-hero">
        <div class="container">

          <div class="eyebrow mb-3">Projects</div>

          <h1 class="mb-4">
            We couldn't find that project.
          </h1>

          <a class="btn btn-brand" href="projects.html">
            Back to projects
          </a>

        </div>
      </section>
    `;

    return;
  }

  const category = catById(project.category);

  setMeta(project.title, project.summary);


  // Find related projects.
  const related = PROJECTS.filter(item =>
    item.category === project.category &&
    item.id !== project.id
  );

  const moreProjects = (
    related.length
      ? related
      : PROJECTS.filter(item => item.id !== project.id)
  ).slice(0, 3);


  // Project information list.
  const facts = [
    `
      <li>
        <span>Category</span>
        <strong>
          <a href="projects.html#${category.id}">
            ${category.label}
          </a>
        </strong>
      </li>
    `
  ];

  if (project.platform) {
    facts.push(`
      <li>
        <span>Platform</span>
        <strong>${esc(project.platform)}</strong>
      </li>
    `);
  }

  if (project.stores && project.stores.length) {
    facts.push(`
      <li>
        <span>Available on</span>
        <strong>${project.stores.map(esc).join(" · ")}</strong>
      </li>
    `);
  }

  if (project.tech && project.tech.length) {
    facts.push(`
      <li>
        <span>Technology</span>
        <strong>${project.tech.map(esc).join(", ")}</strong>
      </li>
    `);
  }

  facts.push(`
    <li>
      <span>Delivered by</span>
      <strong>
        <a href="team.html">NZK Techs Team</a>
      </strong>
    </li>
  `);


  // Project hero image or default cover.
  const hero = project.image
    ? `
      <img
        src="${esc(project.image)}"
        class="w-100 project-hero-img"
        alt="${esc(project.title)}"
      >
    `
    : `
      <div class="project-cover project-cover-lg cat-${project.category}">

        <div class="cover-frame ${project.category === "mobile" ? "phone" : ""}">
          <i class="bi ${project.icon}"></i>
        </div>

        <span class="cover-label">
          ${esc(project.platform || category.label)}
        </span>

      </div>
    `;


  // Optional challenge, approach and outcome section.
  const story = (
    project.challenge ||
    project.approach ||
    project.outcome
  ) ? `
    <section class="section-space bg-cream">
      <div class="container">

        <div class="row g-4">

          <div class="col-lg-4 reveal">
            <div class="eyebrow mb-3">THE CONTEXT</div>
            <h2 class="section-title">Understanding the need.</h2>
          </div>

          <div class="col-lg-8 reveal">

            ${project.challenge ? `
              <h3 class="h4">The challenge</h3>
              <p class="section-copy mb-4">${esc(project.challenge)}</p>
            ` : ""}

            ${project.approach ? `
              <h3 class="h4">The approach</h3>
              <p class="section-copy mb-4">${esc(project.approach)}</p>
            ` : ""}

            ${project.outcome ? `
              <h3 class="h4">The outcome</h3>
              <p class="section-copy mb-0">${esc(project.outcome)}</p>
            ` : ""}

          </div>

        </div>
      </div>
    </section>
  ` : "";


  // Build project detail page.
  root.innerHTML = `
    <section class="page-hero">
      <div class="container">

        <div class="eyebrow mb-3">
          ${esc(category.label)} · ${esc(project.tags.slice(0, 2).join(" · "))}
        </div>

        <h1 class="mb-4">${esc(project.title)}</h1>

        <p class="section-copy mb-4">
          ${esc(project.summary)}
        </p>

        <div class="breadcrumb">
          <a href="index.html">Home</a>
          <span class="mx-2">/</span>
          <a href="projects.html">Projects</a>
          <span class="mx-2">/</span>
          <a href="projects.html#${category.id}">${category.label}</a>
          <span class="mx-2">/</span>
          ${esc(project.title)}
        </div>

      </div>
    </section>


    <section class="section-space">
      <div class="container">

        <div class="row g-5">

          <div class="col-lg-7 reveal">
            ${hero}

            <div class="mt-4">
              ${project.tags.map(tag =>
                `<span class="pill">${esc(tag)}</span>`
              ).join("")}
            </div>
          </div>

          <div class="col-lg-5 reveal">

            <div class="eyebrow mb-3">PROJECT OVERVIEW</div>

            <h2 class="section-title mb-4">
              ${esc(project.title)}
            </h2>

            <p class="section-copy mb-4">
              ${esc(project.overview)}
            </p>

            <ul class="fact-list">
              ${facts.join("")}
            </ul>

          </div>

        </div>
      </div>
    </section>


    <section class="section-space bg-cream">
      <div class="container">

        <div class="row align-items-end mb-5">
          <div class="col-lg-8 reveal">

            <div class="eyebrow mb-3">KEY FEATURES</div>

            <h2 class="section-title">
              What the project includes.
            </h2>

          </div>
        </div>

        <div class="row g-4">
          ${project.features.map((feature, index) => `
            <div class="col-sm-6 col-lg-3 reveal">

              <div class="info-card p-4">

                <div class="process-number" style="font-size:2rem">
                  ${String(index + 1).padStart(2, "0")}
                </div>

                <h3 class="h6 mt-2 mb-0">
                  ${esc(feature)}
                </h3>

              </div>
            </div>
          `).join("")}
        </div>

      </div>
    </section>


    ${story}


    <section class="section-space">
      <div class="container">

        <div class="row align-items-end mb-5">

          <div class="col-lg-8 reveal">
            <div class="eyebrow mb-3">MORE PROJECTS</div>
            <h2 class="section-title">Keep exploring.</h2>
          </div>

          <div class="col-lg-4 text-lg-end reveal">
            <a href="projects.html" class="btn btn-outline-brand">
              Back to projects
            </a>
          </div>

        </div>

        <div class="row g-4">
          ${moreProjects.map(item => projectCard(item)).join("")}
        </div>

      </div>
    </section>


    <section class="section-space bg-cream">
      <div class="container text-center">

        <div class="eyebrow mb-3">HAVE A SIMILAR PROJECT?</div>

        <h2 class="section-title mx-auto mb-4">
          Let's create the right digital solution for your organisation.
        </h2>

        <a href="contact.html" class="btn btn-brand">
          Discuss your project
          <i class="bi bi-arrow-up-right ms-2"></i>
        </a>

        <a href="projects.html" class="btn btn-outline-brand ms-2">
          Back to projects
        </a>

      </div>
    </section>
  `;
}


// ==================== CONTACT PAGE ====================

// Set the WhatsApp contact link.
function renderContact() {
  const link = $("#waLink");

  if (link) {
    link.href = waLink();
    link.textContent = SITE.whatsappDisplay;
  }
}


// ==================== PAGE INITIALIZATION ====================

// Run only the function for the current page.
const pageRenderers = {
  home: renderHome,
  team: renderTeam,
  member: renderMember,
  projects: renderProjects,
  project: renderProject,
  contact: renderContact
};

(pageRenderers[pageKey] || (() => {}))();

// Initialize scroll reveal animations.
window.observeReveals();
