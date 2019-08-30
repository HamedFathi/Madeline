import { assert } from "chai";
import { Project, ScriptTarget, SyntaxKind, ClassDeclaration, ExpressionStatement } from 'ts-morph';
import { ExpressionExtractor } from '../../../extractors/expression/ExpressionExtractor';
import { ExpressionInfo } from '../../../extractors/expression/ExpressionInfo';

const expSample = `
(x: number, y: number): number => {
	return x + y;
};

Vue.component('base-checkbox', {
	model: {
		prop: 'checked',
		event: 'change'
	},
	props: {
		checked: Boolean
	},
	template: ""
});

Vue.use(Router);

export class App {
	configureRouter(config, router) {
		this.router = router;
		config.title = 'Aurelia';
		config.map([{
					route: ['', 'home'],
					name: 'home',
					moduleId: 'home/index'
				}, {
					route: 'users',
					name: 'users',
					moduleId: 'users/index',
					nav: true,
					title: 'Users'
				}, {
					route: 'users/:id/detail',
					name: 'userDetail',
					moduleId: 'users/detail'
				}, {
					route: 'files/*path',
					name: 'files',
					moduleId: 'files/index',
					nav: 0,
					title: 'Files',
					href: '#files'
				}
			]);
	}
}
`;

describe('Expression Extractor', function () {
    it('should return correct ExpressionInfo', function () {
        const project = new Project({
            compilerOptions: {
                target: ScriptTarget.ES5
            }
        });
        const file = project.createSourceFile("test.ts", expSample);
        let actualResult: ExpressionInfo[] = [];
        let expectedResult: ExpressionInfo[] = [{
            "text": "(x: number, y: number): number => {\n\treturn x + y;\n};",
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modules": undefined
        }, {
            "text": "Vue.component('base-checkbox', {\n\tmodel: {\n\t\tprop: 'checked',\n\t\tevent: 'change'\n\t},\n\tprops: {\n\t\tchecked: Boolean\n\t},\n\ttemplate: \"\"\n});",
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modules": undefined
        }, {
            "text": "Vue.use(Router);",
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modules": undefined
        }, {
            "text": "this.router = router;",
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modules": undefined
        }, {
            "text": "config.title = 'Aurelia';",
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modules": undefined
        }, {
            "text": "config.map([{\n\t\t\t\t\troute: ['', 'home'],\n\t\t\t\t\tname: 'home',\n\t\t\t\t\tmoduleId: 'home/index'\n\t\t\t\t}, {\n\t\t\t\t\troute: 'users',\n\t\t\t\t\tname: 'users',\n\t\t\t\t\tmoduleId: 'users/index',\n\t\t\t\t\tnav: true,\n\t\t\t\t\ttitle: 'Users'\n\t\t\t\t}, {\n\t\t\t\t\troute: 'users/:id/detail',\n\t\t\t\t\tname: 'userDetail',\n\t\t\t\t\tmoduleId: 'users/detail'\n\t\t\t\t}, {\n\t\t\t\t\troute: 'files/*path',\n\t\t\t\t\tname: 'files',\n\t\t\t\t\tmoduleId: 'files/index',\n\t\t\t\t\tnav: 0,\n\t\t\t\t\ttitle: 'Files',\n\t\t\t\t\thref: '#files'\n\t\t\t\t}\n\t\t\t]);",
            "trailingComments": undefined,
            "leadingComments": undefined,
            "modules": undefined
        }];
        file.forEachDescendant(x => {
            switch (x.getKind()) {
                case SyntaxKind.ExpressionStatement:
                    let expVisitor = new ExpressionExtractor();
                    let expressions = expVisitor.extract(<ExpressionStatement>x);
                    actualResult.push(expressions);
                    break;
            }
        });
        assert.deepEqual(actualResult, expectedResult);
    });
});

