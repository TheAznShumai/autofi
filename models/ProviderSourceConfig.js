import mongoose from 'mongoose';

const ProviderSourceConfigSchema = mongoose.Schema({
    provider: {
        type: String,
        required: true
    },
    header: {
        type: Boolean,
        require: true 
    },
    mapping: {
       type: Object,
       required: true
    }
});

export default mongoose.model('Providers', ProviderSourceConfigSchema);