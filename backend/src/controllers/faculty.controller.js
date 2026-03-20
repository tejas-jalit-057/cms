// controllers/faculty.controller.js

export const getFaculty = (req, res) => {
    res.send("All faculty data");
};

export const createFaculty = (req, res) => {
    res.send("Faculty created");
};

export const updateFaculty = (req, res) => {
    const { id } = req.params;
    res.send(`Faculty ${id} updated`);
};

export const deleteFaculty = (req, res) => {
    const { id } = req.params;
    res.send(`Faculty ${id} deleted`);
};