import { Connector } from "./connector";

export interface Transform { 
    k: number; 
    x: number; 
    y: number 
}

export interface ConnectionValidationResult {
    status: boolean;
    validator?: ConnectionValidator;
    start: Connector;
    end: Connector;
}

export type ConnectionValidatorFunction = (start: Connector, end: Connector) => boolean;

export class ConnectionValidator {
    public name: string;
    public execute: ConnectionValidatorFunction;

    constructor(name: string, validatorFunction: ConnectionValidatorFunction) {
        this.name = name;
        this.execute = validatorFunction;
    }
}

export type ConnectionRenderFunction = (
    value: string, 
    x1: number, 
    y1: number, 
    x2: number, 
    y2: number, 
    hx1: number, 
    hx2: number) => string;

export interface IBlockAreaOptions {
    zoomMin?: number;
    zoomMax?: number;
    zoomInterval?: number;

    widthMax?: number;
    heightMax?: number;

    lockToArea?: boolean;

    pathCurvature?: number;

    renderFunction?: ConnectionRenderFunction;
}

export class BlockAreaOptions {
    public zoomMin = 0.52;
    public zoomMax = 2;
    public zoomInterval = 0.1;

    public widthMax = 4000;
    public heightMax = 4000;

    public lockToArea = false;

    public pathCurvature = 0.4;

    public renderFunction: ConnectionRenderFunction = (value: string) => value;
}
