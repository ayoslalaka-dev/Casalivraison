import { EntitySchema } from 'typeorm';

export const Order = new EntitySchema({
    name: 'Order',
    tableName: 'Orders',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        status: {
            type: 'enum',
            enum: ['PENDING', 'VALIDATED', 'IN_DELIVERY', 'DELIVERED', 'CANCELLED'],
            default: 'PENDING'
        },
        totalPrice: {
            type: 'decimal',
            precision: 10,
            scale: 2,
            nullable: false
        },
        deliveryFee: {
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 20.00
        },
        deliveryAddress: {
            type: 'varchar',
            length: 500,
            nullable: true
        },
        userId: {
            type: 'int',
            nullable: false
        },
        restaurantId: {
            type: 'int',
            nullable: true
        },
        deliveryDriverId: {
            type: 'int',
            nullable: true
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
        user: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: {
                name: 'userId'
            },
            inverseSide: 'orders'
        },
        restaurant: {
            type: 'many-to-one',
            target: 'Restaurant',
            joinColumn: {
                name: 'restaurantId'
            },
            inverseSide: 'orders'
        },
        driver: {
            type: 'many-to-one',
            target: 'DeliveryDriver',
            joinColumn: {
                name: 'deliveryDriverId'
            },
            inverseSide: 'orders'
        },
        items: {
            type: 'one-to-many',
            target: 'OrderItem',
            inverseSide: 'order'
        }
    }
});
