import "./globals.css";
import { UserProvider } from "./context/UserContext";
import { CompanyProvider } from "./context/CompanyContext";

export const metadata = {
  title: "TanPay",
  description: "make life easier for your employees",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir='rtl'>
      <body className="bg-black iransans">
        <UserProvider>
          {/* <CompanyProvider> */}
          {children}
          {/* </CompanyProvider> */}
        </UserProvider>
        </body>
    </html>
  );
}
