export interface IBlockDropItem {
    readonly itemType: 'Block' | 'BlockArea' | 'Connection' | 'Connector';
    readonly internalId: string;
    readonly elem: Element;

    delete(removeElement?: boolean): void;
}