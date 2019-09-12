"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json2md = require("json2md");
var PrettifierUtils_1 = require("../../utilities/PrettifierUtils");
var ModuleToMdConverter = (function () {
    function ModuleToMdConverter() {
        this.HYPHEN = '-';
        this.NAMESPACE = '`namespace`';
        this.MODULE = '`module`';
        this.SEPARATOR = ', ';
        this.TITLE = 'MODULE';
        this.SOURCE = 'Source';
        this.INFORMATION = 'Information';
        this.TS = 'ts';
        this.HEADERS = ['name', 'type', 'modifiers'];
        this.BREAK_LINE = /\r?\n/;
    }
    ModuleToMdConverter.prototype.convert = function (moduleInfo) {
        var result = [];
        for (var index = moduleInfo.length - 1; index >= 0; index--) {
            var module_1 = moduleInfo[index];
            var modifiers = module_1.modifiers === undefined
                ? this.HYPHEN
                : module_1.modifiers.map(function (x) { return '`' + x + '`'; }).join(this.SEPARATOR);
            var type = module_1.isNamespace ? this.NAMESPACE : this.MODULE;
            var text = new PrettifierUtils_1.PrettierUtils().prettify(module_1.text).split(this.BREAK_LINE);
            var md = json2md([
                {
                    h3: this.TITLE,
                },
                {
                    h5: this.INFORMATION,
                },
                {
                    table: {
                        headers: this.HEADERS,
                        rows: [[module_1.name, type, modifiers]],
                    },
                },
                {
                    h5: this.SOURCE,
                },
                {
                    code: {
                        language: this.TS,
                        content: text,
                    },
                },
            ]);
            result.push(md);
        }
        return result;
    };
    return ModuleToMdConverter;
}());
exports.ModuleToMdConverter = ModuleToMdConverter;
//# sourceMappingURL=ModuleToMdConverter.js.map