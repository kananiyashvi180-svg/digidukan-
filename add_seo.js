const fs = require('fs');
const path = require('path');

const seoData = {
  'LandingPage.jsx': {
    title: 'DigiDukan | Apni Dukaan Online Lao',
    description: 'Local shopkeepers can create their own online store using voice or text.',
    keywords: 'digidukan, local shop website, rural ecommerce, kirana website',
    structuredData: `{
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "DigiDukan",
      "url": "https://digidukan.com",
      "logo": "https://digidukan.com/favicon.ico"
    }`
  },
  'Dashboard.jsx': {
    title: 'Dashboard | DigiDukan',
    description: 'Manage your shop, products and customer queries.'
  },
  'DemoStores.jsx': {
    title: 'Demo Shops | DigiDukan',
    description: 'Explore real local shop demos.'
  },
  'HandlerDashboard.jsx': {
    title: 'Handler Dashboard | DigiDukan',
    description: 'Manage store approvals and requests.'
  },
  'LoginPage.jsx': {
    title: 'Login | DigiDukan',
    description: 'Login to DigiDukan'
  },
  'RegisterPage.jsx': {
    title: 'Register | DigiDukan',
    description: 'Register for DigiDukan'
  }
};

const pagesDir = path.join(__dirname, 'frontend/src/pages');

function processFile(filePath, fileName) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('<SEO')) return; // Already has SEO

  const data = seoData[fileName];
  if (!data) return;

  // Add import
  if (!content.includes('import SEO from')) {
    const importRegex = /import.*?from.*?;?\n/g;
    let lastImportIndex = 0;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      lastImportIndex = match.index + match[0].length;
    }
    
    // Calculate relative path to components/common/SEO.jsx
    let depth = filePath.split('pages\\')[1].split('\\').length;
    let relativePath = '../'.repeat(depth) + 'components/common/SEO';
    content = content.slice(0, lastImportIndex) + `import SEO from '${relativePath.replace(/\\/g, '/')}';\n` + content.slice(lastImportIndex);
  }

  // Add component
  const returnRegex = /return\s*\(\s*(<[a-zA-Z]+[^>]*>|<Fragment>|<>)/;
  const match = content.match(returnRegex);
  
  if (match) {
    const insertionPoint = match.index + match[0].length;
    const seoString = `\n      <SEO title="${data.title}" description="${data.description}" ${data.keywords ? `keywords="${data.keywords}"` : ''} ${data.structuredData ? `structuredData={${data.structuredData}}` : ''} />\n`;
    content = content.slice(0, insertionPoint) + seoString + content.slice(insertionPoint);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${fileName}`);
  } else {
    console.log(`Could not find insertion point in ${fileName}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      processFile(fullPath, file);
    }
  }
}

walkDir(pagesDir);
