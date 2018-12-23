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
    this.payload.flowchart.data = this.getID() + '=> operation:' + this.getOperation();
};

ReturnStatement.prototype.getOperation = function () {
    return 'return ' + this.payload.value;
};

ReturnStatement.prototype.getID = function () {
    return this.payload.flowchart.id;
};

ReturnStatement.prototype.updateNextNode = function () {
    if(!this.wrapper) return;

    let nextNode = this.wrapper.getNextNode(this.payload.flowchart.id);

    if(!nextNode) return;

    this.payload.flowchart.nextNode = nextNode;
};

export {ReturnStatement};
