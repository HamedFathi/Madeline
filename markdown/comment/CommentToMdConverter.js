"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommentKind_1 = require("../../extractors/comment/CommentKind");
var StringUtils_1 = require("../../utilities/StringUtils");
var json2md = require("json2md");
var _ = require("lodash");
var CommentToMdConverter = (function () {
    function CommentToMdConverter() {
    }
    CommentToMdConverter.prototype.convert = function (commentsInfo, appendDescriptions, isMergeable) {
        var _this = this;
        if (appendDescriptions === void 0) { appendDescriptions = false; }
        if (isMergeable === void 0) { isMergeable = true; }
        commentsInfo.forEach(function (element) {
            _this.groupByTags(element);
        });
        var md = [];
        commentsInfo.forEach(function (commentInfo) {
            switch (commentInfo.kind) {
                case CommentKind_1.CommentKind.Html:
                    break;
                case CommentKind_1.CommentKind.JsSingleLine:
                    if (commentInfo.description) {
                        var info = json2md([
                            {
                                p: !appendDescriptions
                                    ? commentInfo.description
                                    : new StringUtils_1.StringUtils().joinLines(commentInfo.description, ' '),
                            },
                        ]);
                        md.push(info);
                    }
                    break;
                case CommentKind_1.CommentKind.JsMultiLine:
                    if (commentInfo.description) {
                        var info = json2md([
                            {
                                p: !appendDescriptions
                                    ? commentInfo.description
                                    : new StringUtils_1.StringUtils().joinLines(commentInfo.description, ' '),
                            },
                        ]);
                        md.push(info);
                    }
                    break;
            }
        });
        return md;
    };
    CommentToMdConverter.prototype.groupByTags = function (commentsInfo) {
        if (commentsInfo.tags) {
            var tagsGroup = _(commentsInfo.tags).groupBy(function (x) { return x.tag; }).values().value();
            tagsGroup.forEach(function (tagGroup) {
                var tags = tagGroup.map(function (u) { return u; });
                tags.forEach(function (tag) {
                });
            });
            var yy = 1;
        }
    };
    return CommentToMdConverter;
}());
exports.CommentToMdConverter = CommentToMdConverter;
//# sourceMappingURL=CommentToMdConverter.js.map