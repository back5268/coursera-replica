import { addQuestionValid, listQuestionValid, updateQuestionValid, dedtailQuestionValid } from '@lib/validation';
import { addQuestionMd, countListQuestionMd, deleteQuestionMd, getDetailQuestionMd, getListQuestionMd, updateQuestionMd } from '@models';
import { validateData } from '@utils';

export const getListQuestion = async (req, res) => {
  try {
    const error = validateData(listQuestionValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, status } = req.query;
    const where = {};
    if (keySearch) where.$or = [{ content: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    const documents = await getListQuestionMd(where, page, limit);
    const total = await countListQuestionMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailQuestion = async (req, res) => {
  try {
    const error = validateData(dedtailQuestionValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = req.query;
    const data = await getDetailQuestionMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Câu hỏi không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const error = validateData(dedtailQuestionValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = req.body;
    const data = await deleteQuestionMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Câu hỏi không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addQuestion = async (req, res) => {
  try {
    const error = validateData(addQuestionValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { content, answers, courseId, note, status } = req.body;

    const checkContent = await getDetailQuestionMd({ content });
    if (checkContent) return res.status(400).json({ status: false, mess: 'Câu hỏi đã tồn tại!' });

    const data = await addQuestionMd({
      by: req.userInfo._id,
      content,
      answers,
      note,
      status
    });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const error = validateData(updateQuestionValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, content, answers, note, status } = req.body;

    if (content) {
      const checkContent = await getDetailQuestionMd({ content });
      if (checkContent) return res.status(400).json({ status: false, mess: 'Câu hỏi đã tồn tại!' });
    }

    const data = await updateQuestionMd(
      { _id },
      { updateBy: req.userInfo._id, content, answers, note, status }
    );
    if (!data) return res.status(400).json({ status: false, mess: 'Không tìm thấy câu hỏi!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
