import "./globals.css";

/** Root + locale layouts import global CSS so Safari keeps styles across layout remounts / refresh. */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
