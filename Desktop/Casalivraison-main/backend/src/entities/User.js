import { EntitySchema } from 'typeorm';

export const User = new EntitySchema({
    name: 'User',
    tableName: 'Users',
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
        email: {
            type: 'varchar',
            length: 255,
            nullable: false,
            unique: true
        },
        password: {
            type: 'varchar',
            length: 255,
            nullable: false
        },
        phone: {
            type: 'varchar',
            length: 50,
            nullable: true
        },
        address: {
            type: 'varchar',
            length: 500,
            nullable: true
        },
        role: {
            type: 'enum',
            enum: ['CLIENT', 'ADMIN', 'DRIVER'],
            default: 'CLIENT'
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
        orders: {
            type: 'one-to-many',
            target: 'Order',
            inverseSide: 'user'
        }
    }
});
