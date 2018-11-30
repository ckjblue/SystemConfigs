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
const path = require("path");
const vscode_azureextensionui_1 = require("vscode-azureextensionui");
class GraphTreeItem extends vscode_azureextensionui_1.AzureTreeItem {
    constructor(parent, collection) {
        super(parent);
        this.contextValue = GraphTreeItem.contextValue;
        this.commandId = 'cosmosDB.openGraphExplorer';
        this._collection = collection;
    }
    get id() {
        return this._collection.id;
    }
    get label() {
        return "Graph";
    }
    get link() {
        return this._collection._self;
    }
    get iconPath() {
        return {
            light: path.join(__filename, '..', '..', '..', '..', '..', 'resources', 'icons', 'theme-agnostic', 'Collection.svg'),
            dark: path.join(__filename, '..', '..', '..', '..', '..', 'resources', 'icons', 'theme-agnostic', 'Collection.svg')
        };
    }
    showExplorer(graphViewsManager) {
        return __awaiter(this, void 0, void 0, function* () {
            const databaseTreeItem = this.parent.parent;
            yield graphViewsManager.showGraphViewer(this._collection.id, {
                documentEndpoint: databaseTreeItem.root.documentEndpoint,
                gremlinEndpoint: databaseTreeItem.gremlinEndpoint,
                possibleGremlinEndpoints: databaseTreeItem.possibleGremlinEndpoints,
                databaseName: databaseTreeItem.label,
                graphName: this._collection.id,
                key: databaseTreeItem.root.masterKey
            });
        });
    }
}
GraphTreeItem.contextValue = "cosmosDBGraphGraph";
exports.GraphTreeItem = GraphTreeItem;
//# sourceMappingURL=GraphTreeItem.js.map