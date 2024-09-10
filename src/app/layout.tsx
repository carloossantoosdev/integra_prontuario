import { Sidebar } from "@/components/Sidebar";
import "./globals.css";
import { Box } from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          <main style={{ flexGrow: 1, padding: '16px' }}>
            {children}
          </main>
        </Box>
      </body>
    </html>
  );
}