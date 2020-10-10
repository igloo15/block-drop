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

// eslint-disable-next-line no-unused-vars
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
    // eslint-disable-next-line no-unused-vars
    value: string, 
    // eslint-disable-next-line no-unused-vars
    x1: number, y1: number, 
    // eslint-disable-next-line no-unused-vars
    x2: number, y2: number, 
    // eslint-disable-next-line no-unused-vars
    hx1: number, hx2: number) => string;

export interface IBlockAreaOptions {
    zoomMin?: number;
    zoomMax?: number;
    zoomInterval?: number;

    widthMax?: number;
    heightMax?: number;

    lockToArea?: boolean;

    pathCurvature?: number;
    patchStyleClass?: string;

    renderFunction?: ConnectionRenderFunction;
    validators?: ConnectionValidator[];
}

export class BlockAreaOptions {
    public zoomMin = 0.52;
    public zoomMax = 2;
    public zoomInterval = 0.1;

    public widthMax = 4000;
    public heightMax = 4000;

    public lockToArea = false;

    public pathCurvature = 0.4;
    public pathStyleClass = 'main-path';

    public renderFunction: ConnectionRenderFunction = (value: string) => value;

    public validators: ConnectionValidator[] = [];

    constructor(options?: IBlockAreaOptions) {
        if (options) {
            this.zoomMin = options.zoomMin ?? this.zoomMin;
            this.zoomMax = options.zoomMax ?? this.zoomMax;
            this.zoomInterval = options.zoomInterval ?? this.zoomInterval;
            this.widthMax = options.widthMax ?? this.widthMax;
            this.heightMax = options.heightMax ?? this.heightMax;
            this.lockToArea = options.lockToArea ?? this.lockToArea;
            this.pathCurvature = options.pathCurvature ?? this.pathCurvature;
            this.pathStyleClass = options.patchStyleClass ?? this.pathStyleClass;
            this.renderFunction = options.renderFunction ?? this.renderFunction;
            this.validators = options.validators ?? this.validators;
        }
    }
}
