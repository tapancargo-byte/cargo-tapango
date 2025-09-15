const fs = require('fs');
const path = require('path');

function analyzeRoutes() {
  const routesMap = {
    expoRouter: {
      appDirectory: 'tapango/app',
      screens: [],
      layouts: [],
      groups: []
    },
    reactRouter: {
      adminDirectory: 'admin/src',
      routes: [],
      components: []
    }
  };

  // Analyze Expo Router structure
  function analyzeExpoRouter(dir, prefix = '') {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        const isGroup = item.startsWith('(') && item.endsWith(')');
        if (isGroup) {
          routesMap.expoRouter.groups.push({
            name: item,
            path: fullPath,
            route: `${prefix}${item}`
          });
        }
        analyzeExpoRouter(fullPath, `${prefix}${item}/`);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        const isLayout = item === '_layout.tsx';
        if (isLayout) {
          routesMap.expoRouter.layouts.push({
            name: item,
            path: fullPath,
            route: prefix
          });
        } else {
          const screenName = item.replace(/\.(tsx|ts)$/, '');
          routesMap.expoRouter.screens.push({
            name: screenName,
            file: item,
            path: fullPath,
            route: `${prefix}${screenName}`,
            isIndex: screenName === 'index'
          });
        }
      }
    });
  }

  // Analyze React Router admin routes
  function analyzeReactRouter() {
    const adminSrcPath = 'admin/src';
    if (!fs.existsSync(adminSrcPath)) return;
    
    // Look for App.tsx or similar main routing files
    const potentialRouters = ['App.tsx', 'App.jsx', 'router.tsx', 'router.jsx'];
    const pagesPath = path.join(adminSrcPath, 'pages');
    
    potentialRouters.forEach(routerFile => {
      const routerPath = path.join(adminSrcPath, routerFile);
      if (fs.existsSync(routerPath)) {
        try {
          const content = fs.readFileSync(routerPath, 'utf8');
          const routeMatches = content.match(/<Route[^>]+>/g) || [];
          
          routeMatches.forEach(routeTag => {
            const pathMatch = routeTag.match(/path="([^"]+)"/);
            const elementMatch = routeTag.match(/element=\{[^}]*<([^>\s]+)/);
            
            if (pathMatch) {
              routesMap.reactRouter.routes.push({
                path: pathMatch[1],
                component: elementMatch ? elementMatch[1] : 'Unknown',
                routeTag: routeTag.trim()
              });
            }
          });
        } catch (error) {
          console.warn(`Error reading ${routerPath}:`, error.message);
        }
      }
    });

    // Analyze pages directory
    if (fs.existsSync(pagesPath)) {
      const pages = fs.readdirSync(pagesPath).filter(f => f.endsWith('.tsx') || f.endsWith('.jsx'));
      pages.forEach(page => {
        routesMap.reactRouter.components.push({
          name: page.replace(/\.(tsx|jsx)$/, ''),
          file: page,
          path: path.join(pagesPath, page)
        });
      });
    }
  }

  analyzeExpoRouter('tapango/app');
  analyzeReactRouter();
  
  const result = {
    summary: {
      expoRouterScreens: routesMap.expoRouter.screens.length,
      expoRouterLayouts: routesMap.expoRouter.layouts.length,
      expoRouterGroups: routesMap.expoRouter.groups.length,
      reactRouterRoutes: routesMap.reactRouter.routes.length,
      reactRouterComponents: routesMap.reactRouter.components.length
    },
    routes: routesMap
  };
  
  fs.writeFileSync('routes_map.json', JSON.stringify(result, null, 2));
  console.log(`Expo Router: ${result.summary.expoRouterScreens} screens, ${result.summary.expoRouterLayouts} layouts, ${result.summary.expoRouterGroups} groups`);
  console.log(`React Router: ${result.summary.reactRouterRoutes} routes, ${result.summary.reactRouterComponents} components`);
  
  return result;
}

analyzeRoutes();