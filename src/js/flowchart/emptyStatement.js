import {guid} from '../utils/common';

function EmptyStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
}

EmptyStatement.prototype.createID = function () {
    if (!this.payload.flowchart) {
        this.payload.flowchart = {};
    }

    this.payload.flowchart.id = guid();
};

EmptyStatement.prototype.declareNode = function () {
    this.payload.flowchart.data = this.getID() + '=>start: ' + this.getOperation();
};

EmptyStatement.prototype.getOperation = function () {
    return this.payload.value;
};

EmptyStatement.prototype.getID = function () {
    return this.payload.flowchart.id;
};

EmptyStatement.prototype.updateNextNode = function () {
    if(!this.wrapper || !this.wrapper.getNextNode) return;

    let nextNode = this.wrapper.getNextNode(this.payload.flowchart.id);

    if(!nextNode) return;

    this.payload.flowchart.nextNode = nextNode;
};

EmptyStatement.prototype.createNodeDeclarationCode = function (nodeDeclarationCode) {
    nodeDeclarationCode.push(this.payload.flowchart.data);
};

EmptyStatement.prototype.createNodeNextCode = function (nodeDeclarationCode) {
    if(!this.payload.flowchart.nextNode) return;

    let nextNodeData = this.payload.flowchart.id + '->' + this.payload.flowchart.nextNode;

    nodeDeclarationCode.push(nextNodeData);
};

EmptyStatement.prototype.markNodeAsVisited = function () {
    this.payload.flowchart.data += '|approved';
};

export {EmptyStatement};
