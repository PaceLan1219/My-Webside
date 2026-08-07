/* =========================================================
   PORTFOLIO V6.0
   MAIN JAVASCRIPT
   FINAL STABLE VERSION
   ========================================================= */


/* =========================================================
   1. CONFIGURATION
   ========================================================= */

const PORTFOLIO_CONFIG = {

    projectsPath: "data/projects.json",

    selectors: {

        themeButton: "#theme-toggle",

        menuButton: "#menu-toggle",

        navigation: "#nav-links",

        projectContainer: "#project-container",

        footerYear: "#current-year",

        backToTop: "#back-to-top",

        pageLoader: "#page-loader",

        searchInput: "#site-search",

        revealItems: `
            .skill-card,
            .project-card,
            .achievement-card,
            .contact-card,
            .timeline-item,
            .info-card
        `

    }

};


/* =========================================================
   2. DOM READY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "Portfolio V6.0 Loaded Successfully"
        );


        initTheme();

        initMobileMenu();

        initProjects();

        initReveal();

        initFooterYear();

        initBackToTop();

        initImageProtection();

        initSmoothLinks();

        initKeyboardSupport();

        initAnalytics();

        initLoader();

        initCounters();

        initSearch();

        updateNavigation();

    }
);


/* =========================================================
   3. HELPER FUNCTIONS
   ========================================================= */

function $(selector) {

    return document.querySelector(selector);

}


function $$(selector) {

    return document.querySelectorAll(selector);

}


function addEvent(
    element,
    event,
    callback
) {

    if (!element) {

        return;

    }


    element.addEventListener(
        event,
        callback
    );

}


/* =========================================================
   4. DARK MODE SYSTEM
   ========================================================= */

function initTheme() {

    const button = $(
        PORTFOLIO_CONFIG
            .selectors
            .themeButton
    );


    const savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        );


    const systemDark =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;


    /*
     * Apply saved theme first.
     */

    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

    }
    else if (savedTheme === "light") {

        document.body.classList.remove(
            "dark-mode"
        );

    }
    else if (systemDark) {

        document.body.classList.add(
            "dark-mode"
        );

    }


    updateThemeButton();


    addEvent(
        button,
        "click",
        () => {

            document.body.classList.toggle(
                "dark-mode"
            );


            const dark =
                document.body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "portfolio-theme",
                dark
                    ? "dark"
                    : "light"
            );


            updateThemeButton();


            console.log(
                "Theme:",
                dark
                    ? "Dark"
                    : "Light"
            );

        }
    );

}


function updateThemeButton() {

    const button = $(
        PORTFOLIO_CONFIG
            .selectors
            .themeButton
    );


    if (!button) {

        return;

    }


    const dark =
        document.body.classList.contains(
            "dark-mode"
        );


    button.textContent =
        dark
            ? "☀️"
            : "🌙";


    button.setAttribute(
        "aria-label",
        dark
            ? "Switch to light mode"
            : "Switch to dark mode"
    );


    button.setAttribute(
        "aria-pressed",
        dark
            ? "true"
            : "false"
    );

}


/* =========================================================
   5. MOBILE MENU SYSTEM
   ========================================================= */

function initMobileMenu() {

    const button = $(
        PORTFOLIO_CONFIG
            .selectors
            .menuButton
    );


    const navigation = $(
        PORTFOLIO_CONFIG
            .selectors
            .navigation
    );


    if (!button || !navigation) {

        console.warn(
            "Mobile navigation elements not found."
        );

        return;

    }


    addEvent(
        button,
        "click",
        () => {

            const isOpen =
                navigation.classList.toggle(
                    "active"
                );


            button.setAttribute(
                "aria-expanded",
                isOpen
                    ? "true"
                    : "false"
            );


            button.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );


            button.textContent =
                isOpen
                    ? "✕"
                    : "☰";

        }
    );


    /*
     * Close mobile menu after clicking
     * a navigation link.
     */

    const links =
        navigation.querySelectorAll(
            "a"
        );


    links.forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    navigation.classList.remove(
                        "active"
                    );


                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    button.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );


                    button.textContent =
                        "☰";

                }
            );

        }
    );


    /*
     * Close menu when clicking outside.
     */

    document.addEventListener(
        "click",
        event => {

            if (
                !navigation.contains(event.target) &&
                !button.contains(event.target)
            ) {

                navigation.classList.remove(
                    "active"
                );


                button.setAttribute(
                    "aria-expanded",
                    "false"
                );


                button.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );


                button.textContent =
                    "☰";

            }

        }
    );


    /*
     * Close menu if screen becomes large.
     */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 900) {

                navigation.classList.remove(
                    "active"
                );


                button.setAttribute(
                    "aria-expanded",
                    "false"
                );


                button.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );


                button.textContent =
                    "☰";

            }

        }
    );

}


/* =========================================================
   6. PROJECT LOADING
   ========================================================= */

async function initProjects() {

    const container = $(
        PORTFOLIO_CONFIG
            .selectors
            .projectContainer
    );


    if (!container) {

        console.warn(
            "Project container not found."
        );

        return;

    }


    try {

        const response =
            await fetch(
                PORTFOLIO_CONFIG.projectsPath,
                {
                    cache: "no-cache"
                }
            );


        if (!response.ok) {

            throw new Error(
                `Unable to load projects.json (${response.status})`
            );

        }


        const projects =
            await response.json();


        if (!Array.isArray(projects)) {

            throw new Error(
                "projects.json must contain an array."
            );

        }


        renderProjects(
            projects,
            container
        );


        console.log(
            `Loaded ${projects.length} projects.`
        );

    }
    catch (error) {

        console.error(
            "Project loading error:",
            error
        );


        container.innerHTML = `
            <article class="project-card show">
                <div class="project-content">
                    <h3>
                        Projects Unavailable
                    </h3>

                    <p>
                        Unable to load projects at the moment.
                        Please check the projects data file.
                    </p>
                </div>
            </article>
        `;

    }

}


/* =========================================================
   7. PROJECT CARD GENERATOR
   ========================================================= */

function renderProjects(
    projects,
    container
) {

    container.innerHTML = "";


    projects.forEach(
        project => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "project-card";


            /*
             * Project image
             */

            if (project.image) {

                const image =
                    document.createElement(
                        "img"
                    );


                image.src =
                    project.image;


                image.alt =
                    project.title ||
                    "Project image";


                image.loading =
                    "lazy";


                image.addEventListener(
                    "error",
                    () => {

                        image.style.display =
                            "none";

                        console.warn(
                            "Project image missing:",
                            project.image
                        );

                    }
                );


                card.appendChild(
                    image
                );

            }


            /*
             * Project content
             */

            const content =
                document.createElement(
                    "div"
                );


            content.className =
                "project-content";


            const title =
                document.createElement(
                    "h3"
                );


            title.textContent =
                project.title ||
                "Untitled Project";


            content.appendChild(
                title
            );


            const description =
                document.createElement(
                    "p"
                );


            description.textContent =
                project.description ||
                "No project description available.";


            content.appendChild(
                description
            );


            /*
             * Project tags
             */

            if (
                Array.isArray(project.tags) &&
                project.tags.length
            ) {

                const tags =
                    document.createElement(
                        "div"
                    );


                tags.className =
                    "project-tags";


                project.tags.forEach(
                    tag => {

                        const tagElement =
                            document.createElement(
                                "span"
                            );


                        tagElement.textContent =
                            tag;


                        tags.appendChild(
                            tagElement
                        );

                    }
                );


                content.appendChild(
                    tags
                );

            }


            /*
             * Project link
             */

            if (project.link) {

                const link =
                    document.createElement(
                        "a"
                    );


                link.className =
                    "project-link";


                link.href =
                    project.link;


                link.textContent =
                    "View Project →";


                content.appendChild(
                    link
                );

            }


            card.appendChild(
                content
            );


            container.appendChild(
                card
            );

        }
    );


    /*
     * Re-initialize reveal observer
     * for dynamically generated cards.
     */

    initReveal();

}


/* =========================================================
   8. SCROLL REVEAL
   ========================================================= */

let revealObserver = null;


function initReveal() {

    const elements =
        document.querySelectorAll(
            PORTFOLIO_CONFIG
                .selectors
                .revealItems
        );


    if (!elements.length) {

        return;

    }


    /*
     * Create observer only once.
     */

    if (!revealObserver) {

        revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add("show");


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );

    }


    elements.forEach(
        element => {

            if (
                !element.classList.contains(
                    "show"
                )
            ) {

                revealObserver.observe(
                    element
                );

            }

        }
    );

}


/* =========================================================
   9. FOOTER YEAR
   ========================================================= */

function initFooterYear() {

    const year = $(
        PORTFOLIO_CONFIG
            .selectors
            .footerYear
    );


    if (!year) {

        return;

    }


    year.textContent =
        new Date()
            .getFullYear();

}


/* =========================================================
   10. BACK TO TOP
   ========================================================= */

function initBackToTop() {

    const button = $(
        PORTFOLIO_CONFIG
            .selectors
            .backToTop
    );


    if (!button) {

        return;

    }


    function updateBackToTop() {

        if (window.scrollY > 400) {

            button.classList.add(
                "show"
            );

        }
        else {

            button.classList.remove(
                "show"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop,
        {
            passive: true
        }
    );


    updateBackToTop();


    addEvent(
        button,
        "click",
        () => {

            window.scrollTo(
                {
                    top: 0,
                    behavior: "smooth"
                }
            );

        }
    );

}


/* =========================================================
   11. IMAGE ERROR PROTECTION
   ========================================================= */

function initImageProtection() {

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(
        image => {

            image.addEventListener(
                "error",
                () => {

                    console.warn(
                        "Image failed to load:",
                        image.src
                    );


                    image.classList.add(
                        "image-load-error"
                    );

                }
            );

        }
    );

}


/* =========================================================
   12. SMOOTH INTERNAL LINKS
   ========================================================= */

function initSmoothLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        href === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            href
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    target.scrollIntoView(
                        {
                            behavior: "smooth",
                            block: "start"
                        }
                    );

                }
            );

        }
    );

}


/* =========================================================
   13. ACTIVE NAVIGATION
   ========================================================= */

function updateNavigation() {

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const links =
        document.querySelectorAll(
            ".nav-links a[href^='#']"
        );


    if (
        !sections.length ||
        !links.length
    ) {

        return;

    }


    function updateActiveLink() {

        let currentSection =
            "home";


        const scrollPosition =
            window.scrollY + 180;


        sections.forEach(
            section => {

                if (
                    scrollPosition >=
                    section.offsetTop
                ) {

                    currentSection =
                        section.id;

                }

            }
        );


        links.forEach(
            link => {

                link.classList.remove(
                    "active"
                );


                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    href ===
                    `#${currentSection}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateActiveLink,
        {
            passive: true
        }
    );


    updateActiveLink();

}


/* =========================================================
   14. KEYBOARD SUPPORT
   ========================================================= */

function initKeyboardSupport() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) {

                return;

            }


            /*
             * Close mobile navigation.
             */

            const navigation = $(
                PORTFOLIO_CONFIG
                    .selectors
                    .navigation
            );


            const menuButton = $(
                PORTFOLIO_CONFIG
                    .selectors
                    .menuButton
            );


            if (navigation) {

                navigation.classList.remove(
                    "active"
                );

            }


            if (menuButton) {

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );


                menuButton.textContent =
                    "☰";

            }

        }
    );

}


/* =========================================================
   15. CONSOLE STATUS
   ========================================================= */

function showPortfolioStatus() {

    console.log(
        `
====================================
PACE LAN PORTFOLIO V6.0
====================================

System Status:
✓ JavaScript Loaded
✓ Theme System Ready
✓ Mobile Navigation Ready
✓ Project Loader Ready
✓ Scroll Reveal Ready
✓ Back To Top Ready
✓ Smooth Navigation Ready
✓ Image Protection Ready
✓ Analytics Ready
✓ Page Loader Ready

====================================
`
    );

}


showPortfolioStatus();


/* =========================================================
   16. PORTFOLIO ANALYTICS SYSTEM
   ========================================================= */

function initAnalytics() {

    const key =
        "pace_portfolio_visits";


    let visits =
        localStorage.getItem(
            key
        );


    if (!visits) {

        visits = 1;

    }
    else {

        visits =
            Number(visits) + 1;

    }


    localStorage.setItem(
        key,
        String(visits)
    );


    const analytics = {

        page:
            window.location.pathname,

        visits:
            visits,

        time:
            new Date().toISOString(),

        browser:
            navigator.userAgent

    };


    localStorage.setItem(
        "pace_analytics",
        JSON.stringify(
            analytics
        )
    );


    console.log(
        "Portfolio Analytics:",
        analytics
    );

}


/* =========================================================
   17. PAGE LOADER
   ========================================================= */

function initLoader() {

    const loader = $(
        PORTFOLIO_CONFIG
            .selectors
            .pageLoader
    );


    if (!loader) {

        return;

    }


    window.addEventListener(
        "load",
        () => {

            setTimeout(
                () => {

                    loader.classList.add(
                        "hide"
                    );

                },
                500
            );

        }
    );

}


/* =========================================================
   18. NUMBER COUNTER
   ========================================================= */

function animateNumber(
    element,
    target
) {

    if (!element) {

        return;

    }


    const duration = 1000;

    const startTime =
        performance.now();


    function update(currentTime) {

        const elapsed =
            currentTime -
            startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const current =
            Math.floor(
                eased * target
            );


        element.textContent =
            current;


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        }
        else {

            element.textContent =
                target;

        }

    }


    requestAnimationFrame(
        update
    );

}


function initCounters() {

    const counters =
        document.querySelectorAll(
            "[data-count]"
        );


    counters.forEach(
        counter => {

            const value =
                Number(
                    counter.dataset.count
                );


            if (
                Number.isFinite(value)
            ) {

                animateNumber(
                    counter,
                    value
                );

            }

        }
    );

}


/* =========================================================
   19. SITE SEARCH SYSTEM
   ========================================================= */

function initSearch() {

    const search = $(
        PORTFOLIO_CONFIG
            .selectors
            .searchInput
    );


    if (!search) {

        return;

    }


    const items =
        document.querySelectorAll(
            "h1, h2, h3, p, a"
        );


    search.addEventListener(
        "input",
        () => {

            const keyword =
                search.value
                    .trim()
                    .toLowerCase();


            items.forEach(
                item => {

                    item.classList.remove(
                        "search-highlight"
                    );


                    if (
                        keyword &&
                        item.textContent
                            .toLowerCase()
                            .includes(keyword)
                    ) {

                        item.classList.add(
                            "search-highlight"
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
   20. WINDOW VISIBILITY SUPPORT
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.visibilityState ===
            "visible"
        ) {

            document.title =
                "Pace Lan | Student Developer";

        }

    }
);


/* =========================================================
   21. FINAL STATUS
   ========================================================= */

console.log(
    "PACE LAN PORTFOLIO V6.0 — FINAL JAVASCRIPT READY"
);