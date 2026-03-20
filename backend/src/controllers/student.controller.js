export const getStudents = (req, res) => {
    res.send("All students data");
};

export const createStudent = (req, res) => {
    res.send("Student created");
};

export const updateStudent = (req, res) => {
    const { id } = req.params;
    res.send(`Student ${id} updated`);
};

export const deleteStudent = (req, res) => {
    const { id } = req.params;
    res.send(`Student ${id} deleted`);
};