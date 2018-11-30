"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscodeUtils_1 = require("../../utils/vscodeUtils");
class DocDBDocumentNodeEditor {
    constructor(documentNode) {
        this._documentNode = documentNode;
    }
    get label() {
        return vscodeUtils_1.getNodeEditorLabel(this._documentNode);
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._documentNode.document;
        });
    }
    update(document) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedDoc = yield this._documentNode.update(document);
            yield this._documentNode.refresh();
            return updatedDoc;
        });
    }
    get id() {
        return this._documentNode.fullId;
    }
    convertFromString(data) {
        return JSON.parse(data);
    }
    convertToString(data) {
        return JSON.stringify(data, null, 2);
    }
}
exports.DocDBDocumentNodeEditor = DocDBDocumentNodeEditor;
//# sourceMappingURL=DocDBDocumentNodeEditor.js.map