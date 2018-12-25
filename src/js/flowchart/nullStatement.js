import {guid} from '../utils/common';

function Nulltatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
}

Nulltatement.prototype.createID = function () {
    if (!this.payload.flowchart) {
        this.payload.flowchart = {};
    }

    this.payload.flowchart.id = guid();
};

Nulltatement.prototype.declareNode = function () {
    this.payload.flowchart.data = this.getID() + '=>operation: ' + this.getOperation();
};

Nulltatement.prototype.getOperation = function () {
    return this.payload.value;
};

Nulltatement.prototype.getID = function () {
    return this.payload.flowchart.id;
};

Nulltatement.prototype.updateNextNode = function () {
    if(!this.wrapper || !this.wrapper.getNextNode) return;

    let nextNode = this.wrapper.getNextNode(this.payload.flowchart.id);

    if(!nextNode) return;

    this.payload.flowchart.nextNode = nextNode;
};

Nulltatement.prototype.createNodeDeclarationCode = function (nodeDeclarationCode) {
    nodeDeclarationCode.push(this.payload.flowchart.data);
};

Nulltatement.prototype.createNodeNextCode = function (nodeDeclarationCode) {
    if(!this.payload.flowchart.nextNode) return;

    let nextNodeData = this.payload.flowchart.id + '->' + this.payload.flowchart.nextNode;

    nodeDeclarationCode.push(nextNodeData);
};

Nulltatement.prototype.markNodeAsVisited = function () {
    this.payload.flowchart.data += '|approved';
};

export {Nulltatement};
