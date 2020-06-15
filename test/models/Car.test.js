import mongoose from 'mongoose';
import Car from 'models/Car';
import { setupDatabase, closeDatabase, clearDatabase } from 'test/setup/mongo-mem-server';

beforeAll(async () => await setupDatabase());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('Car Model Test', () => {
    const carData = { uuid: "323", vin: "293829d299d299821", model: "I30" };

    it('create & save car successfully', async () => {
        const validCar = new Car(carData);
        const savedCar = await validCar.save();
        expect(savedCar._id).toBeDefined();
        expect(savedCar.uuid).toBe(carData.uuid);
        expect(savedCar.vin).toBe(carData.vin);
        expect(savedCar.model).toBe(carData.model);
    });

    it('insert car successfully, but the field does not defined in schema should be undefined', async () => {
        const carWithInvalidField = new Car({ uuid: '232324', vin: 'i343f939f9' });
        const savedCarWithInvalidField = await carWithInvalidField.save();
        expect(savedCarWithInvalidField._id).toBeDefined();
        expect(savedCarWithInvalidField.model).toBeUndefined();
    });

    it('create car without required field should failed', async () => {
        const carWithoutRequiredField = new Car({ vin: '283dj28dj' });
        let err;
        try {
            const savedCarWithoutRequiredField = await carWithoutRequiredField.save();
            err = savedCarWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.uuid).toBeDefined();
    });
})