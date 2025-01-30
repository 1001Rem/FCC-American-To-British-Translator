const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {

    suite('american-to-british', ()=>{

        //american to british english translations:
        test('Translate Mangoes are my favorite fruit. to British English', (done)=>{
            let translatedStr = translator.translate("Mangoes are my favorite fruit.", "american-to-british");
            assert.include(translatedStr[0], "favourite");
            done();
        });
    
        test('I ate yogurt for breakfast.', (done)=>{
            assert.include(translator.translate("I ate yogurt for breakfast.", "american-to-british",)[0], "yoghurt");
            done();
        });
    
        test("We had a party at my friend's condo.", (done)=>{
            assert.include(translator.translate("We had a party at my friend's condo.", "american-to-british")[0], "flat");
            done();
        });
    
        test('Translate Can you toss this in the trashcan for me?', (done)=>{
            assert.include(translator.translate("Translate Can you toss this in the trashcan for me?", "american-to-british")[0], "bin");
            done();
        });
    
        test('The parking lot was full.', (done)=>{
            assert.include(translator.translate("The parking lot was full.", "american-to-british")[0], "car park");
            done();
        });
    
        test('Like a high tech Rube Goldberg machine.', (done)=>{
            assert.include(translator.translate("Like a high tech Rube Goldberg machine.", "american-to-british")[0], "Heath Robinson");
            done();
        });
    
        test('To play hooky means to skip class or work.', (done)=>{
            assert.equal(translator.translate("To play hooky means to skip class or work.", "american-to-british")[0], "To bunk off means to skip class or work.");
            done();
        });
    
        test('No Mr. Bond, I expect you to die.', (done)=>{
            assert.equal(translator.translate("No Mr. Bond, I expect you to die.", "american-to-british")[0], "No Mr Bond, I expect you to die.");
            done();
        });
    
        test('Dr. Grosh will see you now.', (done)=>{
            assert.equal(translator.translate("Dr. Grosh will see you now.", "american-to-british")[0], "Dr Grosh will see you now.");
            done();
        });
    
        test('Lunch is at 12:15 today.', (done)=>{
            assert.equal(translator.translate("Lunch is at 12:15 today.", "american-to-british")[0], "Lunch is at 12.15 today.");
            done();
        });

    })

    //translate from british to american english
    suite('british-to-american', ()=>{
        test('Translate We watched the footie match for a while.', (done)=>{
            assert.equal(translator.translate("We watched the footie match for a while.", "british-to-american")[0], "We watched the soccer match for a while.");
            done();
        });


        test('Paracetamol takes up to an hour to work.', (done)=>{
            assert.equal(translator.translate("Paracetamol takes up to an hour to work.", "british-to-american")[0], "Tylenol takes up to an hour to work.");
            done();
        });

        test('First, caramelise the onions.', (done)=>{
            assert.include(translator.translate('First, caramelise the onions.', "british-to-american")[0], 'First, caramelize the onions.');
            done();
        });

        test('I spent the bank holiday at the funfair.', (done)=>{
            assert.equal(translator.translate('I spent the bank holiday at the funfair.', 'british-to-american')[0], 'I spent the public holiday at the carnival.');
            done();
        });

        test('I had a bicky then went to the chippy.', (done)=>{
            assert.equal(translator.translate('I had a bicky then went to the chippy.', 'british-to-american')[0], 'I had a cookie then went to the fish-and-chip shop.');
            done();
        });

        test('I\'ve just got bits and bobs in my bum bag', (done)=>{
            assert.equal(translator.translate("I've just got bits and bobs in my bum bag", "british-to-american")[0], "I've just got odds and ends in my fanny pack");
            done();
        });

        test('The car boot sale at Boxted Airfield was called off.', (done)=>{
            assert.equal(translator.translate('The car boot sale at Boxted Airfield was called off.', 'british-to-american')[0], 'The swap meet at Boxted Airfield was called off.');
            done();
        });

        test('Have you met Mrs Kalyani?', (done)=>{
            assert.equal(translator.translate('Have you met Mrs Kalyani?', 'british-to-american')[0], 'Have you met Mrs. Kalyani?');
            done();
        });


        test('Prof Joyner of King\'s College, London.', (done)=>{
            assert.equal(translator.translate("Prof Joyner of King's College, London.", 'british-to-american')[0], "Prof. Joyner of King's College, London.");
            done();
        });

        test('Tea time is usually around 4 or 4.30.', (done)=>{
            assert.equal(translator.translate("Tea time is usually around 4 or 4.30", "british-to-american")[0], "Tea time is usually around 4 or 4:30");
            done();
        });


        suite('Translation highlights checks', ()=>{

            test('Mangoes are my favorite fruit', (done)=>{
                assert.equal(translator.translate('Mangoes are my favorite fruit', 'american-to-british')[1], 'Mangoes are my <span class="highlight">favourite</span> fruit');
                done();
            });
            test('I ate yogurt for breakfast.', (done)=>{
                assert.equal(translator.translate('I ate yogurt for breakfast.', 'american-to-british')[1], 'I ate <span class="highlight">yoghurt</span> for breakfast.');
                done();
            });


            test('We watched the footie match for a while.', (done)=>{
                assert.equal(translator.translate('We watched the footie match for a while.', 'british-to-american')[1], 'We watched the <span class="highlight">soccer</span> match for a while.');
                done();
            });


            test('Paracetamol takes up to an hour to work.', (done)=>{
                assert.equal(translator.translate('Paracetamol takes up to an hour to work.', 'british-to-american')[1], '<span class="highlight">Tylenol</span> takes up to an hour to work.');
                done();
            });
        });



    });

});
