import {guid} from '../utils/common';

function NullStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
}

NullStatement.prototype.createID = function () {
    if (!this.payload.flowchart) {
        this.payload.flowchart = {};
    }

    this.payload.flowchart.id = guid();
};

NullStatement.prototype.declareNode = function () {
    this.payload.flowchart.data = this.getID() + '=>operation: ' + this.getOperation();
};

NullStatement.prototype.getOperation = function () {
    return this.payload.value;
};

NullStatement.prototype.getID = function () {
    return this.payload.flowchart.id;
};

NullStatement.prototype.updateNextNode = function () {
    if(!this.wrapper || !this.wrapper.getNextNode) return;

    let nextNode = this.wrapper.getNextNode(this.payload.flowchart.id);

    if(!nextNode) return;

    this.payload.flowchart.nextNode = nextNode;
};

NullStatement.prototype.createNodeDeclarationCode = function (nodeDeclarationCode) {
    nodeDeclarationCode.push(this.payload.flowchart.data);
};

NullStatement.prototype.createNodeNextCode = function (nodeDeclarationCode) {
    if(!this.payload.flowchart.nextNode) return;

    let nextNodeData = this.payload.flowchart.id + '->' + this.payload.flowchart.nextNode;

    nodeDeclarationCode.push(nextNodeData);
};

NullStatement.prototype.markNodeAsVisited = function () {
    this.payload.flowchart.data += '|approved';
};

export {NullStatement};