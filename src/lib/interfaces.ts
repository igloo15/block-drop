export interface IBlockDropItem {
    readonly internalId: string;
    readonly elem: Element;

    delete(removeElement?: boolean): void;
}