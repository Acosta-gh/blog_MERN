const { Bookmark, User, Post } = require("../models");

const createBookmark = async (req, res) => {
    try {
        const { idPost } = req.params;
        const userId = req.user.id; // Obtenido del token JWT

        const user = await User.findByPk(userId);
        const post = await Post.findByPk(idPost);

        if (!user || !post) {
            return res.status(404).json({ message: "Usuario o Post no encontrado" });
        }

        const alreadySaved = await user.hasSavedPost(post);
        if (alreadySaved) {
            await user.removeSavedPost(post);
            return res.status(200).json({ message: "Post eliminado de guardados" });
        }

        await user.addSavedPost(post);

        return res.status(201).json({ message: "Post guardado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBookmarksByUser = async (req, res) => {
    try {
        const userId = req.user.id; // Obtenido del token JWT

        const user = await User.findByPk(userId, {
            include: {
                model: Post,
                as: "savedPosts",
                through: { attributes: [] }, // evita mostrar datos de la tabla intermedia
            },
        });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json(user.savedPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createBookmark, getBookmarksByUser }
