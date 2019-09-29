import { assert } from 'chai';
import { CommentInfo } from '../../../extractors/comment/CommentInfo';
import { CommentKind } from '../../../extractors/comment/CommentKind';
import { HtmlCommentExtractor } from '../../../extractors/comment/HtmlCommentExtractor';
import { JsDocExtractor } from '../../../extractors/comment/JsDocExtractor';


describe('HTML Extractor', () => {
    let mockCommentInfo: CommentInfo;
    let mockJsDocExtractor: JsDocExtractor;
    beforeEach(() => {
        mockCommentInfo = {
            text: "Some Comment",
            description: ["This is a sample comment"],
            kind: CommentKind.Html,
            kindName: "html",
            tags: [{
                tag: 'param',
                type: 'parameter',
                name: ["@param"],
                defaultValue: undefined,
                description: undefined
            }]
        };

        mockJsDocExtractor = {
            extract: function (data: string, kind: CommentKind): CommentInfo {
                return mockCommentInfo;
            }
        };
    });

    it('should return the exact comment info returned by JsDocExtractor', () => {

        const sut = `<template>
            <!-- Some Comment -->
            <input type="text" />
        </template>`;

        const htmlCommentExtractor = new HtmlCommentExtractor(mockJsDocExtractor);

        const result = htmlCommentExtractor.extract(sut);

        assert.equal(result.length, 1);
        assert.deepEqual(result, [mockCommentInfo]);

    });

    it('should not call the extract method of jsdocExtractor when no comment is available', () => {

        const sut = `<template>
        <button>Click Me!</button>
        </template>`;

        const htmlCommentExtractor = new HtmlCommentExtractor(mockJsDocExtractor);

        const result = htmlCommentExtractor.extract(sut);

        assert.equal(result.length, 0);
    })
})