import jwt from "jsonwebtoken";
import jwtData from "../bin/jwtData";
import BusinessModel from "../models/business_model";
import UserModel from "../models/user_model";
import User from "./User";

require("dotenv").config();

const Panel = {

    /**
     * Get all users in the database.
     * @param {string} req empty parameters
     * @param {*} res an array containing all users.
     */
    async getAllUsers(req, res) {
        try {
            await UserModel.find({}, (error, doc) => {
                if (error) {
                    console.log(error);
                    return res.status(400).send("Error!");
                }
                else {
                    return res.status(200).send(doc);
                }
            });
        } catch (error) {
            console.log(error);
        }
    },

    /**
     * Reset the user's password.
     * NOTE: at the moment, password is not hashed.
     * @param {string} req the user id.
     * @param {*} res the response.
     */
    async resetPassword(req, res) {
        try {
            let uid = req.params.id;
            let newPassword = req.body.password

            // Update the password field.
            let query = UserModel.updateOne({ _id: uid }, {
                $set: {
                    password_hash: newPassword
                }
            });
            // Execute the query.
            query.exec((error, _) => {
                if (error) {
                    console.log(error);
                    return res.status(400).send("Error");
                }
                else {
                    return res.status(200).send("Successfully updated password");
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(404).send("Body not provided!")
        }
    },

    /**
     * Ban users of make them active again.
     * @param {string} req the id of the user and the status to update.
     * @param {*} res 
     */
    changeStatus(req, res) {
        let uid = req.params.id;
        let status = req.params.status;

        let query = UserModel.updateOne({ _id: uid }, {
            $set: {
                accountStatus: status
            }
        })
        query.exec((error, _) => {
            if (error) {
                console.log(error);
                return res.status(400).send("Error!");
            }
            else {
                return res.status(200).send("Successfully updated user status");
            }
        })
    }
}

export default Panel;