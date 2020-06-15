import * as csv from "fast-csv";
import Car from 'models/Car';
import ProviderSourceConfig from "models/ProviderSourceConfig";

export default class ApiControllerV1 {
  static async import(req, res) {
    const provider = await ProviderSourceConfig.findOne({ provider: req.body.provider }).lean().exec();
    if (!provider || !req.file.path) {
        res.status(400);
        return res.json('There was a issue with the data passed.');
    }
    csv
      .parseFile(req.file.path, { headers: provider.header })
      .on("error", (error) => console.error(error))
      .on("data", async (row) => {
          const mapping = provider.mapping
          const car = new Car({
              uuid: row[mapping['uuid']],
              vin: row[mapping['vin']],
              make: row[mapping['make']],
              model: row[mapping['model']],
              mileage: row[mapping['mileage']],
              year: row[mapping['year']],
              price: row[mapping['price']],
              zipCode: row[mapping['zipCode']]
          })
          await car.save()
      })
      .on("end", async () => {
        const carData = await Car.find().lean().exec();
        console.log(carData);
      });
    res.send('Processing File.');
  }
}
