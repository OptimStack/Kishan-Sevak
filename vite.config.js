import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

function msambCommodityProxy() {
  return {
    name: 'msamb-commodity-proxy',
    configureServer(server) {
      server.middlewares.use('/api/msamb/commodities', handleMsambCommodityRequest);
      server.middlewares.use('/api/msamb/districts', handleMsambDistrictRequest);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/msamb/commodities', handleMsambCommodityRequest);
      server.middlewares.use('/api/msamb/districts', handleMsambDistrictRequest);
    }
  };
}

async function handleMsambDistrictRequest(request, response, next) {
  if (request.method !== 'GET') {
    next();
    return;
  }

  try {
    const requestUrl = new URL(request.url, 'http://localhost');
    const language = requestUrl.searchParams.get('language') === 'en' ? 'E' : 'M';
    let cookie = '';

    if (language === 'E') {
      const languageResponse = await fetch('https://www.msamb.com/Home/ChangeLanguage', { method: 'POST' });
      cookie = languageResponse.headers.get('set-cookie')?.split(';')[0] || '';
    }

    const districtsResponse = await fetch('https://www.msamb.com/ApmcDetail/GetApmcForArrivalPriceInfo', {
      headers: cookie ? { cookie } : {}
    });
    const districts = await districtsResponse.json();
    const data = districts.map((district) => ({
      code: district.ApmcCode,
      name: language === 'E' ? district.ApmcNameE : district.ApmcNameM,
      nameEn: district.ApmcNameE,
      nameMr: district.ApmcNameM
    })).filter((district) => district.nameEn || district.nameMr);

    response.statusCode = districtsResponse.status;
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.end(JSON.stringify(data));
  } catch (error) {
    response.statusCode = 502;
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.end(JSON.stringify({ error: 'MSAMB district service unavailable' }));
  }
}

async function handleMsambCommodityRequest(request, response, next) {
  if (request.method !== 'GET') {
    next();
    return;
  }

  try {
    const requestUrl = new URL(request.url, 'http://localhost');
    const language = requestUrl.searchParams.get('language') === 'en' ? 'E' : 'M';
    let cookie = '';

    if (language === 'E') {
      const languageResponse = await fetch('https://www.msamb.com/Home/ChangeLanguage', { method: 'POST' });
      cookie = languageResponse.headers.get('set-cookie')?.split(';')[0] || '';
    }

    const commoditiesResponse = await fetch('https://www.msamb.com/ApmcDetail/GetCommoditiesDistrictWisePriceInfo', {
      headers: cookie ? { cookie } : {}
    });
    const commodities = await commoditiesResponse.json();
    const data = commodities.map((commodity) => ({
      code: commodity.CommodityCode,
      name: language === 'E' ? commodity.CommodityNameE : commodity.CommodityNameM,
      nameEn: commodity.CommodityNameE,
      nameMr: commodity.CommodityNameM
    })).filter((commodity) => commodity.nameEn || commodity.nameMr);

    response.statusCode = commoditiesResponse.status;
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.end(JSON.stringify(data));
  } catch (error) {
    response.statusCode = 502;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ error: 'MSAMB commodity service unavailable' }));
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), msambCommodityProxy()],
  resolve: {
    alias: {
      "#components": resolve(dirname(fileURLToPath(import.meta.url)), "src/components"),
      "#views": resolve(dirname(fileURLToPath(import.meta.url)), "src/views"),
      "#store": resolve(dirname(fileURLToPath(import.meta.url)), "src/store"),
      "#hoc": resolve(dirname(fileURLToPath(import.meta.url)), "src/hoc"),
      "#windows": resolve(dirname(fileURLToPath(import.meta.url)), "src/windows"),
    },
  },
})