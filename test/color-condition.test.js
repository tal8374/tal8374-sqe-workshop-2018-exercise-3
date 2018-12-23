import assert from 'assert';
import {parseCode} from '../src/js/utils/code-analyzer';
import {facadeDeclaration} from "../src/js/statement-payload/facade-declaration-handler";
import {ColorHandler} from "../src/js/color-condition/color-handler";

describe('The color condition', () => {
    it('is should color condition inside function and inside while statement', () => {
        let codeToParse = 'let d = 2;\n' +
            '\n' +
            'function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '\n' +
            '    while (a < z) {\n' +
            '        c = a + b;\n' +
            '        z = c * 2;\n' +
            '    }\n' +
            '\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '        return x + y + z + c;\n' +
            '    }\n' +
            '}\n' +
            '\n' +
            'd = 333;';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        let inputCode = '1,2,3';
        let inputCodeSplitted = eval('[' + inputCode + ']');

        let colorCode = new ColorHandler(payload, null, inputCodeSplitted);
        colorCode.colorCode();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"VariableDeclarator","name":"d","value":"2","lineNumber":1},{"declaration":{"lineNumber":2,"type":"FunctionDeclaration","name":"foo","value":null},"type' +
            '":"FunctionDeclaration","params":[{"lineNumber":2,"type":"Param","name":"x","value":null},{"lineNumber":2,"type":"Param","name":"y","value":null},{"lineNumber":2,"type":"Param' +
            '","name":"z","value":null}],"body":[{"type":"VariableDeclarator","name":"a","value":"x+1","lineNumber":3},{"type":"VariableDeclarator","name":"b","value":"a+y","lineNumber"' +
            ':4},{"type":"VariableDeclarator","name":"c","value":"0","lineNumber":5},{"declaration":{"lineNumber":6,"type":"WhileStatement","condition":"a<z"},"type":"WhileStatement","body":' +
            '[{"type":"AssignmentExpression","name":"c","value":"a+b","lineNumber":7},{"type":"AssignmentExpression","name":"z","value":"(c)*(2)","lineNumber":8}]},{"type":"IfStatement","de' +
            'claration":{"lineNumber":9,"type":"IfStatement","name":null,"value":null,"condition":"b<z"},"body":[{"type":"AssignmentExpression","name":"c","value":"c+5","lineNumber":10},{"ty' +
            'pe":"ReturnStatement","value":"x+y+z+c","lineNumber":11}],"style":{"backgroundColor":"#7FFF00"}},{"type":"else if statement","declaration":{"lineNumber":12,"type":"else if statement"' +
            ',"name":null,"value":null,"condition":"b<(z)*(2)"},"body":[{"type":"AssignmentExpression","name":"c","value":"c+x+5","lineNumber":13},{"type":"ReturnStatement","value":"x+y+z+c"' +
            ',"lineNumber":14}],"style":{"backgroundColor":"#7FFF00"}},{"type":"else if statement","body":[{"type":"AssignmentExpression","name":"c","value":"c+z+5","lineNumber":16},{"type":"' +
            'ReturnStatement","value":"x+y+z+c","lineNumber":17}],"style":{"backgroundColor":"#FF4500"}}]},{"type":"AssignmentExpression","name":"d","value":"333","lineNumber":18}]'
        );
    });

    it('is should do  statement-symbolic-substitution to function with while statement', () => {
        let codeToParse = 'function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    while (a < z) {\n' +
            '        c = a + b;\n' +
            '        z = c * 2;\n' +
            '    }\n' +
            '    \n' +
            '    return z;\n' +
            '}\n';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        let inputCode = '1,2,3';
        let inputCodeSplitted = eval('[' + inputCode + ']');

        let colorCode = new ColorHandler(payload, null, inputCodeSplitted);
        colorCode.colorCode();

        assert.equal(
            JSON.stringify(payload),
            '[{"declaration":{"lineNumber":1,"type":"FunctionDeclaration","name":"foo","value":null},"type":"FunctionDeclaration","params":[{"lineNumber":1,"type":"Param","name' +
            '":"x","value":null},{"lineNumber":1,"type":"Param","name":"y","value":null},{"lineNumber":1,"type":"Param","name":"z","value":null}],"body":[{"type":"VariableDeclarator","na' +
            'me":"a","value":"x+1","lineNumber":2},{"type":"VariableDeclarator","name":"b","value":"a+y","lineNumber":3},{"type":"VariableDeclarator","name":"c","value":"0","lineNumber"' +
            ':4},{"declaration":{"lineNumber":5,"type":"WhileStatement","condition":"a<z"},"type":"WhileStatement","body":[{"type":"AssignmentExpression","name":"c","value":"a+b","lineNumber' +
            '":6},{"type":"AssignmentExpression","name":"z","value":"(c)*(2)","lineNumber":7}]},{"type":"ReturnStatement","value":"z","lineNumber":8}]}]'
        );
    });

    it('is should do  statement-symbolic-substitution to function with if statement', () => {
        let codeToParse = 'function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '        return x + y + z + c;\n' +
            '    }\n' +
            '}\n';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        let inputCode = '1,2,3';
        let inputCodeSplitted = eval('[' + inputCode + ']');

        let colorCode = new ColorHandler(payload, null, inputCodeSplitted);
        colorCode.colorCode();

        assert.equal(
            JSON.stringify(payload),
            '[{"declaration":{"lineNumber":1,"type":"FunctionDeclaration","name":"foo","value":null},"type":"FunctionDeclaration","params":[{"lineNumber":1,"type":"Param","name' +
            '":"x","value":null},{"lineNumber":1,"type":"Param","name":"y","value":null},{"lineNumber":1,"type":"Param","name":"z","value":null}],"body":[{"type":"VariableDeclarator","na' +
            'me":"a","value":"x+1","lineNumber":2},{"type":"VariableDeclarator","name":"b","value":"a+y","lineNumber":3},{"type":"VariableDeclarator","name":"c","value":"0","lineNumber"' +
            ':4},{"type":"IfStatement","declaration":{"lineNumber":5,"type":"IfStatement","name":null,"value":null,"condition":"b<z"},"body":[{"type":"AssignmentExpression","name":"c","value' +
            '":"c+5","lineNumber":6},{"type":"ReturnStatement","value":"x+y+z+c","lineNumber":7}],"style":{"backgroundColor":"#7FFF00"}},{"type":"else if statement","declaration":{"lineNumber":8' +
            ',"type":"else if statement","name":null,"value":null,"condition":"b<(z)*(2)"},"body":[{"type":"AssignmentExpression","name":"c","value":"c+x+5","lineNumber":9},{"type":"ReturnSta' +
            'tement","value":"x+y+z+c","lineNumber":10}],"style":{"backgroundColor":"#7FFF00"}},{"type":"else if statement","body":[{"type":"AssignmentExpression","name":"c","value":"c+z+5",' +
            '"lineNumber":12},{"type":"ReturnStatement","value":"x+y+z+c","lineNumber":13}],"style":{"backgroundColor":"#FF4500"}}]}]'
        );
    });

    it('is should do  statement-symbolic-substitution to function with if statement in if statement', () => {
        let codeToParse = 'function foo(x, y, z) {\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '\n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '\n' +
            '        if (b < z) {\n' +
            '            c = c + 5;\n' +
            '            return x + y + z + c;\n' +
            '        } else if (b < z * 2) {\n' +
            '            c = c + x + 5;\n' +
            '            return x + y + z + c;\n' +
            '        } else {\n' +
            '            c = c + z + 5;\n' +
            '            return x + y + z + c;\n' +
            '        }\n' +
            '        return x + y + z + c;\n' +
            '\n' +
            '\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '        return x + y + z + c;\n' +
            '    }\n' +
            '}';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        let inputCode = '1,2,3';
        let inputCodeSplitted = eval('[' + inputCode + ']');

        let colorCode = new ColorHandler(payload, null, inputCodeSplitted);
        colorCode.colorCode();

        assert.equal(
            JSON.stringify(payload),
            '[{"declaration":{"lineNumber":1,"type":"FunctionDeclaration","name":"foo","value":null},"type":"FunctionDeclaration","params":[{"lineNumber":1,"type":"Param","name' +
            '":"x","value":null},{"lineNumber":1,"type":"Param","name":"y","value":null},{"lineNumber":1,"type":"Param","name":"z","value":null}],"body":[{"type":"VariableDeclarator","na' +
            'me":"a","value":"x+1","lineNumber":2},{"type":"VariableDeclarator","name":"b","value":"a+y","lineNumber":3},{"type":"VariableDeclarator","name":"c","value":"0","lineNumber"' +
            ':4},{"type":"IfStatement","declaration":{"lineNumber":5,"type":"IfStatement","name":null,"value":null,"condition":"b<z"},"body":[{"type":"AssignmentExpression","name":"c","value' +
            '":"c+5","lineNumber":6},{"type":"IfStatement","declaration":{"lineNumber":7,"type":"IfStatement","name":null,"value":null,"condition":"b<z"},"body":[{"type":"AssignmentExpression"' +
            ',"name":"c","value":"c+5","lineNumber":8},{"type":"ReturnStatement","value":"x+y+z+c","lineNumber":9}],"style":{"backgroundColor":"#7FFF00"}},{"type":"else if statement","declara' +
            'tion":{"lineNumber":10,"type":"else if statement","name":null,"value":null,"condition":"b<(z)*(2)"},"body":[{"type":"AssignmentExpression","name":"c","value":"c+x+5","lineNumber"' +
            ':11},{"type":"ReturnStatement","value":"x+y+z+c","lineNumber":12}],"style":{"backgroundColor":"#7FFF00"}},{"type":"else if statement","body":[{"type":"AssignmentExpression","name":' +
            '"c","value":"c+z+5","lineNumber":14},{"type":"ReturnStatement","value":"x+y+z+c","lineNumber":15}],"style":{"backgroundColor":"#FF4500"}},{"type":"ReturnStatement","value":"x+y+z+' +
            'c","lineNumber":16}],"style":{"backgroundColor":"#7FFF00"}},{"type":"else if statement","declaration":{"lineNumber":17,"type":"else if statement","name":null,"value":null,"condition"' +
            ':"b<(z)*(2)"},"body":[{"type":"AssignmentExpression","name":"c","value":"c+x+5","lineNumber":18},{"type":"ReturnStatement","value":"x+y+z+c","lineNumber":19}],"style":{"backgroun' +
            'dColor":"#7FFF00"}},{"type":"else if statement","body":[{"type":"AssignmentExpression","name":"c","value":"c+z+5","lineNumber":21},{"type":"ReturnStatement","value":"x+y+z+c","l' +
            'ineNumber":22}],"style":{"backgroundColor":"#FF4500"}}]}]'
        );
    });

    it('is should do  statement-symbolic-substitution if and inside if function', () => {
        let codeToParse = 'if (true) {\n' +
            '    function foo(x, y, z) {\n' +
            '        let a = x + 1;\n' +
            '        let b = a + y;\n' +
            '        let c = 0;\n' +
            '\n' +
            '        if (b < z) {\n' +
            '            c = c + 5;\n' +
            '            return x + y + z + c;\n' +
            '        } else if (b < z * 2) {\n' +
            '            c = c + x + 5;\n' +
            '            return x + y + z + c;\n' +
            '        } else {\n' +
            '            c = c + z + 5;\n' +
            '            return x + y + z + c;\n' +
            '        }\n' +
            '    }\n' +
            '}';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        let inputCode = '1,2,3';
        let inputCodeSplitted = eval('[' + inputCode + ']');

        let colorCode = new ColorHandler(payload, null, inputCodeSplitted);
        colorCode.colorCode();

        assert.equal(
            JSON.stringify(payload),
            '[{"type":"IfStatement","declaration":{"lineNumber":1,"type":"IfStatement","name":null,"value":null,"condition":true},"body":[{"declaration":{"lineNumber":2,"type":' +
            '"FunctionDeclaration","name":"foo","value":null},"type":"FunctionDeclaration","params":[{"lineNumber":2,"type":"Param","name":"x","value":null},{"lineNumber":2,"type":"Param","n' +
            'ame":"y","value":null},{"lineNumber":2,"type":"Param","name":"z","value":null}],"body":[{"type":"VariableDeclarator","name":"a","value":"x+1","lineNumber":3},{"type":"Variab' +
            'leDeclarator","name":"b","value":"a+y","lineNumber":4},{"type":"VariableDeclarator","name":"c","value":"0","lineNumber":5},{"type":"IfStatement","declaration":{"lineNumber":6,' +
            '"type":"IfStatement","name":null,"value":null,"condition":"b<z"},"body":[{"type":"AssignmentExpression","name":"c","value":"c+5","lineNumber":7},{"type":"ReturnStatement","value' +
            '":"x+y+z+c","lineNumber":8}],"style":{"backgroundColor":"#7FFF00"}},{"type":"else if statement","declaration":{"lineNumber":9,"type":"else if statement","name":null,"value":null,"co' +
            'ndition":"b<(z)*(2)"},"body":[{"type":"AssignmentExpression","name":"c","value":"c+x+5","lineNumber":10},{"type":"ReturnStatement","value":"x+y+z+c","lineNumber":11}],"style":{"' +
            'backgroundColor":"#7FFF00"}},{"type":"else if statement","body":[{"type":"AssignmentExpression","name":"c","value":"c+z+5","lineNumber":13},{"type":"ReturnStatement","value":"x+y+' +
            'z+c","lineNumber":14}],"style":{"backgroundColor":"#FF4500"}}]}],"style":{"backgroundColor":"#7FFF00"}}]'
        );
    });
});
