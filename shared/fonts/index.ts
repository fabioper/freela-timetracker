import localFont from "next/font/local"

export const inter = localFont({
  variable: "--font-inter",
  src: [
    {
      path: "./Inter-ExtraLight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Inter-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Inter-Bold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Inter-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Inter-ExtraBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Inter-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
})
