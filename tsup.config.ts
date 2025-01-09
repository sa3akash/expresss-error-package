import { defineConfig } from 'tsup';  

export default defineConfig({  
  entry: ['src/index.ts'],  
  format: ['cjs', 'esm'],  
  sourcemap: true,  
  dts: true, // Generates TypeScript declaration files  
  minify: true,  
  clean: true,  
});