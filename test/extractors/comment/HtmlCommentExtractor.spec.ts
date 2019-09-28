import { assert } from 'chai';
import { CommentInfo } from '../../../extractors/comment/CommentInfo';
import { CommentKind } from '../../../extractors/comment/CommentKind';
import { HtmlCommentExtractor } from '../../../extractors/comment/HtmlCommentExtractor';


describe('HTML Extractor', () => {

    it('should return the exact comment info returned by JsDocExtractor', () => {

        const mockCommentInfo: CommentInfo = {
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

        const mockJsDocExtractor = {
            extract: function (data: string, kind: CommentKind): CommentInfo {
                return mockCommentInfo;
            }
        };

        const sut = `<template>
            <!-- Some Comment -->
            <input type="text" />
        </template>`;

        const htmlCommentExtractor = new HtmlCommentExtractor(mockJsDocExtractor);

        const result = htmlCommentExtractor.extract(sut);

        assert.equal(result.length, 1);
        assert.deepEqual(result, [mockCommentInfo]);

    });
})