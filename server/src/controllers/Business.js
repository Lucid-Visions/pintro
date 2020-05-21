import jwt from "jsonwebtoken";
import jwtData from "../bin/jwtData";
import BusinessModel from "../models/business_model";
import UserModel from "../models/user_model";

require("dotenv").config();

const Business = {
  /**
     * Get all businesses in the database.
     * @param {string} req empty parameters
     * @param {*} res an array containing all businesses.
     */
    async getAllBusinesses(req, res) {
      try {
          await BusinessModel.find({}, (error, doc) => {
              if (error) {
                  console.log(error);
                  return res.status(400).send({error:"Error!", message:"Query error"});
              }
              else {
                  return res.status(200).send(doc);
              }
          });
      } catch (error) {
          console.log(error);
      }
  }, // end of getAllBusinesses
  
  async getMyBusinesses(req, res) {
    try {

      const decoded = jwt.verify(
        req.token,
        jwtData.publicKEY,
        jwtData.verifyOptions);

      const ownerId = decoded.user.uid;
        console.log("Getting businesses for "+ownerId)
        await BusinessModel.find({"owner.user_id":ownerId}, (error, doc) => {
            if (error) {
                console.log(error);
                return res.status(400).send({error:"Error!", message:"Query error"});
            }
            else {
                return res.status(200).send(doc);
            }
        });
    } catch (error) {
        console.log(error);
    }
}, // end of getAllBusinesses
  /**
   * get all businesses data or filter with parameters given
   * @param {*} req req query should contain parameters to search for
   * @param {*} res
   */
   getBusinessData(req, res){
     // get the request parameters
     const query = req.query;
     console.log("Search for", query);

     //search for businesses according to the given parameters
     BusinessModel.find(query, (error, doc) => {
         if (error) {
             console.log(error);
             return res.status(400).send({error:"Query error",message:"Wrong format for some of the search parameters."});
         } else {
             if(doc.length > 0){
                 console.log("Successfully getting businesses data");
                    // console.log(doc[0].team);  // for debugging only
                 return res.status(200).json(doc);
             } else {
                 return res.status(404).send({error:"query error",message:"Business not found"});
             }
         }
     }).populate("owner.user_id team");
   },

   /**
    * create new record
    * @param {*} req should contain the data of the new record
    * @param {*} res
   */
   postBusinessData(req, res){
     // decode the JWT token - authorise only registered users
     // to create businesses and get id of the owner
     const decoded = jwt.verify(
         req.token,
         jwtData.publicKEY,
         jwtData.verifyOptions);

     const ownerId = decoded.user.uid;

     // get data of the new business
     const businessData = req.body
       // console.log(businessData); // for debugging only
       // console.log(typeof businessData.team_members[0]);  // for debugging only

     if(!businessData.name){
       res.status(400).send({error:"query error", message:"Name of the business missing"});
     } else{
       UserModel.findById(ownerId).exec(function(error, owner){
         if(error){ // only a registered user can create a business
           res.status(401).send({error:"query error", message:"Could not create the record"});
         } else{

           let business = new BusinessModel(
             {
               name: businessData.name,
               tagline: businessData.tagline || "",
               bio: businessData.bio || "",
               seeking_investment: businessData.seeking_investment || false,
               currently_hiring: businessData.currently_hiring || false,
               tags: businessData.tags || [],
               date_founded: businessData.date_founded || "",
               location: businessData.location || "",
               company_size: businessData.company_size || "",
               funding: businessData.funding || "",
               owner: {
                 user_id: owner._id,
                 name: owner.name,
                 role_description: businessData.owner !== undefined ? businessData.owner.role_description : "",
                 point_of_contact: businessData.owner !== undefined ? businessData.owner.point_of_contact : true
               },
               team: businessData.team || []
             }
           );

           business.save().then(doc => {
               // console.log("Data saved"); // for debugging only
             console.log("Record successfully saved", doc);
             res.status(201).send(doc);
               // console.log("Response sent"); // for debugging only
           }).catch(error => {
             console.log(error);
             res.status(500).send({error:"query error", message:"An error occurred while saving the data"});
           });

         }
       });
     }
   }, // end of postBusinessData

   /**
    * update business data for given business id
    * @param {*} req should contain the id of the business data to update
    * @param {*} res
   */
   updateBusinessData(req, res) {
     // decode the JWT token to get user id
     const decoded = jwt.verify(
         req.token,
         jwtData.publicKEY,
         jwtData.verifyOptions);

     const userId = decoded.user.uid;   // id of the user making the update
     const businessId = req.params.id;  // id of the business being updated

     // get data to be updated
     const props = req.body;

     // TODO: implement validation of owner and team array data
     // updated records of each member of the business MUST
     // contain the user_id field;
     // requiring the field in the schema does not work as expected;
     // needs to be hardcoded for now
     // update: writing custom validator for the team array as well as the
     // owner field could potentially solve the problem

     BusinessModel.findById(businessId).exec(function(error, business){
       if(error || business === null) {
         res.status(404).send({error:"query error", message:"No record matching the specified id found"});
       } else {
         // check if the user is a team member in this company
         // "undefined" means they are not!
            // console.log(business);   // for debugging only
         let user;
         if(business.owner !== undefined && userId.toString() === business.owner.user_id.toString())
           user = business.owner;
         else if(business.team !== undefined)
           user = business.team.find(member => member.user_id.toString() === userId.toString());


         // unauthorised users cannot update the business data
         if(user === undefined) {
           res.status(403).send({error:"query error", message:"You are not authorised to update the specified record"});
         } else {
           // actual updating of the record
           business.updateOne(props).exec(function(updateError, confirmation){
             if(updateError) {
               console.log(updateError);
               return res.status(500).send({error:"query error", message:"Could not update the record"});
             } else {
               console.log(`Business with id: ${businessId} updated successfully`);
               return res.status(200).send(confirmation);
             }
           });
         }
       }
     });
   }, // end of updateBusinessData

   /**
    * delete business data for given business id
    * @param {*} req should contain the id of the business data to delete
    * @param {*} res the deleted business data
   */
   deleteBusinessData(req, res) {
     // decode the JWT token to get user id
     const decoded = jwt.verify(
         req.token,
         jwtData.publicKEY,
         jwtData.verifyOptions);

     const userId = decoded.user.uid;   // id of the user making the update
     const businessId = req.params.id;  // id of the business being updated


     BusinessModel.findById(businessId).exec(function(error, business){
       if(error || business === null) {
         res.status(404).send({error:"query error", message:"No record matching the specified id found"});
       } else {

         // only the owner can delete the business from the database
         if(business.owner === undefined || userId.toString() !== business.owner.user_id.toString()) {
           res.status(403).send({error:"query error", message:"You are not authorised to delete the specified record"});
         } else {
           // actual deleting of the record
           BusinessModel.findByIdAndRemove(businessId).then(function(deletedDoc){
             console.log(`Business with id: ${businessId} deleted successfully`);
             return res.status(200).send(deletedDoc);
           });
         }
       }
     });
   }
};

export default Business;
