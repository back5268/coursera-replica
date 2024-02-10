import {addPostValid, listPostValid, updatePostValid, detailPostValid} from '@lib/validation';
import {
    addPostMd,
    countListPostMd,
    deletePostMd,
    getDetailPostMd,
    getListPostMd,
    updatePostMd,
    updateUserMd
} from '@models';
import {validateData} from '@utils';
import {uploadFileToFirebase} from "@lib/firebase";

export const getListPost = async (req, res) => {
    try {
        const {error, value} = validateData(listPostValid, req.query);
        if (error) return res.status(400).json({status: false, mess: error});
        const {page, limit, keySearch} = value;
        const where = {};
        if (keySearch) where.title = {$regex: keySearch, $options: 'i'}
        const documents = await getListPostMd(where, page, limit);
        const total = await countListPostMd(where);
        res.json({status: true, data: {documents, total}});
    } catch (error) {
        res.status(500).json({status: false, mess: error.toString()});
    }
};

export const detailPost = async (req, res) => {
    try {
        const {error, value} = validateData(detailPostValid, req.query);
        if (error) return res.status(400).json({status: false, mess: error});
        const {_id} = value;
        const data = await getDetailPostMd({_id});
        if (!data) return res.status(400).json({status: false, mess: 'Bài viết không tồn tại!'});
        res.json({status: true, data});
    } catch (error) {
        res.status(500).json({status: false, mess: error.toString()});
    }
};

export const deletePost = async (req, res) => {
    try {
        const {error, value} = validateData(detailPostValid, req.body);
        if (error) return res.status(400).json({status: false, mess: error});
        const {_id} = value;

        const post = await getDetailPostMd({_id});
        if (!post) return res.status(400).json({status: false, mess: 'Bài viết không tồn tại!'});

        if (req.userInfo.role !== 'admin' && post.by !== req.userInfo._id) return res.status(400).json({
            status: false,
            mess: 'Bạn không có quyền xóa bài viết này!'
        });
        const data = await deletePostMd({_id});

        res.status(201).json({status: true, data});
    } catch (error) {
        res.status(500).json({status: false, mess: error.toString()});
    }
};

export const addPost = async (req, res) => {
    try {
        const {error, value} = validateData(addPostValid, req.body);
        if (error) return res.status(400).json({status: false, mess: error});
        const {title, content, time, hashtag} = value;

        let image
        if (req.file) {
            image = await uploadFileToFirebase(req.file)
        }

        const data = await addPostMd({
            by: req.userInfo._id,
            title,
            content,
            time,
            hashtag,
            image
        });
        res.status(201).json({status: true, data});
    } catch (error) {
        res.status(500).json({status: false, mess: error.toString()});
    }
};

export const updatePost = async (req, res) => {
    try {
        const {error, value} = validateData(updatePostValid, req.body);
        if (error) return res.status(400).json({status: false, mess: error});
        let {_id, title, content, time, hashtag, image} = value;

        const post = await getDetailPostMd({_id});
        if (!post) return res.status(400).json({status: false, mess: 'Bài viết không tồn tại!'});

        if (req.userInfo.role !== 'admin' && post.by !== req.userInfo._id) return res.status(400).json({
            status: false,
            mess: 'Bạn không có quyền cập nhật bài viết này!'
        });

        if (req.file) {
            image = await uploadFileToFirebase(req.file)
        }

        const data = await updatePostMd({_id}, {title, content, time, hashtag, image});
        res.status(201).json({status: true, data});
    } catch (error) {
        res.status(500).json({status: false, mess: error.toString()});
    }
};

export const likePost = async (req, res) => {
    try {
        const {error, value} = validateData(detailPostValid, req.body);
        if (error) return res.status(400).json({status: false, mess: error});
        let {_id} = value;

        const post = await getDetailPostMd({_id});
        if (!post) return res.status(400).json({status: false, mess: 'Bài viết không tồn tại!'});

        let data
        if (post.likes?.includes(req.userInfo._id)) data = await updatePostMd({_id}, {$pull: {likes: req.userInfo._id}});
        else data = await updatePostMd({_id}, {$addToSet: {likes: req.userInfo._id}});
        res.status(201).json({status: true, data});
    } catch (error) {
        res.status(500).json({status: false, mess: error.toString()});
    }
};

export const savePost = async (req, res) => {
    try {
        const {error, value} = validateData(detailPostValid, req.body);
        if (error) return res.status(400).json({status: false, mess: error});
        let {_id} = value;

        const post = await getDetailPostMd({_id});
        if (!post) return res.status(400).json({status: false, mess: 'Bài viết không tồn tại!'});

        let data
        if (req.userInfo?.saves?.includes(_id)) data = await updateUserMd({_id: req.userInfo._id}, {$pull: {saves: _id}});
        else data = await updateUserMd({_id: req.userInfo._id}, {$addToSet: {saves: _id}});
        res.status(201).json({status: true, data});
    } catch (error) {
        res.status(500).json({status: false, mess: error.toString()});
    }
};
