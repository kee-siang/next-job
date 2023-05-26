/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"),  require('@tailwindcss/typography'),],
 

    // daisyUI config (optional)
    daisyui: {
      styled: true,
      themes: ["cyberpunk", "dracula"],
      base: true,
      utils: true,
      logs: true,
      rtl: false,
      prefix: "",
      darkTheme: "dracula",
    },
}

