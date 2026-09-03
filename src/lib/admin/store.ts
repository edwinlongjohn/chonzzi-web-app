// In-memory demo store for the admin dashboard.
// The dashboard is currently a UI prototype: no sign in, no backend writes.





const day = 86_400_000;
const ago = (d: number) => new Date(Date.now() - d * day).toISOString();
const id = () =>
  globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now();

let waitlist: any[] = [
  ["Adaeze Nwosu", "adaeze.nwosu@gmail.com", "+234 803 221 8890", "pending", 1, "I want to stop guessing with my salary."],
  ["Tunde Bakare", "tunde.bakare@outlook.com", "+234 810 447 2201", "contacted", 3, "Runs a small logistics business."],
  ["Chiamaka Obi", "chiamaka.obi@gmail.com", null, "enrolled", 5, "Referred by a friend from church."],
  ["Segun Ajayi", "segun.ajayi@yahoo.com", "+234 706 118 5533", "pending", 6, null],
  ["Halima Yusuf", "halima.yusuf@gmail.com", "+234 902 776 3311", "pending", 8, "New to investing, wants the basics."],
  ["Ifeanyi Eze", "ifeanyi.eze@gmail.com", null, "archived", 12, null],
  ["Ngozi Balogun", "ngozi.balogun@gmail.com", "+234 815 990 4477", "contacted", 14, "Asked about payment plans."],
  ["Emeka Duru", "emeka.duru@gmail.com", null, "enrolled", 18, "Second cohort."],
  ["Funmi Adeleke", "funmi.adeleke@gmail.com", "+234 703 552 8812", "pending", 21, "Wants the family money conversation guide."],
  ["Kelechi Amadi", "kelechi.amadi@gmail.com", null, "pending", 24, null],
  ["Bisi Ogunlana", "bisi.ogunlana@gmail.com", "+234 812 334 9087", "contacted", 27, null],
  ["Zainab Musa", "zainab.musa@gmail.com", null, "pending", 30, "Saw the money personality quiz."],
].map(([full_name, email, phone, status, days, note]) => ({
  id: id(),
  full_name: full_name as string,
  email: email as string,
  phone: phone as string | null,
  note: (note ?? null) as string | null,
  source: "website",
  status: status as any["status"],
  admin_notes: null,
  created_at: ago(days as number),
  updated_at: ago(days as number),
}));

let subscribers: any[] = [
  ["temi.reader@gmail.com", "Temitope Alabi", "active", 2],
  ["joy.okafor@gmail.com", "Joy Okafor", "active", 4],
  ["dami.olu@outlook.com", null, "active", 7],
  ["grace.udo@gmail.com", "Grace Udo", "unsubscribed", 9],
  ["mike.ade@gmail.com", "Mike Adewale", "active", 11],
  ["rita.chuks@gmail.com", "Rita Chukwu", "active", 13],
  ["sam.ojo@yahoo.com", null, "active", 16],
  ["blessing.ibe@gmail.com", "Blessing Ibe", "active", 19],
  ["ken.abiola@gmail.com", "Ken Abiola", "unsubscribed", 22],
  ["oma.nnamdi@gmail.com", "Oma Nnamdi", "active", 26],
  ["yemi.sowo@gmail.com", "Yemi Sowore", "active", 29],
  ["ada.uche@gmail.com", null, "active", 33],
].map(([email, full_name, status, days]) => ({
  id: id(),
  email: email as string,
  full_name: full_name as string | null,
  source: "website",
  status: status as any["status"],
  unsubscribed_at: status === "unsubscribed" ? ago(days as number) : null,
  created_at: ago(days as number),
  updated_at: ago(days as number),
}));

const wait = <T>(value: T) => new Promise<T>((r) => setTimeout(() => r(value), 180));

export const adminStore = {
  listWaitlist: () => wait([...waitlist]),
  updateWaitlist: (rowId: string, patch: Partial<any>) => {
    waitlist = waitlist.map((r) =>
      r.id === rowId ? { ...r, ...patch, updated_at: new Date().toISOString() } : r,
    );
    return wait(true);
  },
  deleteWaitlist: (rowId: string) => {
    waitlist = waitlist.filter((r) => r.id !== rowId);
    return wait(true);
  },
  listSubscribers: () => wait([...subscribers]),
  updateSubscriber: (rowId: string, patch: Partial<any>) => {
    subscribers = subscribers.map((r) =>
      r.id === rowId ? { ...r, ...patch, updated_at: new Date().toISOString() } : r,
    );
    return wait(true);
  },
  deleteSubscriber: (rowId: string) => {
    subscribers = subscribers.filter((r) => r.id !== rowId);
    return wait(true);
  },
  activeSubscriberCount: () => wait(subscribers.filter((s) => s.status === "active").length),
};

/* ---------------------------------- Assessments --------------------------------- */

export type AssessmentAnswer = { question: string; answer: string };
export type AssessmentResult = {
  id: string;
  name: string;
  email: string;
  quiz: "Money Personality" | "Financial Health Check" | "Risk Profile";
  outcome: string;
  score: string;
  created_at: string;
  answers: AssessmentAnswer[];
};

const MPA_ANSWERS: AssessmentAnswer[] = [
  { question: "I know roughly what I spend in a normal month.", answer: "Often true" },
  { question: "I put money aside before I start spending.", answer: "Sometimes true" },
  { question: "Money decisions make me anxious.", answer: "Rarely true" },
  { question: "I like to research before I commit money.", answer: "Always true" },
  { question: "I find it hard to say no to people who ask me for money.", answer: "Sometimes true" },
  { question: "I would rather keep cash than take an investment risk.", answer: "Often true" },
  { question: "I track what I earn from every source.", answer: "Often true" },
  { question: "I have a plan for the next twelve months.", answer: "Sometimes true" },
];

export const assessmentResults: AssessmentResult[] = [
  {
    id: "a1",
    name: "Adaeze Nwosu",
    email: "adaeze.nwosu@gmail.com",
    quiz: "Money Personality",
    outcome: "The Builder with a Guardian streak",
    score: "18 / 20",
    created_at: ago(1),
    answers: MPA_ANSWERS,
  },
  {
    id: "a2",
    name: "Tunde Bakare",
    email: "tunde.bakare@outlook.com",
    quiz: "Financial Health Check",
    outcome: "Steady, with a thin emergency buffer",
    score: "62 / 100",
    created_at: ago(2),
    answers: MPA_ANSWERS.slice(0, 6),
  },
  {
    id: "a3",
    name: "Chiamaka Obi",
    email: "chiamaka.obi@gmail.com",
    quiz: "Risk Profile",
    outcome: "Balanced investor",
    score: "Moderate",
    created_at: ago(4),
    answers: MPA_ANSWERS.slice(2),
  },
  {
    id: "a4",
    name: "Halima Yusuf",
    email: "halima.yusuf@gmail.com",
    quiz: "Money Personality",
    outcome: "The Guardian",
    score: "16 / 20",
    created_at: ago(6),
    answers: MPA_ANSWERS,
  },
  {
    id: "a5",
    name: "Segun Ajayi",
    email: "segun.ajayi@yahoo.com",
    quiz: "Financial Health Check",
    outcome: "Needs a spending plan",
    score: "41 / 100",
    created_at: ago(9),
    answers: MPA_ANSWERS.slice(0, 5),
  },
  {
    id: "a6",
    name: "Ngozi Balogun",
    email: "ngozi.balogun@gmail.com",
    quiz: "Risk Profile",
    outcome: "Cautious saver",
    score: "Low",
    created_at: ago(12),
    answers: MPA_ANSWERS.slice(1, 7),
  },
];

/* ------------------------------------- Blog ------------------------------------- */

export type BlogStatus = "draft" | "published" | "scheduled";
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  status: BlogStatus;
  cover: string | null;
  author: string;
  created_at: string;
  updated_at: string;
  scheduled_publish_at?: string | null;
};

let posts: BlogPost[] = [
  {
    id: id(),
    title: "The money conversation you keep postponing",
    slug: "the-money-conversation-you-keep-postponing",
    excerpt:
      "Most families do not lack money knowledge. They lack a safe way to talk about it out loud.",
    body: "Most families do not lack money knowledge. They lack a safe way to talk about it out loud. Start with one number, one hour, and one honest sentence.",
    category: "Letters",
    status: "published",
    cover: null,
    author: "Temi",
    created_at: ago(3),
    updated_at: ago(3),
  },
  {
    id: id(),
    title: "Why your emergency fund keeps disappearing",
    slug: "why-your-emergency-fund-keeps-disappearing",
    excerpt: "An emergency fund without a rule is just savings waiting for an excuse.",
    body: "An emergency fund without a rule is just savings waiting for an excuse. Give it a name, a home, and a written condition for spending it.",
    category: "Practical",
    status: "published",
    cover: null,
    author: "Temi",
    created_at: ago(10),
    updated_at: ago(8),
  },
  {
    id: id(),
    title: "Naira notes: planning through inflation",
    slug: "naira-notes-planning-through-inflation",
    excerpt: "What to hold, what to move, and what to stop worrying about.",
    body: "Draft in progress.",
    category: "Markets",
    status: "draft",
    cover: null,
    author: "Temi",
    created_at: ago(1),
    updated_at: ago(1),
  },
  {
    id: id(),
    title: "A letter to the first-generation earner",
    slug: "a-letter-to-the-first-generation-earner",
    excerpt: "You are the plan for a lot of people. Here is how to carry that without breaking.",
    body: "Scheduled for the next letter.",
    category: "Letters",
    status: "scheduled",
    cover: null,
    author: "Temi",
    created_at: ago(5),
    updated_at: ago(2),
  },
];

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const blogStore = {
  list: () => wait([...posts]),
  get: (postId: string) => wait(posts.find((p) => p.id === postId) ?? null),
  create: (input: Omit<BlogPost, "id" | "created_at" | "updated_at">) => {
    const now = new Date().toISOString();
    posts = [{ ...input, id: id(), created_at: now, updated_at: now }, ...posts];
    return wait(true);
  },
  update: (postId: string, patch: Partial<BlogPost>) => {
    posts = posts.map((p) =>
      p.id === postId ? { ...p, ...patch, updated_at: new Date().toISOString() } : p,
    );
    return wait(true);
  },
  remove: (postId: string) => {
    posts = posts.filter((p) => p.id !== postId);
    return wait(true);
  },
};

/* ----------------------------------- Settings ----------------------------------- */

export type AdminProfile = {
  full_name: string;
  email: string;
  bio: string;
  avatar_url: string | null;
  notify_waitlist: boolean;
  notify_newsletter: boolean;
  notify_assessments: boolean;
  notify_comments: boolean;
};

let profile: AdminProfile = {
  full_name: "Temi Egenti",
  email: "temi@chonzzi.com",
  bio: "Financial literacy educator. Thirteen years of helping people build calm, capable money lives.",
  avatar_url: null,
  notify_waitlist: true,
  notify_newsletter: true,
  notify_assessments: true,
  notify_comments: false,
};

export const profileStore = {
  get: () => wait({ ...profile }),
  update: (patch: Partial<AdminProfile>) => {
    profile = { ...profile, ...patch };
    return wait(true);
  },
};
