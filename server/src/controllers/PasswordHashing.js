const crypto = require("crypto");

const config = {
  saltBytes: 16,
  hashBytes: 64,
  iterations: 10000,
  digest: "sha512"
};

const PasswordHasher = {
  /**
   * The function hashes the given password with the PBKDF2 algorithm using
   * a randomly generated salt. It returns the hashed password combined with the salt.
   * The first byte of the result encodes the number of bytes of the salt which is needed
   * for validation.
   *
   * @param password to be hashed
   * @return combined hash of the salt and the password hash in the form of a hex string
   */
  hashPassword(password){
    try {
      let salt = crypto.randomBytes(config.saltBytes);  // generate salt

      // the salt length will be needed to split the combined hash when validating
      let saltLength = Buffer.alloc(1);
      saltLength.writeUInt8(salt.length);

      let passwordHash = crypto.pbkdf2Sync(password, salt, config.iterations, config.hashBytes, config.digest);

      let combinedHash = Buffer.concat([saltLength, salt, passwordHash]);

      return combinedHash.toString("hex");
    } catch(error) {
      console.log("An error occurred while hashing the password", error);
      return null;
    }
  },


  /**
   * Function for verifying passwords. It pasrses the combinedHash to retrieve
   * the salt and the password hash. Then it hashes the supplied password and compares
   * it with the retrieved password hash. The function assumes that the first byte of the
   * combinedHash encodes the length of salt in bytes.
   *
   * @param password password to be verified
   * @param combinedHash the combined hash of the salt and actual password hash, must be a hex string
   * @return true if the passwords match, false otherwise
   */
  verifyPassword(password, combinedHash){
    try {
      let hashBuffer = Buffer.from(combinedHash, "hex");

      // get the salt length
      let saltLength = hashBuffer.readUInt8(0);

      // retrieve the salt from the combined hash
      let salt = hashBuffer.slice(1, saltLength + 1);

      // retrieve the password hash
      let passwordHash = hashBuffer.slice(saltLength + 1);

      // hash the entered password
      let passwordEnteredHash = crypto.pbkdf2Sync(password, salt, config.iterations, passwordHash.length, config.digest);

      // compare the two hashes
      if(passwordEnteredHash.equals(passwordHash)){
        return true;
      } else {
        return false;
      }
    } catch(error) {
      console.log("An error occurred", error);
      return false;
    }
  },


  /**
   * Generate a random password
   */
  generateRandomPasswordHash(){
    let randomPassword = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    return PasswordHasher.hashPassword(randomPassword);
  }

}
export default PasswordHasher;
