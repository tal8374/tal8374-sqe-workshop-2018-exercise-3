import {guid} from '../utils/common';

function AssignmentStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
}

AssignmentStatement.prototype.createID = function () {
    if (!this.payload.flowchart) {
        this.payload.flowchart = {};
    }

    this.payload.flowchart.id = guid();
};

AssignmentStatement.prototype.declareNode = function () {
    this.payload.flowchart.data = this.getID() + '=>operation: ' + this.getOperation();
};

AssignmentStatement.prototype.getOperation = function () {
    return this.payload.name + ' = ' + this.payload.value;
};

AssignmentStatement.prototype.getID = function () {
    return this.payload.flowchart.id;
};

AssignmentStatement.prototype.updateNextNode = function () {
    if(!this.wrapper || !this.wrapper.getNextNode) return;

    let nextNode = this.wrapper.getNextNode(this.payload.flowchart.id);

    if(!nextNode) return;

    this.payload.flowchart.nextNode = nextNode;
};

AssignmentStatement.prototype.createNodeDeclarationCode = function (nodeDeclarationCode) {
    nodeDeclarationCode.push(this.payload.flowchart.data);
};

AssignmentStatement.prototype.createNodeNextCode = function (nodeDeclarationCode) {
    if(!this.payload.flowchart.nextNode) return;

    let nextNodeData = this.payload.flowchart.id + '->' + this.payload.flowchart.nextNode;

    nodeDeclarationCode.push(nextNodeData);
};

AssignmentStatement.prototype.markNodeAsVisited = function () {
    this.payload.flowchart.data += '|approved';
};


export {AssignmentStatement};
