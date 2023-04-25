import { Op } from 'sequelize';
import { Patitents } from '../models/Patients';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const getAll: APIGatewayProxyHandler = async (event, context) => {
    try {
    const { page, pageSize, search} = event.queryStringParameters;
        const parsedPage = parseInt(page);
        const parsedPageSize = parseInt(pageSize);
        const startIndex = (parsedPage - 1) * parsedPageSize;
        
        let list = await Patitents.findAll({
            where: search ? { nome: { [Op.like]: `%${search}%` } } : {},
            order: [['nome', 'ASC']],
            offset: startIndex,
            limit: parsedPageSize,
        });    

        return {
            statusCode: 200,
            headers: {
            'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ data: list })
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            headers: {
            'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ message: 'Erro interno do servidor.' })
        };
    } 
}

export const createPaciente: APIGatewayProxyHandler = async (event, context) => {
    try {
        const { nome, email, data_nascimento, cpf, cep, endereco, complemento, numero, bairro, cidade, uf, pais } = JSON.parse(event.body);

        let consultPatientEmail = await Patitents.findAll({
            where:{
                email: email
            } 
        });
        
        if (consultPatientEmail.length > 0) {
            return {
                statusCode: 403,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ message: 'E-mail já esta em uso' })
            }
        }

        let consultPatientCPF = await Patitents.findAll({
            where:{
                cpf: cpf
            } 
        });
        
        if (consultPatientCPF.length > 0) {
            return {
                statusCode: 403,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ message: 'CPF já esta em uso' })
            }
        }

        let newPatient = await Patitents.create({ nome, email, data_nascimento, cpf, cep, endereco, complemento, numero, bairro, cidade, uf, pais });

        return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ id: newPatient.id }),
        };
    } catch (error) {
        console.error(error);
        return {
        statusCode: 500,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'Erro ao cadastrar o paciente' }),
        };
    } 
};

export const updatePaciente: APIGatewayProxyHandler = async (event, context) => {
    try {
      const id = event.pathParameters.id;
      const { nome, email, data_nascimento, cpf, cep, endereco, complemento, numero, bairro, cidade, uf, pais } = JSON.parse(event.body);
  
      let patient = await Patitents.findByPk(id);

      if (patient) {
       
        if (patient.email != email) {
            let consultPatient = await Patitents.findAll({
                where:{
                    email: email
                } 
            });
            
            if (consultPatient.length > 0) {
                return {
                    statusCode: 403,
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({ message: 'E-mail já esta em uso' }),
                }
            }
        }

        if (patient.cpf != cpf) {
            let consultPatient = await Patitents.findAll({
                where:{
                    cpf: cpf
                } 
            });
            
            if (consultPatient.length > 0) {
                return {
                    statusCode: 403,
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({ message: 'CPF já esta em uso' }),
                }
            }
        }

        patient.nome            = nome;
        patient.email           = email;
        patient.data_nascimento = data_nascimento;
        patient.cpf             = cpf;  
        patient.cep             = cep;
        patient.endereco        = endereco;
        patient.complemento     = complemento;
        patient.numero          = numero;
        patient.bairro          = bairro;
        patient.cidade          = cidade;
        patient.uf              = uf;
        patient.pais            = pais;

        await patient.save();

        return {
            statusCode: 201,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ message: 'Paciente atualizado com sucesso' }),
          };

      } else {
        return {
            statusCode: 404,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ message: 'Paciente não encontrado' }),
        };
      }

    } catch (error) {
      console.error(error);
  
      return {
        statusCode: 500,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'Erro ao atualizado o paciente' }),
      };
    } 
};

export const deletePaciente: APIGatewayProxyHandler = async (event, context) => {
    try {

      const id = event.pathParameters.id;
  
      let patient = await Patitents.findByPk(id);

      if (patient) {
        await patient.destroy();
        return {
            statusCode: 201,
            headers: {
                'Access-Control-Allow-Origin': '*'
              },
            body: JSON.stringify({ message: 'Paciente deletado com sucesso' }),
          };
      } else {
        return {
            statusCode: 404,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ message: 'Paciente não encontrado' }),
        };
      }
  
    } catch (error) {
      console.error(error);
  
      return {
        statusCode: 500,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'Erro ao deletar o paciente' }),
      };
    } 
};

export const findPacienteById: APIGatewayProxyHandler = async (event, context) => {
    try {
      const id = event.pathParameters.id;
  
      let patient = await Patitents.findByPk(id);

      if (patient) {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(patient),
        };
      } else {
        return {
            statusCode: 404,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ message: 'Paciente não encontrado' }),
        };
      }

    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'Erro no servidor' }),
      };
    } 
};
