import bcrypt from 'bcrypt';

const saltRounds = 10;  // Corrected typo from "slatRound" to "saltRounds"

// Hash a password
const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);  // Using the correct variable name
    return bcrypt.hashSync(password, salt);
}

// Compare a plain password with the hashed password
const comparePassword = (plain, hashed) => bcrypt.compare(plain, hashed);

export { hashPassword, comparePassword };
