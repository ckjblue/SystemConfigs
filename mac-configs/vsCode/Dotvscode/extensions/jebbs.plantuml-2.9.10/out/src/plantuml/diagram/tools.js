"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const includer_1 = require("./includer");
const diagram_1 = require("./diagram");
function currentDiagram() {
    let editor = vscode.window.activeTextEditor;
    if (editor)
        return diagramAt(editor.document, editor.selection.anchor.line);
}
exports.currentDiagram = currentDiagram;
function diagramAt(document, lineNumber) {
    let start;
    let end;
    let content = "";
    for (let i = lineNumber; i >= 0; i--) {
        let line = document.lineAt(i);
        if (diagram_1.diagramStartReg.test(line.text)) {
            start = line.range.start;
            break;
        }
        else if (i != lineNumber && diagram_1.diagramEndReg.test(line.text)) {
            return this;
        }
    }
    for (let i = lineNumber; i < document.lineCount; i++) {
        let line = document.lineAt(i);
        if (diagram_1.diagramEndReg.test(line.text)) {
            end = line.range.end;
            break;
        }
        else if (i != lineNumber && diagram_1.diagramStartReg.test(line.text)) {
            return this;
        }
    }
    // if no diagram block found, add entire document
    if (!(start && end) &&
        document.getText().trim() &&
        document.languageId == "diagram") {
        start = document.lineAt(0).range.start;
        end = document.lineAt(document.lineCount - 1).range.end;
    }
    let diagram = undefined;
    if (start && end) {
        content = document.getText(new vscode.Range(start, end));
        diagram = new diagram_1.Diagram(content, document, start, end);
    }
    return diagram ? includer_1.includer.addIncludes(diagram) : undefined;
}
exports.diagramAt = diagramAt;
function diagramsOf(document) {
    let diagrams = [];
    for (let i = 0; i < document.lineCount; i++) {
        let line = document.lineAt(i);
        if (diagram_1.diagramStartReg.test(line.text)) {
            let d = diagramAt(document, i);
            diagrams.push(d);
        }
    }
    // if no diagram block found, try add entire document
    if (!diagrams.length) {
        let d = diagramAt(document, 0);
        if (d)
            diagrams.push(d);
    }
    return diagrams;
}
exports.diagramsOf = diagramsOf;
//# sourceMappingURL=tools.js.map