import type { Metadata } from "next";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = {
  title: "Content editor",
  robots: { index: false, follow: false },
};

/** The content editor at /keystatic. */
export default function KeystaticLayout() {
  return <KeystaticApp />;
}
