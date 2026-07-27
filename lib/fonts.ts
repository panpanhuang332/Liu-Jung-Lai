import { Source_Serif_4, Noto_Serif_TC } from "next/font/google";

export const serifEn = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif-en",
  display: "swap",
});

export const serifTc = Noto_Serif_TC({
  weight: ["400", "600", "700"],
  variable: "--font-serif-tc",
  display: "swap",
  preload: false,
});
