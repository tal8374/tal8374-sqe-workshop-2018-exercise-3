import {FunctionStatement} from './functionStatement';
import {WhileStatement} from './whileStatement';
import {ElseIfStatement} from './elseIfStatement';
import {ReturnStatement} from './returnStatement';
import {IfStatement} from './ifStatement';
import {VariableStatement} from './variableStatement';
import {AssignmentStatement} from './assignmentStatement';

function FlowchartHandler(payload, wrapper) {
    this.payload = payload;
    this.wrapper = wrapper;
    this.localVariables = {};
}

FlowchartHandler.prototype.handlers = {
    'VariableDeclarator': VariableStatement,
    'FunctionDeclaration': FunctionStatement,
    'WhileStatement': WhileStatement,
    'AssignmentExpression': AssignmentStatement,
    'IfStatement': IfStatement,
    'else if statement': ElseIfStatement,
    'ReturnStatement': ReturnStatement,
};

FlowchartHandler.prototype.createID = function () {
    for (let i = 0; i < this.payload.length; i++) {
        let payload = this.payload[i];
        let codeType = payload.type;
        if (!this.handlers[codeType]) continue;

        let flowchart = new this.handlers[codeType](this, payload);
        flowchart.createID();
    }
};

FlowchartHandler.prototype.declareNode = function () {
    for (let i = 0; i < this.payload.length; i++) {
        let payload = this.payload[i];
        let codeType = payload.type;
        if (!this.handlers[codeType]) continue;

        let flowchart = new this.handlers[codeType](this, payload);
        flowchart.declareNode();
    }
};

export {FlowchartHandler};
