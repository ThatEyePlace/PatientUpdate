import type {Metadata} from "next";import "./globals.css";import "./rx-grid.css";
export const metadata:Metadata={title:"PatientUpdate",description:"That Eye Place patient prescription update records."};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
