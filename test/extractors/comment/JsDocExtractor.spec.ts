import { Project, ScriptTarget } from "ts-morph";
import { CommentInfo } from '../../../extractors/comment/CommentInfo';
import { JsDocExtractor } from '../../../extractors/comment/JsDocExtractor';
import { CommentKind } from '../../../extractors/comment/CommentKind';
import { assert } from 'chai';

const comment = `
/**
* Group description A
* Group description B
* Group description C
*
* @tagname1
* @tagname2 name2
* @return this is a test1.
* @tagname3 name3 - description3 
* @tagname4 {type}
* Description4
* @tagname5 {type5} name5
* @tagname6 {type6} "name6 name6" - description6
* Description6.1
* Description6.2
* @tagname7 {type7} [defaultValue=name7] - description7
*/
`;

describe('JsDoc Extractor', function () {
    it('should return correct CommentInfo', function () {
        let expectedResult: CommentInfo = {
            "text": "\n/**\n* Group description A\n* Group description B\n* Group description C\n*\n* @tagname1\n* @tagname2 name2\n* @return this is a test1.\n* @tagname3 name3 - description3 \n* @tagname4 {type}\n* Description4\n* @tagname5 {type5} name5\n* @tagname6 {type6} \"name6 name6\" - description6\n* Description6.1\n* Description6.2\n* @tagname7 {type7} [defaultValue=name7] - description7\n*/\n",
            "kind": 1,
            "kindName": "JsMultiLine",
            "description": ["Group description A", "Group description B", "Group description C"],
            "tags": [{
                    "tag": "@tagname1",
                    "type": undefined,
                    "name": undefined,
                    "defaultValue": undefined,
                    "description": undefined
                }, {
                    "tag": "@tagname2",
                    "type": undefined,
                    "name": ["name2"],
                    "defaultValue": undefined,
                    "description": undefined
                }, {
                    "tag": "@return",
                    "type": undefined,
                    "name": ["this is a test1"],
                    "defaultValue": undefined,
                    "description": undefined
                }, {
                    "tag": "@tagname3",
                    "type": undefined,
                    "name": ["name3"],
                    "defaultValue": undefined,
                    "description": ["description3"]
                }, {
                    "tag": "@tagname4",
                    "type": "type",
                    "name": undefined,
                    "defaultValue": undefined,
                    "description": ["Description4"]
                }, {
                    "tag": "@tagname5",
                    "type": "type5",
                    "name": ["name5"],
                    "defaultValue": undefined,
                    "description": undefined
                }, {
                    "tag": "@tagname6",
                    "type": "type6",
                    "name": ["name6 name6"],
                    "defaultValue": undefined,
                    "description": ["description6", "Description6.1", "Description6.2"]
                }, {
                    "tag": "@tagname7",
                    "type": "type7",
                    "name": undefined,
                    "defaultValue": "name7",
                    "description": ["description7"]
                }
            ]
        };
           
        let actualResult = new JsDocExtractor().extract(comment,CommentKind.JsMultiLine);
        assert.deepEqual(actualResult, expectedResult);
    });
});

