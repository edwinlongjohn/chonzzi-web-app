// utils/generateRiskProfileHtml.ts
import {
  RP_ALIGNMENT,
  RP_LEVELS,
  RP_TIME_AND_ACCESS,
  RP_CLOSING,
} from "@/data/assessments";

type DimResult = {
  name: string;
  score: number;
  max: number;
  pct: number;
  label: string;
};

type RiskResult = {
  headline: string;
  level: (typeof RP_LEVELS)[number];
  alignmentVariant: 0 | 1 | 2;
  dims: DimResult[];
};

export function generateRiskProfileSummaryHtml(
  result: RiskResult,
  _name: string
): string {
  let html = "";

  // Headline
  html += `<h2>${result.headline}</h2>`;

  // Profile name + paragraph
  html += `<h3>${result.level.name}</h3>`;
  html += `<p>${result.level.blurb}</p>`;

  // Alignment note
  html += `<p style="padding: 14px 16px; margin: 16px 0; border-radius: 8px; border: 1px solid rgba(47, 125, 74, 0.22); background: #f7f8f7;">${RP_ALIGNMENT[result.alignmentVariant]}</p>`;

  // Four-dimension table (email-safe)
  html += `<p style="font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #321332; margin: 28px 0 12px;">THE FOUR DIMENSIONS</p>`;
  html += `<div class="table-wrapper">`;
  html += `<table style="width: 100%; min-width: 480px; border-collapse: collapse; font-family: 'Merriweather', Georgia, serif;">`;
  html += `<thead><tr>`;
  html += `<th style="text-align: left; padding: 12px 10px; background: #f1eee7; border-bottom: 2px solid #e4ddd4; color: #321332; font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">Dimension</th>`;
  html += `<th style="text-align: left; padding: 12px 10px; background: #f1eee7; border-bottom: 2px solid #e4ddd4; color: #321332; font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">Score</th>`;
  html += `<th style="text-align: left; padding: 12px 10px; background: #f1eee7; border-bottom: 2px solid #e4ddd4; color: #321332; font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">Reading</th>`;
  html += `<th style="text-align: left; padding: 12px 10px; background: #f1eee7; border-bottom: 2px solid #e4ddd4; color: #321332; font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">Progress</th>`;
  html += `</tr></thead><tbody>`;

  result.dims.forEach((d) => {
    const filled = Math.round(d.pct * 10);
    const blocks = "█".repeat(filled) + "░".repeat(10 - filled);
    html += `<tr>`;
    html += `<td style="padding: 12px 10px; border-bottom: 1px solid #e8ddd1;">${d.name}</td>`;
    html += `<td style="padding: 12px 10px; border-bottom: 1px solid #e8ddd1; font-family: 'Montserrat', monospace; font-size: 13px;">${d.score} / ${d.max}</td>`;
    html += `<td style="padding: 12px 10px; border-bottom: 1px solid #e4ddd4; color: #321332;">${d.label}</td>`;
    html += `<td style="padding: 12px 10px; border-bottom: 1px solid #e4ddd4; font-family: 'Montserrat', monospace; font-size: 13px; color: #2f7d4a; letter-spacing: 1px; white-space: nowrap;">${blocks}</td>`;
    html += `</tr>`;
  });

  html += `</tbody></table></div>`;

  // Time and access note
  html += `<p style="margin: 24px 0 0; font-size: 14px; line-height: 1.7;">${RP_TIME_AND_ACCESS}</p>`;

  // Closing
  html += `<hr style="margin: 28px 0; border: none; border-top: 1px solid #e4ddd4;" />`;
  html += `<h3>${RP_CLOSING.heading}</h3>`;
  html += `<p>${RP_CLOSING.body}</p>`;

  return html;
}