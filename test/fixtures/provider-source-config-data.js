import ProviderSourceConfig from 'models/ProviderSourceConfig';

const loadProviderData = async () => {
  const withHeaderProvider = new ProviderSourceConfig({
    provider: "withHeader",
    header: true,
    mapping: {
      uuid: "uuid",
      vin: "vin",
      make: "make",
      model: "model",
      mileage: "mileage",
      year: "year",
      price: "price",
      zipCode: "zipCode",
    },
  });

  await withHeaderProvider.save();

  const withoutHeaderProvider = new ProviderSourceConfig({
    provider: "withoutHeader",
    header: false,
    mapping: {
      uuid: 0,
      vin: 1,
      make: 6,
      model: 2,
      mileage: 7,
      year: 3,
      price: 4,
      zipCode: 5,
    },
  });

  await withoutHeaderProvider.save();
};

export default loadProviderData;