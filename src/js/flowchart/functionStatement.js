import {FlowchartHandler} from './flowchart-handler';

function FunctionStatement(wrapper, payload) {
    this.payload = payload;
    this.wrapper = wrapper;
}

FunctionStatement.prototype.createID = function () {
    this.createIDBody();
};

FunctionStatement.prototype.createIDBody = function () {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];

        let flowchart = new FlowchartHandler([payload], this);
        flowchart.createID();
    }
};

FunctionStatement.prototype.declareNode = function () {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];

        let flowchart = new FlowchartHandler([payload], this);
        flowchart.declareNode();
    }
};

FunctionStatement.prototype.getNextNode = function (nodeID) {
    let body = this.payload.body;

    for (let i = 0; i < body.length - 1; i++) {
        let payload = body[i];

        if (payload.flowchart.id === nodeID) {
            return body[i + 1].flowchart.id;
        }
    }
};

FunctionStatement.prototype.updateNextNode = function () {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];

        let flowchart = new FlowchartHandler([payload], this);
        flowchart.updateNextNode();
    }
};


export {FunctionStatement};
