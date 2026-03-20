// controllers/admin.controller.js

export const getAdmins = (req, res) => {
    res.send("All admins data");
};

export const updateAdmin = (req, res) => {
    const { id } = req.params;
    res.send(`Admin ${id} updated`);
};