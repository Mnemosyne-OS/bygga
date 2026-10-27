/**
 * Turns what the mic heard into an intent. Only short, whole phrases count as
 * commands, so talking to a friend ("hold the back panel") never moves a step.
 */

import { numWords } from "./script";

export type Intent =
  | { kind: "next" | "back" | "repeat" | "replay" | "stop" | "needs" | "where" | "slower" | "faster" | "help" | "commands" | "off" }
  | { kind: "goto"; step: number }
  | { kind: "ask"; text: string };

type Kind = Exclude<Intent["kind"], "goto" | "ask">;

const PHRASES: Record<Kind, string[]> = {
  next: ["next", "next step", "next one", "next please", "skip", "skip it", "skip this one", "done", "im done", "i am done", "all done", "got it", "finished", "im finished", "continue", "go on", "go ahead", "keep going", "ready", "move on", "whats next", "what is next", "forward", "go"],
  back: ["back", "go back", "previous", "previous step", "previous one", "step back", "go back one", "back one", "undo"],
  repeat: ["again", "repeat", "repeat that", "say again", "say that again", "what", "sorry", "pardon", "come again", "one more time", "what did you say", "huh"],
  replay: ["show me", "show me again", "show again", "replay", "play again", "watch again", "show"],
  stop: ["stop", "quiet", "shh", "shush", "hush", "hold on", "wait", "pause", "be quiet", "stop talking", "enough"],
  needs: ["how many", "what do i need", "what parts", "which parts", "which screws", "what screws", "parts", "what hardware"],
  where: ["where am i", "what step", "which step", "what step am i on", "which step am i on", "how many left", "how far", "how much left", "how many steps left"],
  slower: ["slower", "slow down", "too fast", "more slowly", "slowly", "speak slower", "slow"],
  faster: ["faster", "speed up", "normal speed", "quicker"],
  help: ["help", "im stuck", "i am stuck", "stuck", "i need help"],
  commands: ["what can i say", "commands", "what do i say", "options"],
  off: ["voice off", "stop listening", "turn off voice", "turn voice off", "goodbye"],
};

const LOOKUP = new Map<string, Kind>();
for (const [k, list] of Object.entries(PHRASES) as [Kind, string[]][]) for (const p of list) LOOKUP.set(p, k);

const FILLER = new Set(["um", "uh", "er", "erm", "hmm", "okay", "ok", "alright", "right", "so", "please", "now", "then", "hey", "bygga", "thanks", "thank", "you", "and", "yeah", "yes"]);

const NUM: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, for: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13,
  fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, first: 1, last: -1,
};

/** Words a real question about the build tends to contain. */
const BUILD_WORDS = /\b(screw|bolt|dowel|cam|panel|part|piece|hole|side|leg|drawer|door|shelf|hinge|lock|top|bottom|front|wall|tool|allen|key|hammer|nail|tight|loose|fit|wobbl|step|runner|plinth|frame|rail|slat|knob|handle|upside|way round|which way)/;
const QUESTION = /^(how|what|where|which|why|does|do|is|are|can|should|when|whats|wheres|hows)\b/;

export function normalize(raw: string) {
  return raw
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9 ]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export function parse(raw: string): Intent | null {
  const all = normalize(raw);
  // drop fillers only at the edges: "okay next please" is "next"
  let a = 0,
    b = all.length;
  while (a < b && FILLER.has(all[a])) a++;
  while (b > a && FILLER.has(all[b - 1])) b--;
  const words = all.slice(a, b);
  if (!words.length) return null;
  const text = words.join(" ");

  const hit = LOOKUP.get(text);
  if (hit) return { kind: hit };

  const go = text.match(/^(?:go to |jump to |skip to )?(?:step|number) (\w+)$/);
  if (go) {
    const n = NUM[go[1]] ?? Number(go[1]);
    if (n && Number.isFinite(n)) return { kind: "goto", step: n };
  }

  if (/^how many steps/.test(text)) return { kind: "where" };
  if (/^(how many|what do i need)\b/.test(text) && words.length <= 7) return { kind: "needs" };

  if (words.length >= 4 && QUESTION.test(text) && BUILD_WORDS.test(text)) return { kind: "ask", text: raw.trim() };
  return null;
}

// how a recognizer may write back what the voice said: digits and sound-alikes
const ALIKE: Record<string, string> = { won: "one", to: "two", too: "two", for: "four", fore: "four", ate: "eight" };

/** Words of a line the way a recognizer might write them, for telling her words from the person's. */
export function canon(text: string) {
  return normalize(text).flatMap((w) => (/^\d+$/.test(w) ? numWords(Number(w)).split("-") : [ALIKE[w] ?? w]));
}

/** Small words that belong to whoever said the words around them. */
const GLUE = new Set(["the", "a", "an", "and", "to", "two", "in", "into", "on", "of", "it", "its", "is", "you", "your", "youll", "i", "im", "this", "that", "with", "for", "four", "at", "by", "up", "out", "then", "so", "now", "just", "we", "be"]);

/** While she is talking, a phrase of one word has to be one of these to count: short words in her echo get misheard. */
const BARGE_WORDS = new Set(["next", "skip", "back", "previous", "stop", "wait", "pause", "quiet", "again", "repeat"]);

export interface Heard {
  intent: Intent;
  /** The person's phrase that holds the command. */
  words: string;
  /** Nothing follows it yet: the person may still be saying it. */
  open: boolean;
}

/**
 * Finds a command in a running transcript. The mic can hear the voice too, so
 * the words she said lately (`hers`) split the transcript into the person's
 * own phrases, and a phrase has to be a whole command by itself: "next" said
 * over her reading still counts, "grab the next panel" never does. Phrases
 * ending before word `from` were looked at already. While she is `talking`
 * only short, distinct commands count, and questions wait until she is done.
 */
export function findCommand(transcript: string, hers: (word: string) => boolean, talking: boolean, from = 0): Heard | null {
  const words = normalize(transcript);
  const mine = words.map((w) => !GLUE.has(w) && hers(w));
  for (let i = 0; i < words.length; ) {
    if (mine[i]) {
      i++;
      continue;
    }
    let j = i;
    while (j < words.length && !mine[j]) j++;
    // small words at a seam with her words were hers: "into the | next"
    let a = i,
      b = j;
    if (a > 0) while (a < b && GLUE.has(words[a])) a++;
    if (b < words.length) while (b > a && GLUE.has(words[b - 1])) b--;
    if (j > from && b > a) {
      const text = words.slice(a, b).join(" ");
      const intent = parse(text);
      const kept = normalize(text).filter((w) => !FILLER.has(w));
      if (intent && !(talking && (intent.kind === "ask" || (kept.length === 1 && !BARGE_WORDS.has(kept[0]))))) return { intent, words: text, open: j === words.length };
    }
    i = j;
  }
  return null;
}
