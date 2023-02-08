const express = require('express');
const multer  = require('multer');
const _ = require('lodash');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const router = express.Router();

const {importCSV}  = require('../utils/importData');
const {pairs, intersection, getDays}  = require('../utils/dateHandlers');



router.post('/', upload.single('fileToUpload'), (req, res, next) => {
    
    return importCSV(req.file.buffer).then(data => {
      listContent = "";
      let group = [];
      let grouped = _.groupBy(data, 'projectId');

      for (const key in grouped) {
        group.push(grouped[key]);
     }
      
     let tmp = group.flatMap(pairs).map(
        ([a, b]) => ({
          projectId: a.projectId,
          people: [a.personId, b.personId],
          overlappingDays: intersection(getDays(a.startDate, a.endDate), getDays(b.startDate, b.endDate)).length
        }));

      group = _.sortBy(tmp, 'overlappingDays').reverse();
      
      console.log("result>>", JSON.stringify(group, null, "  "));

      // show top 10 results
      for(var i = 0; i <= 10; i++) {
        if (group[i]) {
          listContent = listContent + "<li>" + group[i].people.join(", ") + ", " + group[i].overlappingDays + "</li>"
        }
      }

      res.send("<ul>" + listContent + "</ul>");
    });
    
    
});

module.exports = router;
