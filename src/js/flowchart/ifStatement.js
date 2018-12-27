import {FlowchartHandler} from './flowchart-handler';
import {guid} from '../utils/common';

function IfStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
}

IfStatement.prototype.createID = function () {
    if (!this.payload.flowchart) {
        this.payload.flowchart = {};
    }

    this.payload.flowchart.id = guid();

    this.createIDBody();
};

IfStatement.prototype.createIDBody = function () {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];

        let flowchart = new FlowchartHandler([payload], this);
        flowchart.createID();
    }
};

IfStatement.prototype.declareNode = function () {
    this.payload.flowchart.data = this.getID() + '=>condition: ' + this.getCondition();

    this.createNodeDeclarationOfBody();
};

IfStatement.prototype.getCondition = function () {
    console.log(this.payload)
    return this.payload.declaration.originalCondition;
};

IfStatement.prototype.getID = function () {
    return this.payload.flowchart.id;
};

IfStatement.prototype.createNodeDeclarationOfBody = function () {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];

        let flowchart = new FlowchartHandler([payload], this);
        flowchart.declareNode();
    }
};

IfStatement.prototype.updateNextNode = function () {
    this.updateNextNodeForBody();

    if (!this.wrapper || !this.wrapper.getNextNode) return;

    let nextNode = this.wrapper.getNextNode(this.payload.flowchart.id);

    if (!nextNode) return;

    this.payload.flowchart.nextNode = nextNode;
};

IfStatement.prototype.updateNextNodeForBody = function () {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];

        let flowchart = new FlowchartHandler([payload], this);
        flowchart.updateNextNode();
    }
};

IfStatement.prototype.getNextNode = function (nodeID) {
    let body = this.payload.body;


    for (let i = 0; i < body.length - 1; i++) {
        if (body[i].flowchart.id === nodeID) {
            return body[i + 1].flowchart.id;
        }
    }

    return this.wrapper.getNextEndNode(this.payload.flowchart.id, this.payload.type);
};


IfStatement.prototype.getNextEndNode = function (nodeID) {
    return this.getNextNode(nodeID);
};

IfStatement.prototype.createNodeDeclarationCode = function (nodeDeclarationCode) {
    if (this.payload.declaration) {
        nodeDeclarationCode.push(this.payload.flowchart.data);
    }

    this.createBodyNodeDeclaration(nodeDeclarationCode);
};

IfStatement.prototype.createBodyNodeDeclaration = function (nodeDeclarationCode) {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];

        let flowchart = new FlowchartHandler([payload], this);
        flowchart.createNodeDeclarationCode(nodeDeclarationCode);
    }
};

IfStatement.prototype.createNodeNextCode = function (nodeDeclarationCode) {
    if (this.payload.flowchart.nextNode) {
        let nextNodeData = this.payload.flowchart.id + '(no)->' + this.payload.flowchart.nextNode;

        nodeDeclarationCode.push(nextNodeData);
    }

    if (this.payload.body.length > 0) {
        let nextNodeData = this.payload.flowchart.id + '(yes)->' + this.payload.body[0].flowchart.id;

        nodeDeclarationCode.push(nextNodeData);
    }

    this.createNodeNextCodeForBody(nodeDeclarationCode);
};

IfStatement.prototype.createNodeNextCodeForBody = function (nodeDeclarationCode) {
    let flowchart = new FlowchartHandler(this.payload.body, this);
    flowchart.createNodeNextCode(nodeDeclarationCode);
};

IfStatement.prototype.markNodeAsVisited = function () {
    this.payload.flowchart.data += '|approved';

    if (this.payload.style.backgroundColor === '#7FFF00') {
        let flowchart = new FlowchartHandler(this.payload.body, this);
        flowchart.markNodeAsVisited();
    }
};

export {IfStatement};
