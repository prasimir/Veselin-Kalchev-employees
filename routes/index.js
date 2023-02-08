const express = require('express');
const router = express.Router();

const fileForm = '<form action="/process" enctype="multipart/form-data" method="post"><label class="custom-uploader" for="file">Upload CSV</label> <input id="file" accept="txt" name="fileToUpload" type="file" /> <button class="btn btn-success" name="submit" type="submit"> Upload File </button></form>';

router.get('/', (req, res, next) => {
    res.send(fileForm);
});

module.exports = router;
