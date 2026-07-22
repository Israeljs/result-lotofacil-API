import fs from 'node:fs/promises';
import oldResults from '../database/results.js';
// const oldResults = oldestResults
console.log(oldResults[0].numero)
// Retorna o último resultado da lotofácil
const lastResultFetcher = async () => {
  const response = await fetch(
    'https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/'
  )
  return response.json()
}
console.log(await lastResultFetcher())
// Retorna qualquer resultados da lotofácil
const anyResultFetcher = async (draw) => {
  const response = await fetch(
    `https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/${draw}`
  )
  return response.json()
}
console.log(await anyResultFetcher(3733));
// Retorna todos os resultados da lotofácil
// const lotofacilResults = async () => {
//   const lastResult = await lastResultFetcher()
//   const lastResultNumber = Number(lastResult.numero)
//   if (!oldResults.length) {
//     throw new Error('Nenhum resultado encontrado no arquivo.')
//   }
//   const oldResultNumber = Number(oldResults[0].numero)
//   for (let i = oldResultNumber + 1; i <= lastResultNumber; i++) {
//     oldResults.unshift(await anyResultFetcher(i))
//   }
//   // console.log(oldResults)
//   return oldResults

// }
// // console.log(await lotofacilResults());
// console.log('Antes de escrever');
// (async () => {
//   try {
//     const data = await lotofacilResults()
//     console.log(data);
//     await fs.writeFile(
//       'src/database/results.js',
//       `export default ${JSON.stringify(data, null, 2)}`, 
//       {
//         encoding: 'utf-8',
//         flag: 'w'
//       }
//     )
//   } catch (err) {
//     console.error(err)
//   }
// })
// console.log('Arquivo escrito!');
const lotofacilResults = async () => {
  console.log('1 - Entrou na função');

  const lastResult = await lastResultFetcher();
  console.log('2 - Último concurso:', lastResult.numero);

  const lastResultNumber = Number(lastResult.numero);

  if (!oldResults.length) {
    throw new Error('Nenhum resultado encontrado no arquivo.');
  }

  const oldResultNumber = Number(oldResults[0].numero);
  console.log('3 - Último salvo:', oldResultNumber);

  for (let i = oldResultNumber + 1; i <= lastResultNumber; i++) {
    console.log(`4 - Baixando concurso ${i}`);
    oldResults.unshift(await anyResultFetcher(i));
  }

  console.log('5 - Total de resultados:', oldResults.length);

  return oldResults;
};

(async () => {
  try {
    const data = await lotofacilResults();

    console.log('6 - Retornou da função');
    console.log(data.length);

    console.log('Antes de escrever');

    await fs.writeFile(
      'src/database/results.js',
      `export default ${JSON.stringify(data, null, 2)};`
    );

    console.log('Arquivo escrito!');
  } catch (err) {
    console.error(err);
  }
})();
