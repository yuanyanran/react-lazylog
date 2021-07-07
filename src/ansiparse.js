/* eslint-disable no-plusplus, no-continue */
import Anser from 'anser';
import { escapeCarriageReturn } from 'escape-carriage';

// This is copied from the Jupyter Classic source code
// notebook/static/base/js/utils.js to handle \b in a way
// that is **compatible with Jupyter classic**.   One can
// argue that this behavior is questionable:
//   https://stackoverflow.com/questions/55440152/multiple-b-doesnt-work-as-expected-in-jupyter#
function fixBackspace(txt) {
  let txt0 = txt;
  let tmp = txt0;

  do {
    txt0 = tmp;
    // Cancel out anything-but-newline followed by backspace
    // eslint-disable-next-line no-control-regex
    tmp = txt0.replace(/[^\n]\x08/gm, '');
  } while (tmp.length < txt0.length);

  return txt0;
}

function ansiToJSON(input, useClasses) {
  const input0 = escapeCarriageReturn(fixBackspace(input));

  return Anser.ansiToJson(input0, {
    json: true,
    remove_empty: true,
    use_classes: useClasses,
  });
}

const ansiparse = str => ansiToJSON(str);

export default ansiparse;
