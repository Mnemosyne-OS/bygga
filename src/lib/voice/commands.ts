/**
 * Turns what the mic heard into an intent. Only short, whole phrases count as
 * commands, so talking to a friend ("hold the back panel") never moves a step.
 */

export type Intent =
  | { kind: "next" | "back" | "repeat" | "replay" | "stop" | "needs" | "where" | "slower" | "faster" | "help" | "commands" | "off" }
  | { kind: "goto"; step: number }
  | { kind: "ask"; text: string };

type Kind = Exclude<Intent["kind"], "goto" | "ask">;

const PHRASES: Record<Kind, string[]> = {
  next: ["next", "next step", "next one", "done", "im done", "i am done", "all done", "got it", "finished", "im finished", "continue", "go on", "go ahead", "keep going", "ready", "move on", "whats next", "what is next", "forward", "go"],
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

/** Words of the phrase that triggered an intent, for the echo check. */
export function heardWords(raw: string) {
  return normalize(raw).filter((w) => !FILLER.has(w));
}
