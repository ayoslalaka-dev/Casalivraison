import { EntitySchema } from 'typeorm';

export const RefreshToken = new EntitySchema({
    name: 'RefreshToken',
    tableName: 'RefreshTokens',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        token: {
            type: 'varchar',
            length: 500,
            nullable: false,
            unique: true
        },
        expiryDate: {
            type: 'timestamp',
            nullable: false
        },
        revoked: {
            type: 'boolean',
            default: false
        },
        userId: {
            type: 'int',
            nullable: false
        },
        createdAt: {
            type: 'timestamp',
            createDate: true
        }
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: { name: 'userId' },
            onDelete: 'CASCADE'
        }
    }
});
