// src/lib/moneyPersonality.ts
// Money Personality Assessment: scoring rules and all copy.
// Extracted from FLwT_Money_Personality_Assessment.xlsx. Do not reword the copy.

export type TypeName = "Spender" | "Saver" | "Avoider" | "Worrier";

/** Fixed order. This order decides how ties are named. Never re-sort it. */
export const NAMES: TypeName[] = ["Spender", "Saver", "Avoider", "Worrier"];

/** The sixteen statements, in fixed display order. `type` is internal, never shown. */
export const QUESTIONS: { text: string; type: TypeName }[] = [
  { text: "I check my balance to calm myself, even when nothing has changed.", type: "Worrier" },
  { text: "After a hard week, I treat myself. It softens the week.", type: "Spender" },
  { text: "When money lands, it moves to its places first: savings, bills, obligations. Then I relax about the rest.", type: "Saver" },
  { text: "I check my balance as rarely as I can. My mind is quieter when I am not looking.", type: "Avoider" },
  { text: "When unexpected money arrives, my first thought is the thing I have been eyeing.", type: "Spender" },
  { text: "Rent or school fees gathers in its own place months before it is due.", type: "Saver" },
  { text: "Even when my account is fine, stress finds its way to money worry.", type: "Worrier" },
  { text: "I commit to the celebration first and face the money side later.", type: "Avoider" },
  { text: "When income is delayed, my buffer absorbs it. That is exactly why I keep one.", type: "Saver" },
  { text: "If I love something and it will not wreck the month, I buy it. Life is for enjoying, not only planning.", type: "Spender" },
  { text: "I say I will look into it, and the looking rarely happens.", type: "Avoider" },
  { text: "Big payments stay tense for me even when the money is already complete.", type: "Worrier" },
  { text: "For the people I love, I show up fully: fabric, gift, everything, even when it stretches the month.", type: "Spender" },
  { text: "When I spot a charge I do not recognise, I assume I forgot something and keep scrolling.", type: "Avoider" },
  { text: "When spending was not planned, part of me quietly counts what that money could have done instead.", type: "Saver" },
  { text: "Even when I can afford something, buying it comes with a debate in my head, and guilt often outweighs the wanting.", type: "Worrier" },
];

export const SCALE_LABELS = [
  "not me at all",
  "rarely me",
  "sometimes me",
  "often me",
  "very much me",
];

/** Short versions: shown on screen and near the top of the email. */
export const SHORT: Record<TypeName, { means: string; light: string; shadow: string }> = {
  Spender: {
    means: "Money, for you, is a tool for the present: living, enjoyment, connection. Life is happening now.",
    light: "You are warm, giving and present. You cover the bill, fund the surprise, show up fully, and take proper care of the people around you. You are not ruled by fear.",
    shadow: "The same pattern, unchecked, becomes the impulse buys, the soothing purchases after a hard week, the lifestyle that quietly grows to swallow every raise, and the thin buffer underneath it all.",
  },
  Saver: {
    means: "Money, for you, is security through order. It is safest when it is kept, and the plan is the peace.",
    light: "You are disciplined, prepared and rarely caught off guard. Rent money gathers months early, the buffer exists and is respected, and you follow through on what you agree.",
    shadow: "The same pattern, unchecked, becomes the miser edge: refusing to spend even on things that matter, judging other people's spending, and squeezing the joy out of the budget. The money works; the life may not.",
  },
  Avoider: {
    means: "Money, for you, carries stress, so you keep it at a distance. Life is for people and living, not statements.",
    light: "You are calm, unmaterialistic and relationship-first. Your worth is not tied to a balance, and you do not let money poison an evening, a friendship or a marriage.",
    shadow: "The same pattern, unchecked, lets things grow in the dark: forgotten charges, debt that compounds quietly, decisions deferred until they make themselves. The peace is real, but it is rented.",
  },
  Worrier: {
    means: "Money, for you, is safety that never quite arrives. You stay alert for the version of events where it all falls apart.",
    light: "You are responsible, alert and often well saved, because the worry drives real preparation. You spot the risk, the fraud and the hole in the plan before anyone else does.",
    shadow: "The same pattern, unchecked, means the anxiety ignores the balance. The money can be complete and the checking continues, guilt shadows ordinary enjoyment, and the peace the saving was meant to buy never arrives.",
  },
};

/** Full versions: email only. */
export const FULL: Record<TypeName, { means: string; light: string; shadow: string; tells: string }> = {
  Spender: {
    means: "Money means living, enjoyment and connection. It is a tool for the present, and life is happening now.",
    light: "Warm, giving, present. The one who covers the bill, funds the surprise, shows up fully at the owambe and takes proper care of the people around them. Celebrates wins properly, and is not ruled by fear.",
    shadow: "The impulse buys, the soothing purchases after a hard week, the lifestyle that quietly grows to swallow every raise, the thin or absent buffer, and the December that takes until March to recover from.",
    tells: "Checks the balance mainly at the point of spending. Struggles to leave money idle. Equates care with providing.",
  },
  Saver: {
    means: "Money means security through order. It is safest when it is kept. Control and structure are the drive, and the plan is the peace.",
    light: "Disciplined, prepared, rarely caught off guard. Rent money gathers months early, the buffer exists and is respected, and financial agreements are followed through.",
    shadow: "The miser edge. Penny-pinching, refusing to spend even on things that matter, judging other people's spending, squeezing the joy out of the household budget, hoarding while life waits. Spending, even planned and affordable, brings discomfort. The money works; the life may not.",
    tells: "Finds releasing money harder than earning it. Measures gifts and celebrations against the plan. Feels a quiet tax on every unplanned enjoyment.",
  },
  Avoider: {
    means: "Money carries stress, so it is kept at a distance. Peace and presence are the drive. Life is for people and living, not statements.",
    light: "Unmaterialistic, calm, relationship-first. Self-worth is not tied to a balance. Does not let money poison an evening, a friendship or a marriage.",
    shadow: "What grows in the dark: unopened statements, forgotten renewals and charges, debt that compounds quietly, decisions deferred until they are made by default. Generosity without checking whether it was affordable. The peace is real, but it is rented, and the interest accrues.",
    tells: "Commits first and faces the money later. Says 'I will look into it' and rarely does. Would rather absorb a loss than have the money conversation.",
  },
  Worrier: {
    means: "Money means safety that never quite arrives. Vigilance is the drive: prepare for the version of events where it all falls apart.",
    light: "Responsible, alert and often well saved, because the worry drives real preparation. Frequently the one with the most set aside in the room. Spots the risk, the fraud and the hole in the plan before anyone else does.",
    shadow: "The anxiety is indifferent to the balance. The money can be complete and the checking continues. Guilt shadows ordinary enjoyment. Opportunities pass because every option looks like a trap. The saving is real; the peace it was meant to buy never gets delivered.",
    tells: "Checks accounts to soothe, not to inform. Runs worst-case arithmetic on quiet evenings. The credit alert brings relief and a new worry in the same breath.",
  },
};

/** Twelve blends. Key is "Primary-Secondary". Order matters. */
export const BLENDS: Record<string, string> = {
  "Spender-Saver": "You swing between spending freely and locking everything down. A splurge one week, strict restriction the next. It can feel confusing, but it simply means both impulses run strong in you.",
  "Spender-Avoider": "You spend without looking too closely at the impact. The full picture only reaches you when something forces a look: a declined card, a statement finally opened. Visibility, not discipline, is your first fix.",
  "Spender-Worrier": "You spend in the moment and worry about it afterwards. The purchase feels necessary at the time; the regret arrives later. You are caught between wanting to enjoy your life and fearing the cost of doing so.",
  "Saver-Spender": "You are fundamentally disciplined, with a spending impulse that surfaces under specific triggers: stress, celebration, social pressure. You recover quickly, but the pattern repeats until the trigger is named.",
  "Saver-Avoider": "You save well but avoid the decisions that would put that money to work. Capital sits idle because the next step feels heavy. Knowledge, taken in small steps, is what unlocks you.",
  "Saver-Worrier": "You save diligently, yet peace never quite arrives. The money is there and the plan is solid, but the anxiety persists. Your work is less about the balance and more about your relationship with uncertainty.",
  "Avoider-Spender": "You do not track, and you spend freely. Money moves through your life without much visibility, and the surprise is rarely a crisis; it is the gap between what you thought you had and what is actually there.",
  "Avoider-Saver": "You save when systems do it for you, pension deductions and standing orders, but you avoid actively managing the rest. Your money is not in trouble; it is simply not working as hard as it could.",
  "Avoider-Worrier": "You avoid because looking makes you worry, and you worry because you have been avoiding. It is a loop. Breaking it does not require fixing everything at once; it requires one honest look at where you actually stand.",
  "Worrier-Spender": "You worry constantly, and sometimes the worry itself triggers spending. You buy to feel better about feeling bad, and the purchase then becomes a new thing to worry about.",
  "Worrier-Saver": "You worry and save, worry and save. The saving is real and disciplined, but it never buys the peace you are saving for. The work is emotional as much as financial.",
  "Worrier-Avoider": "The anxiety is loud, but the avoidance is louder. You think about your money constantly, yet sitting down to face it feels paralysing. Start smaller than feels necessary; momentum does the rest.",
};

export const COPY = {
  title: "Your Money Personality",
  lead: "Your money challenges are not a character flaw. They are patterns, and patterns can be changed once they are seen.",
  howItWorks: "Rate sixteen statements from 1 to 5, going with your first instinct. It takes about four minutes. Your result appears the moment you rate the last one.",
  noRightAnswers: "There are no right answers here, only honest ones.",
  namePrompt: "Your first name (optional)",
  begin: "Begin",
  instruction: "Rate how true each statement is of you, from 1 (not me at all) to 5 (very much me). Go with your first instinct; the honest answer is usually the quick one.",
  legend: "Strong 15 to 20, a governing pattern  \u00b7  Present 10 to 14, shows up under pressure  \u00b7  Faint 4 to 9, rarely drives you",
  seeResult: "See my result",
  greeting: (n: string) => (n ? `${n}, here is what your ratings show.` : "Here is what your ratings show."),
  twoPatterns: "Two patterns run at near-equal strength in you. Read both below; your money life is the conversation between them.",
  threePatterns: "Three patterns run at near-equal strength in you, and no single one is in charge. That usually means the situation decides: one shows up under pressure, another when there is something to celebrate. All three are set out below. Read them together, and notice which shadow costs you the most.",
  balanced: "No single pattern runs your money. Your ratings spread across all four, which usually means context decides: stress pulls one lever, celebration pulls another. Read all four patterns below, and notice which shadow costs you the most. That is where your work begins.",
  meaning1: "Your money personality is not a weakness. It is information. Once you see the pattern, you stop fighting yourself, you stop copying systems built for somebody else, and you start working with the way you are actually wired.",
  meaning2: 'It also explains why money conversations can feel so different at home. Understanding money personality turns "you are careless" into "we experience money differently", and that is a conversation that can actually go somewhere.',
  ctaHeading: "THE NEXT STEP",
  cta1: "Our Diagnostic tests tell you how you respond to money.",
  cta2: "Knowledge and a plan helps you build wealth. Join the Money simplified course today for the knowledge and tools to build and manage wealth. The link is below.",
  ctaButton: "Take the next step",
  ctaUrl: "https://moneysimplified.chonzzi.com/shop",
  signature: "Temi Egenti  \u00b7  Financial Literacy With Temi",
  formHeading: "Would you like the fuller version?",
  formBody: "What you have just read is the short version. Give me your email and I will send you the longer one: your pattern in depth, the tells that give it away, and all four personalities in full, so you can see where the people around you sit.",
  emailLabel: "Your email address",
  consent: "Yes, send me my full reading and money guidance from Financial Literacy With Temi. I can unsubscribe at any time.",
  submit: "Send me the full reading",
  needConsent: "Please tick the box so I know I have your permission to email you.",
  badEmail: "That does not look like a complete email address. Please check it.",
  sent: (e: string) => `Sent. Your full reading is on its way to ${e}. If it has not arrived in a few minutes, please check your spam folder.`,
  sendFailed: "Something went wrong sending that. Please try again in a moment.",
  privacy: "Your answers are not saved. Your result is worked out on this page as you go, and nothing is kept once you close it. If you ask for the full reading, the only thing kept is your email address, so I can send it to you and stay in touch.",
  startAgain: "Start again",
  fourIntro: "Every pattern has a light and a shadow. The light is the gift it brings; the shadow is what the same pattern does when it runs the whole show. Nobody is only one of these, and none of them is wholly good or bad.",
  fourLink: "And here are all four patterns in full, so you can see where the people around you sit.",
};

export type Band = "Strong" | "Present" | "Faint";
export type Shape = "single" | "two" | "three" | "balanced";

export interface Result {
  scores: Record<TypeName, number>;
  bands: Record<TypeName, Band>;
  shape: Shape;
  title: string;
  /** Which patterns get a light and shadow block. Empty when balanced. */
  patterns: TypeName[];
  /** Blend key, or "" when no blend applies. */
  blend: string;
  /** The paragraph that sits under the title. */
  opening: string;
}

export const bandFor = (v: number): Band => (v >= 15 ? "Strong" : v >= 10 ? "Present" : "Faint");

/**
 * Scores sixteen ratings (each 1 to 5) and decides the shape of the result.
 * Same answers always give the same result. Nothing here is random.
 */
export function evaluate(ratings: number[]): Result {
  if (ratings.length !== 16 || ratings.some((r) => !Number.isInteger(r) || r < 1 || r > 5)) {
    throw new Error("evaluate needs sixteen whole numbers, each between 1 and 5");
  }

  // Step one: four totals, each between 4 and 20.
  const raw: Record<TypeName, number> = { Spender: 0, Saver: 0, Avoider: 0, Worrier: 0 };
  ratings.forEach((r, i) => {
    raw[QUESTIONS[i].type] += r;
  });
  const values = NAMES.map((n) => raw[n]);

  // Step two: a reading for each total.
  const bands = Object.fromEntries(NAMES.map((n) => [n, bandFor(raw[n])])) as Record<TypeName, Band>;

  // Step three: the shape.
  const max = Math.max(...values);
  const tieCount = values.filter((v) => v === max).length;
  const second = [...values].sort((a, b) => b - a)[1];
  const tied = NAMES.filter((n) => raw[n] === max); // already in fixed order

  let shape: Shape;
  let title: string;
  let patterns: TypeName[] = [];
  let blend = "";
  let opening: string;

  if (max <= 9 || tieCount === 4) {
    shape = "balanced";
    title = "A Balanced Profile";
    opening = COPY.balanced;
  } else if (tieCount === 3) {
    shape = "three";
    patterns = tied;
    title = `The ${tied[0]}, The ${tied[1]} and The ${tied[2]}`;
    opening = COPY.threePatterns;
  } else if (tieCount === 2) {
    shape = "two";
    patterns = tied;
    title = `The ${tied[0]} and The ${tied[1]}`;
    blend = `${tied[0]}-${tied[1]}`;
    opening = COPY.twoPatterns;
  } else {
    shape = "single";
    patterns = tied; // exactly one
    title = `The ${tied[0]}`;
    opening = SHORT[tied[0]].means;
    if (second >= 10) {
      const runnerUp = NAMES.find((n) => raw[n] === second)!; // first in fixed order if two match
      blend = `${tied[0]}-${runnerUp}`;
    }
  }

  return { scores: raw, bands, shape, title, patterns, blend, opening };
}
