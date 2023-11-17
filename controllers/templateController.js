import { getAllTemplates, getTemplateById, createTemplate, updateTemplate, deleteTemplate } from '../services/templateService.js';

const fetchAllTemplates = async (req, res) => {
    try {
        const templates = await getAllTemplates();
        res.json(templates);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const fetchTemplateById = async (req, res) => {
    try {
        const template = await getTemplateById(req.params.id);
        res.json(template);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addTemplate = async (req, res) => {
    try {
        const newTemplate = await createTemplate(req.body);
        res.status(201).json(newTemplate);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateTemplateDetails = async (req, res) => {
    try {
        const updatedTemplate = await updateTemplate(req.params.id, req.body);
        if (!updatedTemplate) {
            return res.status(404).send('Template not found');
        }
        res.json(updatedTemplate);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const removeTemplate = async (req, res) => {
    try {
        const deletedTemplate = await deleteTemplate(req.params.id);
        if (!deletedTemplate) {
            return res.status(404).send('Template not found');
        }
        res.status(200).send('Template deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export default { fetchAllTemplates, fetchTemplateById, addTemplate, updateTemplateDetails, removeTemplate };

