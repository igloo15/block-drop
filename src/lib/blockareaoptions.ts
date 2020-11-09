import { Connection } from "./connection";
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
    conn: Connection, 
    svg: SVGElement,
    path: SVGPathElement,
    defs: SVGDefsElement) => void;

export type PathRenderFunction = (
    value: string, 
    x1: number, y1: number, 
    x2: number, y2: number, 
    hx1: number, hx2: number) => string;

export interface IBlockAreaOptions {
    zoomMin?: number;
    zoomMax?: number;
    zoomInterval?: number;
    disableZooming?: boolean;

    widthMax?: number;
    heightMax?: number;
    gridBackground?: boolean;

    lockToArea?: boolean;
    disableDragging?: boolean;

    pathCurvature?: number;
    patchStyleClass?: string;
    connectionAlternative?: boolean;


    renderPathFunction?: PathRenderFunction;
    renderConnectionFunction?: ConnectionRenderFunction;
    validators?: ConnectionValidator[];
}

export class BlockAreaOptions {
    public zoomMin = 0.52;
    public zoomMax = 2;
    public zoomInterval = 0.1;
    public disableZooming = false;

    public widthMax = 4000;
    public heightMax = 4000;
    public gridBackground = true;

    public lockToArea = false;
    public disableDragging = false;

    public pathCurvature = 0.4;
    public pathStyleClass = 'main-path';
    public connectionAlternative = false;
    
    public renderPathFunction: PathRenderFunction = (value: string) => value;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public renderConnectionFunction: ConnectionRenderFunction = () => {};

    public validators: ConnectionValidator[] = [];

    constructor(options?: IBlockAreaOptions) {
        if (options) {
            this.zoomMin = options.zoomMin ?? this.zoomMin;
            this.zoomMax = options.zoomMax ?? this.zoomMax;
            this.zoomInterval = options.zoomInterval ?? this.zoomInterval;
            this.disableZooming = options.disableZooming ?? this.disableZooming;
            this.widthMax = options.widthMax ?? this.widthMax;
            this.heightMax = options.heightMax ?? this.heightMax;
            this.gridBackground = options.gridBackground ?? this.gridBackground;
            this.lockToArea = options.lockToArea ?? this.lockToArea;
            this.disableDragging = options.disableDragging ?? this.disableDragging;
            this.pathCurvature = options.pathCurvature ?? this.pathCurvature;
            this.pathStyleClass = options.patchStyleClass ?? this.pathStyleClass;
            this.connectionAlternative = options.connectionAlternative ?? this.connectionAlternative;
            this.renderPathFunction = options.renderPathFunction ?? this.renderPathFunction;
            this.renderConnectionFunction = options.renderConnectionFunction ?? this.renderConnectionFunction;
            this.validators = options.validators ?? this.validators;
        }
    }
}
