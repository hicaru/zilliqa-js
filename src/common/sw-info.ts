export class SWInfo {
    zilliqaMajorVersion: number;
    zilliqaMinorVersion: number;
    zilliqaFixVersion: number;
    zilliqaUpgradeDS: number;
    zilliqaCommit: number;
    scillaMajorVersion: number;
    scillaMinorVersion: number;
    scillaFixVersion: number;
    scillaUpgradeDS: number;
    scillaCommit: number;

    constructor(
        zilliqaMajorVersion: number,
        zilliqaMinorVersion: number,
        zilliqaFixVersion: number,
        zilliqaUpgradeDS: number,
        zilliqaCommit: number,
        scillaMajorVersion: number,
        scillaMinorVersion: number,
        scillaFixVersion: number,
        scillaUpgradeDS: number,
        scillaCommit: number
    ) {
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
