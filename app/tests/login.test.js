import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "node:test";

const expect = chai.expect

const url = `http://localhost:3000/api/v1`

chai.use(chaiHttp)

describe('Login to API', ()=>{

    const correctLoginData = {
        username: "marianocereda",
        password: "dmKShqnBGlipgnx"
    }

    it('Should JWT token.', async ()=>{
        const response = await chai.request(url).post('/login').send(correctLoginData)
        expect(response).to.have.status(200)
        expect(response.body).to.have.property("token")
    })

})

describe('Incorrect Login to API', ()=>{

    const incorrectLoginData = {
        username: "marianocereda",
    }

    it('Should return joi schema error.', async ()=>{
        const response = await chai.request(url).post('/login').send(incorrectLoginData)
        expect(response).to.have.status(500)
        expect(response.body.message).to.be.equal(`Error - Invalid Schema: ValidationError: "password" is required`)
    })
    
})