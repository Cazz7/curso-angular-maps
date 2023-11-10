const { writeFileSync, mkdirSync } = require('fs')

require('dotenv').config();

// Crear archivo de entorno
const targetPath = './src/environments/environments.ts';

const envFileContent = `
export const environment = {
  mapbox_key: "${ process.env['MAPBOX_KEY'] }",
  otra: "PROPIEDAD",
};
`;

// overwrites with recursive in true
mkdirSync('./src/environments', { recursive: true });

writeFileSync( targetPath, envFileContent );
