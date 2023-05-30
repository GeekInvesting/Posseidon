//model/hefesto/Subsector.ts
import { Sector } from "./Sector";

export interface Subsector {
    //subsectorId: string ;
    subsectorName: string;
    subsectorEnabled: boolean;
    subsectorDeleted: boolean;
    sectorModel: Sector;
    id: string;
    //sectorName: string;
}

export interface SubsectorDto {
    id: string;
    subsectorName: string;
    subsectorEnabled: boolean;
    subsectorDeleted: boolean;
    sectorName: string;
}