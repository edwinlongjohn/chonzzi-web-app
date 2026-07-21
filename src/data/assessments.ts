export type FhcQuestion = {
  p: number;
  t: string;
  o: [string, number][];
  na?: string;
  flag?: { opt: number; rank: number; label: string; step: string };
  step?: string;
};

export const FHC_PILLARS = [
  {
    id: 0,
    name: "Clarity, knowing your numbers",
    w: 1.3,
  },
  { id: 1, name: "Safety net, surviving a shock", w: 1.5 },
  { id: 2, name: "Debt & obligations, what leaves your hands", w: 1.4 },
  { id: 3, name: "Growth, money making money", w: 0.9 },
  { id: 4, name: "Future & protection, the long view", w: 1.1 },
  { id: 5, name: "Agency, owning your decisions", w: 1.0 },
];

export const FHC_LEVELS: [number, string, string][] = [
  [
    0,
    "The Starting Line",
    "Every gap on this page has a fix, and none of them requires more income. They require structure, and structure can start this week.",
  ],
  [
    0.28,
    "Working Hard, Building Slowly",
    "Your income is doing the work. Your money is not, yet. Nothing in your results says you cannot do this; everything says no one ever handed you the system.",
  ],
  [
    0.55,
    "Real Effort, Visible Gaps",
    "You are doing real things with your money, that much is clear. But effort without complete structure leaves gaps, and gaps are where progress leaks.",
  ],
  [
    0.8,
    "Strong Foundations",
    "Your structure is working. The gaps below are not cracks, they are the finishing touches on a financial life you have clearly built with intention.",
  ],
];

export const FHC_Q: FhcQuestion[] = [
  { p: 0, t: "Do you know what you earned last year, salary, bonuses, dividends, rents, side income, everything?", o: [["Yes, I know the exact figure", 3], ["I know my salary. The rest I'd have to check", 2], ["I am uncertain of my total income including my salary", 1], ["I'd have to look it all up", 0]] },
  { p: 0, t: "Do you have a written spending plan you actually use? A budget by any name.", o: [["Yes, every naira has a job before the month starts", 3], ["I have one, but I drift from it by mid-month", 2], ["I made one once. It is somewhere.", 1], ["No, I spend, then see what is left", 0]] },
  { p: 0, t: "Do you know your net worth, everything you own (pension and gratuity included) minus everything you owe?", o: [["Yes, and I track how it moves over time", 3], ["I have a rough idea", 2], ["I have never calculated it, but I could", 1], ["I am not sure what would even count", 0]] },
  { p: 1, t: "If your income stopped today, how long could you cover your essential expenses?", o: [["Six months or more", 3], ["Three to six months", 2], ["About one month", 1], ["I would need help within weeks", 0]], flag: { opt: 3, rank: 1, label: "Weeks from needing help", step: "Open a separate account this week and move one week of essentials into it. Start there." } },
  { p: 1, t: "Where does your emergency money live?", o: [["In a separate account I do not touch, and it earns something while it waits", 3], ["In a separate account… that I dip into sometimes", 2], ["Mixed in with my everyday spending account", 1], ["I do not have emergency money yet", 0]] },
  { p: 1, t: "If you, your children, your spouse, your parents, and other dependents needed hospital care, who pays?", o: [["All of us are covered, I have health cover, and I know exactly what it includes", 3], ["I am covered, but some who depend on me are not on any plan", 2], ["I have some coverage, but I have never checked who it includes", 1], ["We pay from our own pocket, no health cover in place", 0]], flag: { opt: 3, rank: 2, label: "No health cover", step: "Get quotes from at least two HMOs this week. One hospital admission should not undo years of saving." } },
  { p: 2, t: "Do you have debt, loans, credit cards, buy-now-pay-later, money owed to people?", o: [["I have no debt, or only debt that is part of a deliberate plan", 3], ["I have some, with a clear payoff plan I am following", 2], ["I have some, with no real plan", 1], ["I have debt I avoid looking at directly", 0]], flag: { opt: 3, rank: 4, label: "Debt being avoided", step: "Write it all down, every debt, the balance, the rate, what leaves your account monthly." } },
  { p: 2, t: "How planned is the money you give to family and community?", o: [["Budgeted, a set amount, decided in advance", 3], ["I give regularly, but it is not a fixed plan", 2], ["It is unpredictable, and it often strains my month", 1], ["It quietly takes whatever it takes", 0]] },
  { p: 2, t: "In the past year, have you borrowed or used your savings to fund a normal month?", o: [["No", 3], ["Once or twice, a while back", 2], ["A few times this past year", 1], ["Most months, if I am being truthful with myself", 0]], flag: { opt: 3, rank: 3, label: "Borrowing to fund normal months", step: "Track next month's expenses closely. Find the gap between income and lifestyle, then close it from the lifestyle side first." } },
  { p: 3, t: "When salary lands, what happens first?", o: [["A fixed amount moves out automatically, savings and investments are paid first", 3], ["I move money to savings myself, most months", 2], ["I save whatever is left, when something is left", 1], ["Saving has not been possible lately", 0]] },
  { p: 3, t: "Beyond savings, is any of your money invested? Treasury bills, money market funds, stocks, property…", o: [["Yes, in more than one place, and I understand each one", 3], ["Yes, I have one or two investments", 2], ["I keep meaning to start", 1], ["Investing has felt like something other people do", 0]] },
  { p: 4, t: "The big goals with a date on them, your children's education, a home, a car. How are they funded?", o: [["Each goal has its own fund, a target amount, a deadline, a monthly contribution", 3], ["I am saving toward them, but everything sits in one general pot", 2], ["They are on my mind, but nothing is set aside yet", 1], ["When the bill comes, I will find the money. I always do.", 0]] },
  { p: 4, t: "Beyond any mandatory pension, are you building toward the life you want after work?", o: [["Yes, I know my target number and I am funding it", 3], ["I put extra aside, but without a clear target", 2], ["Only the mandatory pension", 1], ["I have not let myself think about it", 0]], flag: { opt: 3, rank: 7, label: "Retirement unaddressed", step: "Confirm your RSA balance this week. Then name the income you want in retirement, that is your target." } },
  { p: 4, t: "If something happened to you tomorrow, would the people you love know what exists and where?", o: [["Yes, it is documented, with a will or clear written instructions", 3], ["Partially, someone knows some of it", 2], ["It is all in my head", 1], ["I have never thought about this", 0]], flag: { opt: 3, rank: 6, label: "No estate instructions", step: "Write one letter of instruction: what exists, where it is, who to call." } },
  { p: 4, t: "Do you have life cover, or other income protection for the people who depend on your income?", o: [["In place, and reviewed within the last two years", 3], ["In place, but probably not enough", 2], ["I have looked into it, but not acted", 1], ["Nothing yet", 0]], na: "Not applicable, no one depends on my income at this time", flag: { opt: 3, rank: 5, label: "No protection in place", step: "Get life insurance quotes from three insurers this week." } },
  { p: 5, t: "When a major money decision comes (a car or land purchase, a family request, an investment), how do you usually decide?", o: [["Decide from a written plan and/or my own understanding", 3], ["Decide confidently, though not from a formal plan", 2], ["Ask around, and hope the advice is good", 1], ["Postpone it, deciding feels heavy", 0]] },
  { p: 5, t: "How visible are you in your own financial life?", o: [["I know what is mine, I control it, and my name is on it", 3], ["I am involved, but someone else drives the big decisions", 2], ["I contribute, but I could not list what exists or where", 1], ["I have stepped back from money matters almost entirely", 0]], flag: { opt: 3, rank: 8, label: "Stepped back from your own money", step: "Re-enter one piece of your financial life this week: one account, one asset, one decision." } },
  { p: 5, t: "Money between you and your partner, how much of the full picture can you both see?", o: [["We both see everything, incomes, assets, debts, and the big decisions are joint", 3], ["I see most of it, but some parts are not discussed", 2], ["I know my own side only", 1], ["Money is not something we can discuss openly", 0]], na: "Not applicable, I am not in a marriage or financial partnership" },
];

export const RP_DIMS = [
  { name: "Risk tolerance", max: 9, w: 0.3, labs: ["Cautious", "Measured", "Bold"] },
  { name: "Risk capacity", max: 12, w: 0.35, labs: ["Fragile", "Stable", "Strong"] },
  { name: "Investing experience", max: 9, w: 0.15, labs: ["New", "Developing", "Experienced"] },
  { name: "Return expectations", max: 6, w: 0.2, labs: ["Safety-first", "Inflation-beating", "Growth-seeking"] },
];

export type RpQuestion = { d: number; t: string; o: string[] };
export const RP_Q: RpQuestion[] = [
  { d: 0, t: "Imagine you invested ₦1,000,000 and within three months it had fallen to ₦750,000. What would you most likely do?", o: ["Buy more while it is cheaper, this is the opportunity I was waiting for", "Hold, and wait for it to recover, I understand markets move", "Feel uneasy, and seriously consider moving what is left to safety", "Sell to stop the bleeding, I could not sleep watching it fall"] },
  { d: 0, t: "Which statement sounds most like you?", o: ["I would rather aim high and accept some sleepless nights for a bigger outcome", "I want growth, but only if I can mostly sleep at night", "I prefer steady and predictable, even if it grows slowly", "I would rather my money never fall in value, full stop"] },
  { d: 0, t: "A friend tells you about an investment that could double in three years, or lose most of its value. You…", o: ["Are intrigued, and would put in money I can afford to lose", "Would consider a small amount, after my own research", "Would feel the pull, but most likely pass", "Want nothing to do with it, that is gambling, not investing"] },
  { d: 1, t: "If an investment lost a third of its value and stayed down for two years, your daily life would…", o: ["Be entirely unaffected, that money is not needed for years", "Feel it slightly, but my essentials would still be covered", "Be strained, I would have to adjust how I live", "Be in real trouble, I depend on that money"] },
  { d: 1, t: "Beyond what you might invest, how solid is your financial base, emergency fund, income, debt?", o: ["Very solid, strong emergency fund, secure income, little or no debt", "Reasonably solid, a cushion exists, income is fairly stable, and debt is manageable", "Thin, little cushion, or income that comes and goes, or debt repayments that bite", "Fragile, no real cushion, and money is tight most months"] },
  { d: 1, t: "How much of the money you are thinking of investing might you need within the next three years?", o: ["None of it", "A small amount, under 25%", "Possibly close to 50%", "More than half, possibly all of it could be needed soon"] },
  { d: 1, t: "If you lost your main income tomorrow, how long could you hold on without touching investments?", o: ["A year or more, I have emergency funds and other sources of income", "Several months, enough to ride out most storms", "A month or two at best", "I would have to sell almost immediately"] },
  { d: 2, t: "How would you describe your experience with investing so far?", o: ["Experienced, I have held investments through ups and downs", "Some, I have invested in a few things and broadly understand how they behave", "Little, mostly savings and treasury bills; I have not ventured much beyond", "None yet, this would be new ground for me"] },
  { d: 2, t: 'When you hear that an investment is "higher risk", what does that mean to you?', o: ["Higher potential return, with a real and understood chance of loss along the way", "It could grow more, and it could also fall, I understand this and can weigh it", "It sounds dangerous, though I am not fully sure why", "I am not certain what that means in practice"] },
  { d: 2, t: "How comfortable are you telling the difference between a money market fund, a bond and a stock?", o: ["Very, I understand how each behaves and why", "Fairly, I know the broad differences", "A little, I have heard the terms but could not explain them well", "Not at all, these are mostly just words to me right now"] },
  { d: 3, t: "What is the main job you want this money to do?", o: ["Grow as much as possible over the long run, I am building wealth", "Grow steadily, ahead of inflation, without wild swings", "Hold its value and earn a little, safely", "Stay completely safe and available whenever I need it"] },
  { d: 3, t: "Which return would you be most satisfied with, knowing higher return means bigger swings?", o: ["Well above inflation, I want my money to grow significantly", "At or above inflation, I want my money to at least hold its real value", "A modest positive return, stability matters more than beating prices", "My principal guaranteed, I will accept lower returns for certainty"] },
];

export const RP_LEVELS = [
  { name: "Conservative", blurb: "Your instinct is to protect first, grow second, and that is a legitimate way to run money, as long as it is a decision and not a fear. Your money should still outpace inflation where it safely can." },
  { name: "Balanced", blurb: "You want your money to grow, but not at the cost of your peace. You can carry measured risk, and measured is the operative word: a genuine mix, rebalanced, with a floor under it." },
  { name: "Growth", blurb: "You are comfortable with volatility as the price of long-term reward, and your base can carry it. Discipline, diversification and time horizon are what turn that comfort into results." },
];

export const MP_TYPES = [
  { key: "saver", name: "The Saver", blurb: "Security is your language. You hold on — sometimes past the point where holding on serves you. Your growth edge: letting money move with purpose, not just sit in safety." },
  { key: "avoider", name: "The Avoider", blurb: "Money conversations drain you, so you postpone them. Your growth edge: small, regular check-ins — five minutes with your numbers beats one dreaded annual reckoning." },
  { key: "worrier", name: "The Worrier", blurb: "You think about money constantly — but thinking is not the same as planning. Your growth edge: turning the worry into one written plan the worry can rest on." },
  { key: "spender", name: "The Spender", blurb: "Money is for living, and you live. Your growth edge: the 48-hour rule — a pause between wanting and buying that keeps the joy and drops the regret." },
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
