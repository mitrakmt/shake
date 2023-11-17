import { TemplateModel } from '../models/index.js';

const getAllTemplates = async () => {
    return await TemplateModel.find({});
};

const getTemplateById = async (templateId) => {
    return await TemplateModel.findById(templateId);
};

const createTemplate = async (templateData) => {
    const template = new TemplateModel(templateData);
    return await template.save();
};

const updateTemplate = async (templateId, updateData) => {
    return await TemplateModel.findByIdAndUpdate(templateId, updateData, { new: true });
};

const deleteTemplate = async (templateId) => {
    return await TemplateModel.findByIdAndDelete(templateId);
};

export {
    getAllTemplates,
    getTemplateById,
    createTemplate,
    updateTemplate,
    deleteTemplate
};