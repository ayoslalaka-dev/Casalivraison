import { EntitySchema } from 'typeorm';

export const Category = new EntitySchema({
    name: 'Category',
    tableName: 'Categories',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        name: {
            type: 'varchar',
            length: 255,
            nullable: false,
            unique: true
        },
        description: {
            type: 'text',
            nullable: true
        },
        imageUrl: {
            type: 'varchar',
            length: 500,
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
        restaurants: {
            type: 'one-to-many',
            target: 'Restaurant',
            inverseSide: 'category'
        }
    }
});
