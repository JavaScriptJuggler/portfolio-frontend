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
      </head>
      <body className="">
        <LoadingContextProvider>
          {children}
        </LoadingContextProvider>
      </body>
    </html>
  )
}
