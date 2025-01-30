const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    test('send valid inputs POST and receive valid return', (done)=>{
        chai
        .request(server)
        .keepOpen()
        .post('/api/translate')
        .send({text: "Today i lost my cell phone.", locale: "american-to-british"})
        .end((req, res)=>{
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, {text: "Today i lost my cell phone.", translation: 'Today i lost my <span class="highlight">mobile</span>.'});
            done();
        })
    });

    test('send Invalid locale POST and receive error return', (done)=>{
        chai
        .request(server)
        .keepOpen()
        .post('/api/translate')
        .send({text: "Today i lost my cell phone.", locale: "american-to-french"})
        .end((req, res)=>{
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, {error: 'Invalid value for locale field'});
            done();
        })
    });

    test('send missing text field POST and receive error return', (done)=>{
        chai
        .request(server)
        .keepOpen()
        .post('/api/translate')
        .send({locale: "american-to-british"})
        .end((req, res)=>{
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, {error: 'Required field(s) missing'});
            done();
        })
    });



    test('send missing locale POST and receive error return', (done)=>{
        chai
        .request(server)
        .keepOpen()
        .post('/api/translate')
        .send({text: "test"})
        .end((req, res)=>{
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, {error: 'Required field(s) missing'});
            done();
        })
    });



    test('send empty text POST and receive error return', (done)=>{
        chai
        .request(server)
        .keepOpen()
        .post('/api/translate')
        .send({text: "", locale: 'american-to-british'})
        .end((req, res)=>{
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, {error: 'No text to translate'});
            done();
        })
    });


    test('send text that doesnt need translation POST and receive expcted return', (done)=>{
        chai
        .request(server)
        .keepOpen()
        .post('/api/translate')
        .send({text: "Hello World!", locale: 'american-to-british'})
        .end((req, res)=>{
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, {text: "Hello World!" ,translation: 'Everything looks good to me!'});
            done();
        })
    });



});
