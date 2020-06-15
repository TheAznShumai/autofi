import mongoose from 'mongoose';
import ProviderSourceConfig from 'models/ProviderSourceConfig';
import { setupDatabase, closeDatabase, clearDatabase } from 'test/setup/mongo-mem-server';

beforeAll(async () => await setupDatabase());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('ProviderSourceConfig Model Test', () => {
    const providerSourceConfigData = { provider: "someProvider", header: false, mapping: { "uuid": 0, "vin": 1 }};

    it('create & save providerSourceConfig successfully', async () => {
        const validProviderSourceConfig = new ProviderSourceConfig(providerSourceConfigData);
        const savedProviderSourceConfig = await validProviderSourceConfig.save();
        expect(savedProviderSourceConfig._id).toBeDefined();
        expect(savedProviderSourceConfig.provider).toBe(providerSourceConfigData.provider);
        expect(savedProviderSourceConfig.header).toBe(providerSourceConfigData.header);
        expect(savedProviderSourceConfig.mapping).toBe(providerSourceConfigData.mapping);
    });

    it('create providerSourceConfig without required field should failed', async () => {
        const providerSourceConfigWithoutRequiredField = new ProviderSourceConfig({ header: true, mapping: { "uuid": "uid" } });
        let err;
        try {
            const savedProviderSourceConfigWithoutRequiredField = await providerSourceConfigWithoutRequiredField.save();
            err = savedProviderSourceConfigWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.provider).toBeDefined();
    });
})