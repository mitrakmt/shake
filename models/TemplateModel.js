import mongoose from 'mongoose';
const { Schema } = mongoose;

const templateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    layout: {
        type: String, // Reference to a layout file, code, or identifier
        required: true
    },
    colorScheme: {
        primaryColor: String,
        secondaryColor: String,
        backgroundColor: String,
        textColor: String
    },
    font: {
        fontFamily: String,
        fontSize: String
    },
    backgroundImage: String, // URL or reference to an image file
    elements: [{
        type: { type: String, enum: ['text', 'image', 'icon', 'qrCode', 'socialMediaLinks'] },
        content: String, // Text content or URL
        position: {
            x: Number,
            y: Number
        },
        size: {
            width: Number,
            height: Number
        },
        style: Schema.Types.Mixed // Additional CSS-like styling if needed
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const TemplateModel = mongoose.model('Template', templateSchema);

export default TemplateModel;