import jwt from 'jsonwebtoken'
import jwtData from '../bin/jwtData'
import HubModel from '../models/hub_model'
import UserModel from '../models/user_model'

require('dotenv').config()

const Hub = {
  /**
   * get all hubs data or filter with parameters given
   * @param {*} req req query should contain parameters to search for
   * @param {*} res
   */
  getHubData(req, res){
    // get the request parameters
    const query = req.query
    console.log('Search for', query)

    // search for hubs according to the given parameters
    HubModel.find(query, (error, doc) => {
      if (error) {
        console.log(error)
        return res.status(400).send('Wrong format for some of the search parameters.')
      } else {
        if (doc.length > 0){
          console.log('Successfully getting hubs data')
          return res.status(200).json(doc)
        } else {
          return res.status(404).send('Hub not found')
        }
      }
    })
  }, // end of getHubData

  /**
   * create new record in the database
   * @param {*} req should contain the data of the new record
   * @param {*} res
   */
  postHubData(req, res){
    // decode the JWT token - authorise only registered users
    // to create hubs and get id of the creator/admin
    const decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions)

    // get the user id, this user will be a hub admin by default
    const adminId = decoded.user.uid

    // get data of the new hub
    const hubData = req.body

    if (!hubData.name){
      res.status(400).send('Name of the hub missing')
    } else {
      UserModel.findById(adminId).exec(function(error, admin){
        if (error){ // only a registered user can create a hub
          res.status(401).send('Could not create the record')
        } else {

          let adminMember = {
            user_id: admin._id,
            name: admin.name,
            membership_type: 'admin',
          }

          let hubMembers = hubData.members || []
          hubMembers.push(adminMember)

          let hub = new HubModel(
            {
              name: hubData.name,
              description: hubData.description || '',
              tags: hubData.tags || [],
              location: hubData.location || '',
              members: hubMembers,
            }
          )

          hub.save().then(doc => {
            // console.log("Data saved"); // for debugging only
            console.log('Record successfully saved', doc)
            res.status(201).send(doc)
            // console.log("Response sent"); // for debugging only
          }).catch(error => {
            console.log(error)
            res.status(500).send('An error occurred while saving the data')
          })

        }
      })
    }
  }, // end of postHubData

  /**
   * update hub data for given hub id
   * @param {*} req should contain the id of the hub data to update
   * @param {*} res
  */
  updateHubData(req, res){
    // decode the JWT token to get user id
    const decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions)

    const userId = decoded.user.uid // id of the user making the update
    const hubId = req.params.id // id of the hub being updated

    // get data to be updated
    const props = req.body

    // TODO: implement validation of members array field;
    // updated records of each member of the hub MUST
    // contain the user_id field;
    // requiring the field in the schema does not work as expected;
    // needs to be hardcoded for now
    // update: writing custom validator for the members array
    // could potentially solve the problem

    HubModel.findById(hubId).exec(function(error, hub){
      if (error || hub === null) {
        res.status(404).send('No record matching the specified id found')
      } else {
        // check if the user is a member of the hub and if they are a hub admin
        // "undefined" means they are not!
        let user
        if (hub.members !== undefined)
          user = hub.members.find(member => member.user_id.toString() === userId.toString() && member.membership_type === 'admin')


        // unauthorised users cannot update the business data
        if (user === undefined) {
          res.status(403).send('You are not authorised to update the specified record')
        } else {
          // actual updating of the record
          hub.updateOne(props).exec(function(updateError, confirmation){
            if (updateError) {
              console.log(updateError)
              return res.status(500).send('Could not update the record')
            } else {
              console.log(`Hub with id: ${hubId} updated successfully`)
              return res.status(200).send(confirmation)
            }
          })
        }
      }
    })
  }, // end of updateHubData

  /**
   * delete hub data for given hub id
   * @param {*} req should contain the id of the hub data to delete
   * @param {*} res the deleted hub data
  */
  deleteHubData(req, res){
    // decode the JWT token to get user id
    const decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions)

    const userId = decoded.user.uid // id of the user deleting the record
    const hubId = req.params.id // id of the hub being deleted


    HubModel.findById(hubId).exec(function(error, hub){
      if (error || hub === null) {
        res.status(404).send('No record matching the specified id found')
      } else {

        // check if the user is a member of the hub and if they are a hub admin
        // "undefined" means they are not!
        let user
        if (hub.members !== undefined)
          user = hub.members.find(member => member.user_id.toString() === userId.toString() && member.membership_type === 'admin')

        // only an admin can delete the hub from the database
        if (user === undefined) {
          res.status(403).send('You are not authorised to delete the specified record')
        } else {
          // actual deleting of the record
          HubModel.findByIdAndRemove(hubId).then(function(deletedDoc){
            console.log(`Hub with id: ${hubId} deleted successfully`)
            return res.status(200).send(deletedDoc)
          })
        }
      }
    })
  }, // end of deleteHubData
}

export default Hub
