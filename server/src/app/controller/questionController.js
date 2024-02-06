import {
    addQuestionValid,
    listQuestionValid,
    updateQuestionValid,
    detailQuestionValid
} from '@lib/validation';
import {
    addQuestionMd,
    countListQuestionMd,
    deleteQuestionMd,
    getDetailLessonMd,
    getDetailQuestionMd, getListLessonMd,
    getListQuestionMd, updateLessonMd,
    updateQuestionMd
} from '@models';
import {validateData} from '@utils';

export const getListQuestion = async (req, res) => {
    try {
        const error = validateData(listQuestionValid, req.query);
        if (error) return res.status(400).json({status: false, mess: error});
        const {page, limit, keySearch, status, courseId, lessonId} = req.query;
        const where = {};
        let lessonIds = []
        if (courseId) {
            const lessons = await getListLessonMd({status: 1, courseId})
            if (lessons?.length > 0) lessons.forEach(l => lessonId.push(l._id))
        }
        if (lessonId) {
            if (lessonIds.length > 0) lessonIds.filter(l => l === lessonId)
            else lessonIds.push(lessonId)
        }
        if (courseId || lessonId) where.lessonId = {$in: lessonIds}
        if (keySearch) where.content = {$regex: keySearch, $options: 'i'}
        if (status || status === 0) where.status = status;
        const documents = await getListQuestionMd(where, page, limit);
        const total = await countListQuestionMd(where);
        res.json({status: true, data: {documents, total}});
    } catch (error) {
        res.status(500).json({status: false, mess: error.toString()});
    }
};

export const detailQuestion = async (req, res) => {
    try {
        const error = validateData(detailQuestionValid, req.query);
        if (error) return res.status(400).json({status: false, mess: error});
        const {_id} = req.query;
        const data = await getDetailQuestionMd({_id});
        if (!data) return res.status(400).json({status: false, mess: 'Câu hỏi không tồn tại!'});
        res.json({status: true, data});
    } catch (error) {
        res.status(500).json({status: false, mess: error.toString()});
    }
};

export const deleteQuestion = async (req, res) => {
    try {
        const error = validateData(detailQuestionValid, req.body);
        if (error) return res.status(400).json({status: false, mess: error});
        const {_id} = req.body;
        const data = await deleteQuestionMd({_id});
        if (!data) return res.status(400).json({status: false, mess: 'Câu hỏi không tồn tại!'});
        res.status(201).json({status: true, data});
    } catch (error) {
        res.status(500).json({status: false, mess: error.toString()});
    }
};

export const addQuestion = async (req, res) => {
    try {
        const error = validateData(addQuestionValid, req.body);
        if (error) return res.status(400).json({status: false, mess: error});
        const {lessonId, content, answers, status} = req.body;

        const checkContent = await getDetailQuestionMd({content});
        if (checkContent) return res.status(400).json({status: false, mess: 'Câu hỏi đã tồn tại!'});

        const checkLesson = await getDetailLessonMd({_id: lessonId, status: 1});
        if (!checkLesson) return res.status(400).json({status: false, mess: 'Bài giảng không tồn tại!'});

        const data = await addQuestionMd({
            by: req.userInfo._id,
            content,
            answers,
            lessonId,
            status
        });

        await updateLessonMd({_id: checkLesson._id}, {$addToSet: {questions: data._id}})
        res.status(201).json({status: true, data});
    } catch (error) {
        res.status(500).json({status: false, mess: error.toString()});
    }
};

export const updateQuestion = async (req, res) => {
    try {
        const error = validateData(updateQuestionValid, req.body);
        if (error) return res.status(400).json({status: false, mess: error});
        const {_id, lessonId, content, answers, status} = req.body;

        const question = await getDetailQuestionMd({_id});
        if (!question) return res.status(400).json({status: false, mess: 'Câu hỏi không tồn tại!'});

        if (content) {
            const checkContent = await getDetailQuestionMd({content});
            if (checkContent) return res.status(400).json({status: false, mess: 'Câu hỏi đã tồn tại!'});
        }

        if (lessonId) {
            const checkLesson = await getDetailLessonMd({id: lessonId, status: 1});
            if (!checkLesson) return res.status(400).json({status: false, mess: 'Bài giảng không tồn tại!'});
            await updateLessonMd({_id: checkLesson._id}, {$addToSet: {questions: _id}})
            await updateLessonMd({_id: question.lessonId}, {$pull: {questions: _id}})
        }

        const data = await updateQuestionMd(
            {_id},
            {updateBy: req.userInfo._id, content, answers, lessonId, status}
        );
        res.status(201).json({status: true, data});
    } catch (error) {
        res.status(500).json({status: false, mess: error.toString()});
    }
};
