/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        inter:   ['Inter',   'sans-serif'],
      },
      colors: {
        brand: {
          primary:      '#00AEEF',
          'primary-dk': '#0077C8',
          accent:       '#38BDF8',
          bg:           '#FFFFFF',
          'bg-soft':    '#F5FBFF',
          'bg-mid':     '#EBF6FD',
          'text-p':     '#0F172A',
          'text-s':     '#64748B',
          'text-l':     '#94A3B8',
          border:       '#BAE6FD',
          'border-soft':'#E0F2FE',
        },
      },
      boxShadow: {
        'primary':    '0 4px 14px rgba(0,174,239,0.35)',
        'primary-lg': '0 8px 32px rgba(0,174,239,0.25)',
        'card':       '0 2px 12px rgba(0,174,239,0.06)',
        'card-hover': '0 12px 40px rgba(0,174,239,0.12)',
        'soft':       '0 4px 24px rgba(15,23,42,0.06)',
        'soft-lg':    '0 12px 48px rgba(15,23,42,0.08)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
