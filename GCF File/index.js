/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */


exports.updateCard = (req, res) => {
  //set JSON content type and CORS headers for the response
    res.header('Content-Type','application/json');
    res.header('Access-Control-Allow-Origin', 'YOUR_HOSTED_URL');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
  
  //respond to CORS preflight requests
    if (req.method == 'OPTIONS') {
        res.status(204).send('OPTIONS');
    }
  
  const stripe = require("stripe")('sk_test_..');
       
    
    /* STEP ONE:
    Retrieve the Customer's ID from Stripe's database using their email. 
    */   
    stripe.customers.list(
        { email: req.body.email },
        function(err, customers) {
            const customerId = customers.data[0].id;
       
            
            
            /*STEP TWO:
            Use Customer ID to retreive the Credit Card ID
            */
            stripe.customers.listCards(
                customerId, function(err, cards) {

                /*This "if" statement basically says to check if the user
                has a card on file. If so, continue to update it. If not,
                then send the message 'You dont have a card on file'
                */
                 if (cards.data[0]) {
                    
                    const cardId = cards.data[0].id;
                
               
                
                   /* STEP THREE:
                    Use both the Customer ID and Credit Card ID to Delete the Credit Card
                    */  
                    stripe.customers.deleteCard(
                        customerId,
                        cardId,
                        function(err, confirmation) {
                            }
                            );
                    
                     
                    /* STEP FOUR:
                    Add a new Credit Card using the tokenized information, thus completing our update
                    */
                    stripe.customers.createSource(
                        customerId,
                        { card: req.body.token },
                        function(err, card) {
                            res.status(201).send('Success: The card has been successfully updated!!');
                        }
                        );
                    
                    
                } else {
                    res.status(500).send('Error: You do not have a card on file to update!');
                       }
                    
        })
    })         
  };