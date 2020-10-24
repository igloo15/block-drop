export interface IBlockDropItem {
    readonly internalId: string;

    delete(removeElement?: boolean): void;
}