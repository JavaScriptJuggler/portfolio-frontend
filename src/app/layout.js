import { LoadingContextProvider } from "@/context/Loadingbar"
export const metadata = {
  title: 'Soumya Manna',
  description: 'this is the portfolio of soumya manna. I am a software developer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="">
        <LoadingContextProvider>
          {children}
        </LoadingContextProvider>
      </body>
    </html>
  )
}
