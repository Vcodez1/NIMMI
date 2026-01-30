try {
  const lightningcss = require('lightningcss');
  console.log('LightningCSS loaded successfully');
} catch (e) {
  console.error('Failed to load lightningcss:', e.message);
  try {
    const binary = require('lightningcss-win32-x64-msvc');
    console.log('Main binary package loaded successfully');
  } catch (e2) {
    console.error('Failed to load lightningcss-win32-x64-msvc:', e2.message);
  }
}
