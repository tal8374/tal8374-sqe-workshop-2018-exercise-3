import assert from 'assert';
import {updateLocalVariable} from '../src/js/utils/common';

describe('The common function', () => {
    it('is should update local variable', () => {
        let payload = JSON.parse('{"type":"VariableDeclarator","name":"b","value":"a+y","lineNumber":4}');
        let localVariables = JSON.parse('{"a":"x + 1"}')
        let globalVariables = JSON.parse('{"d":"444"}');
        let params = JSON.parse('[{"lineNumber":2,"type":"Param","name":"x","value":null},{"lineNumber":2,"type":"Param","name":"y","value":null},{"lineNumber":2,"type":"Param","name":"z","value":null}]')

        updateLocalVariable(payload, localVariables, globalVariables, params);

        assert.equal(
            JSON.stringify(payload),
            '{"type":"VariableDeclarator","name":"b","value":"x  + 1 + y","lineNumber":4}'
        );
    });

    it('is should update argument variable', () => {
        let payload = JSON.parse('{"type":"AssignmentExpression","name":"x","value":"x+2","lineNumber":2}');
        let localVariables = JSON.parse('{}')
        let globalVariables = JSON.parse('{}');
        let params = JSON.parse('[{"lineNumber":1,"type":"Param","name":"x","value":null},{"lineNumber":1,"type":"Param","name":"y","value":null},{"lineNumber":1,"type":"Param","name":"z","value":null}]')

        updateLocalVariable(payload, localVariables, globalVariables, params);

        assert.equal(
            JSON.stringify(payload),
            '{"type":"AssignmentExpression","name":"x","value":"x + 2","lineNumber":2}'
        );
    });
});
