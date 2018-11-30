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
const vscode_azureextensionui_1 = require("vscode-azureextensionui");
const deleteCosmosDBAccount_1 = require("../../commands/deleteCosmosDBAccount");
const DocDBAccountTreeItemBase_1 = require("../../docdb/tree/DocDBAccountTreeItemBase");
class TableAccountTreeItem extends DocDBAccountTreeItemBase_1.DocDBAccountTreeItemBase {
    constructor() {
        super(...arguments);
        this.contextValue = TableAccountTreeItem.contextValue;
    }
    hasMoreChildrenImpl() {
        return false;
    }
    initChild() {
        throw new Error('Table Accounts are not supported yet.');
    }
    loadMoreChildrenImpl(_clearCache) {
        return __awaiter(this, void 0, void 0, function* () {
            return [new vscode_azureextensionui_1.GenericTreeItem(this, {
                    contextValue: 'tableNotSupported',
                    label: 'Table Accounts are not supported yet.'
                })];
        });
    }
    deleteTreeItemImpl() {
        return __awaiter(this, void 0, void 0, function* () {
            yield deleteCosmosDBAccount_1.deleteCosmosDBAccount(this);
        });
    }
}
TableAccountTreeItem.contextValue = "cosmosDBTableAccount";
exports.TableAccountTreeItem = TableAccountTreeItem;
//# sourceMappingURL=TableAccountTreeItem.js.map