/**
 * Tells when someone starts talking into the mic, from its level every 50 ms.
 * The mic can still hear a little of the voice even with echo cancelling, so
 * while she speaks the bar is how loud she has sounded in it lately, plus a
 * margin: a person close by is much louder than what is left of her.
 */
export function talkDetector() {
  let floor = NaN;
  // her loudest in this mic lately, fading 2 dB a second (held while someone talks); learned before it's trusted
  let peak = -90;
  let learned = 0;
  let on = false;
  let up = 0;
  let down = 0;
  // the last few frames wait before they teach her level, so a person's first syllables don't
  const recent: { db: number; her: boolean }[] = [];

  return (db: number, her: boolean): boolean => {
    // the room's own noise follows quiet at once and noise slowly, slower still while someone talks
    floor = Number.isNaN(floor) || db < floor ? db : floor + Math.min(on ? 0.05 : 0.25, (db - floor) * 0.05);
    recent.push({ db, her });
    if (recent.length > 4) {
      const old = recent.shift()!;
      if (old.her && !on && up === 0) {
        peak = Math.max(peak - 0.1, old.db);
        learned++;
      } else if (!on) peak = Math.max(floor, peak - 0.1);
    }
    // until her level is known, she might be all it hears
    if (her && learned < 8) return on;
    const bar = Math.max(floor + 14, -58, her ? peak + 8 : -Infinity);
    if (!on) {
      up = db > bar ? up + 1 : 0;
      if (up >= 3) {
        on = true;
        down = 0;
      }
    } else {
      down = db < Math.max(floor + 8, her ? peak + 6 : -Infinity) ? down + 1 : 0;
      if (down >= 16) {
        on = false;
        up = 0;
      }
    }
    return on;
  };
}
