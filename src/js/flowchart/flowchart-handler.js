import {WhileStatement} from './whileStatement';
import {ElseIfStatement} from './elseIfStatement';
import {ReturnStatement} from './returnStatement';
import {IfStatement} from './ifStatement';
import {VariableStatement} from './variableStatement';
import {AssignmentStatement} from './assignmentStatement';
import {NullStatement} from './nullStatement';
import {EmptyStatement} from './emptyStatement';
import {UpdateStatement} from './updateStatement';

function FlowchartHandler(payload, wrapper) {
    this.payload = payload;
    this.wrapper = wrapper ? wrapper : this;
}

FlowchartHandler.prototype.handlers = {
    'VariableDeclarator': VariableStatement,
    'WhileStatement': WhileStatement,
    'AssignmentExpression': AssignmentStatement,
    'IfStatement': IfStatement,
    'else if statement': ElseIfStatement,
    'ReturnStatement': ReturnStatement,
    'nullNode': NullStatement,
    'emptyNode': EmptyStatement,
    'UpdateExpression': UpdateStatement,
};

FlowchartHandler.prototype.markNodeAsVisited = function (isFunctionDone) {
    if (isFunctionDone.isFunctionDone) return;

    for (let i = 0; i < this.payload.length; i++) {
        let payload = this.payload[i];
        let codeType = payload.type;
        if (!this.handlers[codeType]) continue;

        let flowchart = new this.handlers[codeType](this.wrapper, payload);
        flowchart.markNodeAsVisited(isFunctionDone);
    }
};

FlowchartHandler.prototype.isIfStatment = function (codeType) {
    return codeType === 'IfStatement' || codeType === 'else if statement';
};

FlowchartHandler.prototype.addNullNode = function () {
    for (let i = 0; i < this.payload.length; i++) {
        let payload = this.payload[i];
        let codeType = payload.type;

        if (!['WhileStatement', 'IfStatement', 'else if statement'].includes(codeType)) continue;

        this.addNullNodeWhileStatement(codeType, i);

        let flowchart = new FlowchartHandler(payload.body, this);
        flowchart.addNullNode();

        i++;
    }
};

FlowchartHandler.prototype.addNullNodeWhileStatement = function (codeType, i) {
    let nullNodePayload = {
        type: 'nullNode',
        value: 'NULL'
    };

    if (codeType === 'WhileStatement') {
        this.payload.splice(i, 0, nullNodePayload);
    }
};

FlowchartHandler.prototype.addEmptyNode = function () {
    for (let i = 1; i < this.payload.length; i++) {
        let payload = this.payload[i];
        let codeType = payload.type;

        this.addEmptyNodeWithBodyStatements(payload, codeType);

        i = this.addEmptyNodeNotIfStatement(codeType, i);
    }
};

FlowchartHandler.prototype.addEmptyNodeNotIfStatement = function (codeType, i) {
    let emptyNodePayload = {
        type: 'emptyNode',
        value: '.'
    };

    if (codeType !== 'IfStatement' && codeType !== 'else if statement') {
        if (this.payload[i - 1].type === 'IfStatement' || this.payload[i - 1].type === 'else if statement') {
            this.payload.splice(i, 0, emptyNodePayload);
            return i + 1;
        }
    }

    return i;
};

FlowchartHandler.prototype.addEmptyNodeWithBodyStatements = function (payload, codeType) {
    if (['WhileStatement', 'IfStatement', 'else if statement'].includes(codeType)) {
        let flowchart = new FlowchartHandler(payload.body, this);
        flowchart.addNullNode();
    }
};

FlowchartHandler.prototype.createID = function (id) {
    for (let i = 0; i < this.payload.length; i++) {
        let payload = this.payload[i];
        let codeType = payload.type;
        if (!this.handlers[codeType]) continue;

        let flowchart = new this.handlers[codeType](this.wrapper, payload, id);
        flowchart.createID(id);
    }
};

FlowchartHandler.prototype.declareNode = function () {
    for (let i = 0; i < this.payload.length; i++) {
        let payload = this.payload[i];
        let codeType = payload.type;
        if (!this.handlers[codeType]) continue;

        let flowchart = new this.handlers[codeType](this.wrapper, payload);
        flowchart.declareNode();
    }
};

FlowchartHandler.prototype.updateNextNode = function () {
    for (let i = 0; i < this.payload.length; i++) {
        let payload = this.payload[i];
        let codeType = payload.type;
        if (!this.handlers[codeType]) continue;

        let flowchart = new this.handlers[codeType](this.wrapper, payload);
        flowchart.updateNextNode();
    }
};

FlowchartHandler.prototype.createNodeDeclarationCode = function (nodeDeclarationCode) {
    for (let i = 0; i < this.payload.length; i++) {
        let payload = this.payload[i];
        let codeType = payload.type;
        if (!this.handlers[codeType]) continue;

        let flowchart = new this.handlers[codeType](this.wrapper, payload);
        flowchart.createNodeDeclarationCode(nodeDeclarationCode);
    }
};

FlowchartHandler.prototype.createNodeNextCode = function (nodeDeclarationCode) {
    for (let i = 0; i < this.payload.length; i++) {
        let payload = this.payload[i];
        let codeType = payload.type;
        if (!this.handlers[codeType]) continue;

        let flowchart = new this.handlers[codeType](this.wrapper, payload);
        flowchart.createNodeNextCode(nodeDeclarationCode);
    }
};

function lineStatementGetNextNodeHandler(nodeID, payload) {
    for (let i = 0; i < payload.length - 1; i++) {
        if (payload[i].flowchart.id === nodeID) {
            return payload[i + 1].flowchart.id;
        }
    }
}

function WhileStatementGetNextNodeHandler(nodeID, payload) {
    for (let i = 0; i < payload.length - 1; i++) {
        if (payload[i].flowchart.id === nodeID) {
            return payload[i - 1].flowchart.id;
        }
    }
}

function IfStatementGetNextNodeHandler(nodeID, payload) {
    for (let i = 0; i < payload.length - 1; i++) {
        if (payload[i].flowchart.id === nodeID) {
            for (let j = i + 1; j < payload.length; j++) {
                if (payload[j].type === 'emptyNode') {
                    return payload[j].flowchart.id;
                }
            }
        }
    }
}

function ElseIfStatementGetNextNodeHandler(nodeID, payload) {
    for (let i = 0; i < payload.length - 1; i++) {
        if (payload[i].flowchart.id === nodeID) {
            for (let j = i + 1; j < payload.length; j++) {
                if (payload[j].type !== 'else if statement') {
                    return payload[j].flowchart.id;
                }
            }
        }
    }
}

FlowchartHandler.prototype.getNextNodeHandlers = {
    'VariableDeclarator': lineStatementGetNextNodeHandler,
    'WhileStatement': WhileStatementGetNextNodeHandler,
    'AssignmentExpression': lineStatementGetNextNodeHandler,
    'IfStatement': IfStatementGetNextNodeHandler,
    'else if statement': ElseIfStatementGetNextNodeHandler,
    'ReturnStatement': lineStatementGetNextNodeHandler,
};

FlowchartHandler.prototype.getNextNode = function (nodeID) {
    for (let i = 0; i < this.payload.length - 1; i++) {
        if (this.payload[i].flowchart.id === nodeID) {
            return this.getNextNodeIfStatement(i);
        }
    }
};

FlowchartHandler.prototype.getNextNodeIfStatement = function (i) {
    if (this.payload[i + 1].type === 'else if statement' && !this.payload[i + 1].declaration) {
        if (this.payload[i + 1].body.length > 0) {
            return this.payload[i + 1].body[0].flowchart.id;
        } else if (i + 2 < this.payload.length) {
            return this.payload[i + 2].flowchart.id;
        }
    } else {
        return this.payload[i + 1].flowchart.id;
    }
};

FlowchartHandler.prototype.getNextEndNode = function (nodeID, nodeType) {
    if (!this.getNextNodeHandlers[nodeType]) return;

    return this.getNextNodeHandlers[nodeType](nodeID, this.payload, this.wrapper);
};

export {FlowchartHandler};
