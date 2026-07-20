//const fetch = require('node-fetch')
const fs = require('fs').promises
const oldResults = require('../database/resultss')

// Retorna o último resultado da lotofácil
const lastResultFetcher = async () => {
  const response = await fetch(
    'https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/'
  );
  return response.json()
};

// Retorna qualquer resultados da lotofácil
const anyResultFetcher = async (draw) => {
  const response = await fetch(
    `https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/${draw}`
  );
  return response.json()
};

// Retorna todos os resultados da lotofácil
const lotofacilResults = async () => {
  const lastResult = await lastResultFetcher()
  const lastResultNumber = Number(lastResult.numero)
  if (!oldResults.length) {
    throw new Error('Nenhum resultado encontrado no arquivo.');
  }
  const oldResultNumber = Number(oldResults[0].numero)
  for (let i = oldResultNumber + 1; i <= lastResultNumber; i++) {
    oldResults.unshift(await anyResultFetcher(i))
  }
  console.log(oldResults);
  return oldResults

}

(async () => {
  try {
    const data = await lotofacilResults();
    fs.writeFile(
      'src/resultss.js',
      `module.exports = ${JSON.stringify(data, null, 2)}`, 
      {
        encoding: 'utf-8',
        flag: 'w'
      }
    )
  } catch (err) {
    console.error(err)
  }
})

