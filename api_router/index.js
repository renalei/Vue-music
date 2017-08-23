var express     =       require('express');
var router      =       express.Router();
var index       =       require('../control/index.js');//引入模型文件导出的模块
module.exports =       router;
router.get('/getDiscList', index.index);

