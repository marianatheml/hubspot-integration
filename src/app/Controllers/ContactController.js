const Yup = require('yup');
const Contact = require('../Models/Contact');
const axios = require('axios');
const { HUBSPOT_API_KEY } = require('../../../.env');

class ContactController {


    async getAll(req, res) {

        //Recebendo as informações no body
        const returnedContacts = [];

        //Pega do Hubspot
        axios({
            method: 'get',
            url: `https://api.hubapi.com/contacts/v1/lists/all/contacts/all?hapikey=${HUBSPOT_API_KEY}&property=email&property=mobilephone&property=date_of_birth`,
        })
            .then((response) => {

                let contactList = response.data.contacts.map((contact, i) => {
                    return { 'id': i, 'email': contact.properties.email, 'mobilePhone': contact.properties.mobilephone, 'birthDate': contact.properties.date_of_birth }
                })
                    
                console.log(contactList);
                res.send(contactList)
            })
            .catch((error) => {
                console.log("Erro na requisição.")
                console.log(error);
            })

    }


    async create(req, res) {

        //Validação de dados com Yup
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            telefone: Yup.string().required(),
            aniversario: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(402).json({
                error: true,
                message: "Dados inválidos."
            })
        }

        //Recebendo as informações no body
        const { email, telefone, aniversario } = req.body;

        //Checa a existencia do usuário no Hubspot
        const existe = async (email) => {

            try {
                const response = await axios({
                    method: 'get',
                    url: `https://api.hubapi.com/contacts/v1/contact/email/${email}/profile?hapikey=${HUBSPOT_API_KEY}`,
                })

                if (response.data.status == "error") return false;

                return true;
            }
            catch (error) {
                console.error(error);
            }

        }

        let ans = await existe(email);

        if (ans) {
            console.log("Usuário já existe.")
            res.send(false)
        } else {
            //Envia para o Hubspot
            axios({
                method: 'post',
                url: `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${email}/?hapikey=${HUBSPOT_API_KEY}`,
                data: {
                    "properties": [
                        { "property": "email", "value": email },
                        { "property": "mobilephone", "value": telefone },
                        { "property": "date_of_birth", "value": aniversario },
                    ]
                }
            })
                .then((response) => {
                    res.send(true)
                    console.log("Contato cadastrado com sucesso.");
                })
                .catch((error) => {
                    console.log("Erro ao cadastrar usuário.")
                })
        }

        //Construindo constante
        const dados = {
            email,
            telefone,
            aniversario
        }

        //Envia para o banco de dados
        const contact = await Contact.create(dados, (err) => {
            if (err) res.status(402).json({
                error: true,
                message: "Não foi possível cadastrar o contato."
            })

            return res.status(200).json({
                error: false,
                message: "Contato cadastrado com sucesso.",
                contact
            })
        })
    }

    async update(req, res) {

        //Validação de dados com Yup
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            telefone: Yup.string().required(),
            aniversario: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(402).json({
                error: true,
                message: "Dados inválidos."
            })
        }

        //Recebendo as informações no body
        const { email, telefone, aniversario } = req.body;

        //Checa a existencia do usuário no Hubspot
        const existe = async (email) => {

            try {
                const response = await axios({
                    method: 'get',
                    url: `https://api.hubapi.com/contacts/v1/contact/email/${email}/profile?hapikey=${HUBSPOT_API_KEY}`,
                })

                if (response.data.status == "error") return false;

                return true;
            }
            catch (error) {
                console.error(error);
            }
        }

        let ans = await existe(email);

        if (ans) {
            //Envia para o Hubspot
            axios({
                method: 'post',
                url: `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${email}/?hapikey=${HUBSPOT_API_KEY}`,
                data: {
                    "properties": [
                        { "property": "email", "value": email },
                        { "property": "mobilephone", "value": telefone },
                        { "property": "date_of_birth", "value": aniversario },
                    ]
                }
            })
                .then((response) => {
                    console.log("Contato atualizado com sucesso.");
                    res.send(true)
                })
                .catch((error) => {
                    console.log("Erro ao atualizar usuário.")
                })
        } else {
            console.log("Usuário não encontrado.")
            res.send(false)
        }

    }

}

module.exports = new ContactController();