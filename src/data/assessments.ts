export type FhcQuestion = {
  id: number;
  p: number;
  t: string;
  o: string[];
  na?: string;
  flag?: { rank: number; label: string };
  step: string;
};

export const FHC_PILLARS = [
  { id: 0, name: "Clarity", w: 1.3, tie: 4 },
  { id: 1, name: "Safety net", w: 1.5, tie: 6 },
  { id: 2, name: "Debt & obligations", w: 1.4, tie: 5 },
  { id: 3, name: "Growth", w: 0.9, tie: 1 },
  { id: 4, name: "Future & protection", w: 1.1, tie: 3 },
  { id: 5, name: "Agency", w: 1, tie: 2 },
];

export const FHC_LEVELS: [number, string, string][] = [
  [
    0,
    "The Starting Line",
    "Every gap on this page has a fix, and none of them requires you to earn more before you start. Your answers show which ones to take first, and the order matters.",
  ],
  [
    0.28,
    "Working Hard, Building Slowly",
    "Your income is doing the work, but your money is not yet organised to do its part. Your answers point to the structure that is missing.",
  ],
  [
    0.55,
    "Real Effort, Visible Gaps",
    "You are clearly doing real things with your money. What your answers show is that some of that effort is not being held in place by structure, so the results are uneven rather than absent. See those area below.",
  ],
  [
    0.8,
    "Strong Foundations",
    "Your structure is working. The gaps left are refinements rather than foundations: placement, cover levels, and the documents that make everything else transferable. Those are the areas worth a deliberate look this year.",
  ],
];

export const FHC_Q: FhcQuestion[] = [
  {
    id: 1,
    p: 0,
    t: "Do you know what you earned last year — salary, bonuses, dividends, rental income, every source?",
    o: [
      "Yes — I know the exact figure",
      "I know my salary. The rest I'd have to check",
      "I am uncertain of my total income including my salary",
      "I'd have to look it all up",
    ],
    step: "Before this week ends, list every source that put money in your hands last year — salary, dividends, rent, any side income — and add it all up. You cannot build a plan from a number you do not know.",
  },
  {
    id: 2,
    p: 0,
    t: "Do you have a written spending plan you actually use?",
    o: [
      "Yes — every naira has a job before the month starts",
      "I have one, but I drift from it by mid-month",
      "I made one once. It is somewhere.",
      "No — I spend, then see what is left",
    ],
    step: "Before the new month starts, write one page: every naira given a job across your essentials, obligations, savings and lifestyle. It does not have to be perfect. It has to exist.",
  },
  {
    id: 3,
    p: 0,
    t: "Do you know your net worth — everything you own (pension and gratuity included), minus everything you owe?",
    o: [
      "Yes, and I track how it moves over time",
      "I have a rough idea",
      "I have never calculated it, but I could",
      "I am not sure what would even count",
    ],
    step: "List what you own — pension included. List what you owe. The difference between the two is your net worth. Estimates are fine for now.",
  },
  {
    id: 4,
    p: 1,
    t: "If your income stopped today, how long could you cover your essential expenses?",
    o: [
      "Six months or more",
      "Three to six months",
      "About one month",
      "I would need help within weeks",
    ],
    flag: { rank: 1, label: "Weeks from needing help" },
    step: "Open a separate account this week and move one week of essentials into it, then repeat every payday. Small amounts are fine, because the habit is what you are building first.",
  },
  {
    id: 5,
    p: 1,
    t: "Where does your emergency money live?",
    o: [
      "In a separate account I do not touch — and it earns something while it waits",
      "In a separate account… that I dip into sometimes",
      "Mixed in with my everyday spending account",
      "I do not have emergency money yet",
    ],
    step: "Open a dedicated account this week, separate from your spending account and not linked to your debit card. Transfer the first amount in, however small.",
  },
  {
    id: 6,
    p: 1,
    t: "If you, your children, your spouse, your parents, and other dependents all needed hospital care this month — how well is everyone covered?",
    o: [
      "All of us are covered — I have health cover, and I know exactly what it includes",
      "I am covered, but some who depend on me are not on any plan",
      "I have some coverage, but I have never checked who it includes",
      "We pay from our own pocket — no health cover in place",
    ],
    flag: { rank: 2, label: "No health cover" },
    step: "Get quotes from at least two HMOs this week. A single hospital admission can cost more than most people hold in savings, and cover is the cheapest way to cap that.",
  },
  {
    id: 7,
    p: 2,
    t: "Do you have debt — loans, credit cards, buy-now-pay-later, money owed to people?",
    o: [
      "I have no debt, or only debt that is part of a deliberate plan",
      "I have some, with a clear payoff plan I am following",
      "I have some, with no real plan",
      "I have debt I avoid looking at directly",
    ],
    flag: { rank: 4, label: "Debt being avoided" },
    step: "Write down every debt on one page: the balance, the interest rate, and what leaves your account each month. You may find the total is smaller than the version you were carrying in your head.",
  },
  {
    id: 8,
    p: 2,
    t: "How planned is the money you give to family and community?",
    o: [
      "Budgeted — a set amount, decided in advance",
      "I give regularly, but it is not a fixed plan",
      "It is unpredictable, and it often strains my month",
      "It quietly takes whatever it takes",
    ],
    step: "Total what family support and black tax actually cost you over the last three months. Set a fixed monthly amount plus a small buffer for genuine emergencies, and give from that rather than from whatever is in the account.",
  },
  {
    id: 9,
    p: 2,
    t: "In the past year, have you borrowed or used your savings to fund a normal month? Not an emergency. Just life.",
    o: [
      "No",
      "Once or twice, a while back",
      "A few times this past year",
      "Most months, if I am being truthful with myself",
    ],
    flag: { rank: 3, label: "Borrowing to fund normal months" },
    step: "Track the next month’s expenses closely. Find the gap between income and lifestyle.",
  },
  {
    id: 10,
    p: 3,
    t: "When salary lands, what happens first?",
    o: [
      "A fixed amount moves out automatically — savings and investments are paid before anyone else",
      "I move money to savings myself, most months",
      "I save whatever is left, when something is left",
      "Saving has not been possible lately",
    ],
    step: "Set one standing order: a fixed amount that leaves your account the day after payday, before life starts spending. Decide once. Let the system repeat it.",
  },
  {
    id: 11,
    p: 3,
    t: "Beyond savings — is any of your money invested? Treasury bills, money market funds, stocks, anything working on your behalf?",
    o: [
      "Yes — in more than one place, and I understand each one",
      "Yes — I have one or two investments",
      "I keep meaning to start",
      "Investing has felt like something other people do",
    ],
    step: "Open one investment account this month with a SEC-registered fund manager, and fund it with an amount you can repeat. A money market fund is a reasonable starting point, as your money stays accessible while you learn how the account behaves.",
  },
  {
    id: 12,
    p: 4,
    t: "The big goals with a date on them — your children’s education, a home, vacations, a named milestone — how are they funded?",
    o: [
      "Each goal has its own fund — a target amount, a deadline, a monthly contribution",
      "I am saving toward them, but everything sits in one general pot",
      "They are on my mind, but nothing is set aside yet",
      "When the bill comes, I will find the money. I always do.",
    ],
    step: "Pick the nearest dated goal. Give it a number, a deadline and its own fund — then start funding monthly.",
  },
  {
    id: 13,
    p: 4,
    t: "Beyond any mandatory pension — are you building toward the life you want at retirement?",
    o: [
      "Yes — I know my target number and I am funding it",
      "I put extra aside, but without a clear target",
      "Only the mandatory pension",
      "I have not let myself think about it",
    ],
    flag: { rank: 7, label: "Retirement unaddressed" },
    step: "Confirm your RSA balance this week. Then name the income you want in retirement. The distance between those two numbers is the plan.",
  },
  {
    id: 14,
    p: 4,
    t: "If something happened to you tomorrow, would the people you love know what you have, and how to reach it?",
    o: [
      "Yes — it is documented, with a will or clear written instructions",
      "Partially — someone knows some of it",
      "It is all in my head",
      "I have never thought about this",
    ],
    flag: { rank: 6, label: "No estate instructions" },
    step: "Write one letter of instruction: what exists, where it is, who to call. Then work on your will and the named beneficiaries within 30 days.",
  },
  {
    id: 15,
    p: 4,
    t: "Do you have life cover, or other income protection for the people who depend on your income?",
    o: [
      "In place, and reviewed within the last two years",
      "In place, but probably not enough",
      "I have looked into it, but not acted",
      "Nothing yet",
    ],
    na: "Not applicable — no one depends on my income at this time",
    flag: { rank: 5, label: "No protection in place" },
    step: "Get life insurance quotes from three insurers this week. Cover is priced on your age and health at the point you buy it, so the same policy costs more every year you delay.",
  },
  {
    id: 16,
    p: 5,
    t: "When a major money decision lands on your table, you…",
    o: [
      "Decide from a written plan and/or my own understanding",
      "Decide confidently, though not from a formal plan",
      "Ask around, and hope the advice is good",
      "Postpone it — deciding feels heavy",
    ],
    step: "Name the one money decision you have been postponing. Set a deadline for it and decide using your numbers, not from pressure.",
  },
  {
    id: 17,
    p: 5,
    t: "How visible are you in your own financial life?",
    o: [
      "I know what is mine, I control it, and my name is on it",
      "I am involved, but someone else drives the big decisions",
      "I contribute, but I could not list what exists or where",
      "I have stepped back from money matters almost entirely",
    ],
    flag: { rank: 8, label: "Stepped back from your own money" },
    step: "Re-enter one piece of your financial life this week: one account or asset, in your name, checked and understood by you.",
  },
  {
    id: 18,
    p: 5,
    t: "Money between you and your partner — how much of the full picture can you see?",
    o: [
      "We both see everything — incomes, assets, debts — and the big decisions are made together",
      "I see most of it, but some parts are not discussed",
      "I know my own side only",
      "Money is not something we can discuss openly",
    ],
    na: "Not applicable — I am not in a marriage or financial partnership",
    step: "Book one calm money conversation: what comes in, what goes out, what exists. One honest sentence opens it.",
  },
];

export const RP_DIMS = [
  {
    name: "Risk tolerance",
    max: 9,
    w: 0.30,
    labs: ["Cautious", "Measured", "Bold"], // [low, mid, high]
  },
  {
    name: "Risk capacity",
    max: 12,
    w: 0.35,
    labs: ["Fragile", "Stable", "Strong"],
  },
  {
    name: "Investing experience",
    max: 9,
    w: 0.15,
    labs: ["New", "Developing", "Experienced"],
  },
  {
    name: "Return expectations",
    max: 6,
    w: 0.20,
    labs: ["Safety-first", "Inflation-beating", "Growth-seeking"],
  },
];

export type RpQuestion = { d: number; t: string; o: string[] };

/**
 * Option order is fixed: boldest first (scores 3), most cautious last (scores 0).
 * Never reorder these. Score by position (3, 2, 1, 0), not by matching label text.
 */
export const RP_Q: RpQuestion[] = [
  // ---- Risk tolerance (Q1–Q3) ----
  {
    d: 0,
    t: "Imagine you invested ₦1,000,000 and within three months it had fallen to ₦800,000. Your honest first instinct would be to...",
    o: [
      "Buy more while it is cheaper — this is the opportunity I was waiting for",
      "Hold, and wait for it to recover — I understand markets move",
      "Feel uneasy, and seriously consider moving what is left to safety",
      "Sell to stop the bleeding — I could not sleep watching it fall",
    ],
  },
  {
    d: 0,
    t: "Which statement sounds most like you?",
    o: [
      "I would rather aim high and accept some sleepless nights for a bigger reward",
      "I want growth, but only if I can mostly sleep at night",
      "I prefer steady and predictable, even if it grows slowly",
      "I would rather my money never fall in value, full stop",
    ],
  },
  {
    d: 0,
    t: "A friend tells you about an investment that could double in three years — or lose half. You...",
    o: [
      "Are intrigued, and would put in money I can afford to lose",
      "Would consider a small amount, after my own research",
      "Would feel the pull, but most likely pass",
      "Want nothing to do with it — that is gambling, not investing",
    ],
  },

  // ---- Risk capacity (Q4–Q7) ----
  {
    d: 1,
    t: "If an investment lost a third of its value and stayed down for two years, your day-to-day life would...",
    o: [
      "Be entirely unaffected — that money is not needed for years",
      "Feel it slightly, but my essentials would still be covered",
      "Be strained — I would have to adjust how I live",
      "Be in real trouble — I depend on that money",
    ],
  },
  {
    d: 1,
    t: "Beyond what you might invest, how solid is your financial base — emergency fund, stable income, manageable debt?",
    o: [
      "Very solid — strong emergency fund, secure income, little or no debt",
      "Reasonably solid — a cushion exists, income is fairly stable, and debt is manageable",
      "Thin — little cushion, or income that comes and goes, or debt repayment is a strain",
      "Fragile — no real cushion, and money is tight most months",
    ],
  },
  {
    d: 1,
    t: "How much of the money you are thinking of investing might you need to reach within the next two years?",
    o: [
      "None of it",
      "A small amount — under 25%",
      "Possibly close to 50%",
      "More than half — possibly all of it could be needed soon",
    ],
  },
  {
    d: 1,
    t: "If you lost your main income tomorrow, how long could you hold on without selling your investments?",
    o: [
      "A year or more — I have emergency funds and other sources of income",
      "Several months — enough to ride out most storms",
      "A month or two at best",
      "I would have to sell almost immediately",
    ],
  },

  // ---- Investing experience (Q8–Q10) ----
  {
    d: 2,
    t: "How would you describe your experience with investing so far?",
    o: [
      "Experienced — I have held investments (stocks, funds, property etc.) through ups and downs",
      "Some — I have invested in a few things and broadly understand how they work",
      "Little — mostly savings, treasury bills; I have not ventured much beyond that",
      "None yet — this would be new ground for me",
    ],
  },
  {
    d: 2,
    t: "When you hear that an investment is 'higher risk', what does that mean to you?",
    o: [
      "Higher potential return, with a real and understood chance of loss along the way",
      "It could grow more, and it could also fall — I understand this and can handle it to an extent",
      "It sounds dangerous, though I am not fully sure why",
      "I am not certain what that means in practice",
    ],
  },
  {
    d: 2,
    t: "How comfortable are you telling the difference between a money market fund, a stock, and a real estate investment?",
    o: [
      "Very — I understand how each behaves and why",
      "Fairly — I know the broad differences",
      "A little — I have heard the terms but could not explain them well",
      "Not at all — these are mostly just words to me right now",
    ],
  },

  // ---- Return expectations (Q11–Q12) ----
  {
    d: 3,
    t: "What is the main job you want this money to do?",
    o: [
      "Grow as much as possible over the long run — I am building wealth",
      "Grow steadily, ahead of inflation, without wild swings",
      "Hold its value and earn a little, safely",
      "Stay completely safe and available whenever I need it",
    ],
  },
  {
    d: 3,
    t: "Which return would you be most satisfied with, knowing higher return means higher risk?",
    o: [
      "Well above inflation — I want my money to grow significantly, and I accept some losing years",
      "At or above inflation — I want my money to at least hold its real value",
      "A modest positive return — stability matters more than beating prices",
      "My principal guaranteed — I will accept lower returns for certainty",
    ],
  },
];

/**
 * Profile names and paragraphs (PDF §8.1). Order: Level 1 → 3.
 */
export const RP_LEVELS = [
  {
    name: "Conservative",
    blurb:
      "Your instinct is to protect first and grow second, and that is a legitimate way to invest. You feel a loss more than you enjoy a gain, and your financial base may not yet be ready to absorb a steep fall. The work here is not to make yourself braver. It is to build the cushion and the understanding that would make more risk appropriate later, if you decide you want it.",
  },
  {
    name: "Balanced",
    blurb:
      "You want your money to grow, but not at the cost of your peace. You can sit through reasonable ups and downs, your base can take a knock without breaking, and you understand enough to know what you are signing up for. This is the profile most long-term wealth is built from: enough risk to at least keep pace with inflation, and enough restraint to stay invested when the market falls.",
  },
  {
    name: "Growth",
    blurb:
      "You are comfortable with volatility as the price of long-term reward, and you have the financial base and the understanding to back that comfort up. A fall does not push you out of the market, and you do not need this money soon. One caution: make sure that boldness is spread across several holdings rather than concentrated in one.",
  },
];

/**
 * Alignment notes (PDF §8.2). Indexed by variant:
 * 0 → base higher than capacity (appetite runs ahead)
 * 1 → capacity higher than base (room to grow into)
 * 2 → levels equal
 */
export const RP_ALIGNMENT = [
  "Your appetite for risk runs ahead of what your finances can currently carry. Your profile has been set at the level your base can safely hold, not the level your nerve could tolerate. Build the base, and the room to take more risk will come with it.",
  "Your finances can carry more risk than your appetite currently allows. There is room to take on slightly more over time, at your own pace, as your comfort catches up with your capacity.",
  "Your appetite and your capacity agree, so this profile stands on solid ground.",
];

/**
 * Time and access note (PDF §8.4). Same for every profile.
 */
export const RP_TIME_AND_ACCESS =
  "Whatever your profile, money you will need within three years should not be exposed to market movement. Keep it somewhere it can be reached without selling at a loss, such as a money market fund, treasury bills or a fixed deposit. How soon you need the money matters more than how much risk you can tolerate.";

/**
 * Closing CTA copy (PDF §8.6).
 */
export const RP_CLOSING = {
  heading: "THE NEXT STEP",
  body: "This profile tells you how much risk you can take. A plan helps you decide what to do with it. The Money Simplified Course helps you turn a profile like yours into an allocation, and a system you can run yourself, built for Nigerian money by someone who manages it daily. If the profile you got was lower than the one you expected, your capacity is probably where your gap lies.",
};

export const MP_TYPES = [
  {
    key: "saver",
    name: "The Saver",
    blurb:
      "Security is your language. You hold on — sometimes past the point where holding on serves you. Your growth edge: letting money move with purpose, not just sit in safety.",
  },
  {
    key: "avoider",
    name: "The Avoider",
    blurb:
      "Money conversations drain you, so you postpone them. Your growth edge: small, regular check-ins — five minutes with your numbers beats one dreaded annual reckoning.",
  },
  {
    key: "worrier",
    name: "The Worrier",
    blurb:
      "You think about money constantly — but thinking is not the same as planning. Your growth edge: turning the worry into one written plan the worry can rest on.",
  },
  {
    key: "spender",
    name: "The Spender",
    blurb:
      "Money is for living, and you live. Your growth edge: the 48-hour rule — a pause between wanting and buying that keeps the joy and drops the regret.",
  },
];

export const MP_Q = Array.from({ length: 10 }, (_, i) => ({
  t: `Placeholder question ${i + 1} — final wording to come. Each option maps to one personality type.`,
  o: [
    ["Option A (maps to Saver)", "saver"],
    ["Option B (maps to Avoider)", "avoider"],
    ["Option C (maps to Worrier)", "worrier"],
    ["Option D (maps to Spender)", "spender"],
  ] as [string, string][],
}));
