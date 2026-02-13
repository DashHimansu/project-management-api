const express = require("express");
const router = express.Router();

// Import project controller
const projectController = require("../controllers/projectController");

/**
 * @route   POST /api/v1/project/create
 * @desc    Create a new project
 */
router.post("/create", projectController.createProject);

/**
 * @route   GET /api/v1/project/getall
 * @desc    Get all projects
 */
router.get("/getall", projectController.getAllProjects);

/**
 * @route   GET /api/v1/project/:id
 * @desc    Get project by ID
 */
router.get("/:id", projectController.getProjectById);

/**
 * @route   PUT /api/v1/project/:id
 * @desc    Update project
 */
router.put("/:id", projectController.updateProject);

/**
 * @route   DELETE /api/v1/project/:id
 * @desc    Soft delete project
 */
router.delete("/:id", projectController.deleteProject);

module.exports = router;
