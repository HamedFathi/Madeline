import * as parse5 from 'parse5';
import * as htmlparser2Adapter from 'parse5-htmlparser2-tree-adapter';
import { CommentInfo } from './CommentInfo';
import { JsDocExtractor } from './JsDocExtractor';
import { CommentKind } from './CommentKind';
/* eslint-disable */
// @ts-ignore
import traverse = require('parse5-traverse');
/* eslint-disable */

export class HtmlCommentExtractor {
    public traverse(htmlText: string): CommentInfo[] {
        const result: CommentInfo[] = [];
        const htmlDoc = parse5.parse(htmlText, { sourceCodeLocationInfo: true, treeAdapter: htmlparser2Adapter });
        traverse(htmlDoc, {
            /* eslint-disable */
            pre(node: any, parent: any) {
                /* eslint-disable */
                if (node['type'] && node['type'] === 'comment') {
                    const data = <string>node['data'];                    
                    const kind = CommentKind.Html;
                    /*
                        let pos = <number>node['sourceCodeLocation']['startOffset'];
                        let end = <number>node['sourceCodeLocation']['endOffset'];
                        let startCol = <number>node['sourceCodeLocation']['startCol'];
                        let startLine = <number>node['sourceCodeLocation']['startLine'];    
                        let endCol = <number>node['sourceCodeLocation']['endCol'];
                        let endLine = <number>node['sourceCodeLocation']['endLine'];
                    */
                    const comment = new JsDocExtractor().extract(data, kind);
                    if (comment) {
                        result.push(comment);
                    }
                }
            },
        });
        return result;
    }
}
