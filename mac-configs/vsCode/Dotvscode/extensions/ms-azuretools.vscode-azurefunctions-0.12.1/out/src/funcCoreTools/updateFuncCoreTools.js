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
const constants_1 = require("../constants");
const extensionVariables_1 = require("../extensionVariables");
const localize_1 = require("../localize");
const cpUtils_1 = require("../utils/cpUtils");
const getNpmDistTag_1 = require("./getNpmDistTag");
function updateFuncCoreTools(packageManager, projectRuntime) {
    return __awaiter(this, void 0, void 0, function* () {
        extensionVariables_1.ext.outputChannel.show();
        switch (packageManager) {
            case constants_1.PackageManager.npm:
                const distTag = yield getNpmDistTag_1.getNpmDistTag(projectRuntime);
                yield cpUtils_1.cpUtils.executeCommand(extensionVariables_1.ext.outputChannel, undefined, 'npm', 'install', '-g', `${constants_1.funcPackageName}@${distTag.tag}`);
                break;
            case constants_1.PackageManager.brew:
                yield cpUtils_1.cpUtils.executeCommand(extensionVariables_1.ext.outputChannel, undefined, 'brew', 'upgrade', constants_1.funcPackageName);
                break;
            default:
                throw new RangeError(localize_1.localize('invalidPackageManager', 'Invalid package manager "{0}".', packageManager));
                break;
        }
    });
}
exports.updateFuncCoreTools = updateFuncCoreTools;
//# sourceMappingURL=updateFuncCoreTools.js.map