# NZK Techs Website

A responsive, multi-page website built with HTML5, Bootstrap 5.3, custom CSS, and vanilla JavaScript. The original colour theme and design have been preserved. The website is fully responsive across mobile, tablet, and desktop devices.

## 1. Website Pages

| File | Description |
|---|---|
| `index.html` | Home page with services, work categories, team preview, featured projects, and FAQ. |
| `about.html` | About NZK Techs. |
| `team.html` | Team introduction, founder, engineers, and expectations. |
| `team-member.html?id=...` | Individual team member profile. |
| `services.html` | Main services, additional services, industries, and development process. |
| `projects.html` | Projects with Website, Software, Mobile, and AI categories. |
| `project.html?id=...` | Individual project details. |
| `contact.html` | Contact enquiry form and WhatsApp integration. |

## 2. Main Content Management

Almost all dynamic website content is managed through one file:

`assets/js/data.js`

The file contains:

- **SITE:** Phone number, WhatsApp number, email, and social media links.
- **TEAM:** Team member names, roles, biographies, skills, and profile photos.
- **PROJECTS:** Project details, descriptions, categories, and images.
- **CATEGORIES:** Project categories.
- **HOME_PROJECTS:** Exactly three project IDs displayed in the Home page's Selected Work section.
- **HOME_TEAM:** Exactly three member IDs displayed on the Home page.
- **TECH_STACK:** Technologies displayed in the Home page ticker.

## 3. Team Management

Team members are managed inside `TEAM` in `data.js`.

- The order of members determines their display order.
- Set `leader: true` to display a member as the featured founder.
- Each profile displays a photo, position, experience, short biography, and expertise.
- If a photo is unavailable, an initials-based avatar is displayed.

To add a profile photo, use:

`photo: "assets/img/team/member-name.jpg"`

The filename and extension must match the actual image.

**Important:** All projects belong to NZK Techs as a team. No project is credited to an individual developer. Both team member profiles and project pages represent work delivered collectively by NZK Techs.

## 4. Adding New Projects

Open `data.js` and find the `PROJECTS` array.

1. Copy an existing project object.
2. Give the new project a unique ID using lowercase letters and hyphens.
3. Update its name, description, details, and category.
4. Add an image if available.

Supported categories:

- `website`
- `software`
- `mobile`
- `ai`

New projects automatically appear in the Projects section and their individual detail pages. Home page featured projects are controlled separately through `HOME_PROJECTS`.

App Store and Google Play links can be added when official URLs become available.

## 5. Contact Form

The contact form includes four fields:

- Name
- Phone
- Email
- Message

When a visitor submits the form, their information is automatically formatted into a WhatsApp message using `SITE.whatsapp`.

The visitor also receives an on-page thank-you message.

No backend server or Google Sheets integration is required.

## 6. WhatsApp Integration

A floating WhatsApp button appears on the left side of every page.

Its contact number is managed through:

`SITE.whatsapp`

Changing this value updates the WhatsApp contact across the website.

## 7. Chat Assistant

The website includes a guided chat assistant.

**Features:**
- Closed by default.
- Opens in full-screen mode on mobile devices.
- Asks visitors for their name before starting the conversation.
- Remembers the visitor's name during the browser session.
- Uses the visitor's name in subsequent replies.
- Understands different name formats, including:
  - Ahmed
  - My name is Ahmed
  - Mera naam Ahmed hai
  - I am Ahmed Raza

Default conversation topics are managed inside `CHAT_CATEGORIES` in:

`assets/js/main.js`

Available topics include:

- Websites
- Mobile Apps
- Custom Software
- AI Solutions
- Pricing & Timeline
- Our Team
- Contact & Support

New questions and keywords can be added to the relevant categories.

**Note:** This is a predefined, guided chatbot. It is not connected to a live AI service.

## 8. Changing Website Images

### Team Photos

1. Open `assets/img/team/`.
2. Replace the existing photo with the new one.
3. Keep the same filename and extension specified in `data.js`.
4. Use a portrait-oriented image, preferably around 800 × 1000 pixels.
5. Refresh the browser using `Ctrl + F5`.

### Project Images

Find the relevant project inside `PROJECTS` in `data.js` and update its image path:

`image: "assets/img/projects/my-photo.jpg"`

Create the `assets/img/projects/` folder if it does not already exist.

Leave the image value empty (`image: ""`) to use the default themed project cover.

### Home and About Page Images

Open `index.html` or `about.html`, search for `images.unsplash.com`, and replace the existing image URL with your local image path.

Example:

`assets/img/your-photo.jpg`

## 9. Running the Website Locally

1. Open the website folder in Visual Studio Code.
2. Install the Live Server extension if it is not already installed.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

The website uses static HTML, CSS, and JavaScript. Team and project detail pages retrieve their content using URL parameters such as `?id=...`, so they can work on any compatible static hosting platform.

## 10. SEO and Metadata

Every page includes:

- SEO title
- Meta description
- Meta keywords
- Open Graph metadata
- Twitter metadata
- Favicon
- Organization JSON-LD structured data

Once the official domain is available, add:

- Canonical URLs
- `og:url`
- An Open Graph image (1200 × 630 pixels)
- `sitemap.xml`

## 11. Automatic Team Count

The team count displayed on the Home, About, and Team pages is calculated automatically using:

`TEAM.length`

Currently, the website contains seven team members.

Adding or removing members from `TEAM` automatically updates the displayed team count.

---

**Final Notes**

- The original website design and colour theme remain unchanged.
- The website is responsive across all major screen sizes.
- Dynamic content is centrally managed through `data.js`.
- All projects are presented as collective NZK Techs team achievements.
- Home page featured projects and team members can be changed independently.
- Placeholder stock photographs should be replaced with approved NZK Techs imagery when available.

## 12. v3 Update Notes

- **Animation library:** AOS 2.3.4 (loaded from jsDelivr CDN) powers the scroll-down animations on every page. `assets/js/enhance.js` converts all `.reveal` elements to AOS automatically, including cards added by `pages.js`. If the CDN is blocked, the older reveal animation is used instead.
- **Hero (`index.html`):** the banner image is cropped to its true ratio (no zoom), has a hover shine + 3D tilt, floating Web / Mobile / AI chips and a gentle headline shimmer.
- **Team page:** the founder card (Nazar Muhammad) and all team photos now fill the whole frame, with no brown background showing. Cards have an image-zoom hover with an arrow overlay and an accent line.
- All new styles are at the end of `assets/css/style.css` (section "v4"). Colours and the overall design are unchanged.

## v5 changes
- Contact form: send button now shows a spinner ("Sending...") and a success toast.
- Team notification email: Name, Phone, Email and Message are shown as separate full-width blocks (plus a plain-text version).
- Home hero redesigned (`assets/css/v5.css`, `assets/js/home-v5.js`).
- Admin panel and login page redesigned (`/admin`, `/admin/login`).
- IMPORTANT: set `SMTP_USER`, `SMTP_PASS` and `TEAM_EMAIL` in `server/.env` to the professional email. Never upload `.env` to GitHub.
