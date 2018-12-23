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


export {FunctionStatement};
