import { Sector } from "./Sector";

export interface Subsector {
    subsectorId: string ;
    subsectorName: string;
    subsectorEnabled: boolean;
    subsectorDeleted: boolean;
    sectorModel: Sector;
}

export interface SubsectorDto {
    id: string;
    subsectorName: string;
    subsectorEnabled: boolean;
    subsectorDeleted: boolean;
    sectorName: string;
}