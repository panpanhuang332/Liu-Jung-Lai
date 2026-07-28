import { Source_Serif_4 } from "next/font/google";
import localFont from "next/font/local";

export const serifEn = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif-en",
  display: "swap",
});

// Noto Serif TC, subset at build time to the exact characters used on this
// site (assets/fonts, built via pyftsubset — see scripts/README note). Two
// files instead of Google Fonts' ~120 unicode-range slices: one font-load
// event per weight instead of a style-recalc storm on the very long paper
// page. display "swap" is safe again because there are only two loads.
export const serifTc = localFont({
  src: [
    { path: "../assets/fonts/noto-serif-tc-400-subset.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/noto-serif-tc-700-subset.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-serif-tc",
  display: "swap",
  preload: false,
});
