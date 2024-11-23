import mongoose from 'mongoose';
import CONNECTION_STRING from '@env';
let models = {}

try {
    await mongoose.connect(CONNECTION_STRING)
} catch (error) {
    console.log(error);
}
