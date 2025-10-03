import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2v3.5" />
      <path d="M12 18.5V22" />
      <path d="M4.22 4.22l2.48 2.48" />
      <path d="M17.3 17.3l2.48 2.48" />
      <path d="M2 12h3.5" />
      <path d="M18.5 12H22" />
      <path d="M4.22 19.78l2.48-2.48" />
      <path d="M17.3 6.7l2.48-2.48" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  swastika: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2v10h10" />
      <path d="M12 22V12H2" />
      <path d="M2 12V2h10" />
      <path d="M22 12v10H12" />
    </svg>
  ),
  fire: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 1.5 1 3 1 4.5a6.5 6.5 0 1 1-13 0c0-1.5.5-3 1-4.5 2.225 1.946 3.073 3.857 2 6-.5 1-1 1.62-1 3a2.5 2.5 0 0 0 2.5 2.5h3Z"/>
    </svg>
  ),
  water: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  ),
  earth: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
    </svg>
  ),
  air: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M17.7 7.7a2.5 2.5 0 1 1-3.54 3.54l-1.6-1.6"/><path d="M6.2 16.2a2.5 2.5 0 1 1 3.54-3.54l1.6 1.6"/><path d="M2 12h12.5"/><path d="M22 12h-5"/>
    </svg>
  ),
  phoenix: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2c3 3 6 6 9 9-3.5 3.5-7 7-10 7-3.5-3.5-7-7-7-10 3-3 6-6 8-8Z"/><path d="M12 11a2 2 0 0 0-2 2c0 1.1.9 2 2 2s2-.9 2-2"/>
    </svg>
  ),
  garuda: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2L6 8l-4 4 2 6 8-4 8 4 2-6-4-4-6-6z"/><path d="M12 12l-2 4h4l-2-4z"/>
    </svg>
  )
};

export type Icon = keyof typeof Icons;
