import {guid} from '../utils/common';

function ReturnStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
}


ReturnStatement.prototype.createID = function () {
    if (!this.payload.flowchart) {
        this.payload.flowchart = {};
    }

    this.payload.flowchart.id = guid();
};

ReturnStatement.prototype.declareNode = function () {
    this.payload.flowchart.data = this.getID() + '=>operation: ' + this.getOperation();
};

ReturnStatement.prototype.getOperation = function () {
    return 'return' + this.payload.originalValue;
};

ReturnStatement.prototype.getID = function () {
    return this.payload.flowchart.id;
};

ReturnStatement.prototype.updateNextNode = function () {
    if(!this.wrapper || !this.wrapper.getNextNode) return;

    let nextNode = this.wrapper.getNextNode(this.payload.flowchart.id);

    if(!nextNode) return;

    this.payload.flowchart.nextNode = nextNode;
};

ReturnStatement.prototype.createNodeDeclarationCode = function (nodeDeclarationCode) {
    nodeDeclarationCode.push(this.payload.flowchart.data);
};

ReturnStatement.prototype.createNodeNextCode = function (nodeDeclarationCode) {
    if(!this.payload.flowchart.nextNode) return;

    let nextNodeData = this.payload.flowchart.id + '->' + this.payload.flowchart.nextNode;

    nodeDeclarationCode.push(nextNodeData);
};

ReturnStatement.prototype.markNodeAsVisited = function () {
    this.payload.flowchart.data += '|approved';
};

export {ReturnStatement};
