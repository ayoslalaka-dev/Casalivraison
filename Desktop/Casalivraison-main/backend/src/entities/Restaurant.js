import { EntitySchema } from 'typeorm';

export const Restaurant = new EntitySchema({
    name: 'Restaurant',
    tableName: 'Restaurants',
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
        imageUrl: {
            type: 'varchar',
            length: 500,
            nullable: true
        },
        address: {
            type: 'varchar',
            length: 500,
            nullable: false
        },
        categoryId: {
            type: 'int',
            nullable: false
        },
        phone: {
            type: 'varchar',
            length: 50,
            nullable: true
        },
        rating: {
            type: 'float',
            default: 0
        },
        deliveryTime: {
            type: 'varchar',
            length: 100,
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
        category: {
            type: 'many-to-one',
            target: 'Category',
            joinColumn: {
                name: 'categoryId'
            },
            inverseSide: 'restaurants'
        },
        menus: {
            type: 'one-to-many',
            target: 'Menu',
            inverseSide: 'restaurant'
        },
        orders: {
            type: 'one-to-many',
            target: 'Order',
            inverseSide: 'restaurant'
        }
    }
});
