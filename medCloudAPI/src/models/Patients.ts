import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface PatitentsInterface extends Model {
    id: number,
    nome: string,
	email: String,
	data_nascimento: string,
	cpf: string,
	cep: string,
	endereco: string,
	complemento: string,
	numero: number,
	bairro: string,
	cidade: string,
	uf: string,
	pais: string
}

export const Patitents = sequelize.define<PatitentsInterface>('paciente', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
	data_nascimento: DataTypes.STRING,
	cpf: DataTypes.STRING,
	cep: DataTypes.STRING,
	endereco: DataTypes.STRING,
	complemento: DataTypes.STRING,
	numero: DataTypes.INTEGER,
	bairro: DataTypes.STRING,
	cidade: DataTypes.STRING,
	uf: DataTypes.STRING,
	pais: DataTypes.STRING
},{
    tableName: 'paciente',
    timestamps: false
});
