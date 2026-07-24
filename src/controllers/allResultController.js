export default {
  getAllResults: async (req, res) => {
    const allResults = await allResultserver.getAllResults(quantity);
    return res.status(200).json(allResults)
  }
}
