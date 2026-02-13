class Project {
    constructor({
        id,
        name,
        clientName,
        status,
        startDate,
        endDate = null,
        deleted = false,
        createdAt = null,
        updatedAt = null
    }) {
        this.id = id;
        this.name = name;
        this.clientName = clientName;
        this.status = status || 'planned'; // default
        this.startDate = startDate;
        this.endDate = endDate;
        this.deleted = deleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static validate(project) {
        if (!project.name) throw new Error("Project name is required");
        if (!project.clientName) throw new Error("Client name is required");

        const validStatuses = ['planned', 'active', 'on_hold', 'completed'];
        if (!validStatuses.includes(project.status)) {
            throw new Error("Invalid project status");
        }

        if (project.endDate && new Date(project.endDate) < new Date(project.startDate)) {
            throw new Error("End date cannot be before start date");
        }
    }

    canTransitionTo(newStatus) {
        const transitions = {
            planned: ['active', 'on_hold', 'completed'],
            active: ['on_hold', 'completed'],
            on_hold: ['active', 'completed'],
            completed: []
        };
        return transitions[this.status].includes(newStatus);
    }
}

module.exports = Project;
