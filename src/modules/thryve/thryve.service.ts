import { Injectable } from "@nestjs/common";

@Injectable()
export class ThryveService {
    private biomarkers: number[] = [
        // Stress markers
        6010, 
        6011, 
        6012, 
        6013, 
        5050
    ];

    constructor() {}

    checkIfValuesMatchInterest(values: number[]) {
        return this.biomarkers.some(b => values.findIndex(v => v === b) !== -1);
    }
}