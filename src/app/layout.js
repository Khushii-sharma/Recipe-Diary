import { SearchProvider } from "@/context/SearchContext"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { SavedProvider } from "@/context/SavedContext"
import { AuthProvider } from "@/context/AuthContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const metadata = {
  title: "Recipe App",
  description: "Find and save your favorite recipes",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SavedProvider>
            <SearchProvider>
              <Navbar />
              {children}
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                closeOnClick
              />
            </SearchProvider>
          </SavedProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
