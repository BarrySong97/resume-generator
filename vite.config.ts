import { defineConfig } from 'vite';
import Unocss from 'unocss/vite';
import {
  presetAttributify,
  presetIcons,
  presetUno,
  presetMini,
  presetWind
} from 'unocss';
import react from '@vitejs/plugin-react';
import Pages from 'vite-plugin-pages';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Pages(),
    Unocss({
      presets: [
        presetUno(),
        presetIcons(),
        presetWind(),
        presetAttributify(),
        presetMini()
      ]
    })
  ]
});
