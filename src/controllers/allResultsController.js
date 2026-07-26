import allResultsServer from "../services/allResultsServer.js"

console.log(await allResultsServer.writeAllResults())


const getAllResults = async (req, res) => {
    const allResults = await allResultsServer.writeAllResults()
    return res.status(200).json(allResults)
  }
  
export default { getAllResults }





// export default {
//   getAllResults: async (req, res) => {
//     const allResults = await allResultserver.getAllResults(quantity);
//     return res.status(200).json(allResults)
//   }
// }
