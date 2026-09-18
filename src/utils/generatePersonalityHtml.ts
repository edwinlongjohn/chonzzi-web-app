// utils/generatePersonalityHtml.ts
import {
  NAMES,
  SHORT,
  BLENDS,
  COPY,
  type Result,
} from "@/lib/moneyPersonality";

export function generatePersonalitySummaryHtml(
  result: Result,
  name: string
): string {
  let html = "";

  // Greeting eyebrow
  html += `<p style="font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #c9a65a; margin-bottom: 8px;">${COPY.greeting(name.trim())}</p>`;

  // Title
  html += `<h2>${result.title}</h2>`;

  // Opening
  html += `<p>${result.opening}</p>`;

  // Scores and bands
  html += `<div style="margin: 20px 0;">`;
  NAMES.forEach((n) => {
    html += `<div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; margin-bottom: 8px; border-radius: 10px; border: 1px solid rgba(50, 19, 50, 0.1); background: rgba(255, 255, 255, 0.7);">`;
    html += `<span style="font-weight: 600; color: #321332;">The ${n}</span>`;
    html += `<span style="font-family: 'Montserrat', monospace; font-size: 13px; color: #68706a;">${result.scores[n]} / 20 · ${result.bands[n]}</span>`;
    html += `</div>`;
  });
  html += `</div>`;

  // Legend
  html += `<p style="font-size: 13px; color: #68706a; margin-top: 10px;">${COPY.legend}</p>`;

  // Pattern detail (when not balanced)
  if (result.patterns.length > 0) {
    html += `<div style="margin-top: 24px;">`;
    result.patterns.forEach((p) => {
      html += `<div style="border-radius: 12px; border: 1px solid #dfe7e1; background: #f7f8f7; padding: 20px; margin-bottom: 16px;">`;
      html += `<h3>The ${p}</h3>`;
      html += `<p style="margin-top: 8px;">${SHORT[p].means}</p>`;
      html += `<p style="margin-top: 8px;"><strong>The light: </strong>${SHORT[p].light}</p>`;
      html += `<p style="margin-top: 8px;"><strong>The shadow: </strong>${SHORT[p].shadow}</p>`;
      html += `</div>`;
    });
    html += `</div>`;
  }

  // Balanced — show all four
  if (result.shape === "balanced") {
    html += `<div style="margin-top: 24px;">`;
    html += `<p style="font-size: 14px; color: #8a7a9a; margin-bottom: 16px;">${COPY.fourIntro}</p>`;
    NAMES.forEach((p) => {
      html += `<div style="border-radius: 12px; border: 1px solid #dfe7e1; background: #f7f8f7; padding: 20px; margin-bottom: 16px;">`;
      html += `<h3>The ${p}</h3>`;
      html += `<p style="margin-top: 8px;">${SHORT[p].means}</p>`;
      html += `<p style="margin-top: 8px;"><strong>The light: </strong>${SHORT[p].light}</p>`;
      html += `<p style="margin-top: 8px;"><strong>The shadow: </strong>${SHORT[p].shadow}</p>`;
      html += `</div>`;
    });
    html += `</div>`;
  }

  // Blend
  if (result.blend && BLENDS[result.blend]) {
    html += `<div style="margin-top: 20px; border-radius: 12px; border: 1px solid rgba(201, 166, 90, 0.4); background: rgba(255, 255, 255, 0.7); padding: 20px;">`;
    html += `<h3>${result.blend.replace("-", " with ")}</h3>`;
    html += `<p style="margin-top: 8px;">${BLENDS[result.blend]}</p>`;
    html += `</div>`;
  }

  // Meaning paragraphs
  html += `<p style="margin-top: 20px;">${COPY.meaning1}</p>`;
  html += `<p style="margin-top: 12px;">${COPY.meaning2}</p>`;

  return html;
}