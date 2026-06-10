import "./globals.css";
import { UserProvider } from "./context/UserContext";
import { CompanyProvider } from "./context/CompanyContext";
import Header from "./component/headerFile/Header";

export const metadata = {
  title: "TanPay",
  description: "make life easier for your employees",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir='rtl'>
      <body className="bg-black iransans">
        <UserProvider>
          <CompanyProvider>
            <Header />
            <div>
              {children}
            </div>
          </CompanyProvider>
        </UserProvider>
        </body>
    </html>
  );
}
