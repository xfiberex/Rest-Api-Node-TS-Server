import {
    Table,
    Column,
    Model,
    DataType,
    Default,
    PrimaryKey,
} from "sequelize-typescript";

@Table({
    tableName: "products",
})
class Product extends Model {
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    declare name: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    declare price: number;

    @Default(true) // El valor inicia en verdadero o disponible
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    declare availability: boolean;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    declare createdAt: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    declare updatedAt: Date;
}

export default Product;
