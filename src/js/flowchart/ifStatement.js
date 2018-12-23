import {FlowchartHandler} from './flowchart-handler';
import {guid} from '../utils/common';

function IfStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
    this.localVariables = {};
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
    this.payload.flowchart.data = this.getID() + '=> operation:' + this.getCondition();

    this.createBodyNodeDeclaration();
};

IfStatement.prototype.getCondition = function () {
    return this.payload.declaration.condition;
};

IfStatement.prototype.getID = function () {
    return this.payload.flowchart.id;
};

IfStatement.prototype.createBodyNodeDeclaration = function () {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];

        let flowchart = new FlowchartHandler([payload], this);
        flowchart.declareNode();
    }
};

IfStatement.prototype.updateNextNode = function () {
    if(!this.wrapper) return;

    let nextNode = this.wrapper.getNextNode(this.payload.flowchart.id);

    if(!nextNode) return;

    this.payload.flowchart.nextNode = nextNode;
};

IfStatement.prototype.getNextNode = function (nodeID) {
    let body = this.payload.body;

    for (let i = 0; i < body.length - 1; i++) {
        let payload = body[i];

        if (payload.flowchart.id === nodeID) {
            return body[i + 1].flowchart.id;
        }
    }
};


export {IfStatement};
