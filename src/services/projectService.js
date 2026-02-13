const { pool } = require("../../config/db");
const { v4: uuidv4 } = require("uuid");
const Project = require("../models/Project");


// CREATE
const createProject = async (data) => {

    const id = uuidv4();

    const project = new Project({
        id,
        ...data
    });

    Project.validate(project);

    await pool.query(
        `INSERT INTO projects 
        (id, name, clientName, status, startDate, endDate, deleted)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            project.id,
            project.name,
            project.clientName,
            project.status,
            project.startDate,
            project.endDate,
            false
        ]
    );

    return project;
};


// READ ALL
const getAllProjects = async () => {
    const [rows] = await pool.query(
        "SELECT * FROM projects WHERE deleted = FALSE"
    );
    return rows;
};


// READ BY ID
const getProjectById = async (id) => {
    const [rows] = await pool.query(
        "SELECT * FROM projects WHERE id = ? AND deleted = FALSE",
        [id]
    );

    if (rows.length === 0) throw new Error("Project not found");

    return rows[0];
};


// UPDATE
const updateProject = async (id, updateData) => {

    const existing = await getProjectById(id);

    const project = new Project(existing);

    // Status transition check
    if (updateData.status && !project.canTransitionTo(updateData.status)) {
        throw new Error("Invalid status transition");
    }

    const updatedProject = {
        ...existing,
        ...updateData
    };

    Project.validate(updatedProject);

    await pool.query(
        `UPDATE projects 
         SET name = ?, clientName = ?, status = ?, 
             startDate = ?, endDate = ?
         WHERE id = ?`,
        [
            updatedProject.name,
            updatedProject.clientName,
            updatedProject.status,
            updatedProject.startDate,
            updatedProject.endDate,
            id
        ]
    );

    return updatedProject;
};


// SOFT DELETE
const deleteProject = async (id) => {

    const [result] = await pool.query(
        "UPDATE projects SET deleted = TRUE WHERE id = ?",
        [id]
    );

    if (result.affectedRows === 0) {
        throw new Error("Project not found");
    }

    return true;
};


module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
};
