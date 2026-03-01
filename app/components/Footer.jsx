export default function Footer() {
  return (
    <footer className="mt-10 py-4 border-t border-green-500/50 text-green-400 font-mono text-sm sm:text-base flex flex-col items-center justify-center gap-1">
      {/* Name and Email */}
      <p className="flex flex-wrap justify-center items-center gap-2">
        Developed by 
        <span className="text-green-300 font-bold">ASHRAFUL ISLAM</span> | 
        Email: 
        <a href="mailto:your.email@example.com" className="text-green-300 hover:underline">
          theashrafislam@gmail.com
        </a>
      </p>

      {/* Copyright */}
      <p className="text-xs text-green-500 mt-1">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  )
}