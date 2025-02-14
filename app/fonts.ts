// import localFont from "next/font/local";
// import { Inter, Nunito } from "next/font/google";

// fonts.ts
import { Inter, Nunito } from "next/font/google";
import localFont from "next/font/local";

// Define the Inter font with the required properties
export const inter = Inter({
  subsets: ["latin"], // Define the subset
  variable: "--font-inter", // CSS variable to access the font
  display: "swap", // Font display strategy
});

// Define the Nunito font with the required properties
export const nunito = Nunito({
  subsets: ["latin"], // Define the subset
  variable: "--font-nunito", // CSS variable to access the font
  weight: "300", // Define the weight
  display: "swap", // Font display strategy
});

// Define the SpaceMono font with the required properties
export const spaceMono = localFont({
  src: [
    {
      path: "./SpaceMono-Bold.ttf", // Path to the local font
      weight: "bold", // Font weight
      style: "normal", // Font style
    },
  ],
  variable: "--font-spaceMono-Bold", // CSS variable to access the font
  display: "swap", // Font display strategy
});
