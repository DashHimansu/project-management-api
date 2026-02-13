// Import project service layer
// Service layer contains business logic and database interaction
const projectService = require("../services/projectService");


/**
 * @desc    Create a new project
 * @route   POST /api/v1/project/create
 * @access  Public
 */
const createProject = async (req, res) => {
    try {
        // Call service layer to create project
        const project = await projectService.createProject(req.body);

        // Return success response with created project
        res.status(201).json({
            success: true,
            data: project
        });
    } catch (error) {
        // Validation or business rule errors
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


/**
 * @desc    Get all non-deleted projects
 * @route   GET /api/v1/project/getall
 * @access  Public
 */
const getAllProjects = async (req, res) => {
    try {
        // Fetch all projects from service
        const projects = await projectService.getAllProjects();

        res.status(200).json({
            success: true,
            data: projects
        });
    } catch (error) {
        // Server/database error
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


/**
 * @desc    Get single project by ID
 * @route   GET /api/v1/project/:id
 * @access  Public
 */
const getProjectById = async (req, res) => {
    try {
        // Extract project ID from route parameters
        const { id } = req.params;

        const project = await projectService.getProjectById(id);

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        // If project not found
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};


/**
 * @desc    Update existing project
 * @route   PUT /api/v1/project/:id
 * @access  Public
 */
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;

        // Call service layer to update project
        const project = await projectService.updateProject(id, req.body);

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        // Validation error or invalid state transition
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


/**
 * @desc    Soft delete project
 * @route   DELETE /api/v1/project/:id
 * @access  Public
 */
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        // Perform soft delete (set deleted = true)
        await projectService.deleteProject(id);

        res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        });
    } catch (error) {
        // If project not found
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};


// Export controller functions
module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
};
