import * as QUnit from "qunitjs"
import { pojoToJsonPatch } from "../src/helpers"

QUnit.module("pojoToJsonPatch(path)(obj)", {});

QUnit.test("all paths with no cycles", function exec_test(assert) {
  const obj = {
    validation: {
      answer: ''
    },
    formData: {
      progress: {
        step: 'about',
        hasJoined: false
      }
    }
  };
  const path = '/prefix';

  const result = pojoToJsonPatch(path)(obj);
  assert.deepEqual(result, [
    { "op": "add", "path": "/prefix/validation", "value": {} },
    { "op": "add", "path": "/prefix/formData", "value": {} },
    { "op": "add", "path": "/prefix/validation/answer", "value": "" },
    { "op": "add", "path": "/prefix/formData/progress", "value": {} },
    { "op": "add", "path": "/prefix/formData/progress/step", "value": "about" },
    { "op": "add", "path": "/prefix/formData/progress/hasJoined", "value": false }
  ], `...`);
});

