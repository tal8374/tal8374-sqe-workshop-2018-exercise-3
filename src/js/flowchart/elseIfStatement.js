import {guid} from '../utils/common';
import {FlowchartHandler} from './flowchart-handler';

function ElseIfStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
}

ElseIfStatement.prototype.createID = function () {
    if (!this.payload.flowchart) {
        this.payload.flowchart = {};
    }

    this.payload.flowchart.id = guid();

    this.createIDBody();
};

ElseIfStatement.prototype.createIDBody = function () {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];

        let flowchart = new FlowchartHandler([payload], this);
        flowchart.createID();
    }
};

ElseIfStatement.prototype.declareNode = function () {
    if (this.isElseIfStatement()) {
        this.payload.flowchart.data = this.getID() + '=>condition: ' + this.getCondition();
    } else {
        this.payload.flowchart.data = this.getID() + '=>condition: ' + 'Else';
    }

    this.createNodeDeclarationOfBody();
};

ElseIfStatement.prototype.isElseIfStatement = function () {
    return this.payload.declaration;
};

ElseIfStatement.prototype.getCondition = function () {
    return this.payload.declaration.condition;
};

ElseIfStatement.prototype.getID = function () {
    return this.payload.flowchart.id;
};

ElseIfStatement.prototype.createNodeDeclarationOfBody = function () {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];

        let flowchart = new FlowchartHandler([payload], this);
        flowchart.declareNode();
    }
};

ElseIfStatement.prototype.updateNextNode = function () {
    this.updateNextNodeForBody();

    if (!this.wrapper || !this.wrapper.getNextNode) return;

    let nextNode = this.wrapper.getNextNode(this.payload.flowchart.id);

    if (!nextNode) return;

    this.payload.flowchart.nextNode = nextNode;
};

ElseIfStatement.prototype.updateNextNodeForBody = function () {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];

        let flowchart = new FlowchartHandler([payload], this);
        flowchart.updateNextNode();
    }
};

ElseIfStatement.prototype.getNextNode = function (nodeID) {
    let body = this.payload.body;

    for (let i = 0; i < body.length - 1; i++) {
        if (body[i].flowchart.id === nodeID) {
            return body[i + 1].flowchart.id;
        }
    }

    return this.wrapper.getNextEndNode(this.payload.flowchart.id, this.payload.type);
};

ElseIfStatement.prototype.getNextEndNode = function (nodeID, nodeType) {
    return this.wrapper.getNextEndNode(nodeID, nodeType);
};

ElseIfStatement.prototype.createNodeDeclarationCode = function (nodeDeclarationCode) {
    nodeDeclarationCode.push(this.payload.flowchart.data);

    this.createBodyNodeDeclaration(nodeDeclarationCode);
};

ElseIfStatement.prototype.createBodyNodeDeclaration = function (nodeDeclarationCode) {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];

        let flowchart = new FlowchartHandler([payload], this);
        flowchart.createNodeDeclarationCode(nodeDeclarationCode);
    }
};

ElseIfStatement.prototype.createNodeNextCode = function (nodeDeclarationCode) {
    if (this.payload.flowchart.nextNode) {
        let nextNodeData;
        if (this.isElseIfStatement()) {
            nextNodeData = this.payload.flowchart.id + '(no)->' + this.payload.flowchart.nextNode;
        } else {
            nextNodeData = null;
        }

        if (nextNodeData) {
            nodeDeclarationCode.push(nextNodeData);
        }

    }

    if (this.payload.body.length > 0) {
        let nextNodeData = this.payload.flowchart.id + '(yes)->' + this.payload.body[0].flowchart.id;


        if (nextNodeData) {
            nodeDeclarationCode.push(nextNodeData);
        }
    }

    this.createNodeNextCodeForBody(nodeDeclarationCode);
};

ElseIfStatement.prototype.createNodeNextCodeForBody = function (nodeDeclarationCode) {
    let flowchart = new FlowchartHandler(this.payload.body, this);
    flowchart.createNodeNextCode(nodeDeclarationCode);
};


export {ElseIfStatement};
