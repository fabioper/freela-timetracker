import Script from "next/script"
import React from "react"

export const TailwindFix = () => (
  <Script
    id="fixTailwind"
    dangerouslySetInnerHTML={{
      __html: `
        const style = document.createElement('style')
        style.innerHTML = '@layer tailwind-base, primereact, tailwind-utilities;'
        style.setAttribute('type', 'text/css')
        document.querySelector('head').prepend(style)
      `,
    }}
  />
)
