import { EntitySchema } from 'typeorm';

export const OrderItem = new EntitySchema({
    name: 'OrderItem',
    tableName: 'OrderItems',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        quantity: {
            type: 'int',
            nullable: false,
            default: 1
        },
        price: {
            type: 'decimal',
            precision: 10,
            scale: 2,
            nullable: false
        },
        orderId: {
            type: 'int',
            nullable: false
        },
        menuId: {
            type: 'int',
            nullable: false
        },
        createdAt: {
            type: 'timestamp',
            createDate: true
        },
        updatedAt: {
            type: 'timestamp',
            updateDate: true
        }
    },
    relations: {
        order: {
            type: 'many-to-one',
            target: 'Order',
            joinColumn: {
                name: 'orderId'
            },
            inverseSide: 'items'
        },
        menu: {
            type: 'many-to-one',
            target: 'Menu',
            joinColumn: {
                name: 'menuId'
            },
            inverseSide: 'orderItems'
        }
    }
});
