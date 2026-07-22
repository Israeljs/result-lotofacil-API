const anyResultFetcher = async (draw) => {
  const response = await fetch(
    `https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/${draw}`
  );

  return response.json();
};

console.log(await anyResultFetcher(3733));