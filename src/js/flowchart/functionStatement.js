import {FlowchartHandler} from './flowchart-handler';
import {guid} from '../utils/common';

function FunctionStatement(wrapper, payload) {
    this.payload = payload;
    this.wrapper = wrapper;
}

FunctionStatement.prototype.createID = function () {
    if(!this.payload.flowchart) {
        this.payload.flowchart = {};
    }

    this.payload.flowchart.id = guid();

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

export {FunctionStatement};
