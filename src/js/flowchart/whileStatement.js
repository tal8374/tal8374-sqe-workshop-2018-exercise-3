import {FlowchartHandler} from './flowchart-handler';

function WhileStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
}

WhileStatement.prototype.createID = function (id) {
    if (!this.payload.flowchart) {
        this.payload.flowchart = {};
    }

    this.payload.flowchart.id = id.id;
    id.id++;

    this.createIDBody(id);
};

WhileStatement.prototype.createIDBody = function (id) {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];

        let flowchart = new FlowchartHandler([payload], this);
        flowchart.createID(id);
    }
};

WhileStatement.prototype.declareNode = function () {
    this.payload.flowchart.data = this.getID() + '=>condition: '+ '(' + this.getID() + ')\n' + this.getCondition();

    this.createNodeDeclarationOfBody();
};

WhileStatement.prototype.getCondition = function () {
    return this.payload.declaration.condition;
};

WhileStatement.prototype.getID = function () {
    return this.payload.flowchart.id;
};

WhileStatement.prototype.createNodeDeclarationOfBody = function (id) {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];

        let flowchart = new FlowchartHandler([payload], this, id);
        flowchart.declareNode();
    }
};

WhileStatement.prototype.updateNextNode = function () {
    this.updateNextNodeForBody();

    if (!this.wrapper || !this.wrapper.getNextNode) return;

    let nextNode = this.wrapper.getNextNode(this.payload.flowchart.id);

    if (!nextNode) return;

    this.payload.flowchart.nextNode = nextNode;
};

WhileStatement.prototype.updateNextNodeForBody = function (id) {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];

        let flowchart = new FlowchartHandler([payload], this, id);
        flowchart.updateNextNode();
    }
};

WhileStatement.prototype.getNextNode = function (nodeID) {
    let body = this.payload.body;

    for (let i = 0; i < body.length - 1; i++) {
        if (body[i].flowchart.id === nodeID) {
            return body[i + 1].flowchart.id;
        }
    }

    return this.wrapper.getNextEndNode(this.payload.flowchart.id, this.payload.type);
};

WhileStatement.prototype.getNextEndNode = function (nodeID) {
    return this.getNextNode(nodeID);
};

WhileStatement.prototype.createNodeDeclarationCode = function (nodeDeclarationCode) {
    if (this.payload.declaration) {
        nodeDeclarationCode.push(this.payload.flowchart.data);
    }

    this.createBodyNodeDeclaration(nodeDeclarationCode);
};

WhileStatement.prototype.createBodyNodeDeclaration = function (nodeDeclarationCode) {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];

        let flowchart = new FlowchartHandler([payload], this);
        flowchart.createNodeDeclarationCode(nodeDeclarationCode);
    }
};

WhileStatement.prototype.createNodeNextCode = function (nodeDeclarationCode) {
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

WhileStatement.prototype.createNodeNextCodeForBody = function (nodeDeclarationCode) {
    let flowchart = new FlowchartHandler(this.payload.body, this);
    flowchart.createNodeNextCode(nodeDeclarationCode);
};

WhileStatement.prototype.markNodeAsVisited = function (isFunctionDone) {
    if(isFunctionDone.isFunctionDone) return;

    this.payload.flowchart.data += '|approved';

    if (this.payload.style.backgroundColor === '#7FFF00') {
        let flowchart = new FlowchartHandler(this.payload.body, this);
        flowchart.markNodeAsVisited(isFunctionDone);
    }
};

export {WhileStatement};
