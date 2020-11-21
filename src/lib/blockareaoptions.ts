import { Connection } from "./connection";
import { Connector } from "./connector";
import { BlockPoint } from "./models";

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

export type AlterAnchorPointFunction = (connector: Connector, point: BlockPoint | undefined) => BlockPoint | undefined;

export interface IBlockAreaOptions {
    loc?: BlockPoint;
    zoom?: number;

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
    connectionMouseOffset?: BlockPoint;

    renderPathFunction?: PathRenderFunction;
    renderConnectionFunction?: ConnectionRenderFunction;
    alterAnchorPointFunction?: AlterAnchorPointFunction;

    validators?: ConnectionValidator[];
}

export class BlockAreaOptions {
    public loc: BlockPoint = { x: 0, y: 0};
    public zoom = 1;

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
    public connectionMouseOffset: BlockPoint = {x: 0, y: 0};
    
    public renderPathFunction: PathRenderFunction = (value: string) => value;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public renderConnectionFunction: ConnectionRenderFunction = () => {};
    public alterAnchorPointFunction: AlterAnchorPointFunction = (connector: Connector, point: BlockPoint | undefined) => { return point; }

    public validators: ConnectionValidator[] = [];

    constructor(options?: IBlockAreaOptions) {
        if (options) {
            this.loc = options.loc ?? this.loc;
            this.zoom = options.zoom ?? this.zoom;
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
            this.connectionMouseOffset = options.connectionMouseOffset ?? this.connectionMouseOffset;
            this.renderPathFunction = options.renderPathFunction ?? this.renderPathFunction;
            this.renderConnectionFunction = options.renderConnectionFunction ?? this.renderConnectionFunction;
            this.alterAnchorPointFunction = options.alterAnchorPointFunction ?? this.alterAnchorPointFunction;
            this.validators = options.validators ?? this.validators;
        }
    }
}
