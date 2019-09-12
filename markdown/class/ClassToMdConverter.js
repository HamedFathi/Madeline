"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json2md = require("json2md");
var ClassToMdConverter = (function () {
    function ClassToMdConverter() {
    }
    ClassToMdConverter.prototype.convert = function (classInfo) {
        var md = json2md([
            {
                h2: classInfo.name,
            },
        ]);
        return md;
    };
    return ClassToMdConverter;
}());
exports.ClassToMdConverter = ClassToMdConverter;
//# sourceMappingURL=ClassToMdConverter.js.map