import * as parse5 from 'parse5';
import * as  htmlparser2Adapter from 'parse5-htmlparser2-tree-adapter';
import { CommentInfo } from './CommentInfo';
import { JsDocExtractor } from './JsDocExtractor';
import { CommentKind } from './CommentKind';
const traverse = require('parse5-traverse');

export class HtmlCommentExtractor {
    public traverse(htmlText: string): CommentInfo[] {
        let result: CommentInfo[] = [];
        const htmlDoc = parse5.parse(htmlText, { sourceCodeLocationInfo: true, treeAdapter: htmlparser2Adapter });
        traverse(htmlDoc, {
            pre(node: any, parent: any) {
                if (node['type'] && node['type'] === 'comment') {
                    let data = <string>node['data'];
                    let kind = CommentKind.Html;
                    /*
                        let pos = <number>node['sourceCodeLocation']['startOffset'];
                        let end = <number>node['sourceCodeLocation']['endOffset'];
                        let startCol = <number>node['sourceCodeLocation']['startCol'];
                        let startLine = <number>node['sourceCodeLocation']['startLine'];    
                        let endCol = <number>node['sourceCodeLocation']['endCol'];
                        let endLine = <number>node['sourceCodeLocation']['endLine'];
                    */
                    let comment = new JsDocExtractor().extract(data, kind);
                    if (comment)
                        result.push(comment);
                }
            }
        });
        return result;
    }
}
