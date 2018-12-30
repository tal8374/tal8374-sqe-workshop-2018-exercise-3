function VariableStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
}

VariableStatement.prototype.createID = function (id) {
    if (!this.payload.flowchart) {
        this.payload.flowchart = {};
    }

    this.payload.flowchart.id = id.id;
    id.id++;
};

VariableStatement.prototype.declareNode = function () {
    this.payload.flowchart.data = this.getID() + '=>operation: '+ '(' + this.getID() + ')\n' + this.getOperation();
};

VariableStatement.prototype.getOperation = function () {
    return 'let ' + this.payload.name + ' = ' + this.payload.originalValue;
};

VariableStatement.prototype.getID = function () {
    return this.payload.flowchart.id;
};

VariableStatement.prototype.updateNextNode = function () {
    if(!this.wrapper || !this.wrapper.getNextNode) return;

    let nextNode = this.wrapper.getNextNode(this.payload.flowchart.id);

    if(!nextNode) return;

    this.payload.flowchart.nextNode = nextNode;
};

VariableStatement.prototype.createNodeDeclarationCode = function (nodeDeclarationCode) {
    nodeDeclarationCode.push(this.payload.flowchart.data);
};

VariableStatement.prototype.createNodeNextCode = function (nodeDeclarationCode) {
    if(!this.payload.flowchart.nextNode) return;

    let nextNodeData = this.payload.flowchart.id + '->' + this.payload.flowchart.nextNode;

    nodeDeclarationCode.push(nextNodeData);
};

VariableStatement.prototype.markNodeAsVisited = function (isFunctionDone) {
    if(isFunctionDone.isFunctionDone) return;

    this.payload.flowchart.data += '|approved';
};

export {VariableStatement};
