"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWInfo = void 0;
class SWInfo {
    constructor(zilliqaMajorVersion = 0, zilliqaMinorVersion = 0, zilliqaFixVersion = 0, zilliqaUpgradeDS = 0, zilliqaCommit = 0, scillaMajorVersion = 0, scillaMinorVersion = 0, scillaFixVersion = 0, scillaUpgradeDS = 0, scillaCommit = 0) {
        this.zilliqaMajorVersion = zilliqaMajorVersion;
        this.zilliqaMinorVersion = zilliqaMinorVersion;
        this.zilliqaFixVersion = zilliqaFixVersion;
        this.zilliqaUpgradeDS = zilliqaUpgradeDS;
        this.zilliqaCommit = zilliqaCommit;
        this.scillaMajorVersion = scillaMajorVersion;
        this.scillaMinorVersion = scillaMinorVersion;
        this.scillaFixVersion = scillaFixVersion;
        this.scillaUpgradeDS = scillaUpgradeDS;
        this.scillaCommit = scillaCommit;
    }
}
exports.SWInfo = SWInfo;
//# sourceMappingURL=sw-info.js.map