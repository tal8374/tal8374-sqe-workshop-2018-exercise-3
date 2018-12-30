import assert from 'assert';
import {parseCode} from '../src/js/utils/code-analyzer';
import {FlowchartHandler} from '../src/js/flowchart/flowchart-handler';
import {ColorHandler} from '../src/js/color-condition/color-handler';
import {facadeDeclaration} from '../src/js/statement-payload/facade-declaration-handler';
import $ from 'jquery';
import {SymbolicSubstitutionHandler} from '../src/js/statement-symbolic-substitution/symbolic-substitution-handler';

describe('The flow handler', () => {
    it('is should create flow from if statement', () => {
        let codeToParse = 'function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '    }\n' +
            '    \n' +
            '    return c;\n' +
            '}\n';


        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payloads = facadeDeclarationHandler.getPayloads();

        let symbolicSubstitution = new SymbolicSubstitutionHandler(payloads);
        symbolicSubstitution.doSymbolicSubstitution();

        let inputCode = [1, 2, 3];

        let colorCode = new ColorHandler(payloads, null, inputCode, {isMarked: false});
        colorCode.colorCode();

        if (payloads[0].type === 'FunctionDeclaration') {
            payloads = payloads[0].body;
        }

        let flowchartInstance = new FlowchartHandler(payloads);
        flowchartInstance.addNullNode();
        flowchartInstance.addEmptyNode();
        flowchartInstance.createID({id: 1});
        flowchartInstance.declareNode();
        flowchartInstance.markNodeAsVisited({isFunctionDone: false, isEnteredIfStatement: false});
        flowchartInstance.updateNextNode();
        let flowchartData = [];
        flowchartInstance.createNodeDeclarationCode(flowchartData);
        flowchartInstance.createNodeNextCode(flowchartData);
        assert.equal(
            flowchartData.length,
            24,
        );
    });

    it('is should create flow from if statement true', () => {
        let codeToParse = 'function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (true) {\n' +
            '        c = c + 5;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '    }\n' +
            '    \n' +
            '    return c;\n' +
            '}\n';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payloads = facadeDeclarationHandler.getPayloads();

        let symbolicSubstitution = new SymbolicSubstitutionHandler(payloads);
        symbolicSubstitution.doSymbolicSubstitution();

        let inputCode = [1, 2, 3];

        let colorCode = new ColorHandler(payloads, null, inputCode, {isMarked: false});
        colorCode.colorCode();

        if (payloads[0].type === 'FunctionDeclaration') {
            payloads = payloads[0].body;
        }

        let flowchartInstance = new FlowchartHandler(payloads);
        flowchartInstance.addNullNode();
        flowchartInstance.addEmptyNode();
        flowchartInstance.createID({id: 1});
        flowchartInstance.declareNode();
        flowchartInstance.markNodeAsVisited({isFunctionDone: false, isEnteredIfStatement: false});
        flowchartInstance.updateNextNode();
        let flowchartData = [];
        flowchartInstance.createNodeDeclarationCode(flowchartData);
        flowchartInstance.createNodeNextCode(flowchartData);
        assert.equal(
            flowchartData.length,
            24,
        );
    });

    it('is should create flow from else if statement true', () => {
        let codeToParse = 'function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (false) {\n' +
            '        c = c + 5;\n' +
            '    } else if (true) {\n' +
            '        c = c + x + 5;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '    }\n' +
            '    \n' +
            '    return c;\n' +
            '}\n';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payloads = facadeDeclarationHandler.getPayloads();

        let symbolicSubstitution = new SymbolicSubstitutionHandler(payloads);
        symbolicSubstitution.doSymbolicSubstitution();

        let inputCode = [1, 2, 3];

        let colorCode = new ColorHandler(payloads, null, inputCode, {isMarked: false});
        colorCode.colorCode();

        if (payloads[0].type === 'FunctionDeclaration') {
            payloads = payloads[0].body;
        }

        let flowchartInstance = new FlowchartHandler(payloads);
        flowchartInstance.addNullNode();
        flowchartInstance.addEmptyNode();
        flowchartInstance.createID({id: 1});
        flowchartInstance.declareNode();
        flowchartInstance.markNodeAsVisited({isFunctionDone: false, isEnteredIfStatement: false});
        flowchartInstance.updateNextNode();
        let flowchartData = [];
        flowchartInstance.createNodeDeclarationCode(flowchartData);
        flowchartInstance.createNodeNextCode(flowchartData);
        assert.equal(
            flowchartData.length,
            24,
        );
    });

    it('is should create flow from else statement true', () => {
        let codeToParse = 'function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (false) {\n' +
            '        c = c + 5;\n' +
            '    } else if (false) {\n' +
            '        c = c + x + 5;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '    }\n' +
            '    \n' +
            '    return c;\n' +
            '}\n';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payloads = facadeDeclarationHandler.getPayloads();

        let symbolicSubstitution = new SymbolicSubstitutionHandler(payloads);
        symbolicSubstitution.doSymbolicSubstitution();

        let inputCode = [1, 2, 3];

        let colorCode = new ColorHandler(payloads, null, inputCode, {isMarked: false});
        colorCode.colorCode();

        if (payloads[0].type === 'FunctionDeclaration') {
            payloads = payloads[0].body;
        }

        let flowchartInstance = new FlowchartHandler(payloads);
        flowchartInstance.addNullNode();
        flowchartInstance.addEmptyNode();
        flowchartInstance.createID({id: 1});
        flowchartInstance.declareNode();
        flowchartInstance.markNodeAsVisited({isFunctionDone: false, isEnteredIfStatement: false});
        flowchartInstance.updateNextNode();
        let flowchartData = [];
        flowchartInstance.createNodeDeclarationCode(flowchartData);
        flowchartInstance.createNodeNextCode(flowchartData);
        assert.equal(
            flowchartData.length,
            24,
        );
    });

    it('is should create flow from while statement', () => {
        let codeToParse = 'function foo(x, y, z){\n' +
            '   let a = x + 1;\n' +
            '   let b = a + y;\n' +
            '   let c = 0;\n' +
            '   \n' +
            '   while (a < z) {\n' +
            '       c = a + b;\n' +
            '       z = c * 2;\n' +
            '       a++;\n' +
            '   }\n' +
            '   \n' +
            '   return z;\n' +
            '}\n';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payloads = facadeDeclarationHandler.getPayloads();

        let symbolicSubstitution = new SymbolicSubstitutionHandler(payloads);
        symbolicSubstitution.doSymbolicSubstitution();

        let inputCode = [1, 2, 3];

        let colorCode = new ColorHandler(payloads, null, inputCode, {isMarked: false});
        colorCode.colorCode();

        if (payloads[0].type === 'FunctionDeclaration') {
            payloads = payloads[0].body;
        }

        let flowchartInstance = new FlowchartHandler(payloads);
        flowchartInstance.addNullNode();
        flowchartInstance.addEmptyNode();
        flowchartInstance.createID({id: 1});
        flowchartInstance.declareNode();
        flowchartInstance.markNodeAsVisited({isFunctionDone: false, isEnteredIfStatement: false});
        flowchartInstance.updateNextNode();
        let flowchartData = [];
        flowchartInstance.createNodeDeclarationCode(flowchartData);
        flowchartInstance.createNodeNextCode(flowchartData);
        assert.equal(
            flowchartData.length,
            18,
        );
    });

    it('is should create flow from while statement (true)', () => {
        let codeToParse = 'function foo(x, y, z){\n' +
            '   let a = x + 1;\n' +
            '   let b = a + y;\n' +
            '   let c = 0;\n' +
            '   \n' +
            '   while (true) {\n' +
            '       c = a + b;\n' +
            '       z = c * 2;\n' +
            '       a++;\n' +
            '   }\n' +
            '   \n' +
            '   return z;\n' +
            '}\n';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payloads = facadeDeclarationHandler.getPayloads();

        let symbolicSubstitution = new SymbolicSubstitutionHandler(payloads);
        symbolicSubstitution.doSymbolicSubstitution();

        let inputCode = [1, 2, 3];

        let colorCode = new ColorHandler(payloads, null, inputCode, {isMarked: false});
        colorCode.colorCode();

        if (payloads[0].type === 'FunctionDeclaration') {
            payloads = payloads[0].body;
        }

        let flowchartInstance = new FlowchartHandler(payloads);
        flowchartInstance.addNullNode();
        flowchartInstance.addEmptyNode();
        flowchartInstance.createID({id: 1});
        flowchartInstance.declareNode();
        flowchartInstance.markNodeAsVisited({isFunctionDone: false, isEnteredIfStatement: false});
        flowchartInstance.updateNextNode();
        let flowchartData = [];
        flowchartInstance.createNodeDeclarationCode(flowchartData);
        flowchartInstance.createNodeNextCode(flowchartData);
        assert.equal(
            flowchartData.length,
            18,
        );
    });

    it('is should create flow from while statement (false)', () => {
        let codeToParse = 'function foo(x, y, z){\n' +
            '   let a = x + 1;\n' +
            '   let b = a + y;\n' +
            '   let c = 0;\n' +
            '   \n' +
            '   while (false) {\n' +
            '       c = a + b;\n' +
            '       z = c * 2;\n' +
            '       a++;\n' +
            '   }\n' +
            '   \n' +
            '   return z;\n' +
            '}\n';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payloads = facadeDeclarationHandler.getPayloads();

        let symbolicSubstitution = new SymbolicSubstitutionHandler(payloads);
        symbolicSubstitution.doSymbolicSubstitution();

        let inputCode = [1, 2, 3];

        let colorCode = new ColorHandler(payloads, null, inputCode, {isMarked: false});
        colorCode.colorCode();

        if (payloads[0].type === 'FunctionDeclaration') {
            payloads = payloads[0].body;
        }

        let flowchartInstance = new FlowchartHandler(payloads);
        flowchartInstance.addNullNode();
        flowchartInstance.addEmptyNode();
        flowchartInstance.createID({id: 1});
        flowchartInstance.declareNode();
        flowchartInstance.markNodeAsVisited({isFunctionDone: false, isEnteredIfStatement: false});
        flowchartInstance.updateNextNode();
        let flowchartData = [];
        flowchartInstance.createNodeDeclarationCode(flowchartData);
        flowchartInstance.createNodeNextCode(flowchartData);
        assert.equal(
            flowchartData.length,
            18,
        );
    });

    it('is should handle return in the middle', () => {
        let codeToParse = 'function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (false) {\n' +
            '        c = c + 5;\n' +
            '    } else if (false) {\n' +
            '        c = c + x + 5;\n' +
            '    } else {\n' +
            'return 1;\n' +
            '        c = c + z + 5;\n' +
            '    }\n' +
            '    \n' +
            '    return c;\n' +
            '}\n';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payloads = facadeDeclarationHandler.getPayloads();

        let symbolicSubstitution = new SymbolicSubstitutionHandler(payloads);
        symbolicSubstitution.doSymbolicSubstitution();

        let inputCode = [1, 2, 3];

        let colorCode = new ColorHandler(payloads, null, inputCode, {isMarked: false});
        colorCode.colorCode();

        if (payloads[0].type === 'FunctionDeclaration') {
            payloads = payloads[0].body;
        }

        let flowchartInstance = new FlowchartHandler(payloads);
        flowchartInstance.addNullNode();
        flowchartInstance.addEmptyNode();
        flowchartInstance.createID({id: 1});
        flowchartInstance.declareNode();
        flowchartInstance.markNodeAsVisited({isFunctionDone: false, isEnteredIfStatement: false});
        flowchartInstance.updateNextNode();
        let flowchartData = [];
        flowchartInstance.createNodeDeclarationCode(flowchartData);
        flowchartInstance.createNodeNextCode(flowchartData);
        assert.equal(
            flowchartData.length,
            26,
        );
    });

    it('is should handle one variable', () => {
        let codeToParse = 'function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    \n' +
            '    return c;\n' +
            '}\n';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payloads = facadeDeclarationHandler.getPayloads();

        let symbolicSubstitution = new SymbolicSubstitutionHandler(payloads);
        symbolicSubstitution.doSymbolicSubstitution();

        let inputCode = [1, 2, 3];

        let colorCode = new ColorHandler(payloads, null, inputCode, {isMarked: false});
        colorCode.colorCode();

        if (payloads[0].type === 'FunctionDeclaration') {
            payloads = payloads[0].body;
        }

        let flowchartInstance = new FlowchartHandler(payloads);
        flowchartInstance.addNullNode();
        flowchartInstance.addEmptyNode();
        flowchartInstance.createID({id: 1});
        flowchartInstance.declareNode();
        flowchartInstance.markNodeAsVisited({isFunctionDone: false, isEnteredIfStatement: false});
        flowchartInstance.updateNextNode();
        let flowchartData = [];
        flowchartInstance.createNodeDeclarationCode(flowchartData);
        flowchartInstance.createNodeNextCode(flowchartData);
        assert.equal(
            flowchartData.length,
            3,
        );
    });

    it('is should handle one variable with parenthesis', () => {
        let codeToParse = 'function foo(x, y, z){\n' +
            '    let a = x;\n' +
            '    \n' +
            '    return c;\n' +
            '}\n';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payloads = facadeDeclarationHandler.getPayloads();

        let symbolicSubstitution = new SymbolicSubstitutionHandler(payloads);
        symbolicSubstitution.doSymbolicSubstitution();

        let inputCode = [[1,2,3], 2, 3];

        let colorCode = new ColorHandler(payloads, null, inputCode, {isMarked: false});
        colorCode.colorCode();

        if (payloads[0].type === 'FunctionDeclaration') {
            payloads = payloads[0].body;
        }

        let flowchartInstance = new FlowchartHandler(payloads);
        flowchartInstance.addNullNode();
        flowchartInstance.addEmptyNode();
        flowchartInstance.createID({id: 1});
        flowchartInstance.declareNode();
        flowchartInstance.markNodeAsVisited({isFunctionDone: false, isEnteredIfStatement: false});
        flowchartInstance.updateNextNode();
        let flowchartData = [];
        flowchartInstance.createNodeDeclarationCode(flowchartData);
        flowchartInstance.createNodeNextCode(flowchartData);
        assert.equal(
            flowchartData.length,
            3,
        );
    });

});
