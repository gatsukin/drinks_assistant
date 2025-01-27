import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import vuetify from "vite-plugin-vuetify";
import Components from "unplugin-vue-components/vite";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        vuetify({
            styles: {
                configFile: "src/assets/styles/variables/_vuetify.scss",
            },
        }),
        Components({
            dirs: ["src/@core/components", "src/components"],
            dts: true,
            resolvers: [
                (componentName) => {
                    // Auto import `VueApexCharts`
                    if (componentName === "VueApexCharts")
                        return {
                            name: "default",
                            from: "vue3-apexcharts",
                            as: "VueApexCharts",
                        };
                },
            ],
        }),
        svgLoader(),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler", // or "modern"
            },
        },
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@core": fileURLToPath(new URL("./src/@core", import.meta.url)),
            "@layouts": fileURLToPath(
                new URL("./src/@layouts", import.meta.url)
            ),
            "@images": fileURLToPath(
                new URL("./src/assets/images/", import.meta.url)
            ),
            "@styles": fileURLToPath(
                new URL("./src/assets/styles/", import.meta.url)
            ),
            "@configured-variables": fileURLToPath(
                new URL(
                    "./src/assets/styles/variables/_template.scss",
                    import.meta.url
                )
            ),
        },
    },
    optimizeDeps: {
        exclude: ["vuetify"],
        entries: ["./src/**/*.vue"],
    },
});
