import type { GameData, CollectionData } from "@/lib/types";

// Tool definitions for Gemini
export const TOOL_DEFINITIONS = [
    {
        name: "search_games",
        description:
            "Search the RMGP games database. Use this when users ask about games, want to find games by criteria, or ask questions that require looking up game information. Returns matching games with their details.",
        parameters: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "Search term to match against game titles, descriptions, or developers",
                },
                year: {
                    type: "string",
                    description: "Filter by year (e.g., '1998' or '2005')",
                },
                genre: {
                    type: "string",
                    description: "Filter by genre (e.g., 'Puzzle', 'Action', 'Mobile', 'Handheld Console')",
                },
                hardware: {
                    type: "string",
                    description: "Filter by hardware type (e.g., 'Cell Phone', 'Game Boy', 'Handheld Console')",
                },
                developer: {
                    type: "string",
                    description: "Filter by developer/company name (e.g., 'Nintendo', 'Nokia', 'Sega')",
                },
                limit: {
                    type: "number",
                    description: "Maximum number of results to return (default: 5, max: 10)",
                },
            },
            required: [],
        },
    },
    {
        name: "search_collections",
        description:
            "Search the RMGP physical collection of devices, consoles, and phones. Use this when users ask about hardware, devices, consoles, or physical items in the collection.",
        parameters: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "Search term to match against item names, makers, or descriptions",
                },
                category: {
                    type: "string",
                    enum: ["console", "proprietary", "phone", "game"],
                    description: "Filter by category type",
                },
                maker: {
                    type: "string",
                    description: "Filter by manufacturer (e.g., 'Nintendo', 'Sega', 'Nokia')",
                },
                year: {
                    type: "string",
                    description: "Filter by year",
                },
                limit: {
                    type: "number",
                    description: "Maximum number of results to return (default: 5, max: 10)",
                },
            },
            required: [],
        },
    },
    {
        name: "get_website_info",
        description:
            "Get information about RMGP website pages including FAQ answers, team/about info, contact details, research publications, news, and educational resources. Use this when users ask about the project, team, how to contact, research papers, or have general questions about RMGP.",
        parameters: {
            type: "object",
            properties: {
                topic: {
                    type: "string",
                    enum: ["faq", "about", "team", "contact", "research", "news", "education"],
                    description: "The topic area to get information about",
                },
                question: {
                    type: "string",
                    description: "Optional: specific question to find in FAQ, or subtopic to focus on",
                },
            },
            required: ["topic"],
        },
    },
];

// Page URLs for linking
const PAGE_URLS = {
    games: "/games",
    collections: "/collections",
    research: "/research",
    videoSeries: "/research/what-is-mobile-game",
    about: "/about",
    contact: "/contact",
    news: "/news",
    education: "/education",
    faq: "/faq",
    play: "/play",
    timeline: "/timeline",
};

// Static website content
const WEBSITE_CONTENT = {
    news: {
        featured: {
            title: "Northeastern University Launches Game Preservation Database",
            date: "April 1, 2025",
            summary: "Center for Transformative Media at Northeastern launched a database for mobile gaming history (1975-2008). The database provides researchers, developers, and enthusiasts with a comprehensive resource for understanding the evolution of mobile games.",
            externalUrl: "https://news.northeastern.edu/2025/04/01/game-preservation-database/",
        },
        updates: "The project posts updates on their social media channels and website. Check back regularly for new additions to the database and collection.",
        pageUrl: PAGE_URLS.news,
    },

    research: {
        papers: [
            {
                title: "Software Presentation: The Retro Mobile Gaming Database",
                authors: "de Souza e Silva, A., & Glover-Rijkse, R.",
                journal: "Mobile Media & Communication, 11(3), 566-571",
                year: "2023",
                url: "https://journals.sagepub.com/doi/10.1177/20501579231155534",
            },
            {
                title: "The Retro Mobile Gaming Database",
                authors: "de Souza e Silva, A., by Hannah Trammell",
                journal: "Reviews in Digital Humanities",
                year: "2023",
                url: "https://reviewsindh.pubpub.org/pub/the-retro-mobile-gaming-database/release/1",
            },
            {
                title: "Playful Urban Spaces: A Historical Approach to Mobile Games",
                authors: "de Souza e Silva, A., & Hjorth, L.",
                journal: "Simulation & Gaming, 40(5), 602-625",
                year: "2009",
                url: "https://journals.sagepub.com/doi/10.1177/1046878109333723",
            },
            {
                title: "Mobile Game Studies - A Reappraisal",
                authors: "de Souza e Silva, A.",
                journal: "Routledge Companion to Mobile Media, 209-218",
                year: "2014",
                url: "https://www.routledge.com/The-Routledge-Companion-to-Mobile-Media/Goggin-Hjorth/p/book/9780415809474",
            },
            {
                title: "From Cyber to Hybrid: Mobile Technologies as Interfaces of Hybrid Spaces",
                authors: "de Souza e Silva, A.",
                journal: "Space and Culture, 9(3), 261-278",
                year: "2006",
                url: "https://journals.sagepub.com/doi/10.1177/1206331206289022",
            },
        ],
        videoSeries: {
            title: "What's a Mobile Game?",
            description: "A video series featuring interviews with 6 scholars discussing the definition and evolution of mobile games.",
            url: PAGE_URLS.videoSeries,
        },
        pageUrl: PAGE_URLS.research,
    },

    team: {
        directors: [
            {
                name: "Adriana de Souza e Silva",
                role: "Project Director",
                title: "Professor of Communication Studies, Director of Center for Transformative Media at Northeastern University",
                research: "Mobile and locative media, urban mobility, public spaces, developing world",
                url: "https://camd.northeastern.edu/people/adriana-de-souza-e-silva/",
            },
            {
                name: "Ragan Glover",
                role: "Project Director",
                title: "Director of Michigan Research and Discovery Scholars at University of Michigan",
                research: "Sociocultural impact of mobile and immersive media",
                url: "https://lsa.umich.edu/mrads/people/Leadership-Team/ragan-glover.html",
            },
            {
                name: "Logan Brown",
                role: "Historian and Preservation Specialist",
                title: "Media historian and educator",
                research: "Power and capital in video game history, early American mobile games industry",
                url: "https://www.loganbrown.info",
            },
        ],
        researchAssistants: [
            {
                name: "Arslan Parkar",
                title: "MS in Information Systems, Northeastern",
                background: "AI-driven startup experience, user-centric research",
            },
            {
                name: "Kannan Karthikeyan",
                title: "Software Engineering Graduate Student, Northeastern",
                background: "Gaming passion with technical expertise",
            },
            {
                name: "Yahan (Fiona) Wu",
                title: "Dean's Honors Fellow, BS Computer Science and Media Arts, Northeastern",
                background: "Technical and creative skills",
            },
        ],
        pageUrl: PAGE_URLS.about,
    },

    about: {
        mission: "To preserve the history of mobile gaming and provide researchers, developers, and enthusiasts with a comprehensive resource for understanding the evolution of mobile games from 1975 to 2008.",
        scope: "Games and devices from 1975 to 2008, including handheld consoles, early mobile phones, and portable gaming devices.",
        features: [
            "Searchable database with multiple search criteria",
            "Physical collection of gaming devices, cartridges, and memorabilia",
            "Educational resources for researchers and students",
            "Academic publications and video series",
        ],
        location: "Center for Transformative Media at Northeastern University",
        pageUrl: PAGE_URLS.about,
        relatedPages: {
            games: PAGE_URLS.games,
            collections: PAGE_URLS.collections,
            research: PAGE_URLS.research,
            play: PAGE_URLS.play,
            timeline: PAGE_URLS.timeline,
        },
    },

    contact: {
        emails: [
            { address: "TransformativeMedia@northeastern.edu", purpose: "Primary contact" },
            { address: "jashu.s@northeastern.edu", purpose: "Secondary contact" },
        ],
        socialMedia: ["Facebook", "Twitter/X", "Instagram", "LinkedIn"],
        contactForm: "Available on the Contact page with fields for name, email, subject, and message.",
        pageUrl: PAGE_URLS.contact,
    },

    education: {
        resources: [
            {
                title: "Media History Assignment: Retro Mobile Gaming Database Entry",
                description: "Assignment for students to research and contribute to the database",
                status: "Coming Soon",
                url: "/education/assignments",
            },
            {
                title: "Guidelines for Internet Archival Research",
                description: "Strategies for researching mobile game history using digital archives",
                status: "Coming Soon",
                url: "/education/research-techniques",
            },
        ],
        forEducators: "Educators can use RMGP materials in classrooms with attribution. Contact the team to contribute educational resources.",
        pageUrl: PAGE_URLS.education,
    },

    faq: {
        questions: [
            { q: "What time period does the database cover?", a: "1975 to 2008." },
            { q: "What types of games are in the database?", a: "Handheld consoles, early mobile phones, and portable gaming devices." },
            { q: "How do I search the database?", a: "Use multiple criteria including title, year, platform, developer, and genre on the Games page." },
            { q: "Are international games included?", a: "Yes, the database has a global scope." },
            { q: "Will you expand beyond 2008?", a: "Currently the focus is on 1975-2008." },
            { q: "What counts as 'mobile'?", a: "Portable devices including handheld consoles and mobile phones." },
            { q: "How is RMGP different from other archives?", a: "RMGP focuses exclusively on mobile/portable gaming from 1975-2008 and combines a database, physical collection, and educational resources." },
            { q: "How accurate is the information?", a: "Team-reviewed, based on archival research and verified sources." },
            { q: "Can I play the original games?", a: "Select recreations are provided (e.g., Snake, Tetris, Pong, Tic-Tac-Toe) for demonstration purposes." },
            { q: "Where is the physical collection located?", a: "Center for Transformative Media at Northeastern University." },
            { q: "Can I visit the collection in person?", a: "Yes, for research purposes. Contact the team in advance to arrange a visit." },
            { q: "How are items preserved?", a: "Cataloged, stored in archival conditions, and digitized when possible." },
            { q: "What educational resources are available?", a: "Assignments, teaching guides, and archival research tips." },
            { q: "Can I use materials in my classroom?", a: "Yes, with attribution to RMGP." },
            { q: "Who can contribute to the project?", a: "Scholars, developers, students, and enthusiasts are all welcome to contribute." },
            { q: "Are donations tax-deductible?", a: "No, RMGP is a multi-institution research project, not a nonprofit." },
            { q: "How do I submit corrections?", a: "Use the contact form on the Contact page." },
            { q: "Who manages the project?", a: "Center for Transformative Media at Northeastern University, in collaboration with multiple institutions." },
            { q: "Do I need an account to use the database?", a: "No, the database is freely accessible without an account." },
            { q: "Can I download materials?", a: "Viewing is available online; full downloads are restricted for some materials." },
            { q: "What can I donate?", a: "Handheld consoles, mobile phones, cartridges, manuals, and packaging from 1975-2008." },
            { q: "Is the database free?", a: "Yes, it's free and publicly accessible online." },
            { q: "How can enthusiasts get involved?", a: "Contribute knowledge, suggest corrections, donate items, or share memories via the contact form." },
        ],
        pageUrl: PAGE_URLS.faq,
    },
};

// Fetch all games from the API
async function fetchAllGames(baseUrl: string): Promise<GameData[]> {
    try {
        const response = await fetch(`${baseUrl}/api/games`);
        if (!response.ok) throw new Error("Failed to fetch games");
        return await response.json();
    } catch (error) {
        console.error("Error fetching games:", error);
        return [];
    }
}

// Fetch all collections from the API
async function fetchAllCollections(baseUrl: string): Promise<CollectionData[]> {
    try {
        const response = await fetch(`${baseUrl}/api/collections`);
        if (!response.ok) throw new Error("Failed to fetch collections");
        return await response.json();
    } catch (error) {
        console.error("Error fetching collections:", error);
        return [];
    }
}

// Search games with filters
export async function searchGames(
    baseUrl: string,
    params: {
        query?: string;
        year?: string;
        genre?: string;
        hardware?: string;
        developer?: string;
        limit?: number;
    }
): Promise<{ results: GameData[]; total: number }> {
    const games = await fetchAllGames(baseUrl);
    const limit = Math.min(params.limit || 5, 10);

    let filtered = games.filter((game) => {
        if (params.query) {
            const q = params.query.toLowerCase();
            const matchesQuery =
                game.Title?.toLowerCase().includes(q) ||
                game.Description?.toLowerCase().includes(q) ||
                game.Developers?.toLowerCase().includes(q) ||
                game.Genre?.toLowerCase().includes(q);
            if (!matchesQuery) return false;
        }

        if (params.year && game.Year !== params.year) return false;

        if (params.genre) {
            const genreMatch = game.Genre?.toLowerCase().includes(params.genre.toLowerCase());
            if (!genreMatch) return false;
        }

        if (params.hardware) {
            const hardwareMatch = game.Hardware?.toLowerCase().includes(params.hardware.toLowerCase());
            if (!hardwareMatch) return false;
        }

        if (params.developer) {
            const devMatch = game.Developers?.toLowerCase().includes(params.developer.toLowerCase());
            if (!devMatch) return false;
        }

        return true;
    });

    return {
        results: filtered.slice(0, limit),
        total: filtered.length,
    };
}

// Search collections with filters
export async function searchCollections(
    baseUrl: string,
    params: {
        query?: string;
        category?: string;
        maker?: string;
        year?: string;
        limit?: number;
    }
): Promise<{ results: CollectionData[]; total: number }> {
    const collections = await fetchAllCollections(baseUrl);
    const limit = Math.min(params.limit || 5, 10);

    let filtered = collections.filter((item) => {
        if (params.query) {
            const q = params.query.toLowerCase();
            const matchesQuery =
                item.name?.toLowerCase().includes(q) ||
                item.description?.toLowerCase().includes(q) ||
                item.maker?.toLowerCase().includes(q);
            if (!matchesQuery) return false;
        }

        if (params.category && item.category?.toLowerCase() !== params.category.toLowerCase()) {
            return false;
        }

        if (params.maker) {
            const makerMatch = item.maker?.toLowerCase().includes(params.maker.toLowerCase());
            if (!makerMatch) return false;
        }

        if (params.year && item.year !== params.year) return false;

        return true;
    });

    return {
        results: filtered.slice(0, limit),
        total: filtered.length,
    };
}

// Get website information
function getWebsiteInfo(topic: string, question?: string): string {
    switch (topic) {
        case "faq": {
            if (question) {
                const q = question.toLowerCase();
                const match = WEBSITE_CONTENT.faq.questions.find(
                    (faq) => faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q)
                );
                if (match) {
                    return JSON.stringify({
                        question: match.q,
                        answer: match.a,
                        pageUrl: WEBSITE_CONTENT.faq.pageUrl,
                    });
                }
                return JSON.stringify({
                    message: "No exact FAQ match found. Here are all FAQs:",
                    faqs: WEBSITE_CONTENT.faq.questions,
                    pageUrl: WEBSITE_CONTENT.faq.pageUrl,
                });
            }
            return JSON.stringify({
                faqs: WEBSITE_CONTENT.faq.questions,
                pageUrl: WEBSITE_CONTENT.faq.pageUrl,
            });
        }

        case "about":
            return JSON.stringify(WEBSITE_CONTENT.about);

        case "team":
            return JSON.stringify(WEBSITE_CONTENT.team);

        case "contact":
            return JSON.stringify(WEBSITE_CONTENT.contact);

        case "research":
            return JSON.stringify(WEBSITE_CONTENT.research);

        case "news":
            return JSON.stringify(WEBSITE_CONTENT.news);

        case "education":
            return JSON.stringify(WEBSITE_CONTENT.education);

        default:
            return JSON.stringify({ error: "Unknown topic" });
    }
}

// Execute a tool call
export async function executeTool(
    toolName: string,
    args: Record<string, any>,
    baseUrl: string
): Promise<string> {
    try {
        switch (toolName) {
            case "search_games": {
                const { results, total } = await searchGames(baseUrl, args);
                if (results.length === 0) {
                    return JSON.stringify({
                        message: "No games found matching your criteria.",
                        total: 0,
                        pageUrl: PAGE_URLS.games,
                    });
                }
                return JSON.stringify({
                    message: `Found ${total} game(s). Showing ${results.length}:`,
                    total,
                    games: results.map((g) => ({
                        title: g.Title,
                        year: g.Year,
                        developer: g.Developers,
                        genre: g.Genre,
                        hardware: g.Hardware,
                        description: g.Description?.substring(0, 200) + (g.Description?.length > 200 ? "..." : ""),
                        players: g["# Players"],
                    })),
                    pageUrl: PAGE_URLS.games,
                });
            }

            case "search_collections": {
                const { results, total } = await searchCollections(baseUrl, args);
                if (results.length === 0) {
                    return JSON.stringify({
                        message: "No collection items found matching your criteria.",
                        total: 0,
                        pageUrl: PAGE_URLS.collections,
                    });
                }
                return JSON.stringify({
                    message: `Found ${total} item(s) in the collection. Showing ${results.length}:`,
                    total,
                    items: results.map((c) => ({
                        name: c.name,
                        maker: c.maker,
                        year: c.year,
                        category: c.category,
                        description: c.description,
                    })),
                    pageUrl: PAGE_URLS.collections,
                });
            }

            case "get_website_info": {
                return getWebsiteInfo(args.topic, args.question);
            }

            default:
                return JSON.stringify({ error: `Unknown tool: ${toolName}` });
        }
    } catch (error) {
        console.error(`Error executing tool ${toolName}:`, error);
        return JSON.stringify({ error: "Failed to execute tool" });
    }
}