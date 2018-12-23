import assert from 'assert';
import {parseCode} from '../src/js/utils/code-analyzer';
import {facadeDeclaration} from '../src/js/statement-payload/facade-declaration-handler';


describe('The expression declaration handler', () => {
    it('it handle of expression which asks the length of array', () => {
        let codeToParse = 'a = arr.length';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"AssignmentExpression","name":"a","value":"arr.length","lineNumber":1}]'
        );
    });

    it('it handle of expression which asks the array data in place 0', () => {
        let codeToParse = 'a = arr[0]';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"AssignmentExpression","name":"a","value":"arr[0]","lineNumber":1}]'
        );
    });

    it('it handle of expression with adding two number', () => {
        let codeToParse = 'a = 1 + 2';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"AssignmentExpression","name":"a","value":"1+2","lineNumber":1}]'
        );
    });

    it('it handle of expression with adding two variables', () => {
        let codeToParse = 'a = b + c';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"AssignmentExpression","name":"a","value":"b+c","lineNumber":1}]'
        );
    });

    it('it handle of expression with adding variables and a number', () => {
        let codeToParse = 'a = 1 + c';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"AssignmentExpression","name":"a","value":"1+c","lineNumber":1}]'
        );
    });


    it('it handle of expression with multiple two number', () => {
        let codeToParse = 'a = 1 * 2';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"AssignmentExpression","name":"a","value":"(1)*(2)","lineNumber":1}]'
        );
    });

    it('it handle of expression with multiple two variables', () => {
        let codeToParse = 'a = b + c';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"AssignmentExpression","name":"a","value":"b+c","lineNumber":1}]'
        );
    });

    it('it handle of expression with array', () => {
        let codeToParse = 'a = [1,2,3]';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"AssignmentExpression","name":"a","value":"[1,2,3]","lineNumber":1}]'
        );
    });


    it('it handle of expression declaration of simple object', () => {
        let codeToParse = 'a = {a:1}';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"AssignmentExpression","name":"a","value":"{a:1}","lineNumber":1}]'
        );
    });

    it('it handle of expression declaration of complicated object', () => {
        let codeToParse = 'a = {a:1, b:2}';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"AssignmentExpression","name":"a","value":"{a:1,b:2}","lineNumber":1}]'
        );
    });

    it('it handle of expression declaration of line if', () => {
        let codeToParse = 'a = true ? 1 : 2';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"AssignmentExpression","name":"a","value":"true ? 1 : 2","lineNumber":1}]'
        );
    });


});

describe('The assignment declaration handler', () => {
    it('it handle of assignment declaration of number', () => {
        let codeToParse = 'a = 2';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"AssignmentExpression","name":"a","value":"2","lineNumber":1}]'
        );
    });

    it('it handle of assignment declaration of variable', () => {
        let codeToParse = 'a = b';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"AssignmentExpression","name":"a","value":"b","lineNumber":1}]'
        );
    });

    it('it handle of assignment declaration of multiple expression', () => {
        let codeToParse = 'a = 1 + 2 + 2';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"AssignmentExpression","name":"a","value":"1+2+2","lineNumber":1}]'
        );
    });

    it('it handle of assignment declaration update expression', () => {
        let codeToParse = 'a = b++';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"AssignmentExpression","name":"a","value":"","lineNumber":1}]'
        );
    });

    it('it handle of two assignments with simple number', () => {
        let codeToParse = 'a = 1, b = 2';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"SequenceExpression","name":"a","value":"1","lineNumber":1},{"type":"SequenceExpression","name":"b","value":"2","lineNumber":1}]'
        );
    });

    it('it handle of two assignments with simple number', () => {
        let codeToParse = 'a = b++;';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"AssignmentExpression","name":"a","value":"","lineNumber":1}]'
        );
    });
});

describe('The variable declaration handler', () => {
    it('it handle of variable declaration of number', () => {
        let codeToParse = 'let a = 2';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"VariableDeclarator","name":"a","value":"2","lineNumber":1}]'
        );
    });

    it('it handle of variable declaration of variable', () => {
        let codeToParse = 'let a = b';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"VariableDeclarator","name":"a","value":"b","lineNumber":1}]'
        );
    });

    it('it handle of two variable declaration of number', () => {
        let codeToParse = 'let a = 1, b = 2';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"VariableDeclarator","name":"a","value":"1","lineNumber":1},{"type":"VariableDeclarator","name":"b","value":"2","lineNumber":1}]'
        );
    });
});

describe('The else if declaration handler', () => {
    it('it should handle else if with simple condition of true', () => {
        let codeToParse = 'if(true){}else if(true){}else{}';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"IfStatement","declaration":{"lineNumber":1,"type":"IfStatement","name":null,"value":null,"condition":true},"body":[]},{"type":"else if statement","declarat' +
            'ion":{"lineNumber":2,"type":"else if statement","name":null,"value":null,"condition":true},"body":[]},{"type":"else if statement","body":[]}]'
        );
    });

    it('it should handle else if with simple condition of true and body', () => {
        let codeToParse = 'if(true){}else if(true){c =1}else{a = 2}';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"IfStatement","declaration":{"lineNumber":1,"type":"IfStatement","name":null,"value":null,"condition":true},"body":[]},{"type":"else if statement","declarat' +
            'ion":{"lineNumber":2,"type":"else if statement","name":null,"value":null,"condition":true},"body":[{"type":"AssignmentExpression","name":"c","value":"1","lineNumber":3}]},{"type"' +
            ':"else if statement","body":[{"type":"AssignmentExpression","name":"a","value":"2","lineNumber":5}]}]'
        );
    });
});

describe('The if declaration handler', () => {
    it('it should handle if with simple condition of true', () => {
        let codeToParse = 'if(true){}';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"IfStatement","declaration":{"lineNumber":1,"type":"IfStatement","name":null,"value":null,"condition":true},"body":[]}]'
        );
    });

    it('it should handle if with complicated condition', () => {
        let codeToParse = 'if(2 > 3){}';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"IfStatement","declaration":{"lineNumber":1,"type":"IfStatement","name":null,"value":null,"condition":"2>3"},"body":[]}]'
        );
    });

    it('it should handle if with simple condition and body', () => {
        let codeToParse = 'if(true){a = 2}';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"IfStatement","declaration":{"lineNumber":1,"type":"IfStatement","name":null,"value":null,"condition":true},"body":[{"type":"AssignmentExpression","name":' +
            '"a","value":"2","lineNumber":2}]}]'
        );
    });
});

describe('The function declaration handler', () => {
    it('it should handle function without arguments and body', () => {
        let codeToParse = 'function name(){}';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"declaration":{"lineNumber":1,"type":"FunctionDeclaration","name":"name","value":null},"type":"FunctionDeclaration","params":[],"body":[]}]'
        );
    });

    it('it should handle function with arguments and without body', () => {
        let codeToParse = 'function name(a,b,c){}';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"declaration":{"lineNumber":1,"type":"FunctionDeclaration","name":"name","value":null},"type":"FunctionDeclaration","params":[{"lineNumber":1,"type":"Param","nam' +
            'e":"a","value":null},{"lineNumber":1,"type":"Param","name":"b","value":null},{"lineNumber":1,"type":"Param","name":"c","value":null}],"body":[]}]'
        );
    });

    it('it should handle function without arguments and with body', () => {
        let codeToParse = 'function name(){c = 2}';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"declaration":{"lineNumber":1,"type":"FunctionDeclaration","name":"name","value":null},"type":"FunctionDeclaration","params":[],"body":[{"type":"AssignmentExpressi' +
            'on","name":"c","value":"2","lineNumber":2}]}]'
        );
    });

    it('it should handle function without arguments and with return statement of number', () => {
        let codeToParse = 'function name(){return 2}';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"declaration":{"lineNumber":1,"type":"FunctionDeclaration","name":"name","value":null},"type":"FunctionDeclaration","params":[],"body":[{"type":"ReturnStatement",' +
            '"value":"2","lineNumber":2}]}]'
        );
    });
});

describe('The while declaration handler', () => {
    it('it should handle empty body and true as condition', () => {
        let codeToParse = 'while(true){}';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"declaration":{"lineNumber":1,"type":"WhileStatement","condition":true},"type":"WhileStatement","body":[]}]'
        );
    });

    it('it should handle empty body with condition', () => {
        let codeToParse = 'while(a < 2){}';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"declaration":{"lineNumber":1,"type":"WhileStatement","condition":"a<2"},"type":"WhileStatement","body":[]}]'
        );
    });

    it('it should handle body with condition', () => {
        let codeToParse = 'while(a < 2){let a = 2}';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"declaration":{"lineNumber":1,"type":"WhileStatement","condition":"a<2"},"type":"WhileStatement","body":[{"type":"VariableDeclarator","name":"a","value":"2",' +
            '"lineNumber":2}]}]'
        );
    });

    it('it should handle body with while inside with condition', () => {
        let codeToParse = 'while(a < 2){while(a < 2){let a = 2}}';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"declaration":{"lineNumber":1,"type":"WhileStatement","condition":"a<2"},"type":"WhileStatement","body":[{"declaration":{"lineNumber":2,"type":"WhileStatement","' +
            'condition":"a<2"},"type":"WhileStatement","body":[{"type":"VariableDeclarator","name":"a","value":"2","lineNumber":3}]}]}]'
        );
    });

    it('it should handle body with continue inside with condition', () => {
        let codeToParse = 'while(a < 2){continue}';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"declaration":{"lineNumber":1,"type":"WhileStatement","condition":"a<2"},"type":"WhileStatement","body":[{"lineNumber":2,"type":"ContinueStatement","name":""}]}]'
        );
    });

    it('it should handle body with break inside with condition', () => {
        let codeToParse = 'while(a < 2){break}';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        assert.equal(
            JSON.stringify(payload),
            '[{"declaration":{"lineNumber":1,"type":"WhileStatement","condition":"a<2"},"type":"WhileStatement","body":[{"lineNumber":2,"type":"BreakStatement","name":""}]}]'
        );
    });
});
