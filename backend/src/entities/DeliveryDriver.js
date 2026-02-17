import { EntitySchema } from 'typeorm';

export const DeliveryDriver = new EntitySchema({
    name: 'DeliveryDriver',
    tableName: 'DeliveryDrivers',
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
        phone: {
            type: 'varchar',
            length: 50,
            nullable: false
        },
        vehicleType: {
            type: 'varchar',
            length: 100,
            nullable: true
        },
        licenseNumber: {
            type: 'varchar',
            length: 100,
            nullable: true
        },
        isAvailable: {
            type: 'boolean',
            default: true
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
            inverseSide: 'driver'
        }
    }
});
