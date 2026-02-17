import { EntitySchema } from 'typeorm';

export const Menu = new EntitySchema({
    name: 'Menu',
    tableName: 'Menus',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        name: {
            type: 'varchar',
            length: 255,
            nullable: false
        },
        description: {
            type: 'text',
            nullable: true
        },
        price: {
            type: 'decimal',
            precision: 10,
            scale: 2,
            nullable: false
        },
        imageUrl: {
            type: 'varchar',
            length: 500,
            nullable: true
        },
        restaurantId: {
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
        restaurant: {
            type: 'many-to-one',
            target: 'Restaurant',
            joinColumn: {
                name: 'restaurantId'
            },
            inverseSide: 'menus'
        },
        orderItems: {
            type: 'one-to-many',
            target: 'OrderItem',
            inverseSide: 'menu'
        }
    }
});
