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
const extensionVariables_1 = require("../../extensionVariables");
const MongoDocumentTreeItem_1 = require("../tree/MongoDocumentTreeItem");
// tslint:disable:no-var-requires
const EJSON = require("mongodb-extended-json");
class MongoFindOneResultEditor {
    constructor(databaseNode, collectionName, data) {
        this._databaseNode = databaseNode;
        this._collectionName = collectionName;
        this._originalDocument = EJSON.parse(data);
    }
    get label() {
        const accountNode = this._databaseNode.parent;
        return `${accountNode.label}/${this._databaseNode.label}/${this._collectionName}/${this._originalDocument._id}`;
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._originalDocument;
        });
    }
    update(newDocument) {
        return __awaiter(this, void 0, void 0, function* () {
            const node = yield extensionVariables_1.ext.tree.findTreeItem(this.id);
            let result;
            if (node) {
                result = yield node.update(newDocument);
                node.refresh();
            }
            else {
                // If the node isn't cached already, just update it to Mongo directly (without worrying about updating the tree)
                const db = yield this._databaseNode.getDb();
                result = yield MongoDocumentTreeItem_1.MongoDocumentTreeItem.update(db.collection(this._collectionName), newDocument);
            }
            return result;
        });
    }
    get id() {
        return `${this._databaseNode.fullId}/${this._collectionName}/${this._originalDocument._id.toString()}`;
    }
    convertFromString(data) {
        return EJSON.parse(data);
    }
    convertToString(data) {
        return EJSON.stringify(data, null, 2);
    }
}
exports.MongoFindOneResultEditor = MongoFindOneResultEditor;
//# sourceMappingURL=MongoFindOneResultEditor.js.map