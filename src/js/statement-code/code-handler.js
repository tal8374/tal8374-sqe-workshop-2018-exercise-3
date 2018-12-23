import {VariableStatement} from './variableStatement';
import {FunctionStatement} from './functionStatement';
import {WhileStatement} from './whileStatement';
import {AssignmentStatement} from './assignmentStatement';
import {IfStatement} from './ifStatement';
import {ElseIfStatement} from './elseIfStatement';
import {ReturnStatement} from './returnStatement';

function CodeHandler(payloads, wrapper, numberOfTabs = 0) {
    this.payloads = payloads;
    this.wrapper = wrapper;
    this.code = [];
    this.numberOfTabs = numberOfTabs;
}

CodeHandler.prototype.handlers = {
    'VariableDeclarator': VariableStatement,
    'FunctionDeclaration': FunctionStatement,
    'WhileStatement': WhileStatement,
    'AssignmentExpression': AssignmentStatement,
    'IfStatement': IfStatement,
    'else if statement': ElseIfStatement,
    'ReturnStatement': ReturnStatement,
};

CodeHandler.prototype.createCode = function () {
    for (let i = 0; i < this.payloads.length; i++) {
        let codeType = this.payloads[i].type;

        if(!this.handlers[codeType]) continue;

        let codeHandler = new this.handlers[codeType](this.wrapper, this.payloads[i], this.numberOfTabs);
        codeHandler.createCode();
        let code = codeHandler.getCode();


        for (let i = 0; i < code.length; i++) {
            this.code.push(code[i]);
        }
    }
};

CodeHandler.prototype.getCode = function () {
    return this.code;
};

export {CodeHandler};
